/**
 * Puzzle progression, validation, and level completion / impact report contracts.
 */

import type { TimelineEra, TimelineYear } from './timeline.types';
import type { WorldObjectId } from './world.types';

/** Overall lifecycle status of a level puzzle. */
export type PuzzleStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SOLVED' | 'FAILED';

/** Individual milestone within a level's puzzle chain (e.g., Broken Bridge). */
export interface PuzzleObjective {
  id: string;
  description: string;
  targetEra: TimelineEra;
  targetObjectId: WorldObjectId;
  completed: boolean;
}

/** Runtime state of the active puzzle and its objectives. */
export interface PuzzleState {
  puzzleId: string;
  levelId: string;
  status: PuzzleStatus;
  objectives: readonly PuzzleObjective[];
  futureRouteReady: boolean;
  solvedAtMs: number | null;
}

/** Result produced by PuzzleValidator when checking level completion. */
export interface PuzzleValidationResult {
  isSolved: boolean;
  status: PuzzleStatus;
  completedObjectiveIds: readonly string[];
  missingRequirements: readonly string[];
  summaryMessage: string;
}

/** Single-era causal summary entry for the Timeline Impact Report. */
export interface TimelineImpactEntry {
  era: TimelineEra;
  year: TimelineYear;
  headline: string;
  beforeState: string;
  afterState: string;
}

/** Complete summary generated when a level puzzle is solved. */
export interface LevelCompletionInfo {
  levelId: string;
  levelTitle: string;
  completedAtMs: number;
  elapsedMs: number;
  energyUsed: number;
  energyRemaining: number;
  timelineSwitches: number;
  totalActions: number;
  impactEntries: readonly TimelineImpactEntry[];
}
