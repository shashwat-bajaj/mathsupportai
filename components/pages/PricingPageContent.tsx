import Reveal from '@/components/Reveal';
import { plans } from '@/lib/plans';

const comparisonRows = [
  {
    label: 'Main purpose',
    free: 'Try the tutor',
    plus: 'Regular study + worksheets',
    pro: 'Deep revision + advanced tools'
  },
  {
    label: 'Tutor requests',
    free: '10/day',
    plus: '100/day',
    pro: '300/day'
  },
  {
    label: 'Image uploads',
    free: 'Not included',
    plus: '100/month',
    pro: '500/month'
  },
  {
    label: 'Worksheet/photo help',
    free: 'Not included',
    plus: 'Included',
    pro: 'Advanced'
  },
  {
    label: 'Student workspaces',
    free: 'Included',
    plus: 'Included',
    pro: 'Included'
  },
  {
    label: 'Parent workspaces',
    free: 'Included',
    plus: 'Included',
    pro: 'Included'
  },
  {
    label: 'All subjects',
    free: 'Included',
    plus: 'Included',
    pro: 'Included'
  },
  {
    label: 'Saved history',
    free: 'Basic',
    plus: 'Extended',
    pro: 'Highest allowance'
  },
  {
    label: 'Read aloud and translation',
    free: 'Basic access',
    plus: 'Higher access',
    pro: 'Highest access'
  },
  {
    label: 'Practice generation',
    free: 'Basic prompts',
    plus: 'Included',
    pro: 'Advanced'
  },
  {
    label: 'Mistake tracking',
    free: 'Not included',
    plus: 'Basic diagnosis',
    pro: 'Mistake Map planned'
  },
  {
    label: 'Revision workflows',
    free: 'Not included',
    plus: 'Guided practice',
    pro: 'Revision Mode planned'
  },
  {
    label: 'Advanced subject tools',
    free: 'Not included',
    plus: 'Early access',
    pro: 'Highest access'
  }
];

export default function PricingPageContent() {
  const freePlan = plans.find((plan) => plan.key === 'free');
  const plusPlan = plans.find((plan) => plan.key === 'plus');
  const proPlan = plans.find((plan) => plan.key === 'pro');

  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Pricing</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Choose the support level that fits how you study.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 900 }}>
              TutoVera is currently in free beta. These tiers define the planned launch structure:
              Free helps users try the tutor, Plus unlocks worksheet/photo support for regular
              study, and Pro is designed for deeper revision, mistake patterns, and advanced tools.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.06}>
        <section className="grid cols-3">
          <div className="card innerFeatureCard">
            <span className="badge">Free</span>
            <h3 style={{ marginBottom: 8 }}>Try the tutor</h3>
            <p className="small" style={{ margin: 0 }}>
              Text-based help across every subject branch with basic history and core tutor access.
            </p>
          </div>

          <div className="card innerFeatureCard" style={{ borderColor: 'var(--accent-border)' }}>
            <span className="badge">Plus</span>
            <h3 style={{ marginBottom: 8 }}>Learn from worksheets and photos</h3>
            <p className="small" style={{ margin: 0 }}>
              The main paid plan for regular students and parents who want image support, guided
              practice, and extended history.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <span className="badge">Pro</span>
            <h3 style={{ marginBottom: 8 }}>Build a deeper study system</h3>
            <p className="small" style={{ margin: 0 }}>
              A higher-access plan for revision workflows, repeated mistake patterns, advanced
              tools, and heavier study usage.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="grid cols-3">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className="card featureCard"
              style={{
                borderColor: plan.highlighted ? 'var(--accent-border)' : 'var(--border)',
                display: 'grid',
                gap: 16
              }}
            >
              <div style={{ display: 'grid', gap: 10 }}>
                <span className="badge">{plan.badge}</span>

                <div>
                  <h2 style={{ margin: 0 }}>{plan.name}</h2>
                  <p className="small" style={{ margin: '6px 0 0' }}>
                    {plan.audience}
                  </p>
                </div>

                <div>
                  <div className="price">{plan.monthlyPrice}</div>
                  <p className="small" style={{ margin: 0 }}>
                    per month
                  </p>
                  <p className="small" style={{ margin: '6px 0 0' }}>
                    <strong>{plan.annualPrice}</strong> · {plan.annualNote}
                  </p>
                </div>

                <p className="small" style={{ margin: 0 }}>
                  {plan.description}
                </p>

                <p className="small" style={{ margin: 0 }}>
                  <strong>{plan.positioning}</strong>
                </p>
              </div>

              <div
                className="grid"
                style={{
                  gap: 10,
                  paddingTop: 12,
                  borderTop: '1px solid var(--border)'
                }}
              >
                <div className="card questionSurface" style={{ padding: 14 }}>
                  <p className="small" style={{ margin: '0 0 4px' }}>
                    <strong>Tutor requests</strong>
                  </p>
                  <p className="small" style={{ margin: 0 }}>
                    {plan.limits.tutorRequestsPerDay}
                  </p>
                </div>

                <div className="card questionSurface" style={{ padding: 14 }}>
                  <p className="small" style={{ margin: '0 0 4px' }}>
                    <strong>Image support</strong>
                  </p>
                  <p className="small" style={{ margin: 0 }}>
                    {plan.limits.imageUploadsPerMonth}
                  </p>
                </div>

                <div className="card questionSurface" style={{ padding: 14 }}>
                  <p className="small" style={{ margin: '0 0 4px' }}>
                    <strong>Saved history</strong>
                  </p>
                  <p className="small" style={{ margin: 0 }}>
                    {plan.limits.savedConversations}
                  </p>
                </div>
              </div>

              <div
                className="grid"
                style={{
                  gap: 10,
                  paddingTop: 12,
                  borderTop: '1px solid var(--border)'
                }}
              >
                <p className="small" style={{ margin: 0 }}>
                  <strong>Why users choose this plan</strong>
                </p>
                <ul className="list" style={{ marginTop: 0 }}>
                  {plan.paidValue.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <ul className="list" style={{ marginTop: 0 }}>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="buttonRow" style={{ marginTop: 'auto' }}>
                <a className={plan.highlighted ? 'btn' : 'btn secondary'} href={plan.ctaHref}>
                  {plan.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </section>
      </Reveal>

      <Reveal delay={0.16}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Paid plan value</span>
            <h2 style={{ margin: 0 }}>The paid tiers are built around learning workflows, not just more answers.</h2>
            <p className="small" style={{ margin: 0, maxWidth: 900 }}>
              TutoVera should not compete only as another answer generator. The planned paid value is
              worksheet/photo support, guided practice, parent-friendly help, mistake diagnosis,
              saved continuity, and deeper revision workflows over time.
            </p>
          </div>

          <div className="grid cols-3">
            <div className="card innerFeatureCard">
              <h3 style={{ marginTop: 0 }}>{freePlan?.name}: Try</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                Free gives users enough access to understand the platform, ask text questions, and
                see the learning flow.
              </p>
            </div>

            <div className="card innerFeatureCard" style={{ borderColor: 'var(--accent-border)' }}>
              <h3 style={{ marginTop: 0 }}>{plusPlan?.name}: Study</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                Plus is the main conversion tier because worksheet/photo help is concrete,
                practical, and valuable for regular homework support.
              </p>
            </div>

            <div className="card innerFeatureCard">
              <h3 style={{ marginTop: 0 }}>{proPlan?.name}: Improve</h3>
              <p className="small" style={{ marginBottom: 0 }}>
                Pro is designed around deeper revision, mistake patterns, and advanced tools that
                help users improve over time.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.22}>
        <section className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Compare plans</span>
            <h2 style={{ margin: 0 }}>What changes when users upgrade?</h2>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              The free plan is designed for trying TutoVera. Paid plans are designed for regular
              study, image-based help, longer saved history, and future advanced subject tools.
            </p>
          </div>

          <div className="pricingTableWrap">
            <table className="pricingTable">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Free</th>
                  <th>Plus</th>
                  <th>Pro</th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.free}</td>
                    <td>{row.plus}</td>
                    <td>{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.28}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Why image support is paid-only</h2>
            <p className="small" style={{ margin: 0, maxWidth: 880 }}>
              Image and worksheet support is more expensive to operate and more valuable for serious
              study. Free users can still use text-based tutoring across all subjects, while Plus and
              Pro are planned to unlock image-based help with monthly usage caps.
            </p>
          </div>

          <div className="buttonRow">
            <a className="btn" href="/tutor">
              Try Student Workspaces
            </a>
            <a className="btn secondary" href="/parents">
              Try Parent Workspaces
            </a>
            <a className="btn secondary" href="/contact">
              Ask About Paid Access
            </a>
          </div>
        </section>
      </Reveal>

      <style>
        {`
          .pricingTableWrap {
            width: 100%;
            overflow-x: auto;
            border: 1px solid var(--border);
            border-radius: 18px;
            background: color-mix(in srgb, var(--surface) 94%, transparent);
          }

          .pricingTable {
            width: 100%;
            min-width: 760px;
            border-collapse: collapse;
          }

          .pricingTable th,
          .pricingTable td {
            text-align: left;
            padding: 14px 16px;
            border-bottom: 1px solid var(--border);
            vertical-align: top;
          }

          .pricingTable th {
            color: var(--text);
            background: color-mix(in srgb, var(--surface-soft) 86%, transparent);
          }

          .pricingTable td {
            color: var(--text-soft);
          }

          .pricingTable tr:last-child td {
            border-bottom: 0;
          }
        `}
      </style>
    </div>
  );
}