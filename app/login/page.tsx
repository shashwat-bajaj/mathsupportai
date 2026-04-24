'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getURL } from '@/lib/site-url';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEmailAuth() {
    if (loading) return;

    setStatus(mode === 'login' ? 'Signing in...' : 'Creating account...');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setStatus('Email and password are required.');
      setLoading(false);
      return;
    }

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        setStatus(error.message);
        setLoading(false);
        return;
      }

      router.push('/account');
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${getURL()}auth/confirm`
      }
    });

    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    setStatus(
      'Account created. If email confirmation is enabled, check your inbox before signing in.'
    );
    setLoading(false);
  }

  async function handleGoogleLogin() {
    if (loading) return;

    setStatus('Redirecting to Google...');
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}auth/callback`
      }
    });

    if (error) {
      setStatus(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="grid" style={{ gap: 30, maxWidth: 1080 }}>
      <section
        style={{
          display: 'grid',
          gap: 18,
          paddingTop: 6
        }}
      >
        <div style={{ display: 'grid', gap: 10, maxWidth: 900 }}>
          <span className="badge">{mode === 'login' ? 'Log in' : 'Create account'}</span>
          <h1 style={{ margin: 0 }}>
            {mode === 'login'
              ? 'Return to your learning workspace.'
              : 'Create your MathSupport AI account.'}
          </h1>
          <p className="small" style={{ margin: 0, maxWidth: 820 }}>
            Use email and password or continue with Google. Signing in lets you save sessions,
            revisit history, and keep your tutor experience more consistent across visits.
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
              <strong>Saved history</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Keep sessions attached to your account so you can return to them later.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Cleaner continuity</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Follow up on earlier questions more naturally instead of restarting from zero.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Personal defaults</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Save theme, translation, learner level, and tutor mode preferences in one place.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 0.95fr) minmax(320px, 1.05fr)',
          gap: 24
        }}
      >
        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <div className="buttonRow" style={{ gap: 10 }}>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={mode === 'login' ? '' : 'secondary'}
            >
              Log in
            </button>

            <button
              type="button"
              onClick={() => setMode('signup')}
              className={mode === 'signup' ? '' : 'secondary'}
            >
              Sign up
            </button>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>
              {mode === 'login' ? 'Account access' : 'New account setup'}
            </h2>
            <p className="small" style={{ margin: 0 }}>
              {mode === 'login'
                ? 'Sign in to reopen your saved workspace and continue where you left off.'
                : 'Create an account to keep history, defaults, and product continuity attached to you.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 16,
              paddingTop: 14,
              borderTop: '1px solid var(--border)'
            }}
          >
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  mode === 'login' ? 'Enter your password' : 'Choose a secure password'
                }
              />
            </div>

            <div className="buttonRow">
              <button onClick={handleEmailAuth} type="button" disabled={loading}>
                {loading
                  ? 'Please wait...'
                  : mode === 'login'
                    ? 'Log in with email'
                    : 'Create account'}
              </button>

              <button
                className="secondary"
                onClick={handleGoogleLogin}
                type="button"
                disabled={loading}
              >
                Continue with Google
              </button>
            </div>

            {status ? (
              <p className="small" style={{ margin: 0 }}>
                {status}
              </p>
            ) : null}
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="badge">Why sign in</span>
            <h2 style={{ margin: 0 }}>Keep the product connected across visits.</h2>
            <p className="small" style={{ margin: 0 }}>
              Logging in is what turns the tutor from a one-off tool into a more continuous study
              workspace.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 16,
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
                <strong>Session continuity</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Return to older questions, keep follow-ups connected, and reopen saved threads with
                less friction.
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
                <strong>Better defaults</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Keep your theme, translation language, learner level, and tutor preferences aligned
                to how you use the product.
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
                <strong>Private account history</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Account-linked history is the preferred path over the older email-based beta lookup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}