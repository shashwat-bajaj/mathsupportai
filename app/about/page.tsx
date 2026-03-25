export default function AboutPage() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>About MathSupport AI</h1>
        <p className="small">Free beta • Built for learning-first math support</p>
        <p>
          MathSupport AI is being built to help students learn mathematics with clearer
          explanations, guided steps, mistake diagnosis, and better study support. The goal is
          not just to produce answers, but to help users understand how and why a method works.
        </p>
      </section>

      <section className="card">
        <h2>What makes this different</h2>
        <p>
          This beta is focused on real learning rather than answer dumping. It is designed to
          support step-by-step teaching, hint-based learning, mistake diagnosis, and eventually
          personalized study plans, revision tracking, and mastery growth over time.
        </p>
      </section>

      <section className="card">
        <h2>Current beta focus</h2>
        <p>
          Right now, the product is focused on building a strong core tutor experience for algebra,
          calculus, and general math support. Early beta users are helping shape what features
          should come next.
        </p>
      </section>

      <section className="card">
        <h2>What is coming later</h2>
        <p>
          Future versions may include better revision workflows, study-plan generation, mistake
          memory, topic-level progress tracking, and paid plans once the international business
          setup is ready.
        </p>
      </section>
    </div>
  );
}