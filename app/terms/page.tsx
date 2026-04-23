export default function TermsPage() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
        <span className="badge">Terms of Use</span>

        <div style={{ display: 'grid', gap: 10 }}>
          <h1 style={{ margin: 0 }}>Terms for using MathSupport AI during the beta stage.</h1>
          <p className="small" style={{ margin: 0 }}>
            Last updated: March 2026
          </p>
          <p className="small" style={{ margin: 0, maxWidth: 840 }}>
            These Terms of Use govern access to and use of MathSupport AI while the product remains
            in its current beta phase. By using the service, you agree to these terms.
          </p>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Educational support</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            The product is designed to help users learn, revise, and work through math more
            clearly, not to guarantee outcomes.
          </p>
        </div>

        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Beta environment</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            Features, workflows, availability, and access rules may change as the product continues
            to evolve.
          </p>
        </div>

        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Responsible use</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            Users are expected to use the service lawfully, respectfully, and without attempting to
            misuse or disrupt it.
          </p>
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>Educational support only</h2>
        <p className="small" style={{ margin: 0 }}>
          MathSupport AI is intended as a learning aid and educational support tool. It does not
          guarantee correct answers, grading outcomes, academic performance, or exam results.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>No professional or academic guarantee</h2>
        <p className="small" style={{ margin: 0 }}>
          The service is provided for informational and educational purposes only. Users are
          responsible for checking important answers, methods, reasoning, and conclusions before
          relying on them in coursework, assessments, tutoring, or other decisions.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>Acceptable use</h2>
        <p className="small" style={{ margin: 0 }}>
          You agree not to misuse the service, attempt to disrupt or overload the platform, submit
          harmful or unlawful content, reverse engineer protected components, bypass platform
          restrictions, or use the product in a way that violates applicable laws, rules, or
          policies.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>Beta service status</h2>
        <p className="small" style={{ margin: 0 }}>
          MathSupport AI is currently a beta product. Features may be added, changed, limited,
          interrupted, removed, or discontinued at any time as the service develops.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>Usage limits</h2>
        <p className="small" style={{ margin: 0 }}>
          Free beta access may be subject to request limits, technical restrictions, admin controls,
          provider-side limitations, or temporary suspension in order to protect reliability,
          prevent abuse, and manage platform capacity.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>Intellectual property</h2>
        <p className="small" style={{ margin: 0 }}>
          The site design, workflows, branding, interface elements, and original platform materials
          belong to MathSupport AI or its licensors. You may use the product for its intended
          educational purpose, but you may not copy, redistribute, or commercially exploit
          protected parts of the platform without permission.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>Disclaimer of warranties</h2>
        <p className="small" style={{ margin: 0 }}>
          The service is provided on an “as is” and “as available” basis without warranties of any
          kind, whether express or implied, to the fullest extent permitted by law.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>Limitation of liability</h2>
        <p className="small" style={{ margin: 0 }}>
          To the fullest extent permitted by law, MathSupport AI will not be liable for indirect,
          incidental, consequential, special, exemplary, or reliance-based damages arising from or
          related to the use of the service.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0 }}>Changes to these terms</h2>
        <p className="small" style={{ margin: 0 }}>
          These terms may be updated from time to time as the product evolves from beta into a more
          mature public service. Continued use of the product after updates means you accept the
          revised terms.
        </p>
      </section>
    </div>
  );
}