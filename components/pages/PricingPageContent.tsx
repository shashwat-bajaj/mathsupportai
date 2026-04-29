import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { subjects } from '@/lib/subjects';

export default function PricingPageContent() {
  const activeSubjects = Object.values(subjects).filter((subject) => subject.status === 'active');

  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Pricing</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Free during beta, with thoughtful plans later.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 840 }}>
              TutoVera is currently available as a free beta across active subject branches while the
              learning experience is still being improved. The focus right now is building a platform
              that feels clearer, more reliable, and more trustworthy before introducing structured
              paid plans.
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
              <li>Student tutor workspaces for active subjects</li>
              <li>Parent support workspaces for guided explanations</li>
              <li>Auto mode, hint mode, diagnosis mode, and quiz mode</li>
              <li>Session history for signed-in users</li>
              <li>Subject-specific prompts, examples, and tutor behavior</li>
              <li>Read aloud and translation tools</li>
              <li>Early access while TutoVera continues to improve</li>
            </ul>
          </div>

          <div className="card featureCard">
            <span className="badge">Later</span>
            <h2 style={{ marginBottom: 8 }}>Premium Plans</h2>
            <div className="price">Not active</div>

            <ul className="list">
              <li>More advanced study workflows</li>
              <li>Improved revision and practice support</li>
              <li>Smarter continuity across tutor sessions</li>
              <li>Richer subject-specific tools</li>
              <li>Deeper personalization and learning defaults</li>
              <li>Potential higher usage limits</li>
            </ul>
          </div>

          <div className="card featureCard">
            <span className="badge">Future access</span>
            <h2 style={{ marginBottom: 8 }}>Family / Access Options</h2>
            <div className="price">Later</div>

            <ul className="list">
              <li>Parent-oriented support packages</li>
              <li>Potential family access options</li>
              <li>Expanded guided-learning workflows</li>
              <li>Future access tiers and promo options</li>
              <li>Possible school, tutor, or group access ideas</li>
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="card" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Active branches</span>
            <h2 style={{ margin: 0 }}>Included in the free beta today.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 840 }}>
              Free beta access currently covers the active TutoVera subject branches. Each branch has
              its own student workspace, parent workspace, and subject-filtered history while sharing
              the same broader account foundation.
            </p>
          </div>

          <div className="grid cols-3">
            {activeSubjects.map((subject) => (
              <Link
                key={subject.key}
                href={subject.path}
                className="card innerFeatureCard"
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <span className="badge">Active</span>
                <h3 style={{ marginBottom: 8 }}>{subject.name}</h3>
                <p className="small" style={{ margin: 0 }}>
                  {subject.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Why the beta is still free</h2>
            <p className="small" style={{ margin: 0, maxWidth: 840 }}>
              The current priority is improving the core TutoVera experience first: better tutor
              flow, clearer subject behavior, stronger history, more reliable interactions, and a
              more polished interface overall. Pricing can become more structured once the product
              feels stronger end to end.
            </p>
          </div>

          <div className="buttonRow">
            <Link className="btn" href="/math/tutor">
              Open Math
            </Link>
            <Link className="btn secondary" href="/physics/tutor">
              Open Physics
            </Link>
            <Link className="btn secondary" href="/chemistry/tutor">
              Open Chemistry
            </Link>
            <Link className="btn secondary" href="/biology/tutor">
              Open Biology
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}