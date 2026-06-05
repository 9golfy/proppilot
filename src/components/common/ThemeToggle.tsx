'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('proppilot-theme', nextTheme);
  };

  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--primary)]"
      aria-label="Toggle theme"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}