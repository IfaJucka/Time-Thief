import { describe, expect, it } from 'vitest';
import {
  CHRONO_CORE_MAX_ENERGY,
  CHRONO_EXTRACT_COST,
  CHRONO_TRANSFER_COST,
  DARK_CHRONO_COLORS,
  MVP_LEVEL_ID,
  TIMELINE_ERA_ORDER,
  TIMELINE_SWITCH_COST,
  TIMELINE_YEARS,
} from '../../src/shared';

describe('TIME THIEF shared contracts (Phase 1 baseline)', () => {
  it('defines the three timeline eras and historical years', () => {
    expect(TIMELINE_ERA_ORDER).toEqual(['PAST', 'PRESENT', 'FUTURE']);
    expect(TIMELINE_YEARS).toEqual({
      PAST: 1920,
      PRESENT: 2026,
      FUTURE: 2126,
    });
  });

  it('defines MVP Chrono Core energy defaults and Dark Chrono palette', () => {
    expect(CHRONO_CORE_MAX_ENERGY).toBe(100);
    expect(CHRONO_EXTRACT_COST).toBe(25);
    expect(CHRONO_TRANSFER_COST).toBe(25);
    expect(TIMELINE_SWITCH_COST).toBe(0);
    expect(MVP_LEVEL_ID).toBe('broken-bridge');
    expect(DARK_CHRONO_COLORS.MAIN_BACKGROUND).toBe('#10131C');
    expect(DARK_CHRONO_COLORS.CHRONO_CYAN).toBe('#42D9D0');
  });
});
