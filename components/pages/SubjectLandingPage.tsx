import Link from 'next/link';
import Reveal from '@/components/Reveal';
import type { SubjectConfig } from '@/lib/subjects';

type SubjectLandingPageProps = {
  subject: SubjectConfig;
};

function getStatusLabel(status: SubjectConfig['status']) {
  switch (status) {
    case 'active':
      return 'Active now';
    case 'beta':
      return 'Beta preview';
    case 'coming-soon':
    default:
      return 'Coming soon';
  }
}

function getStatusDescription(subject: SubjectConfig) {
  if (subject.status === 'active') {
    return `${subject.name} is currently available inside the Solvyq learning workspace.`;
  }

  if (subject.status === 'beta') {
    return `${subject.name} is being prepared as one of the next Solvyq subject branches. Math remains the active workspace for now.`;
  }

  return `${subject.name} is planned for a future Solvyq subject branch. Math remains the active workspace for now.`;
}

export default function SubjectLandingPage({ subject }: SubjectLandingPageProps) {
  const isActive = subject.status === 'active';

  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 16 }}>
          <div className="buttonRow">
            <span className="badge">{getStatusLabel(subject.status)}</span>
            <span className="badge">{subject.name}</span>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Solvyq {subject.name}</h1>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              {subject.description}
            </p>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              {getStatusDescription(subject)}
            </p>
          </div>

          <div className="buttonRow">
            {isActive ? (
              <Link className="btn" href={`${subject.path}/tutor`}>
                Open {subject.shortName} Workspace
              </Link>
            ) : (
              <Link className="btn" href="/math/tutor">
                Open Math Workspace
              </Link>
            )}

            <Link className="btn secondary" href="/contact">
              Contact / Feedback
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="grid cols-3">
          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Subject identity</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              This branch will eventually have its own learning flow, examples, prompt behavior, and
              subject-specific support while still sharing the Solvyq account system.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Shared foundation</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              The goal is to keep one Vercel project, one Supabase setup, shared auth, shared history
              structure, and a unified product experience.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>No duplicate app</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              {subject.name} will grow as a subject branch inside Solvyq, not as a separate cloned
              codebase or disconnected deployment.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="card" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Planned tutor examples</h2>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              These examples come from the subject configuration and will later help shape the
              subject-specific tutor experience.
            </p>
          </div>

          <div className="grid cols-3">
            {subject.tutor.examplePrompts.map((prompt) => (
              <div key={prompt} className="card questionSurface" style={{ padding: 14 }}>
                <p className="small" style={{ margin: 0 }}>
                  {prompt}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}