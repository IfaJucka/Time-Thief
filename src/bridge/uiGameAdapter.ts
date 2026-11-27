/**
 * UI-facing adapter defining how React components (src/ui/ — Member A)
 * send user actions into the game system without importing 3D or logic modules.
 */

import { MVP_LEVEL_ID } from '../shared';
import type {
  CharacterId,
  ChronoActionResult,
  GameSessionState,
  TimelineEra,
  WorldObjectId,
} from '../shared';
import type {
  BridgeCommandResponse,
  BridgeErrorListener,
  GameStateListener,
  IGameBridge,
  PuzzleCompletionListener,
  Unsubscribe,
} from './bridge.types';

/** Contract used by React UI screens, HUD, and modals to drive gameplay. */
export interface UIGameAdapter {
  startLevel(levelId?: string, characterId?: CharacterId): BridgeCommandResponse;
  restartLevel(): BridgeCommandResponse;
  selectTimeline(targetEra: TimelineEra): BridgeCommandResponse;
  extractTime(
    targetObjectId: WorldObjectId,
    era?: TimelineEra,
  ): BridgeCommandResponse<ChronoActionResult>;
  transferTime(
    targetObjectId: WorldObjectId,
    era?: TimelineEra,
  ): BridgeCommandResponse<ChronoActionResult>;
  inspectObject(targetObjectId: WorldObjectId | null): BridgeCommandResponse;
  setPaused(paused: boolean): BridgeCommandResponse;
  getSessionState(): GameSessionState | null;
  subscribeToState(listener: GameStateListener): Unsubscribe;
  subscribeToPuzzleCompletion(listener: PuzzleCompletionListener): Unsubscribe;
  subscribeToErrors(listener: BridgeErrorListener): Unsubscribe;
}

/**
 * Creates a typed UIGameAdapter bound to the shared GameBridge instance.
 * React components should interact through this adapter rather than calling logic directly.
 */
export function createUIGameAdapter(bridge: IGameBridge): UIGameAdapter {
  return {
    startLevel(levelId = MVP_LEVEL_ID, characterId) {
      return bridge.startLevel(levelId, characterId);
    },

    restartLevel() {
      return bridge.restartLevel();
    },

    selectTimeline(targetEra) {
      return bridge.requestTimelineChange(targetEra);
    },

    extractTime(targetObjectId, era) {
      const targetEra = era ?? bridge.getState()?.timeline.activeEra;
      if (!targetEra) {
        return bridge.dispatchCommand({
          type: 'EXTRACT_TIME',
          targetObjectId,
        }) as BridgeCommandResponse<ChronoActionResult>;
      }
      return bridge.requestChronoAction({
        action: 'EXTRACT_TIME',
        targetObjectId,
        era: targetEra,
      });
    },

    transferTime(targetObjectId, era) {
      const targetEra = era ?? bridge.getState()?.timeline.activeEra;
      if (!targetEra) {
        return bridge.dispatchCommand({
          type: 'TRANSFER_TIME',
          targetObjectId,
        }) as BridgeCommandResponse<ChronoActionResult>;
      }
      return bridge.requestChronoAction({
        action: 'TRANSFER_TIME',
        targetObjectId,
        era: targetEra,
      });
    },

    inspectObject(targetObjectId) {
      return bridge.dispatchCommand({
        type: 'INSPECT_OBJECT',
        targetObjectId,
      });
    },

    setPaused(paused) {
      return bridge.dispatchCommand({
        type: 'SET_PAUSED',
        paused,
      });
    },

    getSessionState() {
      return bridge.getState();
    },

    subscribeToState(listener) {
      return bridge.subscribeToState(listener);
    },

    subscribeToPuzzleCompletion(listener) {
      return bridge.subscribeToPuzzleCompletion(listener);
    },

    subscribeToErrors(listener) {
      return bridge.subscribeToErrors(listener);
    },
  };
}
