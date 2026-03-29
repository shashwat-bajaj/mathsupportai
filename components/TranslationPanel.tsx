'use client';

import { useState } from 'react';
import RenderedContent from '@/components/RenderedContent';

const LANGUAGES = [
  'Spanish',
  'Hindi',
  'French',
  'Arabic',
  'Portuguese',
  'Chinese',
  'Russian'
] as const;

export default function TranslationPanel({ text }: { text: string }) {
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>('Spanish');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function translateText() {
    setLoading(true);
    setError('');
    setTranslated('');

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Translation failed.');
        return;
      }

      setTranslated(data.translated || '');
    } catch {
      setError('Translation failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="translationPanel">
      <div className="translationControls">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as (typeof LANGUAGES)[number])}
        >
          {LANGUAGES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="secondary"
          onClick={translateText}
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>

      {error ? <p className="small">{error}</p> : null}

      {translated ? (
        <div className="card translatedSurface">
          <p className="small">
            <strong>Translated to {language}</strong>
          </p>
          <RenderedContent content={translated} />
        </div>
      ) : null}
    </div>
  );
}