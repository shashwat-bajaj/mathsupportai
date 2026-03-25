'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  async function submitContact() {
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || 'Could not send message.');
        return;
      }

      setStatus('Your message has been sent.');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('Something went wrong while sending your message.');
    }
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>Contact</h1>
        <p className="small">
          Use this form to share feedback, report bugs, request features, or ask about the beta.
        </p>
      </section>

      <section className="card">
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
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you liked, what confused you, or what you want built next."
            />
          </div>

          <div className="buttonRow">
            <button onClick={submitContact} disabled={!email.trim() || !message.trim()}>
              Send message
            </button>
          </div>

          <p className="small">{status}</p>
        </div>
      </section>
    </div>
  );
}