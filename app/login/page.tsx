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

  async function handleEmailAuth() {
    setStatus(mode === 'login' ? 'Signing in...' : 'Creating account...');

    if (!email.trim() || !password.trim()) {
      setStatus('Email and password are required.');
      return;
    }

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        setStatus(error.message);
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
      return;
    }

    setStatus(
      'Account created. If email confirmation is enabled, check your inbox before signing in.'
    );
  }

  async function handleGoogleLogin() {
    setStatus('Redirecting to Google...');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}auth/callback`
      }
    });

    if (error) {
      setStatus(error.message);
    }
  }

  return (
    <div className="grid" style={{ gap: 24, maxWidth: 760 }}>
      <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
        <span className="badge">{mode === 'login' ? 'Log in' : 'Create account'}</span>

        <div style={{ display: 'grid', gap: 10 }}>
          <h1 style={{ margin: 0 }}>
            {mode === 'login'
              ? 'Return to your learning workspace.'
              : 'Create your MathSupport AI account.'}
          </h1>
          <p className="small" style={{ margin: 0, maxWidth: 720 }}>
            Use email and password or continue with Google. Signing in lets you save sessions,
            revisit history, and keep your tutor experience more consistent across visits.
          </p>
        </div>
      </section>

      <section className="grid cols-3">
        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Saved history</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            Keep your sessions attached to your account so you can return to them later without
            losing the thread.
          </p>
        </div>

        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Cleaner continuity</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            Follow up on earlier questions more naturally instead of restarting from zero each
            time.
          </p>
        </div>

        <div className="card innerFeatureCard">
          <h3 style={{ marginTop: 0 }}>Personal defaults</h3>
          <p className="small" style={{ marginBottom: 0 }}>
            Save theme, translation, learner level, and student tutor mode preferences in one
            place.
          </p>
        </div>
      </section>

      <section className="card" style={{ display: 'grid', gap: 18 }}>
        <div className="buttonRow">
          <button
            className={mode === 'login' ? 'secondary' : ''}
            onClick={() => setMode('login')}
            type="button"
          >
            Log in
          </button>
          <button
            className={mode === 'signup' ? 'secondary' : ''}
            onClick={() => setMode('signup')}
            type="button"
          >
            Sign up
          </button>
        </div>

        <div className="grid" style={{ gap: 12 }}>
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
            <button onClick={handleEmailAuth} type="button">
              {mode === 'login' ? 'Log in with email' : 'Create account'}
            </button>
            <button className="secondary" onClick={handleGoogleLogin} type="button">
              Continue with Google
            </button>
          </div>

          {status ? <p className="small">{status}</p> : null}
        </div>
      </section>
    </div>
  );
}