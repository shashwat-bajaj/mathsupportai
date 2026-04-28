'use client';

import { motion } from 'motion/react';
import BetaSignup from '@/components/BetaSignup';
import Reveal from '@/components/Reveal';

export default function MathHomePageContent() {
  return (
    <div className="grid" style={{ gap: 34 }}>
      <section className="homeLead">
        <div className="homeLeadGrid">
          <motion.div
            className="homeLeadCopy"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.56, ease: 'easeOut' }}
          >
            <motion.span
              className="badge"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04, duration: 0.28, ease: 'easeOut' }}
            >
              TutoVera Math • Free beta now live
            </motion.span>

            <motion.h1
              className="homeLeadTitle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
            >
              Math tutoring you can trust beyond the first answer.
            </motion.h1>

            <motion.p
              className="homeLeadSubtext"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease: 'easeOut' }}
            >
              TutoVera Math helps students and parents work through explanations, graphing, mistakes,
              and follow-up questions in one calmer learning workspace.
            </motion.p>

            <motion.div
              className="buttonRow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.38, ease: 'easeOut' }}
            >
              <a className="btn" href="/math/tutor">
                Open Student Workspace
              </a>
              <a className="btn secondary" href="/math/parents">
                Open Parent Workspace
              </a>
            </motion.div>

            <motion.div
              className="homeLeadProof"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.36, ease: 'easeOut' }}
            >
              <div className="homeLeadProofItem">
                <strong>Graph-aware</strong>
                <p className="small" style={{ margin: 0 }}>
                  Explain, graph, and continue.
                </p>
              </div>

              <div className="homeLeadProofItem">
                <strong>Session continuity</strong>
                <p className="small" style={{ margin: 0 }}>
                  Return without starting over.
                </p>
              </div>

              <div className="homeLeadProofItem">
                <strong>Parent support</strong>
                <p className="small" style={{ margin: 0 }}>
                  Simpler help for guided learning.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="homeLeadPreviewWrap"
            initial={{ opacity: 0, y: 10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.56, ease: 'easeOut' }}
          >
            <div className="homePreviewWindow">
              <div className="homePreviewBar">
                <div className="homePreviewDots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="small">TutoVera Math preview</span>
              </div>

              <div className="homePreviewStack">
                <div className="homePreviewPanel homePreviewChat">
                  <div className="homePreviewPrompt">
                    <p className="small" style={{ margin: 0 }}>
                      Solve x² − 5x + 6, graph it, and show one common mistake.
                    </p>
                  </div>

                  <div className="homePreviewResponse">
                    <p className="small" style={{ margin: 0 }}>
                      The same workspace can explain the method, render the graph, diagnose the
                      mistake, and keep the next question connected.
                    </p>
                  </div>
                </div>

                <div className="homePreviewGrid">
                  <div className="homePreviewGraph">
                    <div className="homePreviewAxisX" />
                    <div className="homePreviewAxisY" />
                    <div className="homePreviewLine" />
                    <div className="homePreviewDot one" />
                    <div className="homePreviewDot two" />
                    <div className="homePreviewDot three" />
                  </div>

                  <div className="homePreviewMiniCard">
                    <span className="badge">Session tools</span>
                    <p className="small" style={{ margin: 0 }}>
                      Graphing, follow-ups, saved sessions, read aloud, and translation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Reveal delay={0.04}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 22 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">How it’s used</span>
            <h2 style={{ margin: 0 }}>One math workspace, two ways in.</h2>
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
                <a className="btn" href="/math/tutor">
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
                <a className="btn secondary" href="/math/parents">
                  Go to Parents
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <BetaSignup />
      </Reveal>
    </div>
  );
}