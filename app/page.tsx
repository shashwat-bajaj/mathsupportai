import MathTutor from '@/components/MathTutor';
import BetaSignup from '@/components/BetaSignup';

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 32 }}>
      <section className="hero">
        <span className="badge">Free beta now live</span>
        <h1>AI math support built for real learning, not just final answers.</h1>
        <p>
          Get step-by-step help, clear explanations, and guided support for algebra,
          calculus, and general math practice. This early version is focused on making
          the tutor useful before monetization is added later.
        </p>
        <div className="buttonRow">
          <a className="btn" href="#tutor">Try the free beta</a>
          <a className="btn secondary" href="/history">View history</a>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card">
          <h3>Step-by-step teaching</h3>
          <p className="small">Explains the reasoning instead of rushing to the answer.</p>
        </div>
        <div className="card">
          <h3>Mistake diagnosis</h3>
          <p className="small">Helps identify where the learner likely went wrong.</p>
        </div>
        <div className="card">
          <h3>Built for growth</h3>
          <p className="small">This beta is the foundation for study plans, mastery tracking, and exam prep.</p>
        </div>
      </section>

      <BetaSignup />

      <section id="tutor" className="card">
        <h2>Free beta tutor</h2>
        <p className="small">
          Ask a math question, paste your work, or request a quiz. If you use the same email,
          you will later be able to view your saved sessions.
        </p>
        <MathTutor />
      </section>
    </div>
  );
}