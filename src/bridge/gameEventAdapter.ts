/**
 * Event delivery adapters routing domain events and state updates from GameBridge
 * to the React UI (HUD), the 3D world (visual & collider updates), and auxiliary systems.
 */

import type {
  ChronoActionEvent,
  GameEvent,
  GameSessionState,
  ObjectStateChangedEvent,
  PuzzleCompletedEvent,
  TimelineChangedEvent,
} from '../shared';
import type { BridgeError, IGameBridge, Unsubscribe } from './bridge.types';

/** Handlers implemented by React UI / HUD layers to react to state and events. */
export interface UIHudEventSink {
  onStateUpdated?: (state: GameSessionState) => void;
  onTimelineChanged?: (event: TimelineChangedEvent, state: GameSessionState) => void;
  onChronoAction?: (event: ChronoActionEvent, state: GameSessionState) => void;
  onPuzzleCompleted?: (event: PuzzleCompletedEvent, state: GameSessionState) => void;
  onError?: (error: BridgeError) => void;
}

/** Handlers implemented by the 3D world (src/game3d/ — Member B) for visual & collider updates. */
export interface World3DEventSink {
  onStateSync?: (state: GameSessionState) => void;
  onTimelineChanged?: (event: TimelineChangedEvent, state: GameSessionState) => void;
  onObjectStateChanged?: (
    event: ObjectStateChangedEvent,
    state: GameSessionState,
  ) => void;
  onChronoAction?: (event: ChronoActionEvent, state: GameSessionState) => void;
  onPuzzleCompleted?: (event: PuzzleCompletedEvent, state: GameSessionState) => void;
}

/** Generic sink for other game systems (e.g., audio SFX, telemetry, or post-MVP cloud sync). */
export interface GameSystemEventSink {
  onEvent?: (event: GameEvent, state: GameSessionState) => void;
  onError?: (error: BridgeError) => void;
}

interface DomainEventHandlers {
  onTimelineChanged?: (event: TimelineChangedEvent, state: GameSessionState) => void;
  onObjectStateChanged?: (
    event: ObjectStateChangedEvent,
    state: GameSessionState,
  ) => void;
  onChronoAction?: (event: ChronoActionEvent, state: GameSessionState) => void;
  onPuzzleCompleted?: (event: PuzzleCompletedEvent, state: GameSessionState) => void;
}

function dispatchDomainEvent(
  handlers: DomainEventHandlers,
  event: GameEvent,
  state: GameSessionState,
): void {
  switch (event.type) {
    case 'TIMELINE_CHANGED':
      handlers.onTimelineChanged?.(event, state);
      break;
    case 'OBJECT_STATE_CHANGED':
      handlers.onObjectStateChanged?.(event, state);
      break;
    case 'CHRONO_ACTION':
      handlers.onChronoAction?.(event, state);
      break;
    case 'PUZZLE_COMPLETED':
      handlers.onPuzzleCompleted?.(event, state);
      break;
  }
}

/** Connects a React UI / HUD sink to GameBridge and returns a single cleanup Unsubscribe. */
export function bindUIEventSink(
  bridge: IGameBridge,
  sink: UIHudEventSink,
): Unsubscribe {
  const unsubs: Unsubscribe[] = [];

  if (sink.onStateUpdated) {
    unsubs.push(bridge.subscribeToState(sink.onStateUpdated));
  }
  unsubs.push(
    bridge.subscribeToEvents((event, state) => {
      dispatchDomainEvent(sink, event, state);
    }),
  );
  if (sink.onError) {
    unsubs.push(bridge.subscribeToErrors(sink.onError));
  }

  return () => {
    for (const unsub of unsubs) {
      unsub();
    }
  };
}

/** Connects Member B's 3D scene sink to GameBridge for era and object visual updates. */
export function bindWorld3DEventSink(
  bridge: IGameBridge,
  sink: World3DEventSink,
): Unsubscribe {
  const unsubs: Unsubscribe[] = [];

  if (sink.onStateSync) {
    unsubs.push(bridge.subscribeToState(sink.onStateSync));
  }
  unsubs.push(
    bridge.subscribeToEvents((event, state) => {
      dispatchDomainEvent(sink, event, state);
    }),
  );

  return () => {
    for (const unsub of unsubs) {
      unsub();
    }
  };
}

/** Connects an auxiliary system (e.g., audio or post-MVP telemetry) to GameBridge. */
export function bindGameSystemSink(
  bridge: IGameBridge,
  sink: GameSystemEventSink,
): Unsubscribe {
  const unsubs: Unsubscribe[] = [];

  if (sink.onEvent) {
    unsubs.push(bridge.subscribeToEvents(sink.onEvent));
  }
  if (sink.onError) {
    unsubs.push(bridge.subscribeToErrors(sink.onError));
  }

  return () => {
    for (const unsub of unsubs) {
      unsub();
    }
  };
}
