import BetaSignup from '@/components/BetaSignup';

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 32 }}>
      <section className="hero heroCard">
        <span className="badge">Free beta now live</span>
        <h1>Your Personal AI Math Tutor</h1>
        <p className="heroSubtext">
          Math support that helps people understand, not just copy answers.
        </p>
        <p>
          MathSupport AI helps students, parents, and tutors work through math with guided explanations,
          hint-based support, mistake diagnosis, and practice workflows built for actual learning.
        </p>

        <div className="buttonRow">
          <a className="btn" href="/tutor">Open Tutor for Students</a>
          <a className="btn secondary" href="/parents">Open Tutor for Parents</a>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card featureCard">
          <h3>For students</h3>
          <p className="small">
            Get step-by-step explanations, hints, diagnosis mode, and practice questions for algebra,
            calculus, and general math support.
          </p>
        </div>

        <div className="card featureCard">
          <h3>For parents</h3>
          <p className="small">
            Use the guided support version to help a child learn without jumping straight to the full answer.
          </p>
        </div>

        <div className="card featureCard">
          <h3>Built for clarity</h3>
          <p className="small">
            This beta is focused on making math feel clearer, more structured, and easier to work through.
          </p>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card featureCard">
          <h3>Step-by-step teaching</h3>
          <p className="small">
            Learn the method, not just the endpoint.
          </p>
        </div>

        <div className="card featureCard">
          <h3>Mistake diagnosis</h3>
          <p className="small">
            Paste your own work and see where the reasoning likely went wrong.
          </p>
        </div>

        <div className="card featureCard">
          <h3>Private learning history</h3>
          <p className="small">
            Sign in to keep track of your sessions and continue learning over time.
          </p>
        </div>
      </section>

      <BetaSignup />

      <section className="card spotlightCard">
        <h2>Choose your experience</h2>

        <div className="grid cols-3">
          <div className="card innerFeatureCard">
            <h3>Tutor for Students</h3>
            <p className="small">
              Best for solving problems, checking your understanding, and practicing topics directly.
            </p>
            <div className="buttonRow">
              <a className="btn" href="/tutor">Open Tutor for Students</a>
            </div>
          </div>

          <div className="card innerFeatureCard">
            <h3>Tutor for Parents</h3>
            <p className="small">
              Best for adults who want help explaining a concept clearly without over-relying on final answers.
            </p>
            <div className="buttonRow">
              <a className="btn" href="/parents">Open Tutor for Parents</a>
            </div>
          </div>
        </div>

        <p className="small" style={{ marginTop: 14 }}>
          Signed-in users can revisit and manage saved sessions from History.
        </p>
      </section>
    </div>
  );
}