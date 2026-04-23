import './globals.css';
import type { ReactNode } from 'react';
import AuthNav from '@/components/AuthNav';
import ThemeToggle from '@/components/ThemeToggle';
import BrandMark from '@/components/BrandMark';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'MathSupport AI',
  description: 'AI math support for students and parents.'
};

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/tutor', label: 'Students' },
  { href: '/parents', label: 'Parents' },
  { href: '/history', label: 'History' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const utilityLinks = [
  { href: '/pricing', label: 'Free Beta' },
  { href: '/settings', label: 'Settings' }
];

const legalLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <header className="topbar">
          <div
            style={{
              width: '100%',
              maxWidth: 1180,
              margin: '0 auto',
              display: 'grid',
              gap: 14
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 18,
                flexWrap: 'wrap'
              }}
            >
              <BrandMark />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap'
                }}
              >
                <nav className="mainNav" aria-label="Primary navigation">
                  {primaryLinks.map((link) => (
                    <a key={link.href} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                  <AuthNav />
                </nav>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap'
              }}
            >
              <div
                className="buttonRow"
                style={{
                  gap: 8
                }}
              >
                {utilityLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="small"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 34,
                      padding: '0 12px',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                      background: 'color-mix(in srgb, var(--surface-soft) 88%, transparent)'
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <p className="small" style={{ margin: 0 }}>
                AI math support for students and parents.
              </p>
            </div>
          </div>
        </header>

        <main
          className="container"
          style={{
            paddingTop: 24,
            paddingBottom: 22
          }}
        >
          {children}
        </main>

        <footer
          className="siteFooter"
          style={{
            borderTop: '1px solid var(--border)',
            marginTop: 8
          }}
        >
          <div
            className="container"
            style={{
              display: 'grid',
              gap: 18,
              paddingTop: 22,
              paddingBottom: 34
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) auto',
                gap: 18,
                alignItems: 'start'
              }}
            >
              <div style={{ display: 'grid', gap: 8, minWidth: 0 }}>
                <p className="small" style={{ margin: 0 }}>
                  <strong>MathSupport AI</strong> is being shaped into a calmer learning workspace
                  for students and parents.
                </p>
                <p className="small" style={{ margin: 0, maxWidth: 720 }}>
                  The focus is better explanation, graph support, stronger follow-up flow, and a
                  cleaner product experience across the whole site.
                </p>
              </div>

              <ThemeToggle />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 14,
                flexWrap: 'wrap'
              }}
            >
              <div className="buttonRow" style={{ gap: 14 }}>
                {legalLinks.map((link) => (
                  <a key={link.href} href={link.href} className="small">
                    {link.label}
                  </a>
                ))}
              </div>

              <p className="small" style={{ margin: 0 }}>
                Free beta
              </p>
            </div>
          </div>
        </footer>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}