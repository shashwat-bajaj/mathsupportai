'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';

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
      <Reveal delay={0.02}>
        <section className="card spotlightCard" style={{ display: 'grid', gap: 14 }}>
          <span className="badge">Contact</span>

          <div style={{ display: 'grid', gap: 10 }}>
            <h1 style={{ margin: 0 }}>Send feedback, report issues, or ask about the beta.</h1>
            <p className="small" style={{ margin: 0, maxWidth: 820 }}>
              Use this page to share bugs, confusing moments, feature requests, product ideas, or
              anything that would make TutoVera more useful for students, parents, and future subject
              branches.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="grid cols-3">
          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Product feedback</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Share what feels clear, what feels awkward, and what you would want improved first.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Bug reports</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Report broken flows, confusing tutor behavior, graph issues, or anything that does not
              work as expected.
            </p>
          </div>

          <div className="card innerFeatureCard">
            <h3 style={{ marginTop: 0 }}>Feature requests</h3>
            <p className="small" style={{ marginBottom: 0 }}>
              Suggest workflows, tools, UI changes, or study features that would make the product
              more useful over time.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.14}>
        <section className="card" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Message form</h2>
            <p className="small" style={{ margin: 0 }}>
              The more specific the message, the easier it is to improve the product meaningfully.
            </p>
          </div>

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
                placeholder="Tell us what you liked, what confused you, what broke, or what you want built next."
              />
            </div>

            <div className="buttonRow">
              <button onClick={submitContact} disabled={!email.trim() || !message.trim()}>
                Send message
              </button>
            </div>

            {status ? <p className="small">{status}</p> : null}
          </div>
        </section>
      </Reveal>
    </div>
  );
}