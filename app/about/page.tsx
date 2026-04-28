import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { subjects } from '@/lib/subjects';

export default function AboutPage() {
  const subjectList = Object.values(subjects);

  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">About TutoVera</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Tutoring you can trust, across every subject branch.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              TutoVera is being shaped as a calm AI learning platform where each subject can have its
              own identity, tutor behavior, examples, and learning flow while still sharing one
              account system, one deployment, and one coherent product foundation.
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
            <h3 style={{ marginTop: 0 }}>One parent brand</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              TutoVera is the umbrella experience. Math is the first active branch, with Physics,
              Chemistry, and Biology prepared as future subject branches.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Shared foundation</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              The goal is to avoid disconnected apps. Auth, history, settings, deployment, and backend
              structure should remain unified wherever practical.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Subject-specific learning</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Each subject can eventually have its own prompts, examples, tools, visual identity, and
              tutor behavior without requiring a separate codebase.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Subject branches</span>
            <h2 style={{ margin: 0 }}>Start with Math, then expand carefully.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              Math is the active learning workspace today. The other branches are being introduced
              gradually so the product can scale cleanly without duplicating infrastructure or losing
              the current working experience.
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
                      : 'Coming soon'}
                </span>

                <h3 style={{ marginBottom: 8 }}>{subject.name}</h3>

                <p className="small" style={{ margin: 0 }}>
                  {subject.description}
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
              The current focus is preserving and improving TutoVera Math while building the structure
              needed for future subjects. The product is moving step by step so the foundation stays
              clean and the working Math experience remains stable.
            </p>
          </div>

          <div className="buttonRow">
            <Link className="btn" href="/math">
              Open TutoVera Math
            </Link>
            <Link className="btn secondary" href="/contact">
              Contact / Feedback
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}