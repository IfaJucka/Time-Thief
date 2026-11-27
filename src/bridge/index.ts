/**
 * Public barrel export for the TIME THIEF integration bridge (src/bridge/).
 */

export { GameBridge, createGameBridge } from './gameBridge';
export { createUIGameAdapter } from './uiGameAdapter';
export {
  bindGameSystemSink,
  bindUIEventSink,
  bindWorld3DEventSink,
} from './gameEventAdapter';

export type { UIGameAdapter } from './uiGameAdapter';
export type {
  GameSystemEventSink,
  UIHudEventSink,
  World3DEventSink,
} from './gameEventAdapter';

export type {
  BridgeCommand,
  BridgeCommandResponse,
  BridgeError,
  BridgeErrorCode,
  BridgeErrorListener,
  BridgeEvent,
  BridgeFailureResponse,
  BridgeSuccessResponse,
  ExtractTimeCommand,
  FocusObjectCommand,
  GameEventListener,
  GameStateListener,
  IGameBridge,
  InspectObjectCommand,
  PuzzleCompletionListener,
  RestartLevelCommand,
  SetPausedCommand,
  StartLevelCommand,
  SwitchTimelineCommand,
  TransferTimeCommand,
  Unsubscribe,
  UpdatePlayerPositionCommand,
} from './bridge.types';
