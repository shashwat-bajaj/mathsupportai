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
    <div className="grid" style={{ gap: 24, maxWidth: 680 }}>
      <section className="card">
        <h1>Login or Create an Account</h1>
        <p className="small">
          Use Google or create a MathSupport AI account with email and password.
        </p>
      </section>

      <section className="card">
        <div className="buttonRow">
          <button
            className={mode === 'login' ? 'secondary' : ''}
            onClick={() => setMode('login')}
          >
            Log in
          </button>
          <button
            className={mode === 'signup' ? 'secondary' : ''}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>

        <div className="grid" style={{ gap: 12, marginTop: 16 }}>
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
              placeholder="Choose a secure password"
            />
          </div>

          <div className="buttonRow">
            <button onClick={handleEmailAuth}>
              {mode === 'login' ? 'Log in with email' : 'Create account'}
            </button>
            <button className="secondary" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
          </div>

          <p className="small">{status}</p>
        </div>
      </section>
    </div>
  );
}