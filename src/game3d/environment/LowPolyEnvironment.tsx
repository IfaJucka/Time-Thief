import { DARK_CHRONO_COLORS } from '../../shared';

interface TreeProps {
  position: [number, number, number];
  scale?: number;
}

function LowPolyTree({ position, scale = 1 }: TreeProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.34, 1.5, 6]} />
        <meshStandardMaterial
          color={DARK_CHRONO_COLORS.TIMELINE_ACCENTS.PAST}
          roughness={0.9}
          flatShading
        />
      </mesh>
      <mesh position={[0, 2.0, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.15, 1.9, 6]} />
        <meshStandardMaterial color="#21424E" roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 2.95, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.8, 1.4, 6]} />
        <meshStandardMaterial
          color={DARK_CHRONO_COLORS.TIMELINE_ACCENTS.PRESENT}
          roughness={0.85}
          flatShading
        />
      </mesh>
    </group>
  );
}

interface RockProps {
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
}

function LowPolyRock({ position, scale = 1, rotationY = 0 }: RockProps) {
  return (
    <mesh
      position={position}
      scale={[scale * 1.2, scale * 0.8, scale]}
      rotation={[0.15, rotationY, 0.1]}
      castShadow
      receiveShadow
    >
      <dodecahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color="#343D56" roughness={0.95} flatShading />
    </mesh>
  );
}

const TREE_POSITIONS: ReadonlyArray<{ position: [number, number, number]; scale: number }> = [
  { position: [-6, 0, -5], scale: 1.15 },
  { position: [-8.5, 0, 1.5], scale: 0.95 },
  { position: [6.5, 0, -4.5], scale: 1.25 },
  { position: [8, 0, 3], scale: 0.9 },
  { position: [-2.5, 0, -8.5], scale: 1.05 },
  { position: [3.5, 0, -9], scale: 1.1 },
];

const ROCK_POSITIONS: ReadonlyArray<{
  position: [number, number, number];
  scale: number;
  rotationY: number;
}> = [
  { position: [-3.8, 0.35, -2.5], scale: 1.1, rotationY: 0.4 },
  { position: [4.2, 0.3, -1.8], scale: 0.85, rotationY: 1.3 },
  { position: [-5.2, 0.4, 3.8], scale: 1.25, rotationY: 2.1 },
  { position: [5.5, 0.25, 4.6], scale: 0.75, rotationY: 0.9 },
];

/**
 * Stylized low-poly ground, simple Dark Chrono lighting, and basic trees & rocks.
 */
export function LowPolyEnvironment() {
  return (
    <>
      <color attach="background" args={[DARK_CHRONO_COLORS.MAIN_BACKGROUND]} />
      <fog attach="fog" args={[DARK_CHRONO_COLORS.MAIN_BACKGROUND, 18, 52]} />

      <ambientLight intensity={0.45} color={DARK_CHRONO_COLORS.MOON_SILVER} />
      <hemisphereLight
        args={[
          DARK_CHRONO_COLORS.MYSTIC_PURPLE,
          DARK_CHRONO_COLORS.SECONDARY_BACKGROUND,
          0.6,
        ]}
      />
      <directionalLight
        position={[10, 14, 8]}
        intensity={1.35}
        color={DARK_CHRONO_COLORS.ANTIQUE_GOLD}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <pointLight
        position={[-6, 4, -4]}
        intensity={12}
        distance={22}
        color={DARK_CHRONO_COLORS.CHRONO_CYAN}
      />

      {/* Low-poly ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[28, 24]} />
        <meshStandardMaterial
          color={DARK_CHRONO_COLORS.SECONDARY_BACKGROUND}
          roughness={0.95}
          flatShading
        />
      </mesh>

      {/* Subtle central stone dais */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.5, 0.08, 8]} />
        <meshStandardMaterial color="#212B45" roughness={0.9} flatShading />
      </mesh>

      {TREE_POSITIONS.map((tree, index) => (
        <LowPolyTree key={`tree-${index}`} position={tree.position} scale={tree.scale} />
      ))}

      {ROCK_POSITIONS.map((rock, index) => (
        <LowPolyRock
          key={`rock-${index}`}
          position={rock.position}
          scale={rock.scale}
          rotationY={rock.rotationY}
        />
      ))}
    </>
  );
}
