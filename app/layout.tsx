import './globals.css';
import type { ReactNode } from 'react';
import AuthNav from '@/components/AuthNav';
import ThemeToggle from '@/components/ThemeToggle';
import BrandMark from '@/components/BrandMark';
import RouteShell from '@/components/RouteShell';
import SiteBackdrop from '@/components/SiteBackdrop';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'MathSupport AI',
  description: 'AI math support for students and parents.'
};

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/math/tutor', label: 'Students' },
  { href: '/math/parents', label: 'Parents' },
  { href: '/history', label: 'History' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/math/pricing', label: 'Pricing' },
  { href: '/settings', label: 'Settings' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' }
];

const themeBootstrapScript = `
(function () {
  try {
    var saved = localStorage.getItem('mathsupport-theme') || 'system';
    var resolved =
      saved === 'system'
        ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
        : saved;

    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
    document.body && document.body.setAttribute('data-theme', resolved);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.style.colorScheme = 'dark';
    document.body && document.body.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>

      <body>
        <SiteBackdrop />

        <div className="siteChrome">
          <header className="topbar">
            <div className="headerShell">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto minmax(0, 1fr)',
                  alignItems: 'center',
                  gap: 28
                }}
              >
                <div className="headerBrand">
                  <BrandMark />
                </div>

                <div
                  className="headerNavWrap"
                  style={{
                    minWidth: 0,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingLeft: 12
                  }}
                >
                  <nav
                    className="mainNav"
                    aria-label="Primary navigation"
                    style={{
                      justifyContent: 'flex-end',
                      marginLeft: 'auto',
                      width: 'auto',
                      maxWidth: '100%'
                    }}
                  >
                    {primaryLinks.map((link) => (
                      <a key={link.href} href={link.href}>
                        {link.label}
                      </a>
                    ))}
                    <AuthNav />
                  </nav>
                </div>
              </div>
            </div>
          </header>

          <main
            className="container"
            style={{
              paddingTop: 22,
              paddingBottom: 22
            }}
          >
            <RouteShell>{children}</RouteShell>
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
                  {footerLinks.map((link) => (
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
        </div>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}