/**
 * Central integration bridge coordinating communication between:
 * - React UI (src/ui/ via uiGameAdapter)
 * - 3D World (src/game3d/ via gameEventAdapter)
 * - Pure Game Logic (src/logic/ via GameEnginePort from src/shared/)
 *
 * Contains no gameplay calculations, React components, or Three.js rendering logic.
 */

import { MVP_LEVEL_ID } from '../shared';
import type {
  CharacterId,
  ChronoActionRequest,
  ChronoActionResult,
  GameEnginePort,
  GameEvent,
  GameSessionState,
  LogicStepResult,
  TimelineEra,
} from '../shared';
import type {
  BridgeCommand,
  BridgeCommandResponse,
  BridgeError,
  BridgeErrorListener,
  GameEventListener,
  GameStateListener,
  IGameBridge,
  PuzzleCompletionListener,
  Unsubscribe,
} from './bridge.types';

export class GameBridge implements IGameBridge {
  private logicEngine: GameEnginePort | null = null;
  private readonly stateListeners = new Set<GameStateListener>();
  private readonly eventListeners = new Set<GameEventListener>();
  private readonly puzzleCompletionListeners = new Set<PuzzleCompletionListener>();
  private readonly errorListeners = new Set<BridgeErrorListener>();

  /** Attaches Member C's pure TypeScript logic implementation during integration. */
  attachLogic(logicEngine: GameEnginePort): void {
    this.logicEngine = logicEngine;
    const initialState = logicEngine.getState();
    this.notifyStateListeners(initialState);
  }

  /** Returns true once a pure logic engine has been connected. */
  isReady(): boolean {
    return this.logicEngine !== null;
  }

  /** Returns the latest session snapshot from the connected logic engine, or null if unattached. */
  getState(): GameSessionState | null {
    return this.logicEngine ? this.logicEngine.getState() : null;
  }

  /** Starts the specified level (defaults to the MVP Broken Bridge level). */
  startLevel(
    levelId: string = MVP_LEVEL_ID,
    characterId?: CharacterId,
  ): BridgeCommandResponse {
    return this.dispatchCommand({
      type: 'START_LEVEL',
      levelId,
      characterId,
    });
  }

  /** Resets the currently active level. */
  restartLevel(): BridgeCommandResponse {
    return this.dispatchCommand({ type: 'RESTART_LEVEL' });
  }

  /** Requests switching to Past (1920), Present (2026), or Future (2126). */
  requestTimelineChange(targetEra: TimelineEra): BridgeCommandResponse {
    return this.dispatchCommand({
      type: 'SWITCH_TIMELINE',
      targetEra,
    });
  }

  /** Requests an Extract Time or Transfer Time Chrono Core action. */
  requestChronoAction(
    request: ChronoActionRequest,
  ): BridgeCommandResponse<ChronoActionResult> {
    return this.executeWithLogic(
      request.action,
      (port) => port.executeChronoAction(request),
    );
  }

  /** Uniform typed command dispatcher used by UI and 3D adapters. */
  dispatchCommand(command: BridgeCommand): BridgeCommandResponse {
    switch (command.type) {
      case 'START_LEVEL':
        return this.executeWithLogic(command.type, (port) =>
          port.startLevel(command.levelId, command.characterId),
        );
      case 'RESTART_LEVEL':
        return this.executeWithLogic(command.type, (port) =>
          port.restartLevel(),
        );
      case 'SWITCH_TIMELINE':
        return this.executeWithLogic(command.type, (port) =>
          port.switchTimeline(command.targetEra),
        );
      case 'EXTRACT_TIME': {
        const era = command.era ?? this.logicEngine?.getState().timeline.activeEra;
        if (!era) {
          return this.failNotReady(command.type);
        }
        return this.requestChronoAction({
          action: 'EXTRACT_TIME',
          targetObjectId: command.targetObjectId,
          era,
        });
      }
      case 'TRANSFER_TIME': {
        const era = command.era ?? this.logicEngine?.getState().timeline.activeEra;
        if (!era) {
          return this.failNotReady(command.type);
        }
        return this.requestChronoAction({
          action: 'TRANSFER_TIME',
          targetObjectId: command.targetObjectId,
          era,
        });
      }
      case 'INSPECT_OBJECT':
        return this.executeWithLogic(command.type, (port) =>
          port.inspectObject(command.targetObjectId),
        );
      case 'FOCUS_OBJECT':
        return this.executeWithLogic(command.type, (port) =>
          port.focusObject(command.targetObjectId),
        );
      case 'UPDATE_PLAYER_POSITION':
        return this.executeWithLogic(command.type, (port) =>
          port.updatePlayerState(
            command.position,
            command.rotationY,
            command.isMoving,
          ),
        );
      case 'SET_PAUSED':
        return this.executeWithLogic(command.type, (port) =>
          port.setPaused(command.paused),
        );
    }
  }

  /** Subscribes to immutable GameSessionState updates. */
  subscribeToState(listener: GameStateListener): Unsubscribe {
    this.stateListeners.add(listener);
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  /** Subscribes to all domain GameEvents emitted by the logic layer. */
  subscribeToEvents(listener: GameEventListener): Unsubscribe {
    this.eventListeners.add(listener);
    return () => {
      this.eventListeners.delete(listener);
    };
  }

  /** Subscribes specifically to PuzzleCompletedEvent notifications. */
  subscribeToPuzzleCompletion(listener: PuzzleCompletionListener): Unsubscribe {
    this.puzzleCompletionListeners.add(listener);
    return () => {
      this.puzzleCompletionListeners.delete(listener);
    };
  }

  /** Subscribes to bridge errors and rejected action notifications. */
  subscribeToErrors(listener: BridgeErrorListener): Unsubscribe {
    this.errorListeners.add(listener);
    return () => {
      this.errorListeners.delete(listener);
    };
  }

  private executeWithLogic<TData = unknown>(
    commandType: BridgeCommand['type'],
    run: (engine: GameEnginePort) => LogicStepResult<TData>,
  ): BridgeCommandResponse<TData> {
    if (!this.logicEngine) {
      return this.failNotReady(commandType);
    }

    try {
      const result = run(this.logicEngine);

      if (result.rejectedReason) {
        const error: BridgeError = {
          code: 'ACTION_REJECTED',
          message: result.rejectedReason,
          commandType,
        };
        this.notifyStateListeners(result.state);
        this.notifyErrorListeners(error);
        return {
          ok: false,
          commandType,
          error,
          state: result.state,
        };
      }

      this.notifyStateListeners(result.state);
      this.notifyEventListeners(result.events, result.state);

      return {
        ok: true,
        commandType,
        state: result.state,
        emittedEvents: result.events,
        data: result.data,
      };
    } catch (err) {
      const error: BridgeError = {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred while processing the game command.',
        commandType,
        details: err instanceof Error ? err.message : String(err),
      };
      this.notifyErrorListeners(error);
      return {
        ok: false,
        commandType,
        error,
        state: this.getState(),
      };
    }
  }

  private failNotReady<TData = unknown>(
    commandType: BridgeCommand['type'],
  ): BridgeCommandResponse<TData> {
    const error: BridgeError = {
      code: 'LOGIC_PORT_UNAVAILABLE',
      message:
        'GameEnginePort is not attached to GameBridge yet. Attach Member C logic before dispatching commands.',
      commandType,
    };
    this.notifyErrorListeners(error);
    return {
      ok: false,
      commandType,
      error,
      state: null,
    };
  }

  private notifyStateListeners(state: GameSessionState): void {
    for (const listener of this.stateListeners) {
      listener(state);
    }
  }

  private notifyEventListeners(
    events: readonly GameEvent[],
    state: GameSessionState,
  ): void {
    for (const event of events) {
      for (const listener of this.eventListeners) {
        listener(event, state);
      }
      if (event.type === 'PUZZLE_COMPLETED') {
        for (const listener of this.puzzleCompletionListeners) {
          listener(event.completion, state);
        }
      }
    }
  }

  private notifyErrorListeners(error: BridgeError): void {
    for (const listener of this.errorListeners) {
      listener(error);
    }
  }
}

/** Factory helper for creating a clean GameBridge instance at app composition root. */
export function createGameBridge(): IGameBridge {
  return new GameBridge();
}
