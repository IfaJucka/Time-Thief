/**
 * Timeline contracts shared across UI, 3D rendering, and pure game logic.
 */

/** The three playable eras of TIME THIEF. */
export type TimelineEra = 'PAST' | 'PRESENT' | 'FUTURE';

/** Historical calendar year corresponding to each TimelineEra. */
export type TimelineYear = 1920 | 2026 | 2126;

/** Descriptive metadata for displaying and styling a timeline era. */
export interface TimelineEraInfo {
  era: TimelineEra;
  year: TimelineYear;
  label: string;
  accentColor: string;
}

/** Identifies the currently active era and its display year. */
export interface ActiveTimeline {
  era: TimelineEra;
  year: TimelineYear;
}

/** Describes a transition from one timeline era to another. */
export interface TimelineTransition {
  fromEra: TimelineEra;
  toEra: TimelineEra;
  fromYear: TimelineYear;
  toYear: TimelineYear;
  energyCost: number;
  timestampMs: number;
}

/** Runtime state of timeline selection and transition history. */
export interface TimelineState {
  activeEra: TimelineEra;
  activeYear: TimelineYear;
  unlockedEras: readonly TimelineEra[];
  switchCount: number;
  lastTransition: TimelineTransition | null;
}
