import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { themes, type Theme } from '../data/themes';

export interface AppSettings {
  // Editor
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  minimap: boolean;
  // Theme
  themeId: string;
  // Files
  autoSave: 'off' | 'afterDelay' | 'onFocusChange';
  formatOnSave: boolean;
  // Terminal
  terminalFontSize: number;
  // Workbench
  sidebarPosition: 'left' | 'right';
  breadcrumbs: boolean;
  activityBarVisible: boolean;
}

const defaultSettings: AppSettings = {
  fontSize: 14,
  fontFamily: "'Fira Code', Consolas, monospace",
  tabSize: 2,
  wordWrap: true,
  lineNumbers: true,
  minimap: true,
  themeId: 'rachana-dark',
  autoSave: 'off',
  formatOnSave: false,
  terminalFontSize: 13,
  sidebarPosition: 'left',
  breadcrumbs: true,
  activityBarVisible: true,
};

interface SettingsContextType {
  settings: AppSettings;
  theme: Theme;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('rachana-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const theme = themes.find(t => t.id === settings.themeId) || themes[0];

  useEffect(() => {
    localStorage.setItem('rachana-settings', JSON.stringify(settings));
    const root = document.documentElement;
    
    // Set data-theme attribute for CSS variables
    root.setAttribute('data-theme', theme.type);
    
    // Apply theme CSS variables
    root.style.setProperty('--bg-primary', theme.colors.bg);
    root.style.setProperty('--bg-secondary', theme.colors.bgSecondary);
    root.style.setProperty('--bg-tertiary', theme.type === 'dark' ? '#11111b' : '#dce0e8');
    root.style.setProperty('--bg-elevated', theme.type === 'dark' ? '#313244' : '#ccd0da');
    root.style.setProperty('--bg-hover', theme.colors.bgHover);
    root.style.setProperty('--bg-active', theme.type === 'dark' ? '#585b70' : '#bcc0cc');
    root.style.setProperty('--text-primary', theme.colors.text);
    root.style.setProperty('--text-secondary', theme.type === 'dark' ? '#a6adc8' : '#5c5f77');
    root.style.setProperty('--text-muted', theme.colors.textMuted);
    root.style.setProperty('--text-disabled', theme.type === 'dark' ? '#45475a' : '#9ca0b0');
    root.style.setProperty('--accent-primary', theme.colors.accent);
    root.style.setProperty('--border-default', theme.colors.border);
    root.style.setProperty('--border-subtle', theme.type === 'dark' ? '#45475a' : '#bcc0cc');
    
    // Update Monaco editor theme if it exists
    // @ts-expect-error Monaco is available globally
    if (window.monaco) {
      // @ts-expect-error Monaco is available globally
      window.monaco.editor.setTheme(theme.type === 'light' ? 'rachana-light' : 'rachana-dark');
    }
  }, [settings, theme]);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, theme, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
