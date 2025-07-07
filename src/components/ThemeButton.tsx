"use client";
import { useState, useEffect } from "react";

// Custom theme: blend (white/yellow mixture)
const BLEND_CLASS = "blend";
const DARK_CLASS = "dark";
const THEME_KEY = "theme";

type Theme = 'blend' | 'dark';

export default function ThemeButton() {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    // On mount, set theme from localStorage or default to blend
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(THEME_KEY) : null;
    if (stored === 'blend' || stored === 'dark') {
      setTheme(stored);
    } else {
      setTheme('blend');
    }
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.remove(BLEND_CLASS, DARK_CLASS);
    document.documentElement.classList.add(theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'blend' : 'dark'));
  };

  if (!theme) return null;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="ml-3 p-2 rounded-full border border-yellow-300 dark:border-blue-900 bg-white blend:bg-gradient-to-br blend:from-yellow-50 blend:via-white blend:to-yellow-100 dark:bg-gray-900 text-yellow-700 dark:text-blue-200 shadow hover:bg-yellow-100 dark:hover:bg-gray-800 transition-all"
    >
      {theme === 'dark' ? (
        // Moon icon
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      ) : (
        // Sun icon
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="#fde68a" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
} 