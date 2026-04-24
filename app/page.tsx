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
    <div className="grid" style={{ gap: 40 }}>
      <motion.section
        className="landingHero"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.56, ease: 'easeOut' }}
      >
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
                transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
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
                transition={{ delay: 0.3, duration: 0.36, ease: 'easeOut' }}
              >
                <div className="proofItem">
                  <strong>Graph-aware</strong>
                  <p className="small" style={{ margin: 0 }}>
                    Move from explanation to graphing without breaking the thread.
                  </p>
                </div>

                <div className="proofItem">
                  <strong>Session continuity</strong>
                  <p className="small" style={{ margin: 0 }}>
                    Return to older work and continue naturally.
                  </p>
                </div>

                <div className="proofItem">
                  <strong>Parent support</strong>
                  <p className="small" style={{ margin: 0 }}>
                    Simpler explanation flows for helping a child learn.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="heroVisual"
              initial={{ opacity: 0, y: 10, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.18, duration: 0.56, ease: 'easeOut' }}
            >
              <div className="windowShell">
                <div className="windowBar">
                  <div className="windowDots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="small">Tutor preview</span>
                </div>

                <div className="previewStack">
                  <div className="previewPanel previewChat">
                    <div className="previewPrompt">
                      <p className="small" style={{ margin: 0 }}>
                        Solve x² − 5x + 6 = 0, graph it, and show me one common mistake.
                      </p>
                    </div>

                    <div className="previewResponse">
                      <p className="small" style={{ margin: 0 }}>
                        The same workspace can explain the method, render the graph, diagnose the
                        mistake, and keep the next question connected.
                      </p>
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
                      <span className="badge">Session tools</span>
                      <p className="small" style={{ margin: 0 }}>
                        Graphing, guided follow-ups, saved sessions, read aloud, and translation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionReveal} style={{ display: 'grid', gap: 22 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span className="badge">How it’s used</span>
          <h2 style={{ margin: 0 }}>One system, two ways in.</h2>
          <p className="small" style={{ margin: 0, maxWidth: 1120 }}>
            Students can solve, graph, diagnose, and continue the same thread. Parents can get
            simpler explanations, examples, and guided support without jumping straight to the final
            answer.
          </p>
        </div>

        <div className="sectionSplit">
          <div className="sectionCell">
            <span className="badge">Students</span>
            <h3 style={{ margin: 0 }}>Work through the math, then keep going.</h3>
            <p className="small" style={{ margin: 0, maxWidth: 640 }}>
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
            <p className="small" style={{ margin: 0, maxWidth: 640 }}>
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