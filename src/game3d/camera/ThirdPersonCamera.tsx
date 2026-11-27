import { OrbitControls } from '@react-three/drei';

interface ThirdPersonCameraProps {
  target?: [number, number, number];
}

/**
 * Third-person follow/orbit camera framing the player character.
 * Uses Drei OrbitControls with clamped pitch and distance for MVP scene inspection.
 */
export function ThirdPersonCamera({ target = [0, 1.2, 0] }: ThirdPersonCameraProps) {
  return (
    <OrbitControls
      target={target}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={4.5}
      maxDistance={15}
      minPolarAngle={Math.PI * 0.18}
      maxPolarAngle={Math.PI * 0.46}
    />
  );
}
