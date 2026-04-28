import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { subjects } from '@/lib/subjects';

export default function HomePage() {
  const subjectList = Object.values(subjects);

  return (
    <div className="grid" style={{ gap: 34 }}>
      <section className="homeLead">
        <div className="homeLeadGrid">
          <div className="homeLeadCopy">
            <span className="badge">TutoVera learning platform</span>

            <h1 className="homeLeadTitle">One calm workspace for learning across subjects.</h1>

            <p className="homeLeadSubtext">
              TutoVera is being shaped as a unified AI learning platform, starting with Math and
              expanding into Physics, Chemistry, and Biology without splitting the product into
              disconnected apps.
            </p>

            <div className="buttonRow">
              <Link className="btn" href="/math">
                Open Math
              </Link>
              <Link className="btn secondary" href="#subjects">
                View Subjects
              </Link>
            </div>

            <div className="homeLeadProof">
              <div className="homeLeadProofItem">
                <strong>One account</strong>
                <p className="small" style={{ margin: 0 }}>
                  Shared login and learning history foundation.
                </p>
              </div>

              <div className="homeLeadProofItem">
                <strong>Subject branches</strong>
                <p className="small" style={{ margin: 0 }}>
                  Math first, then science subjects.
                </p>
              </div>

              <div className="homeLeadProofItem">
                <strong>Unified setup</strong>
                <p className="small" style={{ margin: 0 }}>
                  One app, one backend, no disconnected clones.
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
                <span className="small">TutoVera structure</span>
              </div>

              <div className="homePreviewStack">
                <div className="homePreviewPanel homePreviewChat">
                  <div className="homePreviewPrompt">
                    <p className="small" style={{ margin: 0 }}>
                      Choose a subject branch, then continue into the matching learning workspace.
                    </p>
                  </div>

                  <div className="homePreviewResponse">
                    <p className="small" style={{ margin: 0 }}>
                      Math is active now. Physics, Chemistry, and Biology are prepared as subject
                      branches that can grow from the same shared foundation.
                    </p>
                  </div>
                </div>

                <div className="homePreviewGrid">
                  <div className="homePreviewMiniCard">
                    <span className="badge">Active</span>
                    <p className="small" style={{ margin: 0 }}>
                      Math tutor, parent support, history, and pricing are now under /math.
                    </p>
                  </div>

                  <div className="homePreviewMiniCard">
                    <span className="badge">Next</span>
                    <p className="small" style={{ margin: 0 }}>
                      Subject-aware tutoring, shared settings, and future science branches.
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
              Each subject will have its own homepage, identity, and learning flow while sharing the
              same core account, history, deployment, and backend structure.
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
            <h2 style={{ margin: 0 }}>Math remains the active product branch.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 920 }}>
              The current working tutor experience is preserved under /math. The TutoVera homepage now
              gives the product a parent brand while keeping the existing Math workspace stable.
            </p>
          </div>

          <div className="buttonRow">
            <Link className="btn" href="/math/tutor">
              Open Student Workspace
            </Link>
            <Link className="btn secondary" href="/math/parents">
              Open Parent Workspace
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}