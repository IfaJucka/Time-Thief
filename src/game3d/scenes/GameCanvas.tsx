import type { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { ThirdPersonCamera } from '../camera/ThirdPersonCamera';
import { LowPolyEnvironment } from '../environment/LowPolyEnvironment';
import { PlaceholderPlayer } from '../player/PlaceholderPlayer';

export interface GameCanvasProps {
  children?: ReactNode;
}

/**
 * Reusable React Three Fiber <Canvas> host for TIME THIEF 3D scenes.
 * Renders the baseline Dark Chrono low-poly world, third-person camera, and placeholder player.
 */
export function GameCanvas({ children }: GameCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 50, near: 0.1, far: 150, position: [0, 4.5, 8.5] }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <LowPolyEnvironment />
      <PlaceholderPlayer position={[0, 0, 0]} />
      <ThirdPersonCamera target={[0, 1.2, 0]} />
      {children}
    </Canvas>
  );
}
