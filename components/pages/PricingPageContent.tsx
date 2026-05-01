import Reveal from '@/components/Reveal';
import { plans } from '@/lib/plans';

const comparisonRows = [
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
    label: 'Math graphing',
    free: 'Included',
    plus: 'Included',
    pro: 'Included'
  },
  {
    label: 'Read aloud and translation',
    free: 'Included',
    plus: 'Included',
    pro: 'Included'
  },
  {
    label: 'Worksheet/photo help',
    free: 'Not included',
    plus: 'Included',
    pro: 'Advanced'
  },
  {
    label: 'Advanced subject tools',
    free: 'Not included',
    plus: 'Early access',
    pro: 'Highest access'
  }
];

export default function PricingPageContent() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Pricing</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Choose the support level that fits how you study.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 860 }}>
              TutoVera is currently in free beta. These tiers define the planned product structure
              for launch, with paid plans designed around higher usage, longer history, and
              paid-only image and worksheet support.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
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

      <Reveal delay={0.14}>
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

      <Reveal delay={0.2}>
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
            min-width: 720px;
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