'use client';

import { motion } from 'motion/react';
import BetaSignup from '@/components/BetaSignup';

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
      >
        <div className="homeHeroGrid">
          <div className="homeHeroContent">
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
            >
              Math support that stays clear even after the first answer.
            </motion.h1>

            <motion.p
              className="heroSubtext"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.42, ease: 'easeOut' }}
              style={{ maxWidth: 700 }}
            >
              Built for students and parents who need explanation, graphing, and follow-up flow in
              one calmer workspace — not a one-shot response box.
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

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.44, ease: 'easeOut' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12
              }}
            >
              <div className="card innerFeatureCard">
                <p className="small" style={{ margin: 0 }}>
                  <strong>Step-by-step clarity</strong>
                </p>
                <p className="small" style={{ marginTop: 8 }}>
                  Learn the method without losing the structure of the explanation.
                </p>
              </div>

              <div className="card innerFeatureCard">
                <p className="small" style={{ margin: 0 }}>
                  <strong>Continuous session flow</strong>
                </p>
                <p className="small" style={{ marginTop: 8 }}>
                  Ask the next question naturally instead of restarting from zero each time.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="homeHeroPanel"
            initial={{ opacity: 0, y: 10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.56, ease: 'easeOut' }}
          >
            <div
              className="homeDemoCard card"
              style={{
                minHeight: 430,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="homeDemoHeader">
                <span className="badge">Tutor preview</span>
                <span className="small">One thread, multiple support modes</span>
              </div>

              <motion.div
                className="homeDemoBubble homeDemoBubbleUser"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.34, duration: 0.3, ease: 'easeOut' }}
              >
                <p className="small" style={{ margin: 0 }}>
                  Solve x² − 5x + 6 = 0, graph it, and then show me a common mistake.
                </p>
              </motion.div>

              <motion.div
                className="homeDemoBubble homeDemoBubbleAi"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.44, duration: 0.3, ease: 'easeOut' }}
              >
                <p className="small" style={{ margin: 0 }}>
                  The same workspace can explain the method, render the graph, diagnose mistakes,
                  and keep the follow-up connected to the original question.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.32, ease: 'easeOut' }}
                style={{
                  display: 'grid',
                  gap: 12,
                  marginTop: 6
                }}
              >
                <div className="card innerFeatureCard">
                  <p className="small" style={{ margin: 0 }}>
                    <strong>Auto by default</strong>
                  </p>
                  <p className="small" style={{ marginTop: 8 }}>
                    Follows the wording of the request more naturally, without forcing the same
                    teaching pattern every time.
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: 12
                  }}
                >
                  <div className="card innerFeatureCard">
                    <p className="small" style={{ margin: 0 }}>
                      <strong>Graph-aware</strong>
                    </p>
                    <p className="small" style={{ marginTop: 8 }}>
                      Moves between graphing and explanation more cleanly.
                    </p>
                  </div>

                  <div className="card innerFeatureCard">
                    <p className="small" style={{ margin: 0 }}>
                      <strong>Saved context</strong>
                    </p>
                    <p className="small" style={{ marginTop: 8 }}>
                      Revisit earlier sessions without losing the thread.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="card spotlightCard" {...sectionReveal}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
            gap: 22,
            alignItems: 'start'
          }}
        >
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">What makes it different</span>
            <h2 style={{ margin: 0 }}>More structured than a generic chat box, but still easy to use.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 760 }}>
              MathSupport AI is being built as a learning workspace with graph context, guided
              follow-ups, saved history, and more deliberate continuity across sessions.
            </p>
          </div>

          <div className="grid" style={{ gap: 12 }}>
            <div className="card innerFeatureCard">
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>Students</h3>
              <p className="small" style={{ margin: 0 }}>
                Solve problems, check understanding, graph functions, and keep the same thread
                going instead of restarting every time.
              </p>
            </div>

            <div className="card innerFeatureCard">
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>Parents</h3>
              <p className="small" style={{ margin: 0 }}>
                Get child-friendly explanations, examples, talking points, and likely-mistake
                guidance without defaulting straight to the final answer.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="grid" {...sectionReveal} style={{ gap: 18 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span className="badge">Choose your workspace</span>
          <h2 style={{ margin: 0 }}>Two entry points, one core system underneath.</h2>
          <p className="small" style={{ margin: 0, maxWidth: 820 }}>
            Each workspace starts from a different need, but both are built to make math easier to
            continue, not just easier to answer once.
          </p>
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
              <span className="badge">For students</span>
              <h3 style={{ margin: 0 }}>Student Workspace</h3>
              <p className="small" style={{ margin: 0 }}>
                Best for direct problem solving, understanding the method, diagnosing mistakes,
                graphing functions, and working through follow-ups in one continuous flow.
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
              <span className="badge">For parents</span>
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