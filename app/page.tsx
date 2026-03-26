import BetaSignup from '@/components/BetaSignup';

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 32 }}>
      <section className="hero">
        <span className="badge">Free beta now live</span>
        <h1>Math support that helps people understand, not just copy answers.</h1>
        <p>
          MathSupport AI helps students, parents, and tutors work through math with guided explanations,
          hint-based support, mistake diagnosis, and practice workflows that are built for actual learning.
        </p>
        <div className="buttonRow">
          <a className="btn" href="/tutor">Open student tutor</a>
          <a className="btn secondary" href="/parents">Parent / tutor support</a>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card">
          <h3>For students</h3>
          <p className="small">
            Get step-by-step explanations, hints, diagnosis mode, and practice questions for algebra,
            calculus, and general math support.
          </p>
        </div>
        <div className="card">
          <h3>For parents</h3>
          <p className="small">
            Use the guided support version to help a child learn without jumping straight to the full answer.
          </p>
        </div>
        <div className="card">
          <h3>Built for clarity</h3>
          <p className="small">
            This beta is focused on making math feel clearer, more structured, and easier to work through.
          </p>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card">
          <h3>Step-by-step teaching</h3>
          <p className="small">
            Learn the method, not just the endpoint.
          </p>
        </div>
        <div className="card">
          <h3>Mistake diagnosis</h3>
          <p className="small">
            Paste your own work and see where the reasoning likely went wrong.
          </p>
        </div>
        <div className="card">
          <h3>Beta history</h3>
          <p className="small">
            Use the same email during beta to revisit saved sessions more easily.
          </p>
        </div>
      </section>

      <BetaSignup />

      <section className="card">
        <h2>Choose your experience</h2>
        <div className="grid cols-3">
          <div className="card">
            <h3>Student tutor</h3>
            <p className="small">
              Best for solving problems, checking your understanding, and practicing topics directly.
            </p>
            <div className="buttonRow">
              <a className="btn" href="/tutor">Go to tutor</a>
            </div>
          </div>

          <div className="card">
            <h3>Parent / tutor support</h3>
            <p className="small">
              Best for adults who want help explaining a concept clearly without over-relying on final answers.
            </p>
            <div className="buttonRow">
              <a className="btn secondary" href="/parents">Go to parent support</a>
            </div>
          </div>

          <div className="card">
            <h3>Saved history</h3>
            <p className="small">
              Revisit previous beta sessions using the same email you used during the tutor flow.
            </p>
            <div className="buttonRow">
              <a className="btn secondary" href="/history">View history</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}