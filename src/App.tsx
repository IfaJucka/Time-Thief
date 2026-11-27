import { GameCanvas } from './game3d';
import { PreviewOverlay } from './ui';

/**
 * Thin application composition shell.
 * Keeps React UI overlays (src/ui/) separate from the 3D Canvas (src/game3d/).
 */
export function App() {
  return (
    <main className="app-viewport">
      <GameCanvas />
      <PreviewOverlay />
    </main>
  );
}

export default App;
