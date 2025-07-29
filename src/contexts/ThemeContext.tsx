import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeSettings, ThemeType } from '../types/theme';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeClasses: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultSettings: ThemeSettings = {
  theme: 'modern'
};

export function ThemeProvider({ children }: { children: ReactNode; }) {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('theme-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('Initializing with saved theme:', parsed);
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        console.warn('Failed to parse saved theme settings during initialization');
      }
    }
    console.log('Initializing with default theme:', defaultSettings);
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('theme-settings', JSON.stringify(settings));
    document.documentElement.setAttribute('data-theme', settings.theme);
    console.log('Applied theme and saved to localStorage:', settings.theme);
  }, [settings]);

  const setTheme = (theme: ThemeType) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const getThemeClasses = () => {
    const base = 'transition-colors duration-300';
    const themeClass = `theme-${settings.theme}`;
    return `${base} ${themeClass}`;
  };

  return (
    <ThemeContext.Provider value={{
      theme: settings.theme,
      setTheme,
      themeClasses: getThemeClasses()
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}