import MathTutor from '@/components/MathTutor';
import BetaSignup from '@/components/BetaSignup';

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 32 }}>
      <section className="hero">
        <span className="badge">Free beta now live</span>
        <h1>Understand math step by step, not just the final answer.</h1>
        <p>
          MathSupport AI helps students work through algebra, calculus, and general math with
          guided explanations, hint-based support, mistake diagnosis, and saved practice history.
          This beta is built for learners who want clarity, not just shortcuts.
        </p>
        <div className="buttonRow">
          <a className="btn" href="#tutor">Try the tutor</a>
          <a className="btn secondary" href="#how-it-works">See how it works</a>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card">
          <h3>Learn the method</h3>
          <p className="small">
            Get step-by-step explanations that show how a problem is solved and why each step matters.
          </p>
        </div>
        <div className="card">
          <h3>Find the mistake</h3>
          <p className="small">
            Paste your own work and use diagnosis mode to see where your reasoning may have gone off track.
          </p>
        </div>
        <div className="card">
          <h3>Practice with structure</h3>
          <p className="small">
            Turn topics into guided practice, hints, and revision-style help instead of random answer dumps.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="grid cols-3">
        <div className="card">
          <h3>1. Ask a question</h3>
          <p className="small">
            Type a problem, paste your work, or ask for help on a specific topic.
          </p>
        </div>
        <div className="card">
          <h3>2. Choose your mode</h3>
          <p className="small">
            Learn step by step, get hints only, diagnose a mistake, or turn the topic into practice questions.
          </p>
        </div>
        <div className="card">
          <h3>3. Build understanding</h3>
          <p className="small">
            Use the same email to keep a simple history of your sessions during the beta.
          </p>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card">
          <h3>Built for students</h3>
          <p className="small">
            Useful for homework support, revision, weak-topic recovery, and understanding confusing classwork.
          </p>
        </div>
        <div className="card">
          <h3>Good for algebra and calculus</h3>
          <p className="small">
            The current beta is especially focused on core school and early college math support.
          </p>
        </div>
        <div className="card">
          <h3>Still improving</h3>
          <p className="small">
            Future versions may include study plans, progress tracking, and stronger personalized support.
          </p>
        </div>
      </section>

      <BetaSignup />

      <section id="tutor" className="card">
        <h2>Try the free beta tutor</h2>
        <p className="small">
          Ask a math question, paste your work, or request practice questions. Free beta usage is
          currently limited to 20 tutor requests per 24 hours.
        </p>
        <MathTutor />
      </section>

      <section className="card">
        <h2>Who this beta is for</h2>
        <p>
          This version is best for students who want help understanding math more clearly, especially
          in algebra, functions, equations, precalculus, and introductory calculus. It is also useful
          for learners who know they are making mistakes but are not sure where those mistakes begin.
        </p>
      </section>

      <section className="card">
        <h2>Why join early</h2>
        <p>
          Early users help shape the product. The beta is the stage where the tutor, history,
          practice flow, and future learning tools are being refined based on real student needs.
        </p>
      </section>
    </div>
  );
}