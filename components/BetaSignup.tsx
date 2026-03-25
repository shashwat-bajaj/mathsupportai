'use client';

import { useState } from 'react';

export default function BetaSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [status, setStatus] = useState('');

  async function submitSignup() {
    setStatus('Saving...');

    try {
      const res = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, goal })
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || 'Could not join beta.');
        return;
      }

      setStatus('You have been added to the beta list.');
      setName('');
      setEmail('');
      setGoal('');
    } catch {
      setStatus('Something went wrong while saving your beta signup.');
    }
  }

  return (
    <div className="card">
      <h2>Join the beta</h2>
      <p className="small">
        Leave your details so we can track early interest and shape the product around real learners.
      </p>

      <div className="grid" style={{ gap: 12 }}>
        <div>
          <label>Name (optional)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

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
          <label>What do you want help with? (optional)</label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Examples: algebra homework, SAT prep, calculus revision, learning step-by-step"
          />
        </div>

        <div className="buttonRow">
          <button onClick={submitSignup} disabled={!email.trim()}>
            Join beta
          </button>
        </div>

        <p className="small">{status}</p>
      </div>
    </div>
  );
}