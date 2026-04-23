'use client';

import { Suspense, useRef } from 'react';
import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const floatTransition = {
  duration: 7,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const
};

function FloatingChip({
  children,
  top,
  left,
  right,
  bottom,
  delay = 0
}: {
  children: React.ReactNode;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
        rotate: [0, -1.5, 0]
      }}
      transition={{
        ...floatTransition,
        delay
      }}
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        padding: '12px 14px',
        borderRadius: 18,
        border: '1px solid var(--border-strong)',
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--surface-soft) 94%, transparent), var(--surface-soft))',
        boxShadow: 'var(--shadow-soft)',
        minWidth: 150,
        backdropFilter: 'blur(10px)',
        zIndex: 3
      }}
    >
      <p className="small" style={{ margin: 0 }}>
        {children}
      </p>
    </motion.div>
  );
}

function OrbitingPanel({
  position,
  rotation,
  scale = 1
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <boxGeometry args={[1.45, 0.9, 0.08]} />
          <meshStandardMaterial
            color="#11192f"
            metalness={0.45}
            roughness={0.35}
            emissive="#2b1c66"
            emissiveIntensity={0.16}
          />
        </mesh>

        <mesh position={[-0.36, 0.2, 0.05]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshStandardMaterial
            color="#8f79ff"
            emissive="#7357ff"
            emissiveIntensity={0.55}
          />
        </mesh>

        <mesh position={[0.05, 0.22, 0.05]}>
          <boxGeometry args={[0.56, 0.06, 0.02]} />
          <meshStandardMaterial color="#d7ddff" emissive="#ffffff" emissiveIntensity={0.08} />
        </mesh>

        <mesh position={[0.05, 0.02, 0.05]}>
          <boxGeometry args={[0.76, 0.05, 0.02]} />
          <meshStandardMaterial color="#96a8d6" />
        </mesh>

        <mesh position={[0.05, -0.15, 0.05]}>
          <boxGeometry args={[0.52, 0.05, 0.02]} />
          <meshStandardMaterial color="#7384ac" />
        </mesh>
      </group>
    </Float>
  );
}

function SceneCluster() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.22,
      0.045
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -state.pointer.x * 0.16,
      0.045
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      state.pointer.x * 0.24,
      0.04
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      state.pointer.y * 0.16,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.5}>
        <group>
          <mesh>
            <icosahedronGeometry args={[1.02, 1]} />
            <meshStandardMaterial
              color="#8b6cff"
              metalness={0.72}
              roughness={0.22}
              emissive="#5a3dff"
              emissiveIntensity={0.35}
            />
          </mesh>

          <mesh scale={1.14}>
            <icosahedronGeometry args={[1.02, 1]} />
            <meshBasicMaterial color="#c9d0ff" wireframe transparent opacity={0.22} />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.72, 0.028, 18, 120]} />
            <meshStandardMaterial
              color="#9a85ff"
              metalness={0.45}
              roughness={0.24}
              emissive="#7055ff"
              emissiveIntensity={0.18}
            />
          </mesh>

          <mesh rotation={[0.8, 0.4, 1.1]}>
            <torusGeometry args={[2.15, 0.018, 18, 120]} />
            <meshBasicMaterial color="#b8c4ff" transparent opacity={0.2} />
          </mesh>

          <mesh rotation={[0.4, 1.2, 0.2]} scale={0.52}>
            <torusKnotGeometry args={[1.4, 0.18, 160, 24]} />
            <meshStandardMaterial
              color="#6a4fff"
              metalness={0.65}
              roughness={0.26}
              emissive="#4f37db"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      </Float>

      <OrbitingPanel position={[-2.35, 0.9, -0.2]} rotation={[0.18, 0.55, -0.08]} scale={0.95} />
      <OrbitingPanel position={[2.1, 1.1, -0.55]} rotation={[-0.12, -0.62, 0.08]} scale={0.9} />
      <OrbitingPanel position={[0.2, -2.0, 0.15]} rotation={[0.1, 0.04, -0.1]} scale={1.02} />
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 5]} intensity={1.35} color="#f6f7ff" />
      <directionalLight position={[-4, -3, -4]} intensity={0.55} color="#6d7dff" />
      <pointLight position={[0, 0, 3.8]} intensity={1.4} color="#8b6cff" />
      <pointLight position={[2.5, 2.5, 1.5]} intensity={0.6} color="#ffffff" />
    </>
  );
}

function CanvasScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <SceneLights />

        <Sparkles
          count={50}
          scale={[8, 6, 6]}
          size={2.2}
          speed={0.25}
          opacity={0.28}
          color="#b9c4ff"
        />

        <mesh position={[0, -2.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.2, 64]} />
          <meshBasicMaterial color="#8b6cff" transparent opacity={0.08} />
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
        minHeight: 520,
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
            'radial-gradient(circle at 68% 30%, rgba(131, 102, 255, 0.14), transparent 22%), radial-gradient(circle at 32% 76%, rgba(131, 102, 255, 0.08), transparent 24%)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          opacity: 0.08,
          maskImage: 'radial-gradient(circle at center, black 54%, transparent 92%)'
        }}
      />

      <CanvasScene />

      <FloatingChip top={28} left={24} delay={0.2}>
        <strong>Graph-aware</strong>
        <br />
        visual context stays linked
      </FloatingChip>

      <FloatingChip top={60} right={28} delay={0.45}>
        <strong>Auto mode</strong>
        <br />
        follows the actual request
      </FloatingChip>

      <FloatingChip bottom={34} left={30} delay={0.75}>
        <strong>Saved sessions</strong>
        <br />
        keep the thread alive
      </FloatingChip>

      <FloatingChip bottom={58} right={34} delay={1.05}>
        <strong>Parent guidance</strong>
        <br />
        simpler explanation flow
      </FloatingChip>

      <div
        style={{
          position: 'absolute',
          left: 20,
          right: 20,
          top: 18,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
          zIndex: 4,
          pointerEvents: 'none'
        }}
      >
        <span className="badge">Real 3D hero scene</span>
        <span className="small">React Three Fiber prototype</span>
      </div>
    </div>
  );
}