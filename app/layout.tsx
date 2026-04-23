import './globals.css';
import type { ReactNode } from 'react';
import AuthNav from '@/components/AuthNav';
import ThemeToggle from '@/components/ThemeToggle';
import BrandMark from '@/components/BrandMark';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'MathSupport AI',
  description: 'Free beta AI math support that teaches, diagnoses, and tracks growth.'
};

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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 18,
              flexWrap: 'wrap'
            }}
          >
            <BrandMark />

            <nav className="mainNav" aria-label="Primary navigation">
              <a href="/">Home</a>
              <a href="/tutor">Students</a>
              <a href="/parents">Parents</a>
              <a href="/pricing">Free Beta</a>
              <a href="/history">History</a>
              <a href="/settings">Settings</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <AuthNav />
            </nav>
          </div>
        </header>

        <main
          className="container"
          style={{
            paddingTop: 32,
            paddingBottom: 10
          }}
        >
          {children}
        </main>

        <footer className="container siteFooter">
          <div
            className="card footerCard"
            style={{
              display: 'grid',
              gap: 18
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.15fr) minmax(260px, 0.85fr)',
                gap: 18,
                alignItems: 'start'
              }}
            >
              <div style={{ display: 'grid', gap: 8, minWidth: 0 }}>
                <p className="small" style={{ margin: 0 }}>
                  <strong>MathSupport AI</strong> is currently a free beta product built for
                  educational support.
                </p>
                <p className="small" style={{ margin: 0, maxWidth: 700 }}>
                  The platform is being shaped into a calmer learning workspace for students and
                  parents, with guided explanations, better follow-up flow, graph support, saved
                  sessions, and more deliberate product design over time.
                </p>
              </div>

              <div
                className="card questionSurface"
                style={{
                  padding: 16,
                  display: 'grid',
                  gap: 6,
                  minWidth: 0
                }}
              >
                <p className="small" style={{ margin: 0 }}>
                  <strong>Current beta focus</strong>
                </p>
                <p className="small" style={{ margin: 0 }}>
                  Core tutor quality, cleaner interaction flow, parent guidance, graph behavior,
                  and stronger product continuity.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 14,
                flexWrap: 'wrap',
                paddingTop: 2
              }}
            >
              <div className="buttonRow">
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Use</a>
              </div>

              <ThemeToggle />
            </div>
          </div>
        </footer>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}