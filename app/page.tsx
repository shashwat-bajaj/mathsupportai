import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { subjects } from '@/lib/subjects';

export default function HomePage() {
  const subjectList = Object.values(subjects);
  const activeSubjects = subjectList.filter((subject) => subject.status === 'active');

  return (
    <div className="grid" style={{ gap: 34 }}>
      <section className="homeLead">
        <div className="homeLeadGrid">
          <div className="homeLeadCopy">
            <span className="badge">TutoVera learning platform</span>

            <h1 className="homeLeadTitle">Tutoring you can trust, across every subject branch.</h1>

            <p className="homeLeadSubtext">
              TutoVera is a calm AI learning platform with active support for Math, Physics, and
              Chemistry, plus a Biology branch prepared for future growth. Each subject has its own
              learning workspace while sharing one account, one history foundation, and one connected
              product experience.
            </p>

            <div className="buttonRow">
              <Link className="btn" href="/math">
                Open TutoVera Math
              </Link>
              <Link className="btn secondary" href="#subjects">
                View Subjects
              </Link>
            </div>

            <div className="homeLeadProof">
              <div className="homeLeadProofItem">
                <strong>Trusted guidance</strong>
                <p className="small" style={{ margin: 0 }}>
                  Built around clearer explanations, follow-ups, and steady learning support.
                </p>
              </div>

              <div className="homeLeadProofItem">
                <strong>Active branches</strong>
                <p className="small" style={{ margin: 0 }}>
                  Math, Physics, and Chemistry are active now.
                </p>
              </div>

              <div className="homeLeadProofItem">
                <strong>One foundation</strong>
                <p className="small" style={{ margin: 0 }}>
                  Shared account, settings, history, deployment, and backend structure.
                </p>
              </div>
            </div>
          </div>

          <div className="homeLeadPreviewWrap">
            <div className="homePreviewWindow">
              <div className="homePreviewBar">
                <div className="homePreviewDots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="small">TutoVera preview</span>
              </div>

              <div className="homePreviewStack">
                <div className="homePreviewPanel homePreviewChat">
                  <div className="homePreviewPrompt">
                    <p className="small" style={{ margin: 0 }}>
                      I need help learning a topic, but I want the explanation to feel clear and
                      trustworthy.
                    </p>
                  </div>

                  <div className="homePreviewResponse">
                    <p className="small" style={{ margin: 0 }}>
                      Choose an active branch for subject-specific tutoring, parent guidance, saved
                      history, and follow-up support inside the same TutoVera platform.
                    </p>
                  </div>
                </div>

                <div className="homePreviewGrid">
                  <div className="homePreviewMiniCard">
                    <span className="badge">Active now</span>
                    <p className="small" style={{ margin: 0 }}>
                      {activeSubjects.map((subject) => subject.name).join(', ')} include student
                      tutoring, parent support, and saved history.
                    </p>
                  </div>

                  <div className="homePreviewMiniCard">
                    <span className="badge">Built to expand</span>
                    <p className="small" style={{ margin: 0 }}>
                      Biology is structured as the next subject branch, not a separate cloned app.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal delay={0.04}>
        <section
          id="subjects"
          className="card spotlightCard"
          style={{ display: 'grid', gap: 22 }}
        >
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Subjects</span>
            <h2 style={{ margin: 0 }}>Choose a TutoVera branch.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 1120 }}>
              Each subject branch has its own homepage, examples, tutor behavior, and visual identity
              while sharing the same core account, history, settings, deployment, and backend
              structure.
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

                <p className="small" style={{ margin: '14px 0 0' }}>
                  <strong>{subject.status === 'active' ? 'Open workspace' : 'View subject page'} →</strong>
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="card" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Current focus</span>
            <h2 style={{ margin: 0 }}>Math, Physics, and Chemistry are active branches today.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 920 }}>
              The current focus is making the active branches feel stable, consistent, and useful
              before expanding the same structure to Biology and future product features.
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
          </div>
        </section>
      </Reveal>
    </div>
  );
}