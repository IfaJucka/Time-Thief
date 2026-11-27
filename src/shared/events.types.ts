/**
 * Discriminated union event contracts for GameBridge, EventHistory, UI, and 3D VFX/SFX.
 */

import type { ChronoActionType, TimeEssenceType } from './chrono.types';
import type { LevelCompletionInfo } from './puzzle.types';
import type { TimelineEra, TimelineTransition } from './timeline.types';
import type { EraObjectState, WorldObjectId } from './world.types';

/** Common metadata attached to every domain event. */
export interface GameEventMetadata {
  id: string;
  sequence: number;
  timestampMs: number;
}

/** Emitted when the player switches between Past (1920), Present (2026), and Future (2126). */
export interface TimelineChangedEvent {
  type: 'TIMELINE_CHANGED';
  metadata: GameEventMetadata;
  transition: TimelineTransition;
}

/** Emitted when the player performs an Extract or Transfer action with the Chrono Core. */
export interface ChronoActionEvent {
  type: 'CHRONO_ACTION';
  metadata: GameEventMetadata;
  action: ChronoActionType;
  era: TimelineEra;
  targetObjectId: WorldObjectId;
  essence: TimeEssenceType;
  energySpent: number;
  remainingEnergy: number;
  summary: string;
}

/** Emitted when a world object transitions state in a given era (directly or via causality). */
export interface ObjectStateChangedEvent {
  type: 'OBJECT_STATE_CHANGED';
  metadata: GameEventMetadata;
  objectId: WorldObjectId;
  era: TimelineEra;
  previousStateKey: string;
  nextState: EraObjectState;
  causedByAction: boolean;
}

/** Emitted when the level puzzle is solved and the Timeline Impact Report is ready. */
export interface PuzzleCompletedEvent {
  type: 'PUZZLE_COMPLETED';
  metadata: GameEventMetadata;
  completion: LevelCompletionInfo;
}

/** Discriminated union of all core gameplay events. */
export type GameEvent =
  | TimelineChangedEvent
  | ChronoActionEvent
  | ObjectStateChangedEvent
  | PuzzleCompletedEvent;
