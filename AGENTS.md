# AI Agent Guidelines (`AGENTS.md`) — TIME THIEF

This file defines mandatory operating rules for **Google Antigravity** and any other AI coding agents assisting the **TIME THIEF** team.

---

## 1. Pre-Flight Inspection (Mandatory)

Before writing or editing any code:
1. **Inspect the workspace first:** Check `git status`, `git branch`, existing directory contents, and `package.json` (once initialized).
2. **Read core project docs & shared contracts:** Review [`PRD.md`](PRD.md), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/GAME_DESIGN.md`](docs/GAME_DESIGN.md), [`docs/TASKS.md`](docs/TASKS.md), and the relevant contracts in `src/shared/` before starting implementation in any assigned folder.
3. **Verify implementation reality:** Never assume a file, dependency, or script exists without reading/checking it. Clearly distinguish **IMPLEMENTED**, **PLANNED**, and **FUTURE** items.

---

## 2. Architectural & Coding Rules

1. **Respect the Strict Three-Layer 3D Architecture:**
   - `src/logic/` and `tests/logic/` (**Member C**) MUST remain **pure TypeScript**. **NEVER** import `react`, `react-dom`, `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `window`, or `document` inside `src/logic/`.
   - `src/game3d/` (**Member B**) owns the **React Three Fiber** (`<Canvas>`) 3D scenes, `PlayerController`, `ThirdPersonCamera`, `EnvironmentManager`, `InteractionSystem`, 3D object views (`GLTF/GLB` or low-poly placeholders), animations, and physics/collisions. Keep puzzle truth in `src/logic/`, not duplicated inside 3D components.
   - `src/ui/` and `src/backend/` (**Member A**) own React UI screens, HUD, menus, modals, and post-MVP Supabase backend integration. Do not put 3D world logic or Three.js scene manipulation inside UI components; communicate through `src/bridge/` and `src/shared/`.
   - `src/shared/` and `src/bridge/` (**Project Lead**) define the common contracts, constants, and cross-module communication layer.
   - Keep `App.tsx` clean—do not dump all gameplay, camera, or puzzle logic into a single React component.
2. **Verify Dependency Compatibility Before Installing:** Do not assume exact npm package versions for `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, and `react`. Verify peer-dependency compatibility before installing during Phase 1.
3. **Follow Existing Conventions:** Match the repository's TypeScript strictness, naming conventions, folder layout, and **DARK CHRONO** design tokens (`#10131C`, `#171E32`, `#D6A84F`, `#42D9D0`, `#C5CEDB`, `#8B70C9`; Timeline accents: Past `#C9954B`, Present `#42BFC2`, Future `#9169DC`).
4. **Use `src/shared/` as the Single Source of Truth:** Always reuse existing shared types, interfaces, contracts, and constants from `src/shared/` rather than creating duplicate definitions. Keep every module compatible with `src/shared/`.
5. **No Unnecessary Dependencies:** Do not install new npm packages without explicit approval from the developer/Project Leader. Do not add a backend server for the offline single-player MVP.
6. **Maintain Responsive Design:** All UI components in `src/ui/` and `<Canvas>` layout must work cleanly on desktop (`1280×720+`) with mobile compatibility (`375×667+`) considered.

---

## 3. Team Collaboration & Git Safety

1. **Respect Module Ownership & Shared Contracts:**
   - Only modify files belonging to the active task/member's scope (`src/ui/` & `src/backend/` for Member A, `src/game3d/` for Member B, `src/logic/` & `tests/logic/` for Member C, `src/shared/` & `src/bridge/` for Project Lead).
   - Do not directly modify another member's assigned module without coordination.
   - Avoid unrelated edits, drive-by refactors, or formatting churn in other members' files.
   - Do not overwrite another member's work. If a new shared type or contract change in `src/shared/` is needed, propose it to the Project Lead first—changes to `src/shared/` require Project Lead review and approval, and multi-module impacts must be coordinated across affected members.
2. **Branch Protection:**
   - **NEVER push directly to `main`.**
   - **NEVER run `git push --force`** or destructive history rewrites unless explicitly instructed.
   - Do not auto-commit or auto-push unless the user explicitly asks you to commit/push.
   - Follow branch naming (`feature/*`, `fix/*`, `docs/*`) and Conventional Commits as defined in [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## 4. Verification & Documentation Integrity

1. **Test Before Claiming Done:**
   - After code changes, run the project's verification commands (`npm run typecheck`, `npm run lint`, `npm run test`, `npm run build` once configured) and report only exact observed results.
   - Never claim tests or builds passed if they were not run after your final edit.
2. **Document Architectural Changes:**
   - If you introduce or modify a shared interface, event contract, state transition rule, or folder convention, update [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) (and [`docs/TASKS.md`](docs/TASKS.md) if milestone status changes).
3. **Keep MVP Scope Tight:**
   - Do not build Post-MVP / FUTURE features (Worlds 2–5, 50 levels, Supabase, leaderboards) unless specifically instructed for Phase 5.
