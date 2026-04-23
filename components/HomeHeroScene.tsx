'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react';

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

export default function HomeHeroScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.4 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const sceneTranslateX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const sceneTranslateY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const orbTranslateX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const orbTranslateY = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        minHeight: 500,
        borderRadius: 30,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 96%, transparent), var(--panel-strong))',
        boxShadow: 'var(--shadow-float)',
        isolation: 'isolate',
        perspective: 1400
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: -80,
          background:
            'radial-gradient(circle at 70% 32%, rgba(131, 102, 255, 0.18), transparent 22%), radial-gradient(circle at 34% 74%, rgba(131, 102, 255, 0.1), transparent 24%)',
          x: orbTranslateX,
          y: orbTranslateY
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          opacity: 0.12,
          maskImage: 'radial-gradient(circle at center, black 52%, transparent 92%)'
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
          rotate: useTransform(smoothX, [-0.5, 0.5], [-8, 8])
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          width: 312,
          height: 312,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.09)',
          rotate: useTransform(smoothX, [-0.5, 0.5], [10, -10])
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          x: sceneTranslateX,
          y: sceneTranslateY,
          display: 'grid',
          placeItems: 'center',
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          style={{
            width: 260,
            height: 260,
            borderRadius: 34,
            background:
              'linear-gradient(145deg, rgba(131, 102, 255, 0.18), rgba(131, 102, 255, 0.05) 42%, rgba(255,255,255,0.02))',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow:
              '0 34px 100px rgba(8, 12, 28, 0.42), inset 0 1px 0 rgba(255,255,255,0.06)',
            display: 'grid',
            placeItems: 'center',
            backdropFilter: 'blur(14px)',
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut'
            }}
            style={{
              width: 132,
              height: 132,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.32), rgba(131,102,255,0.92) 44%, rgba(131,102,255,0.2) 72%, transparent 79%)',
              boxShadow:
                '0 0 82px rgba(131,102,255,0.28), inset 0 6px 18px rgba(255,255,255,0.12)',
              transform: 'translateZ(38px)'
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 22,
              right: 22,
              bottom: 18,
              display: 'grid',
              gap: 8,
              transform: 'translateZ(24px)'
            }}
          >
            <div
              style={{
                height: 8,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden'
              }}
            >
              <motion.div
                initial={{ width: '22%' }}
                animate={{ width: ['22%', '74%', '56%'] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut'
                }}
                style={{
                  height: '100%',
                  borderRadius: 999,
                  background:
                    'linear-gradient(90deg, rgba(131,102,255,0.82), rgba(131,102,255,0.35))'
                }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8
              }}
            >
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)'
                }}
              />
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.06)'
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <FloatingChip top={28} left={24} delay={0.2}>
        <strong>Graph-aware</strong>
        <br />
        follows visual context
      </FloatingChip>

      <FloatingChip top={60} right={28} delay={0.45}>
        <strong>Auto mode</strong>
        <br />
        reads the actual request
      </FloatingChip>

      <FloatingChip bottom={34} left={30} delay={0.75}>
        <strong>Saved sessions</strong>
        <br />
        keep the thread alive
      </FloatingChip>

      <FloatingChip bottom={58} right={34} delay={1.05}>
        <strong>Parent guidance</strong>
        <br />
        explains more simply
      </FloatingChip>

      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          inset: 'auto 48px 28px 48px',
          height: 72,
          borderRadius: 999,
          background: 'radial-gradient(circle, rgba(131,102,255,0.18), transparent 68%)',
          filter: 'blur(22px)'
        }}
      />

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
          zIndex: 4
        }}
      >
        <span className="badge">3D-ready hero scene</span>
        <span className="small">Cursor-responsive depth prototype</span>
      </div>
    </div>
  );
}