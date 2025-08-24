import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeSettings, ThemeType } from '@/types/theme';
import { useMouse } from '@/hooks/useMouse';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeClasses: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultSettings: ThemeSettings = {
  theme: 'modern',
};

export function ThemeProvider({ children }: { children: ReactNode; }) {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const initialSettings = { ...defaultSettings };
    
        if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          Object.assign(initialSettings, parsed);
        } catch {
          console.warn(
            'Failed to parse saved theme settings during initialization',
          );
        }
      }
      
            document.documentElement.classList.remove('terminal', 'modern', 'neumorphic', 'nier', 'gnome');
      document.documentElement.classList.add(initialSettings.theme);
      document.documentElement.setAttribute('data-theme', initialSettings.theme);
    }
    return initialSettings;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-settings', JSON.stringify(settings));
      
            document.documentElement.classList.remove('terminal', 'modern', 'neumorphic', 'nier', 'gnome');
      
            document.documentElement.classList.add(settings.theme);
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
  }, [settings]);

    useMouse('.card', settings.theme === 'modern');

  const setTheme = (theme: ThemeType) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const getThemeClasses = () => {
    const base = 'transition-colors duration-300';
    const themeClass = `theme-${settings.theme}`;
    return `${base} ${themeClass}`;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: settings.theme,
        setTheme,
        themeClasses: getThemeClasses(),
      }}
    >
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