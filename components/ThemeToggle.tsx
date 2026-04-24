'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyResolvedTheme(theme: ResolvedTheme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function getSavedPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';

  const saved = window.localStorage.getItem('mathsupport-theme');
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }

  return 'system';
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemTheme() : preference;
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>('system');

  useEffect(() => {
    const savedPreference = getSavedPreference();
    setPreference(savedPreference);
    applyResolvedTheme(resolveTheme(savedPreference));

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    function handleSystemChange() {
      const currentPreference = getSavedPreference();
      if (currentPreference === 'system') {
        applyResolvedTheme(getSystemTheme());
      }
    }

    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, []);

  async function savePreferenceToSupabase(nextPreference: ThemePreference) {
    try {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      const nextMetadata = {
        ...(user.user_metadata || {}),
        preferences: {
          ...(user.user_metadata?.preferences || {}),
          themePreference: nextPreference
        }
      };

      await supabase.auth.updateUser({
        data: nextMetadata
      });
    } catch {
      // keep local theme behavior stable even if account save fails
    }
  }

  function setThemePreference(nextPreference: ThemePreference) {
    setPreference(nextPreference);
    window.localStorage.setItem('mathsupport-theme', nextPreference);
    applyResolvedTheme(resolveTheme(nextPreference));
    void savePreferenceToSupabase(nextPreference);
  }

  const options: Array<{ value: ThemePreference; label: string }> = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gap: 8
      }}
    >
      <p className="small" style={{ margin: 0 }}>
        <strong>Theme</strong>
      </p>

      <div className="themeSwitcher" role="group" aria-label="Theme selection">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setThemePreference(option.value)}
            className={preference === option.value ? 'themeOption active' : 'themeOption'}
            aria-pressed={preference === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}