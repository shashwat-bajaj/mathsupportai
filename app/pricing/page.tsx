export default function PricingPage() {
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
          <span className="badge">Pricing</span>
          <h1 style={{ margin: 0 }}>Simple for now, with more structured plans later.</h1>
          <p className="small" style={{ margin: 0, maxWidth: 840 }}>
            MathSupport AI is currently available as a free beta while the product experience is
            still being improved. The focus right now is making the tutor more useful, more
            reliable, and more polished before introducing fuller premium plans.
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
              <strong>Available now</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Free beta access while the core product is still being strengthened.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Planned next</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              More advanced study workflows, revision tools, and stronger personalization.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Longer-term</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Family-oriented access ideas and broader support options beyond the current beta.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 22
        }}
      >
        <div
          className="card"
          style={{
            display: 'grid',
            gap: 18,
            borderColor: 'var(--accent-border)'
          }}
        >
          <div style={{ display: 'grid', gap: 10 }}>
            <span className="badge">Available now</span>
            <div style={{ display: 'grid', gap: 6 }}>
              <h2 style={{ margin: 0 }}>Free Beta</h2>
              <div className="price">$0</div>
            </div>
            <p className="small" style={{ margin: 0 }}>
              The current version is focused on getting the foundation right before pricing becomes
              more structured.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 10,
              paddingTop: 14,
              borderTop: '1px solid var(--border)'
            }}
          >
            <p className="small" style={{ margin: 0 }}>
              <strong>Includes</strong>
            </p>
            <ul className="list" style={{ margin: 0 }}>
              <li>Step-by-step math support</li>
              <li>Hints, diagnosis mode, quiz mode, and auto mode</li>
              <li>Session history for signed-in users</li>
              <li>Graph support for graphable questions</li>
              <li>Read aloud and translation tools</li>
              <li>Early access while the product evolves</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <span className="badge">Planned next</span>
            <div style={{ display: 'grid', gap: 6 }}>
              <h2 style={{ margin: 0 }}>Planned Premium</h2>
              <div className="price">Soon</div>
            </div>
            <p className="small" style={{ margin: 0 }}>
              A more developed version of the product with deeper study support and richer learning
              workflows.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 10,
              paddingTop: 14,
              borderTop: '1px solid var(--border)'
            }}
          >
            <p className="small" style={{ margin: 0 }}>
              <strong>Expected direction</strong>
            </p>
            <ul className="list" style={{ margin: 0 }}>
              <li>More advanced study workflows</li>
              <li>Improved revision and practice support</li>
              <li>Smarter continuity across tutor sessions</li>
              <li>Richer graphing and math tools</li>
              <li>Deeper personalization and learning defaults</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <span className="badge">Longer-term</span>
            <div style={{ display: 'grid', gap: 6 }}>
              <h2 style={{ margin: 0 }}>Family / Access Options</h2>
              <div className="price">Later</div>
            </div>
            <p className="small" style={{ margin: 0 }}>
              A broader access model aimed at households, guided support use cases, and future plan
              structure.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 10,
              paddingTop: 14,
              borderTop: '1px solid var(--border)'
            }}
          >
            <p className="small" style={{ margin: 0 }}>
              <strong>Possible direction</strong>
            </p>
            <ul className="list" style={{ margin: 0 }}>
              <li>Parent-oriented support packages</li>
              <li>Potential family access ideas</li>
              <li>Expanded guided-learning workflows</li>
              <li>Future access tiers and promo options</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 20,
          alignItems: 'end',
          paddingTop: 16,
          borderTop: '1px solid var(--border)'
        }}
      >
        <div style={{ display: 'grid', gap: 8, maxWidth: 860 }}>
          <h2 style={{ margin: 0 }}>Why the beta is still free</h2>
          <p className="small" style={{ margin: 0 }}>
            The current focus is improving the core product first: better tutor flow, clearer graph
            behavior, stronger history, more reliable interactions, and a more polished interface
            overall. Pricing can become more structured once the product feels stronger end to end.
          </p>
        </div>

        <div className="buttonRow">
          <a className="btn" href="/tutor">
            Open Student Workspace
          </a>
          <a className="btn secondary" href="/parents">
            Open Parent Workspace
          </a>
        </div>
      </section>
    </div>
  );
}