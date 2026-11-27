/**
 * Chrono Core contracts for MVP time manipulation (Extract & Transfer).
 * Note: Freeze, Accelerate, and Restore are intentionally excluded as post-MVP features.
 */

import type { TimelineEra } from './timeline.types';

/** Categories of transferable temporal essence. */
export type TimeEssenceType = 'GROWTH_TIME';

/** Active MVP Chrono Core manipulation actions. */
export type ChronoActionType = 'EXTRACT_TIME' | 'TRANSFER_TIME';

/** Current and maximum Chrono Energy bounds. */
export interface ChronoEnergyState {
  current: number;
  max: number;
}

/** A single unit of time currently stored inside the Chrono Core. */
export interface TimeCharge {
  essence: TimeEssenceType;
  sourceObjectId: string;
  extractedFromEra: TimelineEra;
  extractedAtMs: number;
}

/** Runtime state of the player's Chrono Core device. */
export interface ChronoCoreState {
  currentEnergy: number;
  maxEnergy: number;
  heldCharge: TimeCharge | null;
  maxHeldCharges: number;
}

/** Request payload to extract time from an eligible world object. */
export interface ExtractTimeRequest {
  action: 'EXTRACT_TIME';
  targetObjectId: string;
  era: TimelineEra;
}

/** Request payload to transfer stored time into an eligible world object. */
export interface TransferTimeRequest {
  action: 'TRANSFER_TIME';
  targetObjectId: string;
  era: TimelineEra;
}

/** Union of all MVP Chrono Core action requests. */
export type ChronoActionRequest = ExtractTimeRequest | TransferTimeRequest;

/** Standardized failure codes when a Chrono Core action cannot be performed. */
export type ChronoActionFailureReason =
  | 'INSUFFICIENT_ENERGY'
  | 'CHARGE_SLOT_FULL'
  | 'NO_HELD_CHARGE'
  | 'OBJECT_NOT_FOUND'
  | 'OBJECT_NOT_ELIGIBLE'
  | 'INCOMPATIBLE_ESSENCE'
  | 'WRONG_TIMELINE';

/** Result returned when a Chrono Core action succeeds. */
export interface ChronoActionSuccess {
  success: true;
  action: ChronoActionType;
  targetObjectId: string;
  era: TimelineEra;
  energySpent: number;
  remainingEnergy: number;
  transferredEssence: TimeEssenceType;
  message: string;
}

/** Result returned when a Chrono Core action is rejected by game rules. */
export interface ChronoActionFailure {
  success: false;
  action: ChronoActionType;
  targetObjectId: string;
  era: TimelineEra;
  reason: ChronoActionFailureReason;
  message: string;
}

/** Discriminated union representing the outcome of any Chrono Core action. */
export type ChronoActionResult = ChronoActionSuccess | ChronoActionFailure;
