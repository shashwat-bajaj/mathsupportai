'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function GraphSheet({
  position,
  rotation,
  scale = 1,
  accent = '#8b6cff',
  opacity = 0.92
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  accent?: string;
  opacity?: number;
}) {
  const curvePoints = [
    [-0.95, -0.38, 0.012],
    [-0.68, -0.18, 0.012],
    [-0.34, 0.08, 0.012],
    [0, 0.22, 0.012],
    [0.34, 0.1, 0.012],
    [0.72, -0.24, 0.012],
    [0.95, -0.46, 0.012]
  ] as [number, number, number][];

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.28}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <planeGeometry args={[2.7, 1.72, 1, 1]} />
          <meshStandardMaterial
            color="#11192d"
            metalness={0.22}
            roughness={0.56}
            transparent
            opacity={opacity}
            emissive="#1a2147"
            emissiveIntensity={0.18}
          />
        </mesh>

        {Array.from({ length: 7 }).map((_, index) => {
          const x = -1.05 + index * 0.35;
          return (
            <Line
              key={`vx-${index}`}
              points={[
                [x, -0.7, 0.01],
                [x, 0.7, 0.01]
              ]}
              color="#8593bc"
              lineWidth={0.8}
              transparent
              opacity={0.12}
            />
          );
        })}

        {Array.from({ length: 5 }).map((_, index) => {
          const y = -0.56 + index * 0.28;
          return (
            <Line
              key={`hy-${index}`}
              points={[
                [-1.18, y, 0.01],
                [1.18, y, 0.01]
              ]}
              color="#8593bc"
              lineWidth={0.8}
              transparent
              opacity={0.12}
            />
          );
        })}

        <Line
          points={[
            [-1.18, 0, 0.012],
            [1.18, 0, 0.012]
          ]}
          color="#dce2ff"
          lineWidth={1.1}
          transparent
          opacity={0.34}
        />

        <Line
          points={[
            [0, -0.72, 0.012],
            [0, 0.72, 0.012]
          ]}
          color="#dce2ff"
          lineWidth={1.1}
          transparent
          opacity={0.34}
        />

        <Line points={curvePoints} color={accent} lineWidth={2.5} />

        {[
          [-0.68, -0.18, 0.018],
          [0, 0.22, 0.018],
          [0.34, 0.1, 0.018],
          [0.72, -0.24, 0.018]
        ].map((point, index) => (
          <mesh
            key={`dot-${index}`}
            position={point as [number, number, number]}
          >
            <sphereGeometry args={[0.03, 18, 18]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function OrbitNode({
  position,
  color,
  size = 0.08,
  speed = 1.2
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.18} floatIntensity={0.34}>
      <mesh position={position}>
        <sphereGeometry args={[size, 18, 18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.42} />
      </mesh>
    </Float>
  );
}

function MathCore() {
  return (
    <Float speed={0.9} rotationIntensity={0.14} floatIntensity={0.2}>
      <group>
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color="#8265ff"
            metalness={0.72}
            roughness={0.24}
            emissive="#5d42ff"
            emissiveIntensity={0.26}
          />
        </mesh>

        <mesh scale={1.18}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshBasicMaterial color="#c7d0ff" wireframe transparent opacity={0.14} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0.2, 0]}>
          <torusGeometry args={[1.28, 0.018, 18, 120]} />
          <meshStandardMaterial
            color="#9a84ff"
            metalness={0.45}
            roughness={0.26}
            emissive="#7158ff"
            emissiveIntensity={0.12}
          />
        </mesh>

        <mesh rotation={[0.6, 1.1, 0.2]}>
          <torusGeometry args={[1.72, 0.012, 18, 120]} />
          <meshBasicMaterial color="#b9c5ff" transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
}

function SceneCluster() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.08,
      0.03
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -state.pointer.x * 0.04,
      0.03
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      state.pointer.x * 0.14,
      0.03
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      state.pointer.y * 0.08,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      <MathCore />

      <GraphSheet
        position={[-1.95, 0.82, -0.54]}
        rotation={[0.14, 0.44, -0.08]}
        scale={0.9}
        accent="#8f79ff"
        opacity={0.9}
      />

      <GraphSheet
        position={[1.95, 0.96, -0.74]}
        rotation={[-0.08, -0.46, 0.06]}
        scale={0.82}
        accent="#7bcfff"
        opacity={0.78}
      />

      <GraphSheet
        position={[0.18, -1.58, 0.08]}
        rotation={[0.08, 0.03, -0.04]}
        scale={1}
        accent="#9b86ff"
        opacity={0.96}
      />

      <OrbitNode position={[-1.15, -0.08, 1.0]} color="#8f79ff" size={0.08} speed={1.4} />
      <OrbitNode position={[1.28, 0.26, 1.12]} color="#83d6ff" size={0.07} speed={1.1} />
      <OrbitNode position={[0.02, 1.32, 0.72]} color="#dde2ff" size={0.055} speed={1.3} />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[4, 5, 5]} intensity={1.24} color="#f7f8ff" />
      <directionalLight position={[-4, -3, -4]} intensity={0.45} color="#6f82ff" />
      <pointLight position={[0, 0, 4]} intensity={1.25} color="#8366ff" />
      <pointLight position={[2.4, 2.1, 1.6]} intensity={0.48} color="#ffffff" />
    </>
  );
}

function CanvasScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <SceneLights />

        <Sparkles
          count={32}
          scale={[8, 6, 6]}
          size={1.8}
          speed={0.18}
          opacity={0.16}
          color="#bac5ff"
        />

        <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.1, 64]} />
          <meshBasicMaterial color="#8366ff" transparent opacity={0.055} />
        </mesh>

        <SceneCluster />
      </Suspense>
    </Canvas>
  );
}

export default function HomeHeroScene() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: 540,
        borderRadius: 30,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 96%, transparent), var(--panel-strong))',
        boxShadow: 'var(--shadow-float)',
        isolation: 'isolate'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 66% 30%, rgba(131, 102, 255, 0.13), transparent 22%), radial-gradient(circle at 30% 78%, rgba(123, 203, 255, 0.07), transparent 24%)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.08,
          maskImage: 'radial-gradient(circle at center, black 54%, transparent 92%)'
        }}
      />

      <CanvasScene />
    </div>
  );
}