import { create } from 'zustand';
import { defaultSettings, getInitialSettings, saveSettings, type AppSettings } from '../config/defaultSettings';

type Theme = AppSettings['theme'];

interface AppStore extends AppSettings {
  toggleTips: () => void;
  toggleEmojis: () => void;
  setTheme: (theme: Theme) => void;
  setTargetLanguage: (language: string) => void;
  resetDismissedTips: () => void;
  resetToDefaults: () => void;
}

// Function to get system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Function to apply theme to document
const applyTheme = (theme: Theme) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    const actualTheme = theme === 'system' ? getSystemTheme() : theme;
    
    if (actualTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
};

export const useAppStore = create<AppStore>((set, get) => {
  // Initialize with merged settings, but always ensure source language is English
  const initialSettings = getInitialSettings();
  initialSettings.sourceLanguage = 'en'; // Force English for officers
  
  // Apply initial theme
  applyTheme(initialSettings.theme);

  return {
    ...initialSettings,
    
    toggleTips: () => {
      const newShowTips = !get().showTips;
      const newSettings = { ...get(), showTips: newShowTips };
      set(newSettings);
      saveSettings(newSettings);
    },
    
    toggleEmojis: () => {
      const newShowEmojis = !get().showEmojis;
      const newSettings = { ...get(), showEmojis: newShowEmojis };
      set(newSettings);
      saveSettings(newSettings);
    },
    
    setTheme: (theme) => {
      const newSettings = { ...get(), theme };
      set(newSettings);
      saveSettings(newSettings);
      applyTheme(theme);
    },
    
    setTargetLanguage: (targetLanguage) => {
      const newSettings = { ...get(), targetLanguage, sourceLanguage: 'en' }; // Always keep source as English
      set(newSettings);
      saveSettings(newSettings);
    },
    
    resetDismissedTips: () => {
      // Clear all dismissed tips from localStorage
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('-tips-dismissed')) {
          localStorage.removeItem(key);
        }
      });
      
      const newSettings = { ...get(), showTips: true };
      set(newSettings);
      saveSettings(newSettings);
    },
    
    resetToDefaults: () => {
      const defaultsWithEnglish = { ...defaultSettings, sourceLanguage: 'en' }; // Ensure English
      set(defaultsWithEnglish);
      saveSettings(defaultsWithEnglish);
      applyTheme(defaultSettings.theme);
      
      // Also clear dismissed tips
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('-tips-dismissed')) {
          localStorage.removeItem(key);
        }
      });
    }
  };
});

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme } = useAppStore.getState();
    if (theme === 'system') {
      applyTheme('system');
    }
  });
}