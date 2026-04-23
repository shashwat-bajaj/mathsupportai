'use client';

import { motion } from 'motion/react';
import BetaSignup from '@/components/BetaSignup';
import HomeHeroScene from '@/components/HomeHeroScene';

const sectionReveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: 'easeOut' as const }
};

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 44 }}>
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.56, ease: 'easeOut' }}
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 92px)',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <HomeHeroScene />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1180,
            margin: '0 auto',
            minHeight: 'calc(100vh - 92px)',
            display: 'grid',
            alignItems: 'center',
            padding: 'clamp(88px, 14vh, 144px) 24px 42px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gap: 20,
              maxWidth: 640
            }}
          >
            <motion.span
              className="badge"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04, duration: 0.28, ease: 'easeOut' }}
            >
              Free beta now live
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
              style={{
                margin: 0,
                maxWidth: 620
              }}
            >
              Math help that stays clear after the first answer.
            </motion.h1>

            <motion.p
              className="heroSubtext"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease: 'easeOut' }}
              style={{
                margin: 0,
                maxWidth: 560
              }}
            >
              For students and parents who want explanation, graphing, and follow-up flow in one
              calmer workspace.
            </motion.p>

            <motion.div
              className="buttonRow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.38, ease: 'easeOut' }}
            >
              <a className="btn" href="/tutor">
                Open Student Workspace
              </a>
              <a className="btn secondary" href="/parents">
                Open Parent Workspace
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1180,
            margin: '0 auto',
            padding: '0 24px 28px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              borderTop: '1px solid var(--border)',
              paddingTop: 18
            }}
          >
            <div style={{ display: 'grid', gap: 6 }}>
              <p className="small" style={{ margin: 0 }}>
                <strong>Graphing</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Plot functions and keep the visual tied to the same thread.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 6 }}>
              <p className="small" style={{ margin: 0 }}>
                <strong>Follow-ups</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Ask the next question without losing the context.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 6 }}>
              <p className="small" style={{ margin: 0 }}>
                <strong>Accessibility</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Read aloud, translation, and saved defaults in one place.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        {...sectionReveal}
        style={{
          display: 'grid',
          gap: 22
        }}
      >
        <div style={{ display: 'grid', gap: 8, maxWidth: 760 }}>
          <span className="badge">How it fits</span>
          <h2 style={{ margin: 0 }}>One system, two ways in.</h2>
          <p className="small" style={{ margin: 0 }}>
            Students can solve, graph, diagnose, and continue the same thread. Parents can get
            simpler explanations, examples, and guided support without jumping straight to the
            final answer.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28,
            paddingTop: 8,
            borderTop: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'grid', gap: 16, minWidth: 0 }}>
            <span className="badge">Students</span>
            <h3 style={{ margin: 0 }}>Work through the math, then keep going.</h3>
            <p className="small" style={{ margin: 0, maxWidth: 520 }}>
              Best for direct solving, understanding the method, graphing functions, diagnosing
              mistakes, and asking the next question without restarting the whole flow.
            </p>

            <div className="buttonRow">
              <a className="btn" href="/tutor">
                Go to Students
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 16, minWidth: 0 }}>
            <span className="badge">Parents</span>
            <h3 style={{ margin: 0 }}>Support a child more clearly.</h3>
            <p className="small" style={{ margin: 0, maxWidth: 520 }}>
              Best for simpler explanations, parent talking points, child-friendly examples, and
              guided help that supports learning instead of replacing it.
            </p>

            <div className="buttonRow">
              <a className="btn secondary" href="/parents">
                Go to Parents
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div {...sectionReveal}>
        <BetaSignup />
      </motion.div>
    </div>
  );
}