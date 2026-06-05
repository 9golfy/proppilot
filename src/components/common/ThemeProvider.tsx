'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const storedTheme = window.localStorage.getItem('proppilot-theme');
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  return 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('proppilot-theme', theme);
    applyTheme(theme);
  }, [theme]);

  return (
    <div data-theme-root data-theme={theme}>
      {children}
    </div>
  );
}