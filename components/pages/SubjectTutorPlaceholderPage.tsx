import Link from 'next/link';
import Reveal from '@/components/Reveal';
import type { SubjectConfig } from '@/lib/subjects';

type SubjectTutorPlaceholderPageProps = {
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

function subjectHeroStyle(subject: SubjectConfig) {
  return {
    borderColor: subject.theme.accent,
    boxShadow: `0 24px 80px ${subject.theme.backgroundGlow}`,
    background: `
      radial-gradient(circle at 12% 10%, ${subject.theme.backgroundGlow}, transparent 34%),
      linear-gradient(135deg, ${subject.theme.accentSoft}, transparent 58%)
    `
  };
}

function subjectBadgeStyle(subject: SubjectConfig) {
  return {
    borderColor: subject.theme.accent,
    background: subject.theme.accentSoft
  };
}

function subjectCardStyle(subject: SubjectConfig) {
  return {
    borderColor: subject.theme.accentSoft
  };
}

export default function SubjectTutorPlaceholderPage({
  subject
}: SubjectTutorPlaceholderPageProps) {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section
          className="card spotlightCard"
          style={{ display: 'grid', gap: 16, ...subjectHeroStyle(subject) }}
        >
          <div className="buttonRow">
            <span className="badge" style={subjectBadgeStyle(subject)}>
              {subject.name} Tutor
            </span>
            <span className="badge" style={subjectBadgeStyle(subject)}>
              {getStatusLabel(subject.status)}
            </span>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Solvyq {subject.name} tutor is not enabled yet.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              This page is reserved for the future {subject.name} learning workspace. Math is the
              active tutor branch right now, while {subject.name} support is being prepared as part
              of the broader Solvyq subject structure.
            </p>
          </div>

          <div className="buttonRow">
            <Link className="btn" href="/math/tutor">
              Open Active Math Tutor
            </Link>
            <Link className="btn secondary" href={`${subject.path}/history`}>
              View History Preview
            </Link>
            <Link className="btn secondary" href={subject.path}>
              Back to {subject.name}
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="grid cols-3">
          <div className="card innerFeatureCard" style={subjectCardStyle(subject)}>
            <h3 style={{ marginTop: 0 }}>Planned subject flow</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              This tutor branch will eventually use subject-specific instructions, examples, and
              response behavior instead of reusing the Math tutor directly.
            </p>
          </div>

          <div className="card innerFeatureCard" style={subjectCardStyle(subject)}>
            <h3 style={{ marginTop: 0 }}>Shared Solvyq foundation</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              The goal is to keep one account system, one deployment, and one shared history
              structure while still giving each subject its own learning experience.
            </p>
          </div>

          <div className="card innerFeatureCard" style={subjectCardStyle(subject)}>
            <h3 style={{ marginTop: 0 }}>Not active yet</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              This placeholder prevents unsupported subjects from accidentally calling the active Math
              tutor API before the subject-specific backend is ready.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="card" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Example prompts planned for {subject.name}</h2>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              These examples are already listed in the subject configuration and can later help shape
              the tutor experience.
            </p>
          </div>

          <div className="grid cols-3">
            {subject.tutor.examplePrompts.map((prompt) => (
              <div
                key={prompt}
                className="card questionSurface"
                style={{ padding: 14, ...subjectCardStyle(subject) }}
              >
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