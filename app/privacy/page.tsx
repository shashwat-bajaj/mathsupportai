export default function PrivacyPage() {
  return (
    <div className="grid" style={{ gap: 30 }}>
      <section
        style={{
          display: 'grid',
          gap: 18,
          paddingTop: 6
        }}
      >
        <div style={{ display: 'grid', gap: 10, maxWidth: 920 }}>
          <span className="badge">Privacy Policy</span>
          <h1 style={{ margin: 0 }}>How MathSupport AI handles information during the beta.</h1>
          <p className="small" style={{ margin: 0 }}>Last updated: March 2026</p>
          <p className="small" style={{ margin: 0, maxWidth: 840 }}>
            MathSupport AI is currently offered as a free beta product. This Privacy Policy explains
            what information may be collected, how it may be used, and how it is handled while the
            product continues to develop.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            paddingTop: 14,
            borderTop: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Product operation</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Some information is used to run the tutor, save sessions, support sign-in, and keep
              the product functioning normally.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Beta improvement</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Usage patterns, submitted questions, and tutor flows may also be reviewed to improve
              the product over time.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Limited scope</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              This beta is an educational support product and is not presented as a formal student
              records system or official school platform.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.04fr) minmax(320px, 0.96fr)',
          gap: 24
        }}
      >
        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Information we may collect</h2>
            <p className="small" style={{ margin: 0 }}>
              Depending on how the product is used, MathSupport AI may collect information such as:
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              paddingTop: 14,
              borderTop: '1px solid var(--border)'
            }}
          >
            <div
              className="questionSurface"
              style={{
                padding: 16,
                borderRadius: 20,
                border: '1px solid var(--border)'
              }}
            >
              <p className="small" style={{ margin: '0 0 6px' }}>
                <strong>Account details</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                This may include your email address and sign-in related account information when you
                create or use an account.
              </p>
            </div>

            <div
              className="questionSurface"
              style={{
                padding: 16,
                borderRadius: 20,
                border: '1px solid var(--border)'
              }}
            >
              <p className="small" style={{ margin: '0 0 6px' }}>
                <strong>Tutor activity</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                This may include the questions you submit, tutor responses, saved conversation
                history, and related session data.
              </p>
            </div>

            <div
              className="questionSurface"
              style={{
                padding: 16,
                borderRadius: 20,
                border: '1px solid var(--border)'
              }}
            >
              <p className="small" style={{ margin: '0 0 6px' }}>
                <strong>Technical information</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Limited request metadata may be processed for security, diagnostics, rate limiting,
                abuse prevention, and product reliability.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <span className="badge">How information may be used</span>

          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Primary use during the beta</h2>
            <p className="small" style={{ margin: 0 }}>
              Submitted information may be used to operate the tutor, save session history, support
              account features, improve product quality, understand beta usage, reduce abuse, and
              help shape future features and workflows.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              paddingTop: 14,
              borderTop: '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'grid', gap: 5 }}>
              <strong style={{ fontSize: '0.98rem' }}>AI-generated responses</strong>
              <p className="small" style={{ margin: 0 }}>
                Tutor responses are generated with artificial intelligence and may sometimes be
                incorrect, incomplete, or unsuitable for a particular academic setting. Important
                answers should be reviewed and verified before being relied on.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 5 }}>
              <strong style={{ fontSize: '0.98rem' }}>Third-party services and data sharing</strong>
              <p className="small" style={{ margin: 0 }}>
                MathSupport AI does not sell personal information. The product may rely on
                third-party service providers such as hosting, database, authentication, analytics,
                and AI infrastructure providers that process information to make the service
                available.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 5 }}>
              <strong style={{ fontSize: '0.98rem' }}>Data retention</strong>
              <p className="small" style={{ margin: 0 }}>
                Beta submissions, saved history, signup information, and related product data may be
                retained for development, debugging, analytics, product improvement, and service
                continuity unless deletion is requested and technically feasible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gap: 18,
          paddingTop: 16,
          borderTop: '1px solid var(--border)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 22
          }}
        >
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: '1.24rem' }}>Children and student use</h2>
            <p className="small" style={{ margin: 0 }}>
              If the service is used by minors or students, a parent, guardian, teacher, or school
              should decide whether the tool is appropriate for that context. This beta is not
              currently designed as a formal school-managed records environment.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: '1.24rem' }}>Privacy questions</h2>
            <p className="small" style={{ margin: 0 }}>
              For privacy-related questions, feedback, or deletion requests, please use the contact
              page while the beta continues to expand.
            </p>
          </div>
        </div>

        <div className="buttonRow">
          <a className="btn secondary" href="/contact">
            Open Contact Page
          </a>
        </div>
      </section>
    </div>
  );
}