import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'MathSupport AI',
  description: 'Free beta AI math support that teaches, diagnoses, and tracks growth.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <a href="/" className="brand">MathSupport AI</a>
          <nav>
            <a href="/">Home</a>
            <a href="/pricing">Free Beta</a>
            <a href="/history">History</a>
            <a href="/dashboard">Dashboard</a>
          </nav>
        </header>

        <main className="container">{children}</main>

        <footer className="container" style={{ paddingBottom: 32 }}>
          <div className="card" style={{ marginTop: 24 }}>
            <p className="small">
              MathSupport AI is currently a free beta product for educational support.
            </p>
            <div className="buttonRow">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}