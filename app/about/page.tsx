export default function AboutPage() {
  return (
    <div className="grid" style={{ gap: 30 }}>
      <section
        style={{
          display: 'grid',
          gap: 18,
          paddingTop: 6
        }}
      >
        <div style={{ display: 'grid', gap: 10, maxWidth: 920 }}>
          <span className="badge">About the product</span>
          <h1 style={{ margin: 0 }}>
            Built to make math feel clearer, calmer, and easier to continue.
          </h1>
          <p className="small" style={{ margin: 0, maxWidth: 840 }}>
            MathSupport AI is being built as a learning-first math workspace for students and
            parents. The goal is not just to produce answers, but to help users understand what is
            happening, ask better follow-up questions, and return to earlier work without losing the
            thread.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            paddingTop: 14,
            borderTop: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Learning over answer dumping</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              The product is designed around explanation, guided support, diagnosis, and practice.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Built for real follow-ups</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Sessions are meant to continue naturally instead of resetting every time.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Accessible by design</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Read aloud, translation, cleaner structure, and graph support are part of the core direction.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(320px, 0.95fr)',
          gap: 24
        }}
      >
        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>What the product is trying to become</h2>
            <p className="small" style={{ margin: 0, maxWidth: 760 }}>
              The long-term vision is a math support system that feels less like a generic chatbot
              and more like a structured study environment — something that can teach, graph,
              diagnose, adapt, and remember context in a way that is actually useful for learning.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              paddingTop: 14,
              borderTop: '1px solid var(--border)'
            }}
          >
            <div
              className="questionSurface"
              style={{
                padding: 16,
                borderRadius: 20,
                border: '1px solid var(--border)'
              }}
            >
              <p className="small" style={{ margin: '0 0 6px' }}>
                <strong>For students</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                A workspace for solving problems, understanding steps, checking mistakes, practicing
                similar questions, and revisiting saved sessions later.
              </p>
            </div>

            <div
              className="questionSurface"
              style={{
                padding: 16,
                borderRadius: 20,
                border: '1px solid var(--border)'
              }}
            >
              <p className="small" style={{ margin: '0 0 6px' }}>
                <strong>For parents</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                A more guided support flow for adults helping a child learn, with simpler phrasing,
                examples, talking points, and parent-friendly explanation.
              </p>
            </div>

            <div
              className="questionSurface"
              style={{
                padding: 16,
                borderRadius: 20,
                border: '1px solid var(--border)'
              }}
            >
              <p className="small" style={{ margin: '0 0 6px' }}>
                <strong>For the product itself</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                A calmer interface, better continuity, stronger visual support, and more intentional
                interaction design than a typical homework-help tool.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <span className="badge">Current beta focus</span>

          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>What is being improved right now</h2>
            <p className="small" style={{ margin: 0 }}>
              The beta is currently focused on strengthening the core tutor experience: cleaner
              responses, better follow-up flow, graph support, session history, parent guidance,
              and a more polished interface overall.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              paddingTop: 14,
              borderTop: '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'grid', gap: 5 }}>
              <strong style={{ fontSize: '0.98rem' }}>Tutor quality</strong>
              <p className="small" style={{ margin: 0 }}>
                More useful explanation, clearer continuity, and better handling of follow-up flow.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 5 }}>
              <strong style={{ fontSize: '0.98rem' }}>Product structure</strong>
              <p className="small" style={{ margin: 0 }}>
                Cleaner page design, more cohesive surfaces, and a stronger sense of one connected system.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 5 }}>
              <strong style={{ fontSize: '0.98rem' }}>Student and parent support</strong>
              <p className="small" style={{ margin: 0 }}>
                Better separation between direct solving and guided support for helping a child learn.
              </p>
            </div>
          </div>

          <div className="buttonRow" style={{ marginTop: 2 }}>
            <a className="btn" href="/tutor">
              Open Student Workspace
            </a>
            <a className="btn secondary" href="/parents">
              Open Parent Workspace
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}