# Development Roadmap & Task Plan — TIME THIEF

**Status:** Pre-Implementation Planning Complete *(Documentation is **IMPLEMENTED**; all code tasks below are **PLANNED** or **FUTURE**.)*

---

## 1. Team Responsibility Matrix

| Member | Focus Area | Owned Paths | Independent After Phase 1? |
|---|---|---|---|
| **Project Leader** | Initial project setup, shared types & architecture, GameBridge, Game/UI integration, GitHub branch management & code reviews, final testing & deployment | `package.json`, `src/shared/`, `src/bridge/`, `docs/` | Leads Phase 1 & Phase 3 integration |
| **Member A** | **React UI:** Main menu, character selection, HUD, timeline selector, Chrono Energy display, interaction & clue panels, settings/pause menu, Impact Report UI | `src/ui/` | **Yes** — builds against mock `GameBridge` snapshots |
| **Member B** | **3D Game:** React Three Fiber scene, player model & `PlayerController`, `ThirdPersonCamera`, `EnvironmentManager` (3 timeline worlds), collisions & `InteractionSystem`, basic character animations | `src/game3d/`, `public/assets/` | **Yes** — builds 3D scene & controls against `src/shared/` contracts |
| **Member C** | **Game Logic (MVP) & Backend (Phase 5):** Pure TS `TimelineManager`, `ChronoCoreSystem`, `ObjectStateEngine`, `PuzzleValidator`, `EventHistory`, `ImpactReportGenerator`, Vitest unit tests *(Post-MVP: Supabase)* | `src/logic/`, `tests/logic/` *(Phase 5: `src/services/`)* | **Yes** — 100% pure TypeScript + Vitest, zero backend required for MVP |

---

## 2. Dependency Map (Parallel vs. Dependent Work)

```text
[Phase 1: Foundation (Project Leader)]
  Vite + React + TS + Three.js/R3F + Compatibility Verification
  + src/shared/ contracts + src/bridge/GameBridge + Basic 3D Canvas Test Scene
         │
         ├──────────────────────────┬──────────────────────────┐
         ▼                          ▼                          ▼
[Phase 2A: Member A]       [Phase 2B: Member B]       [Phase 2C: Member C]
 src/ui/ (React UI)         src/game3d/ (R3F 3D)       src/logic/ + tests/logic/
 (Uses mock snapshots)      (Uses placeholder meshes)  (100% Pure TypeScript)
         │                          │                          │
         └──────────────────────────┴──────────────────────────┘
                                    │
                                    ▼
[Phase 3: Integration (Project Leader + All)]
  Wire UI + 3D World + Pure Logic → Broken Bridge Transforms & Puzzle Validation
                                    │
                                    ▼
[Phase 4: MVP Polish (All + Project Leader)]
  Animations, VFX/SFX, Camera Refinement, Responsive UI, Optimization, QA & Vercel
                                    │
                                    ▼
[Phase 5: Optional Future Features (FUTURE — Post-MVP)]
  Supabase Auth/Saves/Leaderboards, Daily Challenges, Worlds 2–5, Freeze/Accel/Reverse
```

### Key Collaboration Principles
- **Phase 1 is the single blocking prerequisite** before Members A, B, and C branch out in parallel.
- **Pure Logic vs. Backend:** Member C's **Phase 2** pure logic (`src/logic/`) is **core MVP**; Member C's **Supabase** backend work belongs strictly to **Phase 5 (`FUTURE`)** and must never delay the single-player MVP.
- **Asset Non-Blocking:** Member B uses low-poly geometric placeholder meshes first so gameplay and collisions are testable immediately without waiting for custom `.glb` models.

---

## 3. Phase 1 – Foundation *(PLANNED — Priority P0)*

| ID | Task | Owner | Priority | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|
| `T1.1` | Verify npm peer-dependency compatibility (`react`, `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `vitest`) and initialize Vite + React + TypeScript | Project Leader | **P0** | None | `package.json`, `tsconfig.json` (`strict: true`), `vite.config.ts` committed; `npm run dev`, `build`, `typecheck`, `test` work cleanly |
| `T1.2` | Create `src/shared/theme.ts`, `src/shared/types.ts`, `src/shared/characters.ts`, `src/shared/levels.ts` | Project Leader | **P0** | `T1.1` | DARK CHRONO tokens, `TimelineId` (`1920`/`2026`/`2126`), `ChronoCommand`, `GameStateSnapshot`, and shared landmark coordinates defined |
| `T1.3` | Implement `src/bridge/EventBus.ts` & `src/bridge/GameBridge.ts` (with mockable state provider for parallel dev) | Project Leader | **P0** | `T1.2` | React UI and R3F scene can subscribe to immutable snapshots and dispatch typed commands without tight coupling |
| `T1.4` | Create minimal `<GameCanvas />` + lit low-poly test cube/ground scene verifying R3F renders cleanly inside React | Project Leader | **P0** | `T1.1`, `T1.3` | App boots to `#10131C` background, renders 3D test scene with zero WebGL/console errors |
| `T1.5` | Configure `.gitignore` and GitHub branch protection on `main` | Project Leader | **P1** | `T1.1` | Direct pushes to `main` blocked; PR review enforced |

---

## 4. Phase 2 – Parallel Development *(PLANNED — Priority P0)*

### 4.1 Member A — React UI (`src/ui/`)

| ID | Task | Priority | Dependencies | Acceptance Criteria |
|---|---|---|---|---|
| `T2.A1` | Create `src/ui/styles/darkChrono.css` tokens & responsive overlay layout | **P0** | `T1.2` | Matches DARK CHRONO hex palette; clean layout on desktop (`1280×720+`) and mobile (`375×667+`) |
| `T2.A2` | Build `MainMenu.tsx` and `CharacterSelect.tsx` (Arin Vale playable; 4-character lore preview) | **P0** | `T2.A1` | User can launch *The Broken Bridge*, preview all 4 characters, and open Settings/Controls |
| `T2.A3` | Build `GameHUD.tsx`, `TimelineSwitcher.tsx` (`1920`/`2026`/`2126`), and `ChronoEnergyBar.tsx` (`100` max + held charge slot) | **P0** | `T2.A1`, `T1.3` | Displays live `GameStateSnapshot`; clicking timeline buttons or pressing `1`/`2`/`3` dispatches timeline switch |
| `T2.A4` | Build `InteractionPanel.tsx` / `CluePanel.tsx` (object state, clue text, Extract `-25` / Transfer `-25` buttons) | **P0** | `T2.A3` | Shows focused/inspected object details and disables invalid actions with clear feedback |
| `T2.A5` | Build `PauseModal.tsx`, `SettingsModal.tsx` (mute, camera sensitivity, hints), and `TimelineImpactReport.tsx` | **P0** | `T2.A1`, `T1.3` | Pause/reset/settings function cleanly; Impact Report renders `1920 → 2026 → 2126` causality cards and action log |

### 4.2 Member B — Third-Person 3D Environment & Player (`src/game3d/`)

| ID | Task | Priority | Dependencies | Acceptance Criteria |
|---|---|---|---|---|
| `T2.B1` | Build `PlayerController.tsx` & placeholder low-poly `PlayerModel.tsx` (Arin Vale) | **P0** | `T1.4` | Smooth camera-relative `WASD`/Arrows movement, character rotation toward heading, and terrain collision |
| `T2.B2` | Build `ThirdPersonCamera.tsx` (smooth damped follow + mouse/key yaw + raycast obstruction pull-in) | **P0** | `T2.B1` | Camera tracks player smoothly without clipping behind cliffs/trees |
| `T2.B3` | Build `EnvironmentManager.tsx` & shared 3D valley geometry (`RiverTerrain.tsx`, `EraLighting.tsx`) for `1920`, `2026`, `2126` | **P0** | `T1.4`, `T1.2` | Identical landmark coordinates across all 3 eras with distinct era lighting (`#C9954B`, `#42BFC2`, `#9169DC`) and environmental props |
| `T2.B4` | Build 3D object views (`MatureTree`, `SeedPlot` → `YoungTree` → `GiantRootBridge`, `EraBridge`, `ChronoAnchor`) using swappable low-poly placeholders | **P0** | `T2.B3` | Visuals and walkable colliders update cleanly per state; `1920` broken wooden bridge, `2026` modern damaged bridge, `2126` giant root bridge |
| `T2.B5` | Implement `InteractionSystem.ts` (proximity radius, Chrono Cyan `#42D9D0` 3D highlight ring, inspect/action trigger) & safe era-switch anchor | **P0** | `T2.B1`, `T2.B4` | Nearest interactable highlights automatically; switching eras never soft-locks player in river or geometry |

### 4.3 Member C — Pure Timeline & Chrono Core Logic (`src/logic/`, `tests/logic/`)

| ID | Task | Priority | Dependencies | Acceptance Criteria |
|---|---|---|---|---|
| `T2.C1` | Implement `TimelineManager.ts` (`1920`, `2026`, `2126` switching, `0` switch cost in MVP) | **P0** | `T1.2` | Deterministic timeline switching and era metadata lookup; zero external/DOM imports |
| `T2.C2` | Implement `ChronoCoreSystem.ts` (`100` max energy, `25` Extract cost, `25` Transfer cost, `1` held charge slot) | **P0** | `T1.2` | Enforces energy budget and charge slot limits; reserves extensible hooks for Freeze/Accelerate/Restore |
| `T2.C3` | Implement `ObjectStateEngine.ts` & `brokenBridge.ts` causal state transitions | **P0** | `T2.C1`, `T2.C2` | Extracting `GROWTH_TIME` from `1920` Mature Tree depletes it; transferring to `1920` Seed spawns `2026` Young Tree and `2126` Giant Tree with traversable roots |
| `T2.C4` | Implement `EventHistory.ts`, `PuzzleValidator.ts`, `ImpactReportGenerator.ts`, and `GameStateManager.ts` | **P0** | `T2.C3` | Records ordered events, detects level win at `2126` Chrono Anchor, and produces structured `TimelineImpactReport` |
| `T2.C5` | Write Vitest suite in `tests/logic/brokenBridge.test.ts` | **P0** | `T2.C4` | Full pass for happy path, insufficient energy, double-extract rejection, invalid transfer, reset, and pure-TS import guard |

---

## 5. Phase 3 – Integration *(PLANNED — Priority P0)*

| ID | Task | Owner | Priority | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|
| `T3.1` | Connect React UI (`src/ui/`) to real `GameBridge` + `GameStateManager` | Project Leader + Member A | **P0** | `T2.A*`, `T2.C*` | HUD energy (`100` → `75` → `50`), held charge, timeline buttons, and Impact Report reflect real logic |
| `T3.2` | Connect 3D world (`src/game3d/`) to `GameBridge` commands and state snapshots | Project Leader + Member B | **P0** | `T2.B*`, `T2.C*` | 3D proximity inspect/extract/transfer drives `src/logic/` and updates 3D models/colliders in real time |
| `T3.3` | End-to-end verification of *The Broken Bridge* timeline transformations (`1920 → 2026 → 2126`) and puzzle completion | All Members | **P0** | `T3.1`, `T3.2` | Player completes *The Broken Bridge* from Main Menu to Timeline Impact Report with zero console errors |

---

## 6. Phase 4 – MVP Polish *(PLANNED — Priority P1)*

| ID | Task | Owner | Priority | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|
| `T4.1` | Add basic character animations (idle, walk, Chrono Core channel) & upgrade priority placeholder meshes to optimized low-poly `GLB` models | Member B | **P1** | `T3.3` | Smooth low-poly locomotion and readable 3D silhouettes |
| `T4.2` | Add timeline-switch transition effects, Chrono Cyan extraction/transfer particle VFX, and era ambient/SFX audio with mute toggle | Member B + Member A | **P1** | `T3.3` | Distinct visual/audio feedback across `1920`, `2026`, `2126` |
| `T4.3` | Refine `ThirdPersonCamera` smoothing, obstruction handling, and pointer/sensitivity controls | Member B | **P1** | `T3.3` | Camera feels comfortable on desktop and handles obstacles cleanly |
| `T4.4` | Responsive UI polish (desktop `1280×720+` and mobile viewport check + touch controls if needed) | Member A | **P1** | `T3.1` | No overlapping HUD panels or clipped modals on narrow screens |
| `T4.5` | Performance optimization (draw call / shadow / geometry review), final verification (`typecheck`, `lint`, `test`, `build`), and **Vercel** deployment | Project Leader + All | **P0** | `T4.1`–`T4.4` | Smooth desktop FPS, all checks green, live Vercel MVP URL verified |

---

## 7. Phase 5 – Optional Future Features *(FUTURE — Post-MVP)*

- **F5.1 — Extended Chrono Core Abilities:** Implement **Freeze**, **Accelerate**, and **Restore / Reverse** in `ChronoCoreSystem` (`Member C`), 3D shaders/VFX (`Member B`), and HUD controls (`Member A`).
- **F5.2 — Additional Worlds & ~50 Levels:** Build remaining levels of *The Lost Kingdom* plus *The Fallen City*, *The Sunken Era*, *The Future Collapse*, and *The Timeless Void*.
- **F5.3 — Full Cast & Narrative Campaign:** Playable 3D models for **Mira Sol**, **Kael Voss**, and **Nyra Quinn**; 5 Chrono Core fragments storyline; future-self reveal; **Restore Time**, **Rewrite Time**, and **Destroy the Core** endings.
- **F5.4 — Replayability Systems:** Three-star ratings, alternative puzzle solutions, Time Attack, Achievements, and Endless / Paradox Mode.
- **F5.5 — Supabase Backend (`Member C`):** Authentication, player profiles, cloud saves, global leaderboards, Daily Chrono Challenges, and Chrono Streaks in `src/services/supabase/`.
