'use client';

import { useEffect, useState } from 'react';

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

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>('system');

  useEffect(() => {
    const savedPreference = getSavedPreference();
    setPreference(savedPreference);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    function updateTheme(nextPreference: ThemePreference) {
      const resolved = nextPreference === 'system'
        ? getSystemTheme()
        : nextPreference;

      applyResolvedTheme(resolved);
    }

    updateTheme(savedPreference);

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

  function setThemePreference(nextPreference: ThemePreference) {
    setPreference(nextPreference);
    window.localStorage.setItem('mathsupport-theme', nextPreference);

    const resolved = nextPreference === 'system'
      ? getSystemTheme()
      : nextPreference;

    applyResolvedTheme(resolved);
  }

  return (
    <div className="themeSwitcher" role="group" aria-label="Theme selection">
      <button
        type="button"
        onClick={() => setThemePreference('system')}
        className={preference === 'system' ? 'themeOption active' : 'themeOption'}
      >
        System
      </button>

      <button
        type="button"
        onClick={() => setThemePreference('light')}
        className={preference === 'light' ? 'themeOption active' : 'themeOption'}
      >
        Light
      </button>

      <button
        type="button"
        onClick={() => setThemePreference('dark')}
        className={preference === 'dark' ? 'themeOption active' : 'themeOption'}
      >
        Dark
      </button>
    </div>
  );
}