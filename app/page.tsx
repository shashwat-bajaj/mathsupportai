'use client';

import { motion } from 'motion/react';
import BetaSignup from '@/components/BetaSignup';

const sectionReveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: 'easeOut' as const }
};

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 48 }}>
      <section className="landingHero">
        <div className="landingHeroInner">
          <div className="landingHeroGrid">
            <div className="heroCopy">
              <motion.span
                className="badge"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.04, duration: 0.28, ease: 'easeOut' }}
              >
                Free beta now live
              </motion.span>

              <motion.h1
                className="heroTitle"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.42, ease: 'easeOut' }}
              >
                Math help that stays clear after the first answer.
              </motion.h1>

              <motion.p
                className="heroSubtext"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.4, ease: 'easeOut' }}
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

              <motion.div
                className="heroProof"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.38, ease: 'easeOut' }}
              >
                <div className="proofItem">
                  <strong>Graphing</strong>
                  <span className="small">
                    Plot functions and keep the visual tied to the same thread.
                  </span>
                </div>

                <div className="proofItem">
                  <strong>Follow-ups</strong>
                  <span className="small">
                    Ask the next question without losing the context.
                  </span>
                </div>

                <div className="proofItem">
                  <strong>Accessibility</strong>
                  <span className="small">
                    Read aloud, translation, and saved defaults in one place.
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="heroVisual"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.16, duration: 0.6, ease: 'easeOut' }}
            >
              <div className="windowShell">
                <div className="windowBar">
                  <div className="windowDots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="small">MathSupport AI workspace</span>
                </div>

                <div className="previewStack">
                  <div className="previewPanel previewChat">
                    <div className="previewPrompt small">
                      Solve x² − 5x + 6 = 0, graph it, and then show me a common mistake.
                    </div>

                    <div className="previewResponse small">
                      The same workspace can explain the method, show the graph, diagnose the
                      mistake, and keep the follow-up connected to the original question.
                    </div>
                  </div>

                  <div className="previewGrid">
                    <div className="previewGraphCard">
                      <div className="previewAxisX" />
                      <div className="previewAxisY" />
                      <div className="previewLine" />
                      <div className="previewDot one" />
                      <div className="previewDot two" />
                      <div className="previewDot three" />
                    </div>

                    <div className="previewMiniCard">
                      <span className="badge">Current thread</span>
                      <p className="small" style={{ margin: 0 }}>
                        Graphing, guided follow-ups, saved sessions, and cleaner continuity across
                        the whole study flow.
                      </p>
                    </div>
                  </div>

                  <div className="previewPanel">
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: 12
                      }}
                    >
                      <div>
                        <p className="small" style={{ margin: '0 0 4px' }}>
                          <strong>Students</strong>
                        </p>
                        <p className="small" style={{ margin: 0 }}>
                          Solve, graph, diagnose, and continue.
                        </p>
                      </div>

                      <div>
                        <p className="small" style={{ margin: '0 0 4px' }}>
                          <strong>Parents</strong>
                        </p>
                        <p className="small" style={{ margin: 0 }}>
                          Simpler explanation and talking points.
                        </p>
                      </div>

                      <div>
                        <p className="small" style={{ margin: '0 0 4px' }}>
                          <strong>History</strong>
                        </p>
                        <p className="small" style={{ margin: 0 }}>
                          Revisit earlier sessions without losing the thread.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section {...sectionReveal} className="grid" style={{ gap: 22 }}>
        <div style={{ display: 'grid', gap: 8, maxWidth: 760 }}>
          <span className="badge">How it fits</span>
          <h2 style={{ margin: 0 }}>One system, two ways in.</h2>
          <p className="small" style={{ margin: 0 }}>
            Students can solve, graph, diagnose, and continue the same thread. Parents can get
            simpler explanations, examples, and guided support without jumping straight to the
            final answer.
          </p>
        </div>

        <div className="sectionSplit">
          <div className="sectionCell">
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

          <div className="sectionCell">
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