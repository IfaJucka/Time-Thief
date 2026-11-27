/**
 * Centralized configuration constants for TIME THIEF.
 * Shared across UI (Member A), 3D World (Member B), and Pure Logic (Member C).
 */

/** Canonical timeline era identifiers. */
export const TIMELINE_ERAS = {
  PAST: 'PAST',
  PRESENT: 'PRESENT',
  FUTURE: 'FUTURE',
} as const;

/** Ordered list of all playable timeline eras. */
export const TIMELINE_ERA_ORDER = ['PAST', 'PRESENT', 'FUTURE'] as const;

/** Historical year mapped to each timeline era. */
export const TIMELINE_YEARS = {
  PAST: 1920,
  PRESENT: 2026,
  FUTURE: 2126,
} as const;

/** Default starting timeline era for the MVP level. */
export const DEFAULT_TIMELINE_ERA = TIMELINE_ERAS.PAST;

/** Chrono Core MVP energy defaults. */
export const CHRONO_CORE_MAX_ENERGY = 100;
export const CHRONO_EXTRACT_COST = 25;
export const CHRONO_TRANSFER_COST = 25;
export const TIMELINE_SWITCH_COST = 0;

/** Maximum number of time charges the Chrono Core can hold simultaneously in MVP. */
export const CHRONO_MAX_HELD_CHARGES = 1;

/** MVP level and default protagonist identifiers. */
export const MVP_LEVEL_ID = 'broken-bridge' as const;
export const DEFAULT_CHARACTER_ID = 'arin-vale' as const;

/** Default interaction proximity radius in 3D world units. */
export const DEFAULT_INTERACTION_RADIUS = 3;

/** DARK CHRONO visual design tokens shared between React UI and 3D lighting/materials. */
export const DARK_CHRONO_COLORS = {
  MAIN_BACKGROUND: '#10131C',
  SECONDARY_BACKGROUND: '#171E32',
  ANTIQUE_GOLD: '#D6A84F',
  CHRONO_CYAN: '#42D9D0',
  MOON_SILVER: '#C5CEDB',
  MYSTIC_PURPLE: '#8B70C9',
  TIMELINE_ACCENTS: {
    PAST: '#C9954B',
    PRESENT: '#42BFC2',
    FUTURE: '#9169DC',
  },
} as const;
