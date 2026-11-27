# Product Requirements Document (PRD) — TIME THIEF

**Project Name:** TIME THIEF  
**Tagline:** *"Steal time. Change history. Rewrite the future."*  
**Genre:** Stylized Low-Poly 3D Third-Person Time-Travel Puzzle Adventure  
**Platform:** Browser-Based (Desktop-First, Mobile Compatibility Considered)  
**Visual Direction:** DARK CHRONO  
**Document Status:** Baseline v2.0 (3D Architecture Finalized — Pre-Implementation Planning)

---

## 1. Product Vision

**TIME THIEF** reimagines time in 3D puzzle-adventure games not as a countdown clock or simple undo button, but as a **physical, finite, transferable resource**. Players explore stylized low-poly 3D environments from a **third-person perspective** across three parallel eras—**1920 (Past)**, **2026 (Present)**, and **2126 (Future)**—stealing temporal energy from one 3D object and injecting it into another to reshape history across the same physical landscape.

Every action creates cascading consequences across centuries, culminating in a **Butterfly Effect Timeline Impact Report** that shows players how their choices transformed the world.

---

## 2. Objectives

### 2.1 MVP Objectives *(PLANNED — Hackathon Deliverable)*
1. Deliver a playable, offline, browser-based 3D vertical slice built with **React + Vite + TypeScript + Three.js + React Three Fiber** (`@react-three/drei`, and `@react-three/rapier` if suitable for the character controller).
2. Prove the core mechanic of **transferable time** through the complete 3D opening level: **The Broken Bridge**.
3. Demonstrate real-time switching across **three interconnected timelines** (`1920`, `2026`, `2126`) in the **same 3D geographical location** with visible environmental transformations and deterministic causal state changes.
4. Provide a polished **DARK CHRONO** UI with an interactive HUD, third-person object inspection, limited **Chrono Energy** (`100` capacity), and a **Timeline Impact Report** upon puzzle completion.
5. Maintain strict separation between React UI & backend (`src/ui/`, `src/backend/` — Member A), 3D world (`src/game3d/` — Member B), and pure game logic (`src/logic/`, `tests/logic/` — Member C), unified by shared contracts in `src/shared/` and `src/bridge/` (Project Lead) so all 3 team members can develop concurrently.

### 2.2 Long-Term Product Objectives *(FUTURE — Post-MVP)*
1. Expand into a full **5-world, ~50-level 3D narrative campaign** exploring the five Chrono Core fragments and three endings.
2. Unlock the full Chrono Core ability suite (**Freeze**, **Accelerate**, **Restore / Reverse**).
3. Support **4 distinct playable 3D characters** and rich replayability systems (3-star ratings, Daily Chrono Challenge, leaderboards, Endless/Paradox Mode).
4. Introduce optional cloud persistence and competitive features via **Supabase**.

---

## 3. Target Audience

- **Primary Audience:** Fans of atmospheric indie 3D puzzle-adventure games (e.g., *The Talos Principle*, *Outer Wilds*, *Rime*, *Monument Valley*) who enjoy spatial cause-and-effect logic and stylized low-poly exploration.
- **Secondary Audience:** Browser gamers and hackathon evaluators seeking an immediate, zero-install 3D puzzle experience on desktop browsers, with accessible layout and controls considered for mobile viewports.

---

## 4. User Experience & Core Gameplay Loop

### 4.1 Core Gameplay Loop
```text
Explore → Investigate → Manipulate → Switch Timeline → Solve → Review Consequences
```

1. **Explore:** Navigate the 3D environment in third-person across riverbanks, forest paths, and landmarks.
2. **Investigate:** Approach and inspect interactive 3D objects to learn their temporal state, extractable/transferable properties, and narrative clues.
3. **Manipulate:** Use the **Chrono Core** to extract time from an eligible source (`25` Energy) or transfer stored time into an eligible target (`25` Energy) within a `100` **Chrono Energy** budget.
4. **Switch Timeline:** Shift between **1920 (Past)**, **2026 (Present)**, and **2126 (Future)** (`0` Energy in MVP) while remaining in the same world coordinates to observe transformations and unlock routes.
5. **Solve:** Combine temporal manipulations and era transitions to cross obstacles and reach the level objective.
6. **Review Consequences:** View the **Timeline Impact Report** summarizing how actions in earlier eras reshaped the present and future.

### 4.2 Visual & UX Principles (DARK CHRONO)
- **Palette:** Deep obsidian-navy backgrounds (`#10131C`, `#171E32`) paired with **Antique Gold** (`#D6A84F`), **Chrono Cyan** (`#42D9D0`), **Moon Silver** (`#C5CEDB`), and **Mystic Purple** (`#8B70C9`).
- **Low-Poly 3D Craft:** Stylized, faceted low-poly geometry (`GLTF/GLB` or clean procedural placeholder meshes in early MVP) lit with atmospheric era-tinted directional/hemisphere lighting—no realistic graphics required.
- **Timeline Clarity:** Each timeline is immediately identifiable via color accents (`#C9954B` Past, `#42BFC2` Present, `#9169DC` Future), HUD badges, and distinct 3D lighting/materials.
- **Desktop-First with Mobile Compatibility:** Designed primarily for keyboard + mouse on desktop (`1280×720+`), with responsive HUD panels and optional touch controls considered for mobile viewports (`375×667+`).

---

## 5. Scope Separation: MVP vs. Future Enhancements

| Feature Area | MVP Scope *(PLANNED)* | Post-MVP Scope *(FUTURE)* |
|---|---|---|
| **Playable Levels** | 1 complete 3D level: *The Broken Bridge* | 5 Worlds, ~50 levels |
| **3D Visuals & Models** | Low-poly placeholder geometry + core `GLB` assets | Full bespoke low-poly `GLB` environments, props & animations |
| **Camera & Controls** | Third-person follow camera, `WASD`/Arrows + mouse/orbit, interact key | Advanced camera transitions, gamepad support, refined mobile touch controls |
| **Timelines** | 3 eras (`1920`, `2026`, `2126`) sharing world coordinates | 3 eras + Paradox/Void anomalies |
| **Chrono Core Actions** | **Inspect**, **Extract** (`25`), **Transfer** (`25`), **Switch** (`0`) | **Freeze**, **Accelerate**, **Restore / Reverse** |
| **Resource System** | `100` Chrono Energy capacity + `1` held Time Charge slot | Multi-charge upgrades, energy shards, paradox penalties |
| **Playable Characters** | 1 playable 3D character (**Arin Vale**); cosmetic preview of 4 cast members | 4 selectable animated 3D characters |
| **Completion & Feedback** | Level win condition + **Basic Timeline Impact Report** | 3-star scoring, alternative solutions, Butterfly Effect graph |
| **Persistence** | Offline in-memory + optional `localStorage` | Supabase Auth, Cloud Saves, Profiles |
| **Replayability** | Level replay / reset button | Daily Challenge, Chrono Streak, Time Attack, Achievements, Leaderboards, Paradox Mode |

---

## 6. Functional Requirements

> **Status Tags:**  
> `[PLANNED — MVP]` = Required for Hackathon MVP.  
> `[FUTURE]` = Post-MVP enhancement; out of MVP delivery scope.

### 6.1 Application Shell & Navigation
- **FR-01 `[PLANNED — MVP]`:** The application shall boot into a **DARK CHRONO** Main Menu with options to Start Game (*The Broken Bridge*), open Character Select / Preview, view Controls/How to Play, and adjust Settings.
- **FR-02 `[PLANNED — MVP]`:** Players shall be able to pause gameplay (`Esc` or HUD button), adjust basic settings (audio mute/volume, control hints, graphics/camera sensitivity), reset the current level, or return to the Main Menu.
- **FR-03 `[FUTURE]`:** World and Level Selection screen covering 5 worlds and ~50 levels with completion badges and 3-star ratings.

### 6.2 Character Selection
- **FR-04 `[PLANNED — MVP]`:** **Arin Vale – The Chrono Scout** is the playable MVP protagonist. The Character Selection screen may preview all four planned characters (**Arin Vale**, **Mira Sol**, **Kael Voss**, **Nyra Quinn**) with cosmetic/lore profiles.
- **FR-05 `[FUTURE]`:** All four characters fully playable with distinct low-poly 3D `GLB` rigs, animations, portraits, and Chrono Core trails.

### 6.3 Third-Person Exploration & Timeline Switching
- **FR-06 `[PLANNED — MVP]`:** The player controls a 3D character in third-person (`WASD` / `Arrow Keys` for movement, automatic facing or smooth rotation along movement direction, and a smooth follow `ThirdPersonCamera`).
- **FR-07 `[PLANNED — MVP]`:** The player shall be able to switch at will between **1920 (Past)**, **2026 (Present)**, and **2126 (Future)** via HUD buttons and keyboard shortcuts (`1`, `2`, `3`).
- **FR-08 `[PLANNED — MVP]`:** All three timelines share the **same 3D world coordinate system and landmarks**. Switching timelines preserves player coordinates unless colliding with solid/impassable geometry in the target timeline, in which case the player is safely repositioned to the nearest valid bank/anchor or blocked with a clear notice to prevent soft-locks.
- **FR-09 `[PLANNED — MVP]`:** Changing an eligible object's state in an earlier era (e.g., `1920`) deterministically propagates updated states to later eras (`2026`, `2126`) and visibly transforms the 3D scene (models, materials, lighting, and colliders).
- **FR-10 `[FUTURE]`:** Temporal transition shaders/particle ripples and paradox locks.

### 6.4 Chrono Core & Energy Rules
- **FR-11 `[PLANNED — MVP]` — Chrono Energy Defaults:**
  - **Capacity:** `100` Chrono Energy per level.
  - **Inspect:** `0` Chrono Energy.
  - **Switch Timeline:** `0` Chrono Energy.
  - **Extract Time:** `25` Chrono Energy.
  - **Transfer Time:** `25` Chrono Energy.
- **FR-12 `[PLANNED — MVP]` — Time Charge Holding:** The Chrono Core holds `1` active Time Charge at a time (e.g., `Growth Time`), displayed in the HUD. Extracting while already holding a charge is blocked with clear UI feedback.
- **FR-13 `[PLANNED — MVP]` — Reset Safety:** Players can trigger a one-click **Reset Level** from the HUD or Pause menu at any time.
- **FR-14 `[FUTURE]` — Freeze, Accelerate, Restore / Reverse:** Additional Chrono Core modes unlocked post-MVP.

### 6.5 3D Object Inspection & *The Broken Bridge* Level Rules
- **FR-15 `[PLANNED — MVP]`:** Moving within `InteractionSystem` radius of a 3D interactable highlights it (Chrono Cyan `#42D9D0` ring/glow/outline) and shows an interaction prompt (`E` / HUD click).
- **FR-16 `[PLANNED — MVP]`:** Inspecting an object opens the Clue / Interaction Panel displaying its name, era state, temporal eligibility, and available Chrono Core actions.
- **FR-17 `[PLANNED — MVP]` — *The Broken Bridge* Causal Entities:**
  1. **River & Shared Landmarks (`1920` / `2026` / `2126`):** Same 3D terrain and riverbanks across all eras.
  2. **Era Bridges (`1920` Broken Wooden Bridge → `2026` Modern Partially Damaged Bridge → `2126` Ruined Crossing):** Physically impassable across the full river span.
  3. **Mature Tree (`1920`):** Ancient forest tree rich in `Growth Time`. Extracting `Growth Time` (`25` Energy) depletes/reduces its growth state.
  4. **Small Seed (`1920`):** Eligible recipient on the riverbank. Transferring `Growth Time` (`25` Energy) infuses the seed in `1920`, causing it to grow into a **Young Tree** in `2026` and a **Giant Tree** in `2126` whose **Giant Roots create a traversable 3D pathway across the river**.
  5. **Chrono Anchor (`2126`):** Located on the opposite riverbank; walking across the giant roots and reaching this anchor completes the level.

### 6.6 Puzzle Validation & Timeline Impact Report
- **FR-18 `[PLANNED — MVP]`:** `src/logic/` records an ordered `EventHistory` of timeline switches, extractions, and transfers.
- **FR-19 `[PLANNED — MVP]`:** Completing *The Broken Bridge* in `2126` opens the **Timeline Impact Report** modal detailing actions per era, before/after state transitions across `1920 → 2026 → 2126`, remaining Chrono Energy, and Replay / Return to Menu controls.
- **FR-20 `[FUTURE]`:** Three-star evaluation criteria and alternative solution tracking.

### 6.7 Controls & Responsiveness
- **FR-21 `[PLANNED — MVP]`:** Desktop controls support `WASD` / `Arrow Keys` (3D movement), mouse drag or `Q`/`E` / orbit sensitivity options (camera), `F` or `E` (inspect/interact—exact key bindings finalized cleanly in `InputController`), `1`/`2`/`3` (timeline switch), and `Esc` (pause).
- **FR-22 `[PLANNED — MVP]`:** UI overlays and HUD scale cleanly on desktop (`1280×720+`) and adapt gracefully to smaller/mobile viewports (`375×667+`) with touch-accessible buttons.

---

## 7. Non-Functional Requirements

- **NFR-01 — Performance:** Smooth `60 FPS` target on standard desktop browsers using low-poly meshes, minimal draw calls, and lightweight shadows/lighting; responsive framerate on mobile browsers.
- **NFR-02 — Offline Playability (MVP):** Runs 100% client-side with zero backend or network API requirements.
- **NFR-03 — Browser Compatibility:** Latest Chrome, Edge, Firefox, and Safari with WebGL support.
- **NFR-04 — Architectural Isolation:** `src/logic/` must have **zero imports** from `react`, `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, or browser DOM APIs.
- **NFR-05 — Accessibility:** Never rely on color alone for era or puzzle state—always pair `#C9954B` / `#42BFC2` / `#9169DC` with year labels (`1920` / `2026` / `2126`) and clear icons/text. Maintain legible contrast against `#10131C` and `#171E32`.
- **NFR-06 — Asset Non-Blocking Rule:** Development must not block on final custom 3D art; simple low-poly geometric placeholders must enable full gameplay testing early, swappable later for `GLTF/GLB` models without rewriting logic.
- **NFR-07 — Shared Contract Compliance:** `src/shared/` is the single source of truth for cross-module TypeScript types, interfaces, and constants. Every module must reuse and stay compatible with `src/shared/` without duplicating definitions, and any contract additions or changes require Project Lead approval.

---

## 8. Storyline, Worlds & Replayability *(FUTURE — Post-MVP)*

### 8.1 Narrative Arc
- Recover **five Chrono Core fragments** scattered across collapsing eras.
- An **unknown masked figure** manipulates history across worlds, culminating in the reveal that the figure is the **player's future self**.

### 8.2 Three Planned Endings *(FUTURE)*
1. **Restore Time**
2. **Rewrite Time**
3. **Destroy the Core**

### 8.3 Five Planned Worlds (~50 Levels) *(FUTURE)*
1. **The Lost Kingdom** *(opens with Level 1: The Broken Bridge)*
2. **The Fallen City**
3. **The Sunken Era**
4. **The Future Collapse**
5. **The Timeless Void**

### 8.4 Replayability Features *(FUTURE)*
- Three-star ratings, Daily Chrono Challenge, Chrono Streak, Time Attack, Achievements, Leaderboards (Supabase), Endless / Paradox Mode, and alternative puzzle solutions.

---

## 9. Out-of-Scope for Hackathon MVP

- Worlds 2–5 and levels beyond *The Broken Bridge*.
- Freeze, Accelerate, and Restore / Reverse gameplay implementations (interfaces may be modeled for extensibility).
- Realistic/high-poly 3D graphics, PBR photorealism, or heavy post-processing shaders.
- Supabase authentication, cloud saves, profiles, or leaderboards.
- Full cutscenes, voice acting, or multi-ending branching logic.

---

## 10. MVP Acceptance Criteria *(PLANNED)*

The MVP is complete when all of the following are verified after final edits:
1. `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` pass cleanly.
2. `tests/logic/` unit tests verify `100` Chrono Energy capacity, `25` Extract cost, `25` Transfer cost, `0` Timeline Switch cost, `1920 → 2026 → 2126` causal propagation, puzzle completion, and Impact Report generation with zero Three.js/React/DOM imports.
3. The React Three Fiber `<Canvas>` renders *The Broken Bridge* in stylized low-poly 3D with a smoothly controlled third-person character and camera.
4. Switching between `1920`, `2026`, and `2126` visibly transforms the same 3D environment (lighting, bridge state, tree growth stages) while keeping landmark coordinates consistent.
5. Extracting growth time from the `1920` mature tree and transferring it to the `1920` seed produces the `2026` young tree and `2126` giant tree with traversable roots across the river.
6. Reaching the `2126` Chrono Anchor across the giant roots triggers the **Timeline Impact Report** modal accurately summarizing player actions.
