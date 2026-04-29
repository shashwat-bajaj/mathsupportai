import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { subjects } from '@/lib/subjects';

export default function AboutPage() {
  const subjectList = Object.values(subjects);
  const activeSubjects = subjectList.filter((subject) => subject.status === 'active');

  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">About TutoVera</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Tutoring you can trust, across every subject branch.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              TutoVera is a calm AI learning platform where Math, Physics, Chemistry, and Biology
              each have their own learning workspace while still sharing one account system, one
              history foundation, one settings experience, and one connected product structure.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">The name</span>
            <h2 style={{ margin: 0 }}>Why TutoVera?</h2>
            <p className="small" style={{ margin: 0, maxWidth: 900 }}>
              TutoVera combines <strong>“Tuto,”</strong> from tutor, with{' '}
              <strong>“Vera,”</strong> a word associated with truth, faith, belief, and trust. The
              name reflects the kind of learning support this platform is meant to provide: clear,
              steady, and trustworthy guidance for students and parents.
            </p>
          </div>

          <div className="grid cols-3">
            <div className="card innerFeatureCard">
              <h3 style={{ marginTop: 0 }}>Tuto</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                A short, friendly reference to tutoring, teaching, and guided learning support.
              </p>
            </div>

            <div className="card innerFeatureCard">
              <h3 style={{ marginTop: 0 }}>Vera</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                A name-like word connected with truth, belief, faith, and trust.
              </p>
            </div>

            <div className="card innerFeatureCard">
              <h3 style={{ marginTop: 0 }}>Tutoring you can trust</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                The guiding idea behind the platform: helpful explanations, calmer learning, and
                support that feels reliable.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="grid cols-3">
          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>One parent platform</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              TutoVera is the umbrella experience. Each subject branch can feel tailored without
              becoming a disconnected app or separate product.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Shared foundation</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Account access, history, settings, deployment, and backend structure stay unified
              wherever practical so the product remains easier to maintain and grow.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Subject-specific learning</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Math, Physics, Chemistry, and Biology can each have their own prompts, examples, tools,
              visual identity, and tutor behavior inside the same platform.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Subject branches</span>
            <h2 style={{ margin: 0 }}>Four active branches, one connected learning system.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              TutoVera currently supports {activeSubjects.map((subject) => subject.name).join(', ')}.
              Each branch has its own student workspace, parent workspace, history view, and about
              page while staying connected to the same broader product foundation.
            </p>
          </div>

          <div className="grid cols-3">
            {subjectList.map((subject) => (
              <Link
                key={subject.key}
                href={subject.path}
                className="card featureCard"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  borderColor:
                    subject.status === 'active' ? 'var(--accent-border)' : 'var(--border)'
                }}
              >
                <span className="badge">
                  {subject.status === 'active'
                    ? 'Active'
                    : subject.status === 'beta'
                      ? 'Beta preview'
                      : 'Preparing'}
                </span>

                <h3 style={{ marginBottom: 8 }}>{subject.name}</h3>

                <p className="small" style={{ margin: 0 }}>
                  {subject.description}
                </p>

                <p className="small" style={{ margin: '14px 0 0' }}>
                  <strong>Open {subject.name} →</strong>
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.26}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Current focus</h2>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              The current focus is making all active branches feel stable, consistent, and useful:
              clearer tutor responses, stronger saved history, better subject-specific behavior,
              smoother parent support, cleaner navigation, and a more polished interface across the
              whole platform.
            </p>
          </div>

          <div className="buttonRow">
            <Link className="btn" href="/math">
              Open Math
            </Link>
            <Link className="btn secondary" href="/physics">
              Open Physics
            </Link>
            <Link className="btn secondary" href="/chemistry">
              Open Chemistry
            </Link>
            <Link className="btn secondary" href="/biology">
              Open Biology
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}