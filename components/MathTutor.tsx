'use client';

import { useState } from 'react';
import RenderedContent from '@/components/RenderedContent';

export default function MathTutor() {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('Solve x^2 - 5x + 6 = 0 and explain each step.');
  const [gradeLevel, setGradeLevel] = useState('high-school');
  const [mode, setMode] = useState('teach');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitQuestion() {
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, gradeLevel, mode, email })
      });

      const data = await res.json();
      setAnswer(data.answer || data.error || 'No response returned.');
    } catch {
      setAnswer('Something went wrong while contacting the tutor API.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div>
        <label>Email (optional for beta history and usage tracking)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid cols-3">
        <div>
          <label>Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="teach">Teach me step by step</option>
            <option value="hint">Give hints only</option>
            <option value="diagnose">Diagnose my mistake</option>
            <option value="quiz">Turn this into practice questions</option>
          </select>
        </div>

        <div>
          <label>Level</label>
          <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
            <option value="elementary">Elementary</option>
            <option value="middle-school">Middle school</option>
            <option value="high-school">High school</option>
            <option value="college">College</option>
          </select>
        </div>
      </div>

      <div>
        <label>Question or your work</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type a math problem, paste your work, or ask for a quiz on a topic."
        />
      </div>

      <p className="small">
        Free beta usage is currently limited to 20 tutor requests per 24 hours.
      </p>

      <div className="buttonRow">
        <button onClick={submitQuestion} disabled={loading || !question.trim()}>
          {loading ? 'Thinking...' : 'Get help'}
        </button>
      </div>

      <div className="responseBox">
        {answer ? <RenderedContent content={answer} /> : <p>Your tutor response will appear here.</p>}
      </div>
    </div>
  );
}