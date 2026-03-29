'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnswerDisplay from '@/components/AnswerDisplay';
import { createClient } from '@/lib/supabase/client';

type MathTutorProps = {
  audience?: 'student' | 'parent';
  lockedMode?: 'teach' | 'hint' | 'diagnose' | 'quiz';
  title?: string;
  description?: string;
  placeholder?: string;
  initialConversationId?: string | null;
  newSessionHref?: string;
};

type GradeLevel = 'elementary' | 'middle-school' | 'high-school' | 'college';
type TutorMode = 'teach' | 'hint' | 'diagnose' | 'quiz';

export default function MathTutor({
  audience = 'student',
  lockedMode,
  title,
  description,
  placeholder,
  initialConversationId = null,
  newSessionHref
}: MathTutorProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [accountEmail, setAccountEmail] = useState('');

  const defaultQuestion = useMemo(
    () =>
      audience === 'parent'
        ? 'My child is learning fractions. How can I explain why 1/2 is larger than 1/4 without just giving the answer?'
        : 'Solve x^2 - 5x + 6 = 0 and explain each step.',
    [audience]
  );

  const [conversationId, setConversationId] = useState<string | null>(initialConversationId);
  const [question, setQuestion] = useState(initialConversationId ? '' : defaultQuestion);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>(
    audience === 'parent' ? 'elementary' : 'high-school'
  );
  const [mode, setMode] = useState<TutorMode>(lockedMode || 'teach');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user?.email) {
        setAccountEmail(user.email);
      }

      const preferences = user?.user_metadata?.preferences || {};

      if (audience === 'student') {
        const nextStudentGrade =
          preferences.studentDefaults?.gradeLevel || 'high-school';
        setGradeLevel(nextStudentGrade);

        if (!lockedMode) {
          const nextStudentMode =
            preferences.studentDefaults?.tutorMode || 'teach';
          setMode(nextStudentMode);
        }
      }

      if (audience === 'parent') {
        const nextParentGrade =
          preferences.parentDefaults?.gradeLevel || 'elementary';
        setGradeLevel(nextParentGrade);
      }
    }

    loadUser();
  }, [audience, lockedMode]);

  useEffect(() => {
    setConversationId(initialConversationId);
    setAnswer('');
    setQuestion(initialConversationId ? '' : defaultQuestion);
  }, [initialConversationId, defaultQuestion]);

  function startNewSession() {
    if (newSessionHref) {
      router.push(newSessionHref);
      router.refresh();
      return;
    }

    setConversationId(null);
    setAnswer('');
    setQuestion(defaultQuestion);
  }

  async function submitQuestion() {
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          gradeLevel,
          mode,
          email: accountEmail ? '' : email,
          audience,
          conversationId
        })
      });

      const data = await res.json();
      setAnswer(data.answer || data.error || 'No response returned.');

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      setQuestion('');
    } catch {
      setAnswer('Something went wrong while contacting the tutor API.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid" style={{ gap: 14 }}>
      {(title || description) && (
        <div className="card">
          {title ? <h2>{title}</h2> : null}
          {description ? <p className="small">{description}</p> : null}
        </div>
      )}

      {accountEmail ? (
        <div className="card">
          <p className="small">
            Signed in as <strong>{accountEmail}</strong>. Tutor history will be saved to
            your account automatically.
          </p>
        </div>
      ) : (
        <div>
          <label>Email (optional for beta history and usage tracking)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
      )}

      <div className="buttonRow">
        <button className="secondary" onClick={startNewSession}>
          New Session
        </button>
        {conversationId ? (
          <span className="small">Continue this session with a follow-up question.</span>
        ) : (
          <span className="small">Your next question will start a new session.</span>
        )}
      </div>

      <div className="grid cols-3">
        {!lockedMode ? (
          <div>
            <label>Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as TutorMode)}>
              <option value="teach">Teach me step by step</option>
              <option value="hint">Give hints only</option>
              <option value="diagnose">Diagnose my mistake</option>
              <option value="quiz">Turn this into practice questions</option>
            </select>
          </div>
        ) : (
          <div>
            <label>Mode</label>
            <input
              value={
                lockedMode === 'hint'
                  ? 'Guided hints only'
                  : lockedMode === 'teach'
                    ? 'Teach step by step'
                    : lockedMode === 'diagnose'
                      ? 'Diagnose mistake'
                      : 'Quiz mode'
              }
              readOnly
            />
          </div>
        )}

        <div>
          <label>Level</label>
          <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}>
            <option value="elementary">Elementary</option>
            <option value="middle-school">Middle school</option>
            <option value="high-school">High school</option>
            <option value="college">College</option>
          </select>
        </div>
      </div>

      <div>
        <label>
          {audience === 'parent' ? 'Question or teaching situation' : 'Question or your work'}
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={
            placeholder ||
            (audience === 'parent'
              ? 'Describe what the child is learning, where they are stuck, and how much help you want.'
              : 'Type a math problem, paste your work, or ask for a quiz on a topic.')
          }
        />
      </div>

      <p className="small">
        Free beta usage is currently limited to 20 tutor requests per 24 hours.
      </p>

      <div className="buttonRow">
        <button onClick={submitQuestion} disabled={loading || !question.trim()}>
          {loading ? 'Thinking...' : conversationId ? 'Send Follow-up' : 'Get help'}
        </button>
      </div>

      <div className="responseBox">
        {answer ? <AnswerDisplay text={answer} /> : <p>Your tutor response will appear here.</p>}
      </div>
    </div>
  );
}