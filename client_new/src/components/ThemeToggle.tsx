
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme on initial load
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleThemeToggle}
        className="relative inline-flex h-8 w-14 md:h-10 md:w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 hover:from-slate-300 hover:to-slate-400 dark:hover:from-slate-600 dark:hover:to-slate-700"
        aria-label="Toggle theme"
      >
        {/* Toggle Circle */}
        <span
          className={`inline-block h-6 w-6 md:h-8 md:w-8 transform rounded-full bg-white dark:bg-slate-900 shadow-lg transition-transform duration-300 ease-in-out flex items-center justify-center ${
            isDark ? 'translate-x-7 md:translate-x-8' : 'translate-x-1'
          }`}
        >
          {isDark ? (
            <Moon className="h-3 w-3 md:h-4 md:w-4 text-slate-600" />
          ) : (
            <Sun className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
          )}
        </span>
        
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <Sun className={`h-3 w-3 md:h-4 md:w-4 text-yellow-400 transition-opacity duration-300 ${isDark ? 'opacity-30' : 'opacity-0'}`} />
          <Moon className={`h-3 w-3 md:h-4 md:w-4 text-slate-400 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-30'}`} />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
