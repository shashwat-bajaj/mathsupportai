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

            <h1 className="homeLeadTitle">Tutoring you can trust, across every subject branch.</h1>

            <p className="homeLeadSubtext">
              TutoVera is a calm AI learning platform starting with Math and expanding into Physics,
              Chemistry, and Biology. Each subject can grow into its own learning workspace while
              still sharing one account, one history foundation, and one connected product experience.
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
                <strong>Subject branches</strong>
                <p className="small" style={{ margin: 0 }}>
                  Math is active now, with science branches prepared for future growth.
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
                      Start with the active Math workspace today. As TutoVera grows, each subject
                      branch can offer its own examples, tutor behavior, and learning flow while
                      staying connected to the same platform.
                    </p>
                  </div>
                </div>

                <div className="homePreviewGrid">
                  <div className="homePreviewMiniCard">
                    <span className="badge">Active now</span>
                    <p className="small" style={{ margin: 0 }}>
                      TutoVera Math includes student tutoring, parent support, saved history, and a
                      free beta experience.
                    </p>
                  </div>

                  <div className="homePreviewMiniCard">
                    <span className="badge">Built to expand</span>
                    <p className="small" style={{ margin: 0 }}>
                      Physics, Chemistry, and Biology are structured as future subject branches, not
                      separate cloned apps.
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
              Each subject branch can have its own homepage, examples, tutor behavior, and visual
              identity while sharing the same core account, history, settings, deployment, and backend
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
            <h2 style={{ margin: 0 }}>TutoVera Math is the active branch today.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 920 }}>
              The working tutor experience is preserved under /math while the parent TutoVera brand
              gives the product room to grow. The goal is to improve Math carefully first, then expand
              future subject branches without breaking the shared foundation.
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