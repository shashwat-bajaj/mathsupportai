'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type ThemePreference = 'system' | 'light' | 'dark';
type TranslationLanguage =
  | 'English'
  | 'Spanish'
  | 'Hindi'
  | 'French'
  | 'Arabic'
  | 'Portuguese'
  | 'Chinese'
  | 'Russian';
type GradeLevel = 'elementary' | 'middle-school' | 'high-school' | 'college';
type TutorMode = 'auto' | 'teach' | 'hint' | 'diagnose' | 'quiz';

function resolveTheme(theme: ThemePreference) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  return theme;
}

export default function SettingsForm({
  initialThemePreference,
  initialTranslationLanguage,
  initialStudentGradeLevel,
  initialStudentTutorMode,
  initialParentGradeLevel
}: {
  initialThemePreference: ThemePreference;
  initialTranslationLanguage: TranslationLanguage;
  initialStudentGradeLevel: GradeLevel;
  initialStudentTutorMode: TutorMode;
  initialParentGradeLevel: GradeLevel;
}) {
  const supabase = createClient();

  const [themePreference, setThemePreference] =
    useState<ThemePreference>(initialThemePreference);
  const [translationLanguage, setTranslationLanguage] =
    useState<TranslationLanguage>(initialTranslationLanguage);

  const [studentGradeLevel, setStudentGradeLevel] =
    useState<GradeLevel>(initialStudentGradeLevel);
  const [studentTutorMode, setStudentTutorMode] =
    useState<TutorMode>(initialStudentTutorMode);

  const [parentGradeLevel, setParentGradeLevel] =
    useState<GradeLevel>(initialParentGradeLevel);

  const [status, setStatus] = useState('');

  async function saveSettings() {
    setStatus('Saving settings...');

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setStatus('You must be logged in.');
      return;
    }

    const nextMetadata = {
      ...(user.user_metadata || {}),
      preferences: {
        ...(user.user_metadata?.preferences || {}),
        themePreference,
        translationLanguage,
        studentDefaults: {
          gradeLevel: studentGradeLevel,
          tutorMode: studentTutorMode
        },
        parentDefaults: {
          gradeLevel: parentGradeLevel
        }
      }
    };

    const { error } = await supabase.auth.updateUser({
      data: nextMetadata
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    window.localStorage.setItem('mathsupport-theme', themePreference);
    document.documentElement.setAttribute('data-theme', resolveTheme(themePreference));

    setStatus('Settings saved.');
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Preferences</h2>

      <div className="grid" style={{ gap: 20 }}>
        <div className="grid cols-3">
          <div>
            <label>Theme preference</label>
            <select
              value={themePreference}
              onChange={(e) => setThemePreference(e.target.value as ThemePreference)}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label>Default translation language</label>
            <select
              value={translationLanguage}
              onChange={(e) =>
                setTranslationLanguage(e.target.value as TranslationLanguage)
              }
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Hindi">Hindi</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Chinese">Chinese</option>
              <option value="Russian">Russian</option>
            </select>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Student Tutor Defaults</h3>
          <p className="small" style={{ marginTop: 0 }}>
            Auto mode follows the wording of the question more naturally, while the other modes
            push the tutor toward a more specific teaching style.
          </p>

          <div className="grid cols-3">
            <div>
              <label>Default learner level</label>
              <select
                value={studentGradeLevel}
                onChange={(e) => setStudentGradeLevel(e.target.value as GradeLevel)}
              >
                <option value="elementary">Elementary</option>
                <option value="middle-school">Middle school</option>
                <option value="high-school">High school</option>
                <option value="college">College</option>
              </select>
            </div>

            <div>
              <label>Default tutor mode</label>
              <select
                value={studentTutorMode}
                onChange={(e) => setStudentTutorMode(e.target.value as TutorMode)}
              >
                <option value="auto">Auto (follow my request)</option>
                <option value="teach">Teach me step by step</option>
                <option value="hint">Give hints only</option>
                <option value="diagnose">Diagnose my mistake</option>
                <option value="quiz">Turn this into practice questions</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Parent Tutor Defaults</h3>
          <p className="small">
            Parent Tutor stays in guided hint mode by design, but you can choose the
            default learner level here.
          </p>

          <div className="grid cols-3">
            <div>
              <label>Default learner level</label>
              <select
                value={parentGradeLevel}
                onChange={(e) => setParentGradeLevel(e.target.value as GradeLevel)}
              >
                <option value="elementary">Elementary</option>
                <option value="middle-school">Middle school</option>
                <option value="high-school">High school</option>
                <option value="college">College</option>
              </select>
            </div>
          </div>
        </div>

        <div className="buttonRow">
          <button type="button" onClick={saveSettings}>
            Save Settings
          </button>
        </div>

        {status ? <p className="small">{status}</p> : null}
      </div>
    </div>
  );
}