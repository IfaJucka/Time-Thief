/**
 * Bridge communication contracts connecting React UI (src/ui/),
 * 3D World (src/game3d/), and Pure Game Logic (src/logic/).
 *
 * Reuses src/shared/ types exclusively — never duplicate shared definitions here.
 */

import type {
  CharacterId,
  ChronoActionRequest,
  ChronoActionResult,
  GameEnginePort,
  GameEvent,
  GameSessionState,
  LevelCompletionInfo,
  TimelineEra,
  WorldObjectId,
  WorldPosition,
} from '../shared';

/** Unsubscribe callback returned when registering any bridge listener. */
export type Unsubscribe = () => void;

/** Request sent from UI or 3D world to start a level. */
export interface StartLevelCommand {
  type: 'START_LEVEL';
  levelId: string;
  characterId?: CharacterId;
}

/** Request to reset the active level back to its initial state. */
export interface RestartLevelCommand {
  type: 'RESTART_LEVEL';
}

/** Request to switch between Past (1920), Present (2026), and Future (2126). */
export interface SwitchTimelineCommand {
  type: 'SWITCH_TIMELINE';
  targetEra: TimelineEra;
}

/** Request to extract time from an eligible world object. */
export interface ExtractTimeCommand {
  type: 'EXTRACT_TIME';
  targetObjectId: WorldObjectId;
  era?: TimelineEra;
}

/** Request to transfer held time into an eligible world object. */
export interface TransferTimeCommand {
  type: 'TRANSFER_TIME';
  targetObjectId: WorldObjectId;
  era?: TimelineEra;
}

/** Request to inspect an object (opens/updates clue panel) or clear inspection. */
export interface InspectObjectCommand {
  type: 'INSPECT_OBJECT';
  targetObjectId: WorldObjectId | null;
}

/** Notification from 3D InteractionSystem when player enters/exits proximity of an object. */
export interface FocusObjectCommand {
  type: 'FOCUS_OBJECT';
  targetObjectId: WorldObjectId | null;
}

/** Notification from 3D PlayerController updating logical player transform and movement state. */
export interface UpdatePlayerPositionCommand {
  type: 'UPDATE_PLAYER_POSITION';
  position: WorldPosition;
  rotationY: number;
  isMoving: boolean;
}

/** Request to pause or resume the current gameplay session. */
export interface SetPausedCommand {
  type: 'SET_PAUSED';
  paused: boolean;
}

/** Discriminated union of all commands accepted by GameBridge. */
export type BridgeCommand =
  | StartLevelCommand
  | RestartLevelCommand
  | SwitchTimelineCommand
  | ExtractTimeCommand
  | TransferTimeCommand
  | InspectObjectCommand
  | FocusObjectCommand
  | UpdatePlayerPositionCommand
  | SetPausedCommand;

/** Standardized bridge error codes. */
export type BridgeErrorCode =
  | 'LOGIC_PORT_UNAVAILABLE'
  | 'INVALID_COMMAND'
  | 'ACTION_REJECTED'
  | 'UNEXPECTED_ERROR';

/** Structured error payload emitted or returned by the bridge. */
export interface BridgeError {
  code: BridgeErrorCode;
  message: string;
  commandType?: BridgeCommand['type'];
  details?: string;
}

/** Successful command response returned synchronously to callers. */
export interface BridgeSuccessResponse<TData = unknown> {
  ok: true;
  commandType: BridgeCommand['type'];
  state: GameSessionState;
  emittedEvents: readonly GameEvent[];
  data?: TData;
}

/** Failed command response returned when a command cannot be executed. */
export interface BridgeFailureResponse {
  ok: false;
  commandType: BridgeCommand['type'];
  error: BridgeError;
  state: GameSessionState | null;
}

/** Discriminated union response returned by bridge command methods. */
export type BridgeCommandResponse<TData = unknown> =
  | BridgeSuccessResponse<TData>
  | BridgeFailureResponse;

/** Discriminated union of bridge-level notifications. */
export type BridgeEvent =
  | {
      kind: 'STATE_UPDATED';
      state: GameSessionState;
    }
  | {
      kind: 'DOMAIN_EVENT';
      event: GameEvent;
      state: GameSessionState;
    }
  | {
      kind: 'BRIDGE_ERROR';
      error: BridgeError;
    };

/** Listener callbacks for bridge consumers. */
export type GameStateListener = (state: GameSessionState) => void;
export type GameEventListener = (event: GameEvent, state: GameSessionState) => void;
export type PuzzleCompletionListener = (
  completion: LevelCompletionInfo,
  state: GameSessionState,
) => void;
export type BridgeErrorListener = (error: BridgeError) => void;

/**
 * Central integration contract implemented by GameBridge.
 * Adapters in src/bridge/ depend only on this interface, while pure logic
 * implements GameEnginePort from src/shared/ without importing src/bridge/.
 */
export interface IGameBridge {
  attachLogic(logicEngine: GameEnginePort): void;
  isReady(): boolean;
  getState(): GameSessionState | null;
  startLevel(levelId?: string, characterId?: CharacterId): BridgeCommandResponse;
  restartLevel(): BridgeCommandResponse;
  requestTimelineChange(targetEra: TimelineEra): BridgeCommandResponse;
  requestChronoAction(
    request: ChronoActionRequest,
  ): BridgeCommandResponse<ChronoActionResult>;
  dispatchCommand(command: BridgeCommand): BridgeCommandResponse;
  subscribeToState(listener: GameStateListener): Unsubscribe;
  subscribeToEvents(listener: GameEventListener): Unsubscribe;
  subscribeToPuzzleCompletion(listener: PuzzleCompletionListener): Unsubscribe;
  subscribeToErrors(listener: BridgeErrorListener): Unsubscribe;
}
