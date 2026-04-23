'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function GraphSurface({
  position,
  rotation,
  scale = 1,
  accent = '#8b6cff',
  secondary = '#7bcfff',
  opacity = 0.5
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  accent?: string;
  secondary?: string;
  opacity?: number;
}) {
  const primaryCurve = [
    [-1.15, -0.42, 0.012],
    [-0.82, -0.22, 0.012],
    [-0.46, 0.08, 0.012],
    [-0.1, 0.28, 0.012],
    [0.28, 0.18, 0.012],
    [0.7, -0.12, 0.012],
    [1.1, -0.46, 0.012]
  ] as [number, number, number][];

  const secondaryCurve = [
    [-1.15, 0.32, 0.012],
    [-0.7, 0.18, 0.012],
    [-0.25, -0.02, 0.012],
    [0.22, -0.08, 0.012],
    [0.76, 0.14, 0.012],
    [1.12, 0.34, 0.012]
  ] as [number, number, number][];

  return (
    <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.18}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <planeGeometry args={[3.4, 2.05, 1, 1]} />
          <meshStandardMaterial
            color="#0f162b"
            metalness={0.16}
            roughness={0.72}
            transparent
            opacity={opacity}
            emissive="#131c3c"
            emissiveIntensity={0.12}
          />
        </mesh>

        {Array.from({ length: 9 }).map((_, index) => {
          const x = -1.4 + index * 0.35;
          return (
            <Line
              key={`vx-${index}`}
              points={[
                [x, -0.82, 0.01],
                [x, 0.82, 0.01]
              ]}
              color="#8090bc"
              lineWidth={0.7}
              transparent
              opacity={0.12}
            />
          );
        })}

        {Array.from({ length: 6 }).map((_, index) => {
          const y = -0.7 + index * 0.28;
          return (
            <Line
              key={`hy-${index}`}
              points={[
                [-1.55, y, 0.01],
                [1.55, y, 0.01]
              ]}
              color="#8090bc"
              lineWidth={0.7}
              transparent
              opacity={0.12}
            />
          );
        })}

        <Line
          points={[
            [-1.55, 0, 0.012],
            [1.55, 0, 0.012]
          ]}
          color="#d9defe"
          lineWidth={1.05}
          transparent
          opacity={0.28}
        />

        <Line
          points={[
            [0, -0.82, 0.012],
            [0, 0.82, 0.012]
          ]}
          color="#d9defe"
          lineWidth={1.05}
          transparent
          opacity={0.28}
        />

        <Line points={primaryCurve} color={accent} lineWidth={2.3} />
        <Line points={secondaryCurve} color={secondary} lineWidth={1.8} transparent opacity={0.62} />

        {[
          [-0.82, -0.22, 0.02],
          [-0.1, 0.28, 0.02],
          [0.28, 0.18, 0.02],
          [0.7, -0.12, 0.02]
        ].map((point, index) => (
          <mesh key={`point-${index}`} position={point as [number, number, number]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.34} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function OrbitNode({
  position,
  color,
  size = 0.075,
  speed = 1
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.12} floatIntensity={0.18}>
      <mesh position={position}>
        <sphereGeometry args={[size, 18, 18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.28} />
      </mesh>
    </Float>
  );
}

function SceneRig() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.03;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.04,
      0.025
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -state.pointer.x * 0.025,
      0.025
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      state.pointer.x * 0.1,
      0.025
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      state.pointer.y * 0.05,
      0.025
    );
  });

  return (
    <group ref={groupRef}>
      <GraphSurface
        position={[0.95, 0.1, -0.2]}
        rotation={[-0.1, -0.34, 0.04]}
        scale={1.08}
        accent="#8f79ff"
        secondary="#7bcfff"
        opacity={0.5}
      />

      <GraphSurface
        position={[-1.95, 1.05, -1.45]}
        rotation={[0.14, 0.48, -0.05]}
        scale={0.76}
        accent="#8f79ff"
        secondary="#a7b7ff"
        opacity={0.32}
      />

      <GraphSurface
        position={[-1.05, -1.28, -0.85]}
        rotation={[0.12, 0.18, 0.05]}
        scale={0.62}
        accent="#7bcfff"
        secondary="#8f79ff"
        opacity={0.34}
      />

      <Line
        points={[
          [-1.05, -1.28, -0.85],
          [0.12, -0.52, -0.18],
          [0.95, 0.1, -0.2]
        ]}
        color="#9ca8d8"
        lineWidth={1.1}
        transparent
        opacity={0.16}
      />

      <Line
        points={[
          [-1.95, 1.05, -1.45],
          [-0.38, 0.54, -0.68],
          [0.95, 0.1, -0.2]
        ]}
        color="#9ca8d8"
        lineWidth={1.1}
        transparent
        opacity={0.14}
      />

      <OrbitNode position={[-0.15, 0.94, 0.8]} color="#dce1ff" size={0.055} speed={1.1} />
      <OrbitNode position={[1.58, 0.34, 0.95]} color="#8bd4ff" size={0.07} speed={0.9} />
      <OrbitNode position={[-1.28, -0.18, 0.86]} color="#8f79ff" size={0.078} speed={1.2} />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.05} color="#f8f9ff" />
      <directionalLight position={[-5, -2, -4]} intensity={0.32} color="#7084ff" />
      <pointLight position={[0, 0, 4.4]} intensity={1.05} color="#8366ff" />
      <pointLight position={[2.6, 2.1, 2]} intensity={0.35} color="#ffffff" />
    </>
  );
}

function CanvasScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 36 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <SceneLights />

        <Sparkles
          count={24}
          scale={[8, 5.2, 5.6]}
          size={1.7}
          speed={0.16}
          opacity={0.12}
          color="#bac5ff"
        />

        <mesh position={[0, -2.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.2, 64]} />
          <meshBasicMaterial color="#8366ff" transparent opacity={0.04} />
        </mesh>

        <SceneRig />
      </Suspense>
    </Canvas>
  );
}

export default function HomeHeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, rgba(7, 10, 20, 0.82), rgba(8, 13, 24, 0.48) 36%, rgba(8, 13, 24, 0.2) 100%)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 68% 34%, rgba(131, 102, 255, 0.16), transparent 24%), radial-gradient(circle at 26% 74%, rgba(123, 207, 255, 0.08), transparent 22%)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          opacity: 0.08,
          maskImage: 'radial-gradient(circle at center, black 56%, transparent 94%)'
        }}
      />

      <CanvasScene />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(5, 8, 19, 0.82) 0%, rgba(5, 8, 19, 0.6) 24%, rgba(5, 8, 19, 0.12) 52%, rgba(5, 8, 19, 0.42) 100%)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(5, 8, 19, 0.22) 0%, rgba(5, 8, 19, 0.04) 26%, rgba(5, 8, 19, 0.24) 100%)'
        }}
      />
    </div>
  );
}