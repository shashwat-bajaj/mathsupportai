'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';

export default function LoginPage() {
  const supabase = createBrowserSupabase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : 'Signed in. Refresh or navigate to your dashboard.');
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : 'Account created. Check email if confirmation is enabled.');
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h1>Login</h1>
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label style={{ marginTop: 12 }}>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="buttonRow" style={{ marginTop: 16 }}>
        <button onClick={signIn}>Sign in</button>
        <button className="secondary" onClick={signUp}>Create account</button>
      </div>
      {message ? <p className="small" style={{ marginTop: 12 }}>{message}</p> : null}
    </div>
  );
}
