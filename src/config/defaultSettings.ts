export interface AppSettings {
  showTips: boolean;
  showEmojis: boolean;
  theme: 'light' | 'dark' | 'system';
}

export const defaultSettings: AppSettings = {
  showTips: false,    // Training mode disabled by default
  showEmojis: false,  // Emojis disabled by default for professional appearance
  theme: 'system'     // Follow system preference
};

/**
 * Merges default settings with stored settings from localStorage
 * Ensures all settings have proper defaults even if localStorage is incomplete
 */
export const getInitialSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem('ice-cbp-app-settings');
    if (!stored) return defaultSettings;
    
    const parsedStored = JSON.parse(stored);
    
    // Merge with defaults to ensure all properties exist
    return {
      ...defaultSettings,
      ...parsedStored
    };
  } catch (error) {
    console.warn('Failed to parse stored settings, using defaults:', error);
    return defaultSettings;
  }
};

/**
 * Saves settings to localStorage
 */
export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem('ice-cbp-app-settings', JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to localStorage:', error);
  }
};