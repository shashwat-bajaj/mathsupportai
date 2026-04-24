'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitContact() {
    if (!email.trim() || !message.trim() || loading) return;

    setStatus('Sending...');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || 'Could not send message.');
        setLoading(false);
        return;
      }

      setStatus('Your message has been sent.');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('Something went wrong while sending your message.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid" style={{ gap: 30 }}>
      <section
        style={{
          display: 'grid',
          gap: 18,
          paddingTop: 6
        }}
      >
        <div style={{ display: 'grid', gap: 10, maxWidth: 900 }}>
          <span className="badge">Contact</span>
          <h1 style={{ margin: 0 }}>Send feedback, report issues, or ask about the beta.</h1>
          <p className="small" style={{ margin: 0, maxWidth: 820 }}>
            Use this page to share bugs, confusing moments, feature requests, product ideas, or
            anything that would make MathSupport AI more useful for students and parents.
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
              <strong>Product feedback</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Share what feels clear, awkward, useful, or worth improving first.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Bug reports</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Report broken flows, confusing tutor behavior, graph issues, or anything unexpected.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 6 }}>
            <p className="small" style={{ margin: 0 }}>
              <strong>Feature requests</strong>
            </p>
            <p className="small" style={{ margin: 0 }}>
              Suggest workflows, UI changes, or study features that would make the product stronger.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 0.92fr) minmax(320px, 1.08fr)',
          gap: 24
        }}
      >
        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <span className="badge">What to send</span>

          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>The more specific the message, the more useful it is.</h2>
            <p className="small" style={{ margin: 0 }}>
              A short, concrete description makes it easier to improve the product meaningfully.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
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
                <strong>Useful examples</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                “The graph looked wrong for this equation.” “The tutor explanation felt too advanced.”
                “I want a cleaner practice mode.”
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
                <strong>Best feedback</strong>
              </p>
              <p className="small" style={{ margin: 0 }}>
                Include what you were trying to do, what happened instead, and what you expected.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <h2 style={{ margin: 0 }}>Message form</h2>
            <p className="small" style={{ margin: 0 }}>
              Send product feedback, bug reports, or ideas for what should be built next.
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
              <button
                onClick={submitContact}
                disabled={!email.trim() || !message.trim() || loading}
              >
                {loading ? 'Sending...' : 'Send message'}
              </button>
            </div>

            {status ? (
              <p className="small" style={{ margin: 0 }}>
                {status}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}