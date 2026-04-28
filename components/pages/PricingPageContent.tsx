import Reveal from '@/components/Reveal';

export default function PricingPageContent() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Pricing</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Free during beta, with thoughtful plans later.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              TutoVera Math is currently available as a free beta while the learning experience is
              still being improved. The focus right now is building a tutor that feels clearer, more
              reliable, and more trustworthy before introducing structured paid plans.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="grid cols-3">
          <div className="card featureCard" style={{ borderColor: 'var(--accent-border)' }}>
            <span className="badge">Available now</span>
            <h2 style={{ marginBottom: 8 }}>Free Beta</h2>
            <div className="price">$0</div>

            <ul className="list">
              <li>Step-by-step math support</li>
              <li>Auto mode, hint mode, diagnosis mode, and quiz mode</li>
              <li>Session history for signed-in users</li>
              <li>Graph support for graphable questions</li>
              <li>Read aloud and translation tools</li>
              <li>Early access while TutoVera Math continues to improve</li>
            </ul>
          </div>

          <div className="card featureCard">
            <span className="badge">Planned next</span>
            <h2 style={{ marginBottom: 8 }}>Planned Premium</h2>
            <div className="price">Soon</div>

            <ul className="list">
              <li>More advanced study workflows</li>
              <li>Improved revision and practice support</li>
              <li>Smarter continuity across tutor sessions</li>
              <li>Richer graphing and math tools</li>
              <li>Deeper personalization and learning defaults</li>
            </ul>
          </div>

          <div className="card featureCard">
            <span className="badge">Longer-term</span>
            <h2 style={{ marginBottom: 8 }}>Family / Access Options</h2>
            <div className="price">Later</div>

            <ul className="list">
              <li>Parent-oriented support packages</li>
              <li>Potential family access options</li>
              <li>Expanded guided-learning workflows</li>
              <li>Future access tiers and promo options</li>
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="card" style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Why the beta is still free</h2>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              The current priority is improving the core TutoVera Math experience first: better tutor
              flow, clearer graph behavior, stronger history, more reliable interactions, and a more
              polished interface overall. Pricing can become more structured once the product feels
              stronger end to end.
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