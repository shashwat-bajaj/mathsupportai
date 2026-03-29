'use client';

import { useEffect, useState } from 'react';
import RenderedContent from '@/components/RenderedContent';
import ReadAloudButton from '@/components/ReadAloudButton';
import { createClient } from '@/lib/supabase/client';

const LANGUAGES = [
  'English',
  'Spanish',
  'Hindi',
  'French',
  'Arabic',
  'Portuguese',
  'Chinese',
  'Russian'
] as const;

type Language = (typeof LANGUAGES)[number];

export default function AnswerDisplay({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('English');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setDisplayText(text);
    setCurrentLanguage('English');
    setShowLanguagePicker(false);
    setLoading(false);
    setError('');

    async function loadPreference() {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      const preferredLanguage =
        user?.user_metadata?.preferences?.translationLanguage || 'English';

      if (LANGUAGES.includes(preferredLanguage)) {
        setSelectedLanguage(preferredLanguage as Language);
      } else {
        setSelectedLanguage('English');
      }
    }

    loadPreference();
  }, [text]);

  async function handleLanguageChange(nextLanguage: Language) {
    setError('');
    setSelectedLanguage(nextLanguage);
    setCurrentLanguage(nextLanguage);

    if (nextLanguage === 'English') {
      setDisplayText(text);
      setShowLanguagePicker(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: nextLanguage })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Translation failed.');
        setCurrentLanguage('English');
        setDisplayText(text);
        return;
      }

      setDisplayText(data.translated || text);
      setShowLanguagePicker(false);
    } catch {
      setError('Translation failed.');
      setCurrentLanguage('English');
      setDisplayText(text);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="buttonRow">
        <ReadAloudButton
          text={displayText}
          label={currentLanguage === 'English' ? 'Read Aloud' : `Read Aloud (${currentLanguage})`}
        />

        <button
          type="button"
          className="secondary"
          onClick={() => setShowLanguagePicker((prev) => !prev)}
        >
          {currentLanguage === 'English' ? 'Translate' : 'Change Language'}
        </button>

        {currentLanguage !== 'English' ? (
          <span className="small">Showing: {currentLanguage}</span>
        ) : null}
      </div>

      {showLanguagePicker ? (
        <div className="languagePickerRow">
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value as Language)}
            className="languageSelect"
            disabled={loading}
          >
            {LANGUAGES.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {loading ? <p className="small">Translating...</p> : null}
      {error ? <p className="small">{error}</p> : null}

      <RenderedContent content={displayText} />
    </div>
  );
}