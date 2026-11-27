/**
 * Top-level game session, player, level, and progress contracts.
 */

import type { ChronoActionRequest, ChronoActionResult, ChronoCoreState } from './chrono.types';
import type { GameEvent } from './events.types';
import type { LevelCompletionInfo, PuzzleState } from './puzzle.types';
import type { TimelineEra, TimelineState } from './timeline.types';
import type { WorldLayout, WorldObject, WorldObjectId, WorldPosition } from './world.types';

/** High-level UI / session screen states. */
export type GameScreen =
  | 'MENU'
  | 'CHARACTER_SELECT'
  | 'PLAYING'
  | 'PAUSED'
  | 'COMPLETED';

/** Playable & showcase character identifiers. */
export type CharacterId =
  | 'arin-vale'
  | 'mira-sol'
  | 'kael-voss'
  | 'nyra-quinn';

/** Metadata used by Character Selection UI and 3D character appearance. */
export interface CharacterProfile {
  id: CharacterId;
  name: string;
  title: string;
  description: string;
  accentColor: string;
  playableInMvp: boolean;
}

/** Current 3D spatial and interaction state of the player character. */
export interface PlayerState {
  characterId: CharacterId;
  position: WorldPosition;
  rotationY: number;
  isMoving: boolean;
  nearbyObjectId: WorldObjectId | null;
  inspectedObjectId: WorldObjectId | null;
}

/** Complete state of the currently loaded level. */
export interface LevelState {
  levelId: string;
  title: string;
  layout: WorldLayout;
  objects: Record<WorldObjectId, WorldObject>;
  puzzle: PuzzleState;
}

/** Tracks overall player progress within the current session. */
export interface GameProgress {
  completedLevelIds: readonly string[];
  startedAtMs: number;
  elapsedMs: number;
  totalActionsTaken: number;
}

/**
 * Immutable snapshot of the full TIME THIEF session.
 * Produced by pure logic (src/logic/) and consumed via src/bridge/ by React UI and 3D views.
 */
export interface GameSessionState {
  screen: GameScreen;
  timeline: TimelineState;
  chronoCore: ChronoCoreState;
  player: PlayerState;
  level: LevelState;
  progress: GameProgress;
  eventHistory: readonly GameEvent[];
  completionInfo: LevelCompletionInfo | null;
}

/** Result returned by the pure game logic engine after processing an action. */
export interface LogicStepResult<TData = unknown> {
  state: GameSessionState;
  events: readonly GameEvent[];
  data?: TData;
  rejectedReason?: string;
}

/**
 * Pure domain engine contract implemented by src/logic/ (Member C).
 * Depends solely on src/shared/ types so src/logic/ never imports src/bridge/.
 */
export interface GameEnginePort {
  getState(): GameSessionState;
  startLevel(levelId: string, characterId?: CharacterId): LogicStepResult;
  restartLevel(): LogicStepResult;
  switchTimeline(targetEra: TimelineEra): LogicStepResult;
  executeChronoAction(
    request: ChronoActionRequest,
  ): LogicStepResult<ChronoActionResult>;
  inspectObject(targetObjectId: WorldObjectId | null): LogicStepResult;
  focusObject(targetObjectId: WorldObjectId | null): LogicStepResult;
  updatePlayerState(
    position: WorldPosition,
    rotationY: number,
    isMoving: boolean,
  ): LogicStepResult;
  setPaused(paused: boolean): LogicStepResult;
}
