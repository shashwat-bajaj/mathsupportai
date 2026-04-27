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

function getPreviewPrompt(subject: SubjectConfig) {
  return subject.tutor.examplePrompts[0] || `Help me understand a ${subject.name} topic.`;
}

function getPreviewResponse(subject: SubjectConfig) {
  switch (subject.key) {
    case 'physics':
      return 'A future Physics workspace can explain the concept, identify variables, connect formulas, check units, and guide the problem step by step.';
    case 'chemistry':
      return 'A future Chemistry workspace can explain reactions, balance equations, walk through stoichiometry, and connect formulas to lab-style reasoning.';
    case 'biology':
      return 'A future Biology workspace can explain vocabulary, compare processes, summarize systems, and help connect details to the bigger concept.';
    case 'math':
    default:
      return 'The active Math workspace explains steps, supports follow-ups, graphs when useful, and keeps the learning thread connected.';
  }
}

function getUseCases(subject: SubjectConfig) {
  switch (subject.key) {
    case 'physics':
      return [
        {
          title: 'Concept first',
          text: 'Explain forces, energy, waves, circuits, and motion before jumping into equations.'
        },
        {
          title: 'Formula reasoning',
          text: 'Help students choose formulas, understand variables, check units, and follow each step.'
        },
        {
          title: 'Problem setup',
          text: 'Turn word problems into known values, unknown values, diagrams, and a clear path forward.'
        }
      ];
    case 'chemistry':
      return [
        {
          title: 'Chemical reasoning',
          text: 'Explain reactions, bonding, acids and bases, molarity, and why each step makes sense.'
        },
        {
          title: 'Equation support',
          text: 'Guide balancing, stoichiometry, conversions, units, and formula use without skipping logic.'
        },
        {
          title: 'Lab-style thinking',
          text: 'Support observation-based reasoning, calculations, and interpretation of experiment-style questions.'
        }
      ];
    case 'biology':
      return [
        {
          title: 'Process clarity',
          text: 'Explain systems like mitosis, DNA replication, respiration, evolution, and physiology clearly.'
        },
        {
          title: 'Vocabulary support',
          text: 'Break down biology terms in simple language and connect them to real biological processes.'
        },
        {
          title: 'Big-picture learning',
          text: 'Help students connect details, diagrams, structures, and functions into a clearer overall picture.'
        }
      ];
    case 'math':
    default:
      return [
        {
          title: 'Step-by-step help',
          text: 'Explain the reasoning behind each step instead of only producing the final answer.'
        },
        {
          title: 'Follow-up flow',
          text: 'Keep the same learning thread going so students can ask what comes next.'
        },
        {
          title: 'Graph-aware support',
          text: 'Support graphable questions when a visual explanation helps the math make sense.'
        }
      ];
  }
}

export default function SubjectLandingPage({ subject }: SubjectLandingPageProps) {
  const isActive = subject.status === 'active';
  const previewPrompt = getPreviewPrompt(subject);
  const previewResponse = getPreviewResponse(subject);
  const useCases = getUseCases(subject);

  return (
    <div className="grid" style={{ gap: 34 }}>
      <section className="homeLead">
        <div className="homeLeadGrid">
          <div className="homeLeadCopy">
            <div className="buttonRow">
              <span className="badge">{getStatusLabel(subject.status)}</span>
              <span className="badge">Solvyq {subject.name}</span>
            </div>

            <h1 className="homeLeadTitle">
              {subject.name} support built as a Solvyq subject branch.
            </h1>

            <p className="homeLeadSubtext">{subject.description}</p>

            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              {getStatusDescription(subject)}
            </p>

            <div className="buttonRow">
              {isActive ? (
                <Link className="btn" href={`${subject.path}/tutor`}>
                  Open {subject.shortName} Workspace
                </Link>
              ) : (
                <Link className="btn" href={`${subject.path}/tutor`}>
                  View Tutor Preview
                </Link>
              )}

              <Link className="btn secondary" href={`${subject.path}/history`}>
                View History Preview
              </Link>

              <Link className="btn secondary" href="/math/tutor">
                Open Active Math Tutor
              </Link>
            </div>

            <div className="homeLeadProof">
              <div className="homeLeadProofItem">
                <strong>Subject-specific</strong>
                <p className="small" style={{ margin: 0 }}>
                  Built around {subject.name.toLowerCase()} learning needs.
                </p>
              </div>

              <div className="homeLeadProofItem">
                <strong>Shared foundation</strong>
                <p className="small" style={{ margin: 0 }}>
                  One Solvyq account and structure.
                </p>
              </div>

              <div className="homeLeadProofItem">
                <strong>Careful rollout</strong>
                <p className="small" style={{ margin: 0 }}>
                  Math stays active while this branch prepares.
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
                <span className="small">{subject.name} tutor preview</span>
              </div>

              <div className="homePreviewStack">
                <div className="homePreviewPanel homePreviewChat">
                  <div className="homePreviewPrompt">
                    <p className="small" style={{ margin: 0 }}>
                      {previewPrompt}
                    </p>
                  </div>

                  <div className="homePreviewResponse">
                    <p className="small" style={{ margin: 0 }}>
                      {previewResponse}
                    </p>
                  </div>
                </div>

                <div className="homePreviewGrid">
                  <div className="homePreviewMiniCard">
                    <span className="badge">Planned tools</span>
                    <p className="small" style={{ margin: 0 }}>
                      Step-by-step support, subject examples, saved sessions, and guided follow-ups.
                    </p>
                  </div>

                  <div className="homePreviewMiniCard">
                    <span className="badge">Status</span>
                    <p className="small" style={{ margin: 0 }}>
                      {subject.status === 'active'
                        ? 'This subject branch is active.'
                        : 'This subject branch is reserved for a future rollout.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal delay={0.04}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 22 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">How it will help</span>
            <h2 style={{ margin: 0 }}>A subject workspace, not a separate app.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 1120 }}>
              {subject.name} will grow inside the same Solvyq platform, using the same account,
              deployment, and history foundation while allowing the learning experience to become
              specific to the subject.
            </p>
          </div>

          <div className="grid cols-3">
            {useCases.map((item) => (
              <div key={item.title} className="card innerFeatureCard">
                <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                <p className="small" style={{ marginBottom: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="card" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Example prompts</span>
            <h2 style={{ margin: 0 }}>What users may eventually ask in {subject.name}.</h2>
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

      <Reveal delay={0.12}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>
              {subject.status === 'active'
                ? `${subject.name} is active now.`
                : `${subject.name} is not active yet.`}
            </h2>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              The current active tutor experience is Solvyq Math. This {subject.name} branch is being
              shaped so it can eventually support its own tutor behavior, examples, history, and
              learning flow without splitting Solvyq into separate apps.
            </p>
          </div>

          <div className="buttonRow">
            <Link className="btn" href="/math/tutor">
              Open Active Math Tutor
            </Link>
            <Link className="btn secondary" href={`${subject.path}/tutor`}>
              View {subject.name} Tutor Preview
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