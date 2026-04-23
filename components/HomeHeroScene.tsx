'use client';

import { Suspense, useRef } from 'react';
import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function GraphPanel({
  position,
  rotation,
  scale = 1,
  accent = '#8b6cff'
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  accent?: string;
}) {
  const curvePoints = [
    [-0.62, -0.26, 0.01],
    [-0.36, -0.08, 0.01],
    [-0.14, 0.14, 0.01],
    [0.08, 0.22, 0.01],
    [0.3, 0.08, 0.01],
    [0.56, -0.18, 0.01]
  ] as [number, number, number][];

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <planeGeometry args={[1.85, 1.16, 1, 1]} />
          <meshStandardMaterial
            color="#121b31"
            metalness={0.3}
            roughness={0.45}
            emissive="#1d2550"
            emissiveIntensity={0.18}
            transparent
            opacity={0.95}
          />
        </mesh>

        <Line
          points={[
            [-0.74, -0.34, 0.012],
            [0.74, -0.34, 0.012]
          ]}
          color="#8898c8"
          lineWidth={1}
          transparent
          opacity={0.75}
        />

        <Line
          points={[
            [-0.52, -0.46, 0.012],
            [-0.52, 0.42, 0.012]
          ]}
          color="#8898c8"
          lineWidth={1}
          transparent
          opacity={0.75}
        />

        <Line points={curvePoints} color={accent} lineWidth={2.4} />

        <mesh position={[-0.52, -0.34, 0.02]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial color="#d9deff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>

        <mesh position={[-0.16, 0.12, 0.02]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} />
        </mesh>

        <mesh position={[0.3, 0.08, 0.02]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} />
        </mesh>

        <mesh position={[0.52, -0.14, 0.02]}>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

function roundedPlaneGeometry({
  args
}: {
  args: [number, number, number];
}) {
  return <planeGeometry args={[args[0], args[1], 1, 1]} />;
}

function TutorCore() {
  return (
    <Float speed={1.05} rotationIntensity={0.15} floatIntensity={0.35}>
      <group>
        <mesh>
          <icosahedronGeometry args={[0.92, 1]} />
          <meshStandardMaterial
            color="#8467ff"
            metalness={0.72}
            roughness={0.22}
            emissive="#5f42ff"
            emissiveIntensity={0.28}
          />
        </mesh>

        <mesh scale={1.16}>
          <icosahedronGeometry args={[0.92, 1]} />
          <meshBasicMaterial color="#cad2ff" wireframe transparent opacity={0.16} />
        </mesh>

        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[1.46, 0.026, 18, 120]} />
          <meshStandardMaterial
            color="#9f8aff"
            metalness={0.48}
            roughness={0.24}
            emissive="#7357ff"
            emissiveIntensity={0.18}
          />
        </mesh>

        <mesh rotation={[0.6, 1.15, 0.2]}>
          <torusGeometry args={[1.98, 0.018, 18, 120]} />
          <meshBasicMaterial color="#b9c4ff" transparent opacity={0.16} />
        </mesh>

        <mesh position={[0, 0, 0]} scale={0.34}>
          <torusKnotGeometry args={[1.1, 0.16, 160, 24]} />
          <meshStandardMaterial
            color="#5b43df"
            metalness={0.62}
            roughness={0.28}
            emissive="#4733bf"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function AxisField() {
  return (
    <group position={[0, -0.15, -1.2]}>
      {Array.from({ length: 9 }).map((_, index) => {
        const x = -3.2 + index * 0.8;
        return (
          <Line
            key={`v-${index}`}
            points={[
              [x, -2.1, 0],
              [x, 2.1, 0]
            ]}
            color="#7f8bb5"
            lineWidth={0.6}
            transparent
            opacity={0.14}
          />
        );
      })}

      {Array.from({ length: 7 }).map((_, index) => {
        const y = -1.8 + index * 0.6;
        return (
          <Line
            key={`h-${index}`}
            points={[
              [-3.6, y, 0],
              [3.6, y, 0]
            ]}
            color="#7f8bb5"
            lineWidth={0.6}
            transparent
            opacity={0.14}
          />
        );
      })}

      <Line
        points={[
          [-3.6, 0, 0.01],
          [3.6, 0, 0.01]
        ]}
        color="#d8defe"
        lineWidth={1.1}
        transparent
        opacity={0.3}
      />

      <Line
        points={[
          [0, -2.1, 0.01],
          [0, 2.1, 0.01]
        ]}
        color="#d8defe"
        lineWidth={1.1}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

function SceneCluster() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.14,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -state.pointer.x * 0.08,
      0.04
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      state.pointer.x * 0.18,
      0.04
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      state.pointer.y * 0.1,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <AxisField />
      <TutorCore />

      <GraphPanel
        position={[-2.15, 0.9, -0.45]}
        rotation={[0.16, 0.55, -0.08]}
        scale={0.9}
        accent="#8f79ff"
      />

      <GraphPanel
        position={[2.05, 1.05, -0.68]}
        rotation={[-0.12, -0.58, 0.08]}
        scale={0.86}
        accent="#7bcbff"
      />

      <GraphPanel
        position={[0.35, -1.78, 0.18]}
        rotation={[0.08, 0.02, -0.06]}
        scale={0.98}
        accent="#9d84ff"
      />

      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.42}>
        <mesh position={[-1.15, -0.25, 1.05]}>
          <sphereGeometry args={[0.085, 18, 18]} />
          <meshStandardMaterial color="#8f79ff" emissive="#6f57ff" emissiveIntensity={0.55} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.46}>
        <mesh position={[1.35, 0.28, 1.18]}>
          <sphereGeometry args={[0.075, 18, 18]} />
          <meshStandardMaterial color="#8ad6ff" emissive="#5fb8ff" emissiveIntensity={0.48} />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.38}>
        <mesh position={[0.05, 1.5, 0.7]}>
          <sphereGeometry args={[0.06, 18, 18]} />
          <meshStandardMaterial color="#dce1ff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 5]} intensity={1.28} color="#f7f8ff" />
      <directionalLight position={[-4, -3, -4]} intensity={0.5} color="#6d7dff" />
      <pointLight position={[0, 0, 4]} intensity={1.4} color="#8b6cff" />
      <pointLight position={[2.8, 2.4, 1.8]} intensity={0.55} color="#ffffff" />
    </>
  );
}

function CanvasScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.1], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <SceneLights />

        <Sparkles
          count={44}
          scale={[8, 6, 6]}
          size={2.1}
          speed={0.22}
          opacity={0.22}
          color="#bac5ff"
        />

        <mesh position={[0, -2.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.25, 64]} />
          <meshBasicMaterial color="#8b6cff" transparent opacity={0.07} />
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
            'radial-gradient(circle at 66% 30%, rgba(131, 102, 255, 0.14), transparent 22%), radial-gradient(circle at 30% 78%, rgba(123, 203, 255, 0.08), transparent 24%)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          opacity: 0.08,
          maskImage: 'radial-gradient(circle at center, black 54%, transparent 92%)'
        }}
      />

      <CanvasScene />

      <div
        style={{
          position: 'absolute',
          left: 22,
          top: 18,
          zIndex: 4,
          pointerEvents: 'none'
        }}
      >
        <span className="badge">Live tutor scene</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: 22,
          right: 22,
          bottom: 18,
          zIndex: 4,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '12px 14px',
          borderRadius: 18,
          border: '1px solid var(--border)',
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--surface-soft) 94%, transparent), var(--surface-soft))',
          backdropFilter: 'blur(10px)'
        }}
      >
        <span className="small">Graphing, follow-ups, and context stay connected.</span>
        <span className="small">Built around a calmer math flow.</span>
      </motion.div>
    </div>
  );
}