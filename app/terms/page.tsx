export default function TermsPage() {
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
          <span className="badge">Terms of Use</span>
          <h1 style={{ margin: 0 }}>Terms for using MathSupport AI during the beta stage.</h1>
          <p className="small" style={{ margin: 0 }}>Last updated: March 2026</p>
          <p className="small" style={{ margin: 0, maxWidth: 840 }}>
            These Terms of Use govern access to and use of MathSupport AI while the product remains
            in its current beta phase. By using the service, you agree to these terms.
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
              <strong>Educational support</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              The product is designed to help users learn, revise, and work through math more
              clearly, not to guarantee outcomes.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Beta environment</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Features, workflows, availability, and access rules may change as the product
              continues to evolve.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Responsible use</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Users are expected to use the service lawfully, respectfully, and without attempting
              to misuse or disrupt it.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(320px, 0.92fr)',
          gap: 24
        }}
      >
        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Core use terms</h2>
            <p className="small" style={{ margin: 0 }}>
              These terms reflect the current beta phase and the educational nature of the product.
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
                <strong>Educational support only</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                MathSupport AI is intended as a learning aid and educational support tool. It does
                not guarantee correct answers, grading outcomes, academic performance, or exam
                results.
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
                <strong>No professional or academic guarantee</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Users are responsible for checking important answers, methods, reasoning, and
                conclusions before relying on them in coursework, assessments, tutoring, or other
                decisions.
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
                <strong>Acceptable use</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                You agree not to misuse the service, attempt to disrupt or overload the platform,
                submit harmful or unlawful content, reverse engineer protected components, bypass
                platform restrictions, or use the product in a way that violates applicable laws,
                rules, or policies.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <span className="badge">Beta service terms</span>

          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Status and limitations</h2>
            <p className="small" style={{ margin: 0 }}>
              The current service is still being refined, which affects how availability and rules
              should be understood.
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
              <strong style={{ fontSize: '0.98rem' }}>Beta service status</strong>
              <p className="small" style={{ margin: 0 }}>
                MathSupport AI is currently a beta product. Features may be added, changed, limited,
                interrupted, removed, or discontinued at any time as the service develops.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 5 }}>
              <strong style={{ fontSize: '0.98rem' }}>Usage limits</strong>
              <p className="small" style={{ margin: 0 }}>
                Free beta access may be subject to request limits, technical restrictions, admin
                controls, provider-side limitations, or temporary suspension to protect reliability,
                prevent abuse, and manage platform capacity.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 5 }}>
              <strong style={{ fontSize: '0.98rem' }}>Intellectual property</strong>
              <p className="small" style={{ margin: 0 }}>
                The site design, workflows, branding, interface elements, and original platform
                materials belong to MathSupport AI or its licensors. You may use the product for
                its intended educational purpose, but not copy, redistribute, or commercially
                exploit protected parts of the platform without permission.
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
            <h2 style={{ margin: 0, fontSize: '1.24rem' }}>Disclaimer of warranties</h2>
            <p className="small" style={{ margin: 0 }}>
              The service is provided on an “as is” and “as available” basis without warranties of
              any kind, whether express or implied, to the fullest extent permitted by law.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: '1.24rem' }}>Limitation of liability</h2>
            <p className="small" style={{ margin: 0 }}>
              To the fullest extent permitted by law, MathSupport AI will not be liable for
              indirect, incidental, consequential, special, exemplary, or reliance-based damages
              arising from or related to the use of the service.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: '1.24rem' }}>Changes to these terms</h2>
            <p className="small" style={{ margin: 0 }}>
              These terms may be updated from time to time as the product evolves from beta into a
              more mature public service. Continued use of the product after updates means you
              accept the revised terms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}