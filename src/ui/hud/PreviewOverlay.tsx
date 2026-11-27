import {
  DARK_CHRONO_COLORS,
  TIMELINE_ERA_ORDER,
  TIMELINE_YEARS,
} from '../../shared';

/**
 * Minimal Phase 1 Dark Chrono overlay confirming React UI renders cleanly
 * above the 3D Canvas without importing Three.js or gameplay logic.
 */
export function PreviewOverlay() {
  return (
    <div className="ui-overlay-shell" aria-label="TIME THIEF preview overlay">
      <header className="ui-banner">
        <h1 className="ui-banner-title">TIME THIEF</h1>
        <p className="ui-banner-subtitle">
          Steal time. Change history. Rewrite the future. — Drag to orbit camera
        </p>
      </header>

      <footer className="ui-era-pills">
        {TIMELINE_ERA_ORDER.map((era) => (
          <span
            key={era}
            className="ui-era-pill"
            style={{ borderColor: DARK_CHRONO_COLORS.TIMELINE_ACCENTS[era] }}
          >
            {era} · {TIMELINE_YEARS[era]}
          </span>
        ))}
      </footer>
    </div>
  );
}
