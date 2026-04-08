import './globals.css';
import type { ReactNode } from 'react';
import AuthNav from '@/components/AuthNav';
import ThemeToggle from '@/components/ThemeToggle';
import BrandMark from '@/components/BrandMark';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'MathSupport AI',
  description: 'Free beta AI math support that teaches, diagnoses, and tracks growth.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <header className="topbar">
          <BrandMark />

          <nav className="mainNav">
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
        </header>

        <main className="container">{children}</main>

        <footer className="container siteFooter">
          <div className="card footerCard">
            <p className="small">
              MathSupport AI is currently a free beta product for educational support.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
                marginTop: 14
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
      </body>
    </html>
  );
}