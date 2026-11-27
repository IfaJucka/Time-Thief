/**
 * Shared 3D world layout, landmark, and timeline-dependent object state contracts.
 * Coordinates and object identities remain consistent across Past, Present, and Future.
 */

import type { TimeEssenceType } from './chrono.types';
import type { TimelineEra } from './timeline.types';

/** Plain 3D coordinate vector without Three.js dependencies. */
export interface WorldPosition {
  x: number;
  y: number;
  z: number;
}

/** Unique identifier for any interactive or environmental object in a level. */
export type WorldObjectId = string;

/** Well-known object IDs for the MVP Broken Bridge level. */
export type BrokenBridgeObjectId =
  | 'mature-tree'
  | 'seed-plot'
  | 'river-bridge'
  | 'chrono-anchor';

/** High-level classification of 3D world objects. */
export type WorldObjectType =
  | 'TREE'
  | 'SEED'
  | 'BRIDGE'
  | 'CHRONO_ANCHOR'
  | 'RIVER'
  | 'LANDMARK';

/** Growth lifecycle states for trees and seeds across timelines. */
export type TreeGrowthState =
  | 'DORMANT_SEED'
  | 'INFUSED_SPROUT'
  | 'YOUNG_TREE'
  | 'MATURE_TREE'
  | 'DEPLETED_TREE'
  | 'GIANT_TREE_ROOT_BRIDGE';

/** Structural states of the river crossing across timelines. */
export type BridgeState =
  | 'BROKEN_WOODEN'
  | 'PARTIALLY_DAMAGED'
  | 'RUINED_CROSSING'
  | 'TRAVERSABLE_ROOTS';

/** Activation state of the level exit Chrono Anchor. */
export type ChronoAnchorState = 'DORMANT' | 'ACTIVE';

/** State of a single WorldObject within one specific timeline era. */
export interface EraObjectState {
  era: TimelineEra;
  stateKey: string;
  description: string;
  isVisible: boolean;
  isSolid: boolean;
  isWalkable: boolean;
  canExtractTime: boolean;
  canReceiveTime: boolean;
  extractableEssence: TimeEssenceType | null;
  acceptedEssence: TimeEssenceType | null;
  treeGrowthState?: TreeGrowthState;
  bridgeState?: BridgeState;
  anchorState?: ChronoAnchorState;
}

/** Object state information mapped across Past (1920), Present (2026), and Future (2126). */
export type TimelineObjectStates = Record<TimelineEra, EraObjectState>;

/** Represents a persistent 3D entity whose identity spans all three timelines. */
export interface WorldObject {
  id: WorldObjectId;
  name: string;
  type: WorldObjectType;
  position: WorldPosition;
  interactionRadius: number;
  statesByEra: TimelineObjectStates;
}

/** Fixed geographical landmark shared across Past, Present, and Future. */
export interface WorldLandmark {
  id: string;
  label: string;
  position: WorldPosition;
  description: string;
}

/** Reusable 3D geographical layout shared across all three timelines of a level. */
export interface WorldLayout {
  levelId: string;
  playerSpawn: WorldPosition;
  safeWestBankAnchor: WorldPosition;
  safeEastBankAnchor: WorldPosition;
  riverCenterX: number;
  riverWidth: number;
  landmarks: readonly WorldLandmark[];
}
