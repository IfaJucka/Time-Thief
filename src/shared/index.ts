/**
 * Public barrel export for all shared TIME THIEF types and constants.
 * Import from '../shared' or '@/shared' rather than duplicating definitions.
 */

export {
  CHRONO_CORE_MAX_ENERGY,
  CHRONO_EXTRACT_COST,
  CHRONO_MAX_HELD_CHARGES,
  CHRONO_TRANSFER_COST,
  DARK_CHRONO_COLORS,
  DEFAULT_CHARACTER_ID,
  DEFAULT_INTERACTION_RADIUS,
  DEFAULT_TIMELINE_ERA,
  MVP_LEVEL_ID,
  TIMELINE_ERAS,
  TIMELINE_ERA_ORDER,
  TIMELINE_SWITCH_COST,
  TIMELINE_YEARS,
} from './constants';

export type {
  ActiveTimeline,
  TimelineEra,
  TimelineEraInfo,
  TimelineState,
  TimelineTransition,
  TimelineYear,
} from './timeline.types';

export type {
  ChronoActionFailure,
  ChronoActionFailureReason,
  ChronoActionRequest,
  ChronoActionResult,
  ChronoActionSuccess,
  ChronoActionType,
  ChronoCoreState,
  ChronoEnergyState,
  ExtractTimeRequest,
  TimeCharge,
  TimeEssenceType,
  TransferTimeRequest,
} from './chrono.types';

export type {
  BridgeState,
  BrokenBridgeObjectId,
  ChronoAnchorState,
  EraObjectState,
  TimelineObjectStates,
  TreeGrowthState,
  WorldLandmark,
  WorldLayout,
  WorldObject,
  WorldObjectId,
  WorldObjectType,
  WorldPosition,
} from './world.types';

export type {
  LevelCompletionInfo,
  PuzzleObjective,
  PuzzleState,
  PuzzleStatus,
  PuzzleValidationResult,
  TimelineImpactEntry,
} from './puzzle.types';

export type {
  ChronoActionEvent,
  GameEvent,
  GameEventMetadata,
  ObjectStateChangedEvent,
  PuzzleCompletedEvent,
  TimelineChangedEvent,
} from './events.types';

export type {
  CharacterId,
  CharacterProfile,
  GameEnginePort,
  GameProgress,
  GameScreen,
  GameSessionState,
  LevelState,
  LogicStepResult,
  PlayerState,
} from './game.types';
