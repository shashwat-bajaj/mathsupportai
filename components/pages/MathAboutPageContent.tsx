import Reveal from '@/components/Reveal';

export default function MathAboutPageContent() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">About TutoVera Math</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Built to make math feel clearer, calmer, and easier to continue.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              TutoVera Math is being built as a learning-first math workspace for students and
              parents. The goal is not just to produce answers, but to help users understand what is
              happening, ask better follow-up questions, and return to earlier work without losing the
              thread.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="grid cols-3">
          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Learning over answer dumping</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              The product is designed around explanation, guided support, diagnosis, and practice
              rather than one-click answer output.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Built for real follow-ups</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Sessions are meant to continue naturally, so users can ask the next question without
              starting from zero each time.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Accessible by design</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Read aloud, translation, cleaner structure, and graph support are being added to make
              the experience easier to use across different learning styles.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>What TutoVera Math is trying to become</h2>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              The long-term vision is a math support system that feels less like a generic chatbot and
              more like a structured study environment — something that can teach, graph, diagnose,
              adapt, and remember context in a way that is actually useful for learning.
            </p>
          </div>

          <div className="grid cols-3">
            <div className="card featureCard">
              <h3 style={{ marginTop: 0 }}>For students</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                A workspace for solving problems, understanding steps, checking mistakes, practicing
                similar questions, and revisiting saved sessions later.
              </p>
            </div>

            <div className="card featureCard">
              <h3 style={{ marginTop: 0 }}>For parents</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                A more guided support flow for adults helping a child learn, with simpler phrasing,
                examples, talking points, and parent-friendly explanation.
              </p>
            </div>

            <div className="card featureCard">
              <h3 style={{ marginTop: 0 }}>For the product itself</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                A calmer interface, better continuity, stronger visual support, and more intentional
                interaction design than a typical homework-help tool.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Current beta focus</h2>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              Right now the beta is focused on strengthening the core math tutor experience: cleaner
              responses, better follow-up flow, graph support, session history, parent guidance, and a
              more polished overall interface.
            </p>
          </div>

          <div className="buttonRow">
            <a className="btn" href="/math/tutor">
              Open Student Workspace
            </a>
            <a className="btn secondary" href="/math/parents">
              Open Parent Workspace
            </a>
          </div>
        </section>
      </Reveal>
    </div>
  );
}