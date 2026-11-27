# Game Design Document (GDD) — TIME THIEF

**Title:** TIME THIEF  
**Tagline:** *"Steal time. Change history. Rewrite the future."*  
**Genre:** Stylized Low-Poly 3D Third-Person Time-Travel Puzzle Adventure  
**Visual Direction:** DARK CHRONO  
**Status:** Design Specification *(All gameplay implementations are **PLANNED**.)*

---

## 1. Game World & Premise

The world of **TIME THIEF** exists simultaneously across three fractured centuries—**1920 (Past)**, **2026 (Present)**, and **2126 (Future)**. Rather than visiting separate disconnected maps, the player explores a single continuous **3D environment** in third-person while shifting the temporal layer around them with the **Chrono Core**.

Time is a physical essence embedded in living things, architecture, and machinery. By stealing excess growth or temporal energy from one 3D object and pouring it into another, the player reshapes how centuries unfold across the exact same landmarks.

---

## 2. Player Experience & Core Gameplay Loop

### Player Fantasy
You stand in a quiet, stylized low-poly 3D world beneath shifting skies—observing an overgrown futuristic chasm in `2126`, stepping back into an ancient forest in `1920`, stealing living growth from a mature tree, and returning to watch giant roots bridge the river before your eyes.

### Core Gameplay Loop
```text
Explore → Investigate → Manipulate → Switch Timeline → Solve → Review Consequences
```

1. **Explore:** Move in third-person across the 3D terrain while a smooth camera tracks your surroundings.
2. **Investigate:** Approach and inspect 3D landmarks and interactable objects to learn their temporal state and clues.
3. **Manipulate:** Use the Chrono Core to **Extract** (`25` Energy) or **Transfer** (`25` Energy) time *(plus Freeze, Accelerate, and Restore in Future phases)*.
4. **Switch Timeline:** Shift between `1920`, `2026`, and `2126` (`0` Energy in MVP) at the exact same coordinates to observe world transformations.
5. **Solve:** Traverse newly formed 3D paths and reach the **Chrono Anchor** exit.
6. **Review Consequences:** Examine the **Butterfly Effect Timeline Impact Report**.

---

## 3. Third-Person Controls & Timeline Switching Rules

### 3.1 Third-Person Feel
- **Movement:** Responsive camera-relative `WASD` / `Arrow Keys` locomotion on desktop (with virtual pad/buttons considered for mobile), with smooth character turn rotation toward movement direction.
- **Camera:** Smoothly damped third-person follow camera positioned behind and slightly above the player, with gentle yaw orbit and automatic raycast pull-in if cliffs or large trunks obstruct the view.
- **Interaction:** Approaching within `~3` world units of an interactable object illuminates it with a **Chrono Cyan** (`#42D9D0`) ring/highlight and displays an inspect/action prompt.

### 3.2 Timeline Signatures

| Era | Year | Accent Color | 3D Lighting & Atmospheric Identity |
|---|---|---|---|
| **Past** | `1920` | `#C9954B` (Bronze Gold) | Warm amber sunlight, ancient forest canopy, wooden craftsmanship |
| **Present** | `2026` | `#42BFC2` (Chrono Teal) | Cool steel-teal overcast daylight, weathered modern concrete/steel |
| **Future** | `2126` | `#9169DC` (Mystic Violet) | Deep twilight violet mist, bioluminescent flora, futuristic overgrown ruins |

### 3.3 Timeline Continuity & Safety
- **Unified World Coordinates:** Every era renders at the exact same `(x, y, z)` landmark coordinates so the river, banks, trees, and bridge occupy consistent physical space.
- **Temporal Causality:** Changes in `1920` propagate forward to `2026` and `2126`. Changes in `2026` propagate forward to `2126` without altering `1920`.
- **Safe Shifting:** If switching timelines places the player inside newly solid geometry or over unbridged water, the controller automatically repositions the player to the nearest safe riverbank anchor on their current side.

---

## 4. Chrono Energy & Resource Economy

- **Chrono Energy Capacity (MVP):** `100`
- **Action Costs (MVP Defaults):**
  - **Inspect Object:** `0` Energy
  - **Switch Timeline (`1920` / `2026` / `2126`):** `0` Energy
  - **Time Extraction:** `25` Energy
  - **Time Transfer:** `25` Energy
- **Held Time Charge:** In the MVP, the Chrono Core holds **1 active Time Charge** at a time (e.g., `GROWTH_TIME`). The player must transfer the held charge before extracting another.
- **Reset Safety:** Players can reset the level anytime via the HUD or Pause menu.

---

## 5. Chrono Core Actions

### 5.1 MVP Actions *(PLANNED — MVP)*

| Action | Energy Cost | Effect | Rules & Constraints |
|---|---|---|---|
| **Inspect** | `0` | Opens Clue & Object Panel with era lore and temporal eligibility | Triggered within `InteractionSystem` proximity radius |
| **Time Extraction** | `25` | Absorbs temporal essence (e.g., `GROWTH_TIME`) from an eligible 3D object | Source must be extractable; Chrono Core charge slot must be empty |
| **Time Transfer** | `25` | Injects the held Time Charge into a compatible 3D target object | Target must accept that Time Charge type; empties charge slot |

### 5.2 Planned Post-MVP Actions *(FUTURE)*

| Action | Concept | Puzzle Role |
|---|---|---|
| **Freeze** | Encases a 3D object in a Mystic Purple (`#8B70C9`) stasis aura | Prevents an object from decaying, collapsing, or growing across timeline switches |
| **Accelerate** | Spends raw Chrono Energy to advance an object's lifecycle | Ages mechanisms, plants, or structures without an external extraction source |
| **Restore / Reverse** | Rewinds a single object back to an earlier temporal state | Repairs broken objects or reverts unwanted transformations |

---

## 6. Object State Transitions & Puzzle Rules

Objects are finite state machines across the three eras (`1920`, `2026`, `2126`):

```text
[Source Object in 1920] ──(Extract, -25)──► [Depleted State in 1920] ──► [Causal Effects in 2026 & 2126]
[Target Object in 1920] ──(Transfer, -25)─► [Infused State in 1920]  ──► [Matured States in 2026 & 2126]
```

### Core Puzzle Rules
1. **Shared Geography, Altered History:** Landmarks never teleport randomly between eras; the player uses spatial memory across `1920`, `2026`, and `2126`.
2. **Transferable Time:** Growth or energy stolen from one entity alters both its own future and the future of the recipient.
3. **Physical Traversal:** Solving a puzzle requires both triggering the right temporal causality *and* physically navigating the 3D character across the resulting terrain to the goal.

---

## 7. Opening Level Walkthrough: *The Broken Bridge* (MVP)

### Shared 3D Geographical Layout (Consistent Across All 3 Eras)
- **West Bank (`x < 0`):** Player spawn platform, **Mature Tree** landmark, and **Small Seed Plot** near the river edge.
- **The River (`x ≈ 0`):** Deep impassable river channel cutting north-to-south across the valley.
- **Bridge Crossing (`z ≈ 0`):** Fixed crossing coordinates where each era's bridge state exists.
- **East Bank (`x > 0`):** Elevated ancient ruin terrace holding the **Chrono Anchor** exit in `2126`.

### Era-by-Era World States (Before & After Player Action)

#### 1920 – Past
- **Environment:** Ancient low-poly forest bathed in warm bronze light (`#C9954B`), wooden lanterns, lush grass.
- **River & Bridge:** A **broken wooden bridge** whose center planks have collapsed into the river—impassable.
- **Key Objects:** A towering **Mature Tree** pulsing faintly with `GROWTH_TIME`, and a **Small Seed** resting in soil near the bank.
- **Player Action:**
  1. Approach and **Inspect** the Mature Tree and Small Seed.
  2. **Extract `GROWTH_TIME`** from the **Mature Tree** (`-25` Chrono Energy → `75/100` remaining). The Mature Tree visibly loses foliage/vitality into a **Depleted Tree** state.
  3. Walk to the **Small Seed** and **Transfer `GROWTH_TIME`** into it (`-25` Chrono Energy → `50/100` remaining). The seed glows Chrono Cyan and becomes an **Infused Sprout**.

#### 2026 – Present
- **Environment:** Exact same riverbank and cliffs, now under cool Chrono Teal (`#42BFC2`) skies with modern stone/steel guardrails and weathered concrete.
- **River & Bridge:** A **modern, partially damaged bridge** stands at the crossing—cracked and incomplete, still blocking a full crossing.
- **Causal Transformation:**
  - *Before 1920 Transfer:* The seed plot remains barren soil.
  - *After 1920 Transfer:* The infused seed has grown into a thriving **Young Tree** leaning toward the river, while the depleted 1920 tree remains noticeably smaller/weathered—visibly demonstrating the player's past intervention in the present!

#### 2126 – Future
- **Environment:** Same valley transformed into a **futuristic and overgrown environment** under Mystic Violet (`#9169DC`) atmospheric lighting—moss-covered synth-stone ruins, glowing flora, and ancient concrete remnants.
- **Causal Transformation:**
  - *Before 1920 Transfer:* Only ruined bridge abutments remain; the river chasm cannot be crossed.
  - *After 1920 Transfer:* The young tree has matured over a century into a **Giant Tree** whose massive, intertwined **Giant Roots arch across the entire river**, forming a solid, traversable 3D natural pathway from the West Bank to the East Bank!
- **Completion:** The player switches to `2126`, walks up and across the **Giant Roots** in third-person, and steps into the **Chrono Anchor** on the East Bank to complete the level and trigger the **Timeline Impact Report**.

---

## 8. Character Profiles

For the **MVP**, **Arin Vale** is the playable 3D protagonist. The Character Selection screen showcases all four characters (cosmetic preview in MVP; full 3D playable cast planned Post-MVP):

| Character | Title | Lore & Low-Poly Visual Motif | MVP Status |
|---|---|---|---|
| **Arin Vale** | *The Chrono Scout* | Agile temporal field operative in a dark navy cloak with Antique Gold chronometer clasps. | **Playable in MVP *(PLANNED)*** |
| **Mira Sol** | *The Time Scholar* | Archivist of lost eras carrying a luminous Chrono Cyan astrolabe satchel. | Cosmetic Preview / **FUTURE** |
| **Kael Voss** | *The Mechanic* | Clockwork engineer specializing in 1920–2126 industrial machinery and brass gauntlets. | Cosmetic Preview / **FUTURE** |
| **Nyra Quinn** | *The Rift Walker* | Enigmatic wanderer attuned to Mystic Purple temporal anomalies and paradoxes. | Cosmetic Preview / **FUTURE** |

---

## 9. Storyline, Worlds & Endings *(FUTURE — Post-MVP)*

### Narrative Progression Across Five Worlds (~50 Levels)
1. **World 1 — The Lost Kingdom:** Ancient forests, river valleys, and stone ruins (*The Broken Bridge* opens here). Player recovers the first **Chrono Core Fragment**.
2. **World 2 — The Fallen City:** Industrial factories (`1920`) evolving into dense skyscrapers (`2026`) and shattered megastructures (`2126`).
3. **World 3 — The Sunken Era:** Coastal temples and rising sea levels shifting traversable geometry across centuries.
4. **World 4 — The Future Collapse:** High-stakes paradox levels where an **unknown hooded figure** actively alters timelines to block the player.
5. **World 5 — The Timeless Void:** A fractured realm outside normal causality where all **5 Chrono Core fragments** converge and the hooded figure unmasks as **the player's future self**.

### Three Planned Endings *(FUTURE)*
1. **Restore Time:** Return every stolen temporal charge to its origin and seal the Chrono Core.
2. **Rewrite Time:** Keep the completed Chrono Core and forge a new history, accepting the burden of becoming time's architect.
3. **Destroy the Core:** Shatter the Chrono Core permanently so temporal manipulation can never fracture reality again.

---

## 10. Scoring System & Timeline Impact Report

### MVP Impact Report *(PLANNED — MVP)*
Displayed upon completing *The Broken Bridge*:
- **Timeline Summary Cards (`1920`, `2026`, `2126`):** Clear before/after summaries of environmental transformations (e.g., *1920 Seed Infused → 2026 Young Tree Sprouted → 2126 Giant Root Bridge Formed*).
- **Event Log:** Chronological record of timeline switches, extractions, and transfers.
- **Resource Metrics:** Chrono Energy used (`50 / 100`) and remaining (`50 / 100`), switch count, and completion time.

### Post-MVP Three-Star Scoring *(FUTURE)*
- **1 Star:** Complete the level.
- **2 Stars:** Complete within the target Chrono Energy budget.
- **3 Stars:** Complete within optimal Chrono Energy *and* optimal Timeline Switches (or uncover an alternative solution).

---

## 11. Asset, Visual & Audio Direction

### Low-Poly 3D Asset Strategy *(PLANNED)*
- **Stylized Low-Poly Priority:** Flat-shaded or crisp vertex/palette-colored geometry, clean readable silhouettes, and optimized `GLTF/GLB` models—**realistic graphics are explicitly not required**.
- **Placeholder-First Workflow:** Initial playable builds use clean geometric primitives (cylinders, cones, stepped boxes, organic root arches) so gameplay, camera, and colliders are never blocked waiting for bespoke 3D art.
- **Reusable Environmental Kits:** Modular trees, boulders, bridge segments, riverbanks, and ruins recolored/re-lit per era (`1920`, `2026`, `2126`).

### DARK CHRONO Color Discipline
- **UI Surfaces:** `#10131C` (Primary Void) and `#171E32` (Panel Slate)
- **Accents:** `#D6A84F` (Antique Gold), `#42D9D0` (Chrono Cyan), `#C5CEDB` (Moon Silver), `#8B70C9` (Mystic Purple)
- **Timeline Signatures:** `#C9954B` (`1920`), `#42BFC2` (`2026`), `#9169DC` (`2126`)

### Animation & Audio Direction *(PLANNED — Phase 4 Polish)*
- **Character Animation:** Basic low-poly idle breathing, run/walk cycle, and Chrono Core channel pose.
- **VFX:** Chrono Cyan particle stream during Extract/Transfer; soft 3D rim/sky transition pulse when switching timelines (avoiding harsh neon glare).
- **Audio:** Era-specific ambient beds (forest wind `1920`, distant urban/river hum `2026`, ethereal synth chimes `2126`) + subtle mechanical/crystalline SFX with a global mute toggle.
