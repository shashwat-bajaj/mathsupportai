import Link from 'next/link';
import Reveal from '@/components/Reveal';
import type { SubjectConfig } from '@/lib/subjects';

type SubjectHistoryPlaceholderPageProps = {
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

export default function SubjectHistoryPlaceholderPage({
  subject
}: SubjectHistoryPlaceholderPageProps) {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 16 }}>
          <div className="buttonRow">
            <span className="badge">{subject.name} History</span>
            <span className="badge">{getStatusLabel(subject.status)}</span>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>TutoVera {subject.name} history is not enabled yet.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              This page is reserved for future {subject.name} session history. Math history is the
              active history branch right now, while {subject.name} tutor and saved-session support
              are being prepared.
            </p>
          </div>

          <div className="buttonRow">
            <Link className="btn" href="/math/history">
              Open Active Math History
            </Link>
            <Link className="btn secondary" href={`${subject.path}/tutor`}>
              View Tutor Preview
            </Link>
            <Link className="btn secondary" href={subject.path}>
              Back to {subject.name}
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="grid cols-3">
          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Future saved sessions</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Once this branch is active, {subject.name} conversations can be saved and revisited
              separately from Math sessions.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Subject separation</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              The database is already being prepared with subject fields so future history can stay
              organized by branch.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Safe placeholder</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              This page prevents inactive subjects from accidentally showing Math-only history before
              the subject tutor is ready.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}