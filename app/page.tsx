'use client';

import { motion } from 'motion/react';
import BetaSignup from '@/components/BetaSignup';
import HomeHeroScene from '@/components/HomeHeroScene';

const sectionReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: 'easeOut' as const }
};

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 28 }}>
      <motion.section
        className="hero heroCard homeHeroShell"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: 'easeOut' }}
        style={{ display: 'grid', gap: 26 }}
      >
        <div
          style={{
            display: 'grid',
            gap: 16,
            maxWidth: 900
          }}
        >
          <motion.span
            className="badge"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.03, duration: 0.28, ease: 'easeOut' }}
          >
            Free beta now live
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.44, ease: 'easeOut' }}
            style={{ margin: 0, maxWidth: 860 }}
          >
            Math help that feels clear, visual, and easy to continue.
          </motion.h1>

          <motion.p
            className="heroSubtext"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.42, ease: 'easeOut' }}
            style={{ maxWidth: 740, margin: 0 }}
          >
            Built for students and parents who want explanation, graphing, and better follow-up
            flow in one calmer workspace.
          </motion.p>

          <motion.div
            className="buttonRow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.4, ease: 'easeOut' }}
          >
            <a className="btn" href="/tutor">
              Open Student Workspace
            </a>
            <a className="btn secondary" href="/parents">
              Open Parent Workspace
            </a>
          </motion.div>

          <motion.p
            className="small"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.4, ease: 'easeOut' }}
            style={{ margin: 0 }}
          >
            Graphing, guided follow-ups, saved sessions, read aloud, and translation.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.56, ease: 'easeOut' }}
        >
          <HomeHeroScene />
        </motion.div>
      </motion.section>

      <motion.section className="card spotlightCard" {...sectionReveal}>
        <div
          style={{
            display: 'grid',
            gap: 18,
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
            alignItems: 'start'
          }}
        >
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">What the product is built for</span>
            <h2 style={{ margin: 0 }}>A more continuous math workflow.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 760 }}>
              Ask a question, graph it, follow up, revisit the thread later, and keep the context
              connected instead of starting over every time.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>For students:</strong> direct solving, explanation, graphing, mistake
              diagnosis, and practice.
            </p>
            <p className="small" style={{ margin: 0 }}>
              <strong>For parents:</strong> simpler explanations, examples, talking points, and
              child-friendly support.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section className="grid" {...sectionReveal} style={{ gap: 18 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span className="badge">Choose your workspace</span>
          <h2 style={{ margin: 0 }}>Two entry points, one core system underneath.</h2>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 18
          }}
        >
          <motion.div className="card featureCard" whileHover={{ y: -4 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <span className="badge">Students</span>
              <h3 style={{ margin: 0 }}>Student Workspace</h3>
              <p className="small" style={{ margin: 0 }}>
                Best for solving, understanding the method, graphing functions, diagnosing
                mistakes, and continuing follow-up questions in the same thread.
              </p>

              <div className="buttonRow" style={{ marginTop: 4 }}>
                <a className="btn" href="/tutor">
                  Open Student Workspace
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div className="card featureCard" whileHover={{ y: -4 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <span className="badge">Parents</span>
              <h3 style={{ margin: 0 }}>Parent Workspace</h3>
              <p className="small" style={{ margin: 0 }}>
                Best for adults helping a child learn more clearly through simpler explanation,
                examples, talking points, and guided support.
              </p>

              <div className="buttonRow" style={{ marginTop: 4 }}>
                <a className="btn secondary" href="/parents">
                  Open Parent Workspace
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.div {...sectionReveal}>
        <BetaSignup />
      </motion.div>
    </div>
  );
}