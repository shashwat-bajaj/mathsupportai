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
      </body>
    </html>
  );
}