"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useThemeInk } from "./useThemeInk";

function RotatingIcosahedron({ color }: { color: string }) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 0]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

export default function WireframeObject() {
  const ink = useThemeInk();
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <RotatingIcosahedron color={ink} />
    </Canvas>
  );
}
