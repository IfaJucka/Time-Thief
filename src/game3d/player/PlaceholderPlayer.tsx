import { DARK_CHRONO_COLORS } from '../../shared';

interface PlaceholderPlayerProps {
  position?: [number, number, number];
}

/**
 * Stylized low-poly placeholder character representing the Chrono Scout.
 * Will be paired with PlayerController and swappable GLB assets in Phase 2+.
 */
export function PlaceholderPlayer({ position = [0, 0, 0] }: PlaceholderPlayerProps) {
  return (
    <group position={position}>
      {/* Boots / Base */}
      <mesh position={[-0.16, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.5, 0.24]} />
        <meshStandardMaterial color="#1D253B" roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0.16, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.5, 0.24]} />
        <meshStandardMaterial color="#1D253B" roughness={0.85} flatShading />
      </mesh>

      {/* Torso / Cloak */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.42, 0.9, 6]} />
        <meshStandardMaterial
          color={DARK_CHRONO_COLORS.SECONDARY_BACKGROUND}
          roughness={0.8}
          flatShading
        />
      </mesh>

      {/* Antique Gold Shoulder Trim */}
      <mesh position={[0, 1.32, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.32, 0.14, 6]} />
        <meshStandardMaterial
          color={DARK_CHRONO_COLORS.ANTIQUE_GOLD}
          metalness={0.4}
          roughness={0.5}
          flatShading
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.68, 0]} castShadow>
        <dodecahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={DARK_CHRONO_COLORS.MOON_SILVER}
          roughness={0.75}
          flatShading
        />
      </mesh>

      {/* Chrono Core Emblem on Back */}
      <mesh position={[0, 1.0, 0.34]} castShadow>
        <octahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial
          color={DARK_CHRONO_COLORS.CHRONO_CYAN}
          emissive={DARK_CHRONO_COLORS.CHRONO_CYAN}
          emissiveIntensity={0.65}
          roughness={0.3}
          flatShading
        />
      </mesh>
    </group>
  );
}
