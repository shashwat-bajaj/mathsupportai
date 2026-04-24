'use client';

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Ref
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type GraphSurfaceProps = {
  innerRef?: Ref<THREE.Group>;
  accent?: string;
  secondary?: string;
  opacity?: number;
};

function GraphSurface({
  innerRef,
  accent = '#8b6cff',
  secondary = '#7bcfff',
  opacity = 0.42
}: GraphSurfaceProps) {
  const primaryCurve = useMemo(
    () =>
      [
        [-1.15, -0.42, 0.012],
        [-0.82, -0.22, 0.012],
        [-0.46, 0.08, 0.012],
        [-0.1, 0.28, 0.012],
        [0.28, 0.18, 0.012],
        [0.7, -0.12, 0.012],
        [1.1, -0.46, 0.012]
      ] as [number, number, number][],
    []
  );

  const secondaryCurve = useMemo(
    () =>
      [
        [-1.15, 0.32, 0.012],
        [-0.7, 0.18, 0.012],
        [-0.25, -0.02, 0.012],
        [0.22, -0.08, 0.012],
        [0.76, 0.14, 0.012],
        [1.12, 0.34, 0.012]
      ] as [number, number, number][],
    []
  );

  const highlightPoints = useMemo(
    () =>
      [
        [-0.82, -0.22, 0.02],
        [-0.1, 0.28, 0.02],
        [0.28, 0.18, 0.02],
        [0.7, -0.12, 0.02]
      ] as [number, number, number][],
    []
  );

  return (
    <group ref={innerRef}>
      <mesh>
        <planeGeometry args={[3.4, 2.05, 1, 1]} />
        <meshStandardMaterial
          color="#0f162b"
          metalness={0.14}
          roughness={0.76}
          transparent
          opacity={opacity}
          emissive="#131c3c"
          emissiveIntensity={0.1}
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
      <Line
        points={secondaryCurve}
        color={secondary}
        lineWidth={1.8}
        transparent
        opacity={0.62}
      />

      {highlightPoints.map((point, index) => (
        <mesh key={`point-${index}`} position={point}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.34} />
        </mesh>
      ))}
    </group>
  );
}

type OrbitNodeProps = {
  innerRef?: Ref<THREE.Mesh>;
  position: [number, number, number];
  color: string;
  size?: number;
};

function OrbitNode({ innerRef, position, color, size = 0.075 }: OrbitNodeProps) {
  return (
    <mesh ref={innerRef} position={position}>
      <sphereGeometry args={[size, 18, 18]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.28} />
    </mesh>
  );
}

function CameraRig({ progress }: { progress: number }) {
  const { camera, pointer } = useThree();
  const eased = useRef(progress);

  useFrame(() => {
    eased.current = THREE.MathUtils.lerp(eased.current, progress, 0.06);

    const p = eased.current;
    const targetX = pointer.x * 0.18;
    const targetY = 0.06 + pointer.y * 0.12 + p * 0.08;
    const targetZ = 6.4 - p * 1.15;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    camera.lookAt(0.2 * p, 0.05, 0);
  });

  return null;
}

function ConnectionLines({ progress }: { progress: number }) {
  const p = progress;

  const first = [
    [lerp(-1.15, -0.65, p), lerp(-1.2, -0.35, p), lerp(-0.9, -0.45, p)],
    [lerp(-0.1, 0.08, p), lerp(-0.45, -0.05, p), lerp(-0.3, -0.18, p)],
    [lerp(0.95, 0.1, p), lerp(0.1, 0.14, p), lerp(-0.2, -0.42, p)]
  ] as [number, number, number][];

  const second = [
    [lerp(-2.0, -1.25, p), lerp(1.05, 0.55, p), lerp(-1.45, -0.82, p)],
    [lerp(-0.48, -0.2, p), lerp(0.54, 0.28, p), lerp(-0.68, -0.42, p)],
    [lerp(0.95, 0.1, p), lerp(0.1, 0.14, p), lerp(-0.2, -0.42, p)]
  ] as [number, number, number][];

  return (
    <>
      <Line
        color="#9ca8d8"
        lineWidth={1.15}
        transparent
        opacity={0.14 + p * 0.08}
        points={first}
      />
      <Line
        color="#9ca8d8"
        lineWidth={1.15}
        transparent
        opacity={0.12 + p * 0.08}
        points={second}
      />
    </>
  );
}

function SceneRig({ progress }: { progress: number }) {
  const rootRef = useRef<THREE.Group>(null);
  const mainRef = useRef<THREE.Group>(null);
  const upperRef = useRef<THREE.Group>(null);
  const lowerRef = useRef<THREE.Group>(null);
  const nodeARef = useRef<THREE.Mesh>(null);
  const nodeBRef = useRef<THREE.Mesh>(null);
  const nodeCRef = useRef<THREE.Mesh>(null);
  const eased = useRef(progress);

  useFrame((state, delta) => {
    eased.current = THREE.MathUtils.lerp(eased.current, progress, 0.06);
    const p = eased.current;

    if (rootRef.current) {
      rootRef.current.rotation.y += delta * 0.018;
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        state.pointer.y * 0.025,
        0.03
      );
      rootRef.current.rotation.z = THREE.MathUtils.lerp(
        rootRef.current.rotation.z,
        -state.pointer.x * 0.02,
        0.03
      );
      rootRef.current.position.x = THREE.MathUtils.lerp(
        rootRef.current.position.x,
        state.pointer.x * 0.08,
        0.03
      );
      rootRef.current.position.y = THREE.MathUtils.lerp(
        rootRef.current.position.y,
        state.pointer.y * 0.04,
        0.03
      );
    }

    if (mainRef.current) {
      mainRef.current.position.x = THREE.MathUtils.lerp(
        mainRef.current.position.x,
        lerp(0.95, 0.1, p),
        0.06
      );
      mainRef.current.position.y = THREE.MathUtils.lerp(
        mainRef.current.position.y,
        lerp(0.1, 0.14, p),
        0.06
      );
      mainRef.current.position.z = THREE.MathUtils.lerp(
        mainRef.current.position.z,
        lerp(-0.2, -0.42, p),
        0.06
      );
      mainRef.current.rotation.x = THREE.MathUtils.lerp(
        mainRef.current.rotation.x,
        lerp(-0.1, -0.05, p),
        0.06
      );
      mainRef.current.rotation.y = THREE.MathUtils.lerp(
        mainRef.current.rotation.y,
        lerp(-0.34, 0.06, p),
        0.06
      );
      mainRef.current.rotation.z = THREE.MathUtils.lerp(
        mainRef.current.rotation.z,
        lerp(0.04, 0.01, p),
        0.06
      );
      const s = lerp(1.08, 1.16, p);
      mainRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.06);
    }

    if (upperRef.current) {
      upperRef.current.position.x = THREE.MathUtils.lerp(
        upperRef.current.position.x,
        lerp(-1.95, -1.2, p),
        0.06
      );
      upperRef.current.position.y = THREE.MathUtils.lerp(
        upperRef.current.position.y,
        lerp(1.05, 0.52, p),
        0.06
      );
      upperRef.current.position.z = THREE.MathUtils.lerp(
        upperRef.current.position.z,
        lerp(-1.45, -0.82, p),
        0.06
      );
      upperRef.current.rotation.x = THREE.MathUtils.lerp(
        upperRef.current.rotation.x,
        lerp(0.14, 0.08, p),
        0.06
      );
      upperRef.current.rotation.y = THREE.MathUtils.lerp(
        upperRef.current.rotation.y,
        lerp(0.48, 0.28, p),
        0.06
      );
      upperRef.current.rotation.z = THREE.MathUtils.lerp(
        upperRef.current.rotation.z,
        lerp(-0.05, -0.02, p),
        0.06
      );
      const s = lerp(0.76, 0.9, p);
      upperRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.06);
    }

    if (lowerRef.current) {
      lowerRef.current.position.x = THREE.MathUtils.lerp(
        lowerRef.current.position.x,
        lerp(-1.05, 1.2, p),
        0.06
      );
      lowerRef.current.position.y = THREE.MathUtils.lerp(
        lowerRef.current.position.y,
        lerp(-1.28, -0.98, p),
        0.06
      );
      lowerRef.current.position.z = THREE.MathUtils.lerp(
        lowerRef.current.position.z,
        lerp(-0.85, -0.55, p),
        0.06
      );
      lowerRef.current.rotation.x = THREE.MathUtils.lerp(
        lowerRef.current.rotation.x,
        lerp(0.12, 0.02, p),
        0.06
      );
      lowerRef.current.rotation.y = THREE.MathUtils.lerp(
        lowerRef.current.rotation.y,
        lerp(0.18, -0.22, p),
        0.06
      );
      lowerRef.current.rotation.z = THREE.MathUtils.lerp(
        lowerRef.current.rotation.z,
        lerp(0.05, 0.01, p),
        0.06
      );
      const s = lerp(0.62, 0.84, p);
      lowerRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.06);
    }

    if (nodeARef.current) {
      nodeARef.current.position.x = THREE.MathUtils.lerp(
        nodeARef.current.position.x,
        lerp(-0.15, -0.32, p),
        0.06
      );
      nodeARef.current.position.y = THREE.MathUtils.lerp(
        nodeARef.current.position.y,
        lerp(0.94, 1.08, p),
        0.06
      );
      nodeARef.current.position.z = THREE.MathUtils.lerp(
        nodeARef.current.position.z,
        lerp(0.8, 0.66, p),
        0.06
      );
    }

    if (nodeBRef.current) {
      nodeBRef.current.position.x = THREE.MathUtils.lerp(
        nodeBRef.current.position.x,
        lerp(1.58, 1.42, p),
        0.06
      );
      nodeBRef.current.position.y = THREE.MathUtils.lerp(
        nodeBRef.current.position.y,
        lerp(0.34, 0.18, p),
        0.06
      );
      nodeBRef.current.position.z = THREE.MathUtils.lerp(
        nodeBRef.current.position.z,
        lerp(0.95, 0.72, p),
        0.06
      );
    }

    if (nodeCRef.current) {
      nodeCRef.current.position.x = THREE.MathUtils.lerp(
        nodeCRef.current.position.x,
        lerp(-1.28, -0.92, p),
        0.06
      );
      nodeCRef.current.position.y = THREE.MathUtils.lerp(
        nodeCRef.current.position.y,
        lerp(-0.18, -0.32, p),
        0.06
      );
      nodeCRef.current.position.z = THREE.MathUtils.lerp(
        nodeCRef.current.position.z,
        lerp(0.86, 0.7, p),
        0.06
      );
    }
  });

  return (
    <group ref={rootRef}>
      <ConnectionLines progress={progress} />

      <GraphSurface
        innerRef={mainRef}
        accent="#8f79ff"
        secondary="#7bcfff"
        opacity={0.52}
      />

      <GraphSurface
        innerRef={upperRef}
        accent="#8f79ff"
        secondary="#a7b7ff"
        opacity={0.3}
      />

      <GraphSurface
        innerRef={lowerRef}
        accent="#7bcfff"
        secondary="#8f79ff"
        opacity={0.34}
      />

      <OrbitNode innerRef={nodeARef} position={[-0.15, 0.94, 0.8]} color="#dce1ff" size={0.055} />
      <OrbitNode innerRef={nodeBRef} position={[1.58, 0.34, 0.95]} color="#8bd4ff" size={0.07} />
      <OrbitNode innerRef={nodeCRef} position={[-1.28, -0.18, 0.86]} color="#8f79ff" size={0.078} />
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

function CanvasScene({ progress }: { progress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 36 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <CameraRig progress={progress} />
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

        <SceneRig progress={progress} />
      </Suspense>
    </Canvas>
  );
}

export default function HomeHeroScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function update() {
      const heroRange = window.innerHeight * 1.5;
      const progress = clamp(window.scrollY / heroRange, 0, 1);
      setScrollProgress(progress);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

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

      <CanvasScene progress={scrollProgress} />

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