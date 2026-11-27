# Contributing Guide — TIME THIEF

This document establishes the Git workflow, module ownership boundaries, and collaboration standards for our 3-member engineering team and Project Leader.

---

## 1. Team Roles & Module Ownership

To enable parallel development without merge conflicts or overwritten code, each member owns a dedicated directory layer:

| Role | Primary Ownership | Description |
|---|---|---|
| **Project Leader** | Root config, `src/shared/`, `src/bridge/`, `docs/` | Initial project setup, shared types & architecture, `GameBridge`, Game/UI integration, GitHub branch management & code reviews, final testing & deployment. |
| **Member A** | `src/ui/` | **React UI:** Main menu, character selection, HUD, timeline selector, Chrono Energy display, interaction & clue panels, settings and pause menu, Impact Report interface, responsive styles. |
| **Member B** | `src/game3d/` & `public/assets/` | **3D Game:** React Three Fiber `<Canvas>` scenes, player model & `PlayerController`, `ThirdPersonCamera`, `EnvironmentManager`, three timeline 3D environments, collisions & `InteractionSystem`, basic character animations, low-poly `GLB`/placeholder models. |
| **Member C** | `src/logic/` & `tests/logic/` *(Post-MVP: `src/services/`)* | **Game Logic & Backend:** Pure TS `TimelineManager`, `ChronoCoreSystem`, `ObjectStateEngine`, `PuzzleValidator`, `EventHistory`, `ImpactReportGenerator`, and Vitest unit tests *(Post-MVP Phase 5: Supabase auth, saves, profiles, leaderboards — NOT required for MVP)*. |

### Boundary Rule
- **Do not edit files outside your owned directory** unless you coordinate with the owner and Project Leader first.
- Changes to **`src/shared/`** or **`src/bridge/`** affect everyone—propose contract changes in a dedicated PR or discuss with the team before editing.
- **MVP Isolation:** Member C must not block MVP gameplay with backend/Supabase code; all MVP persistence/state stays client-side in `src/logic/`.

---

## 2. Branching Strategy

We follow a strict protected-`main` GitHub Flow:

| Branch Pattern | Purpose | Example |
|---|---|---|
| `main` | Stable, reviewed, always-buildable integration branch | `main` |
| `feature/*` | New features, 3D scenes, UI components, or logic systems | `feature/ui-chrono-hud`, `feature/3d-broken-bridge`, `feature/logic-chrono-core` |
| `fix/*` | Bug fixes and regression patches | `fix/3d-camera-obstruction` |
| `docs/*` | Documentation updates (`README.md`, `PRD.md`, `docs/*`) | `docs/update-3d-architecture` |

### Hard Rules
- **NEVER commit or push directly to `main`.**
- Always branch off the latest `origin/main`:
  ```bash
  git checkout main
  git pull origin main
  git checkout -b feature/<your-scope>-<short-description>
  ```
- Keep branches focused and small—one feature or fix per PR so reviews stay fast.

---

## 3. Commit Message Conventions

Use **Conventional Commits** for clean history and easy changelog tracking:

```text
<type>(<scope>): <short imperative summary>
```

### Allowed Types
- `feat`: New gameplay, 3D scene, UI, or logic feature
- `fix`: Bug fix
- `docs`: Documentation changes only
- `refactor`: Code restructuring without changing behavior
- `style`: Formatting, CSS/DARK CHRONO visual polish (no logic change)
- `test`: Adding or updating Vitest unit/integration tests
- `chore`: Build config, dependencies, tooling

### Examples
- `feat(logic): implement ChronoCoreSystem extraction and transfer rules`
- `feat(game3d): add PlayerController and ThirdPersonCamera follow`
- `feat(ui): build DARK CHRONO timeline selector and Chrono Energy bar`
- `fix(game3d): clamp camera spring arm on riverbank obstruction`
- `docs(architecture): document R3F canvas bridge and GLB replacement strategy`

---

## 4. Pull Request (PR) Procedure

Before opening a PR into `main`:
1. **Sync with `main`:** Merge or rebase the latest `origin/main` into your branch and resolve any conflicts locally.
2. **Verify locally** *(once Phase 1 scaffold exists)*:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - Manually smoke-test the 3D scene and HUD in the browser if touching `src/ui/`, `src/game3d/`, or `src/bridge/`.
3. **Write a clear PR description** including:
   - What changed and why
   - Files/modules touched
   - How it was tested (plus screenshots/video clips for UI or 3D scene changes)
   - Any cross-module contract dependencies

### Code Review Rules
- **Every PR requires at least 1 approval** (from the **Project Leader**, or a peer developer if delegated) before merging.
- Authors **do not merge their own unreviewed PRs** into `main`.
- Reviewers check for:
  - Module boundary compliance (`src/logic/` has zero React, Three.js, R3F, Drei, Rapier, or DOM imports!)
  - Adherence to **DARK CHRONO** palette and `PRD.md` specs
  - No duplicate utilities, dead code, or accidental edits to another member's files
  - Passing build, typecheck, and Vitest tests

---

## 5. Testing Requirements

| Layer | Testing Expectation |
|---|---|
| **`src/logic/` (Member C)** | Vitest unit tests required for all Chrono Core rules (`100` cap, `25` extract, `25` transfer, `0` switch), timeline propagation (`1920 → 2026 → 2126`), puzzle win conditions, and Impact Report generation. |
| **`src/game3d/` (Member B)** | Manual 3D scene verification in browser (smooth third-person movement & camera, collisions, `InteractionSystem` proximity, era transforms across 1920/2026/2126, no WebGL/console errors). |
| **`src/ui/` (Member A)** | Component verification across desktop (`1280×720+`) and mobile (`375×667+`) viewports, keyboard navigation, and DARK CHRONO contrast compliance. |
| **Integration (All + Leader)** | End-to-end walkthrough of *The Broken Bridge* after merging cross-layer PRs. |

---

## 6. Conflict Resolution & Communication

1. **Prevent conflicts early:** Stick strictly to your module directory (`src/ui/`, `src/game3d/`, or `src/logic/`).
2. **Contract changes first:** If you need a new field in `GameStateSnapshot`, `ChronoCommand`, or `WorldObjectRuntimeState`, open a contract PR on `src/shared/` and notify the team before writing dependent code.
3. **Resolving merge conflicts:**
   - Pull `origin/main` into your feature branch.
   - Never blindly accept "ours" or "theirs" on shared files (`package.json`, `src/shared/*`, `src/bridge/*`). Inspect both sides or coordinate with the Project Leader.
   - Re-run tests and build after resolving conflicts.
4. **Sync Cadence:** Post brief updates when starting a branch, updating shared interfaces, or opening a PR for review.
