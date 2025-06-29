import React from 'react';
import { ArrowLeft, Monitor, Sun, Moon, RotateCcw, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { defaultSettings } from '../config/defaultSettings';
import { LanguageAutocomplete } from '../components/LanguageAutocomplete';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    theme, 
    setTheme, 
    showTips, 
    toggleTips, 
    sourceLanguage,
    targetLanguage,
    setTargetLanguage,
    resetDismissedTips,
    resetToDefaults
  } = useAppStore();

  // Debug logging for language changes
  React.useEffect(() => {
    console.log('SettingsPage - Current languages:', { sourceLanguage, targetLanguage });
  }, [sourceLanguage, targetLanguage]);

  const handleTargetLanguageChange = (newLanguage: string) => {
    console.log('SettingsPage - Setting target language:', newLanguage);
    setTargetLanguage(newLanguage);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const themeOptions = [
    { value: 'system' as const, label: 'System', icon: Monitor, description: 'Follow device settings' },
    { value: 'light' as const, label: 'Light', icon: Sun, description: 'Always light theme' },
    { value: 'dark' as const, label: 'Dark', icon: Moon, description: 'Always dark theme' }
  ];

  const isUsingDefaults = 
    theme === defaultSettings.theme &&
    showTips === defaultSettings.showTips &&
    sourceLanguage === defaultSettings.sourceLanguage &&
    targetLanguage === defaultSettings.targetLanguage;

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
          </div>
          
          {!isUsingDefaults && (
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
              title="Reset all settings to defaults"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto prevent-bounce">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Theme Selection */}
          <section>
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800">
              <div>
                <label htmlFor="theme-select" className="font-medium text-gray-900 dark:text-white">Theme</label>
                <div className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred appearance</div>
              </div>
              <fieldset>
                <legend className="sr-only">Select theme preference</legend>
                <div className="flex gap-1" role="radiogroup" aria-labelledby="theme-label">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const inputId = `theme-${option.value}`;
                    return (
                      <label
                        key={option.value}
                        htmlFor={inputId}
                        className={`relative p-2 rounded-lg transition-all cursor-pointer group ${
                          theme === option.value
                            ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        title={`${option.label}: ${option.description}`}
                      >
                        <input
                          type="radio"
                          id={inputId}
                          name="theme"
                          value={option.value}
                          checked={theme === option.value}
                          onChange={() => setTheme(option.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                          aria-describedby={`${inputId}-desc`}
                        />
                        <Icon 
                          className={`w-5 h-5 transition-colors ${
                            theme === option.value 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                          }`} 
                          aria-hidden="true" 
                        />
                        <span id={`${inputId}-desc`} className="sr-only">
                          {option.label}: {option.description}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </section>

          {/* Language Selection */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white px-3 py-2 bg-gray-50 dark:bg-gray-800">Languages</h3>
            <div className="p-3 bg-white dark:bg-gray-800 space-y-3">
              {/* Detained Person Language Selection */}
              <LanguageAutocomplete
                selectedLanguage={targetLanguage}
                onLanguageChange={handleTargetLanguageChange}
                label="Detained Person Language"
                className="w-full"
                excludeLanguages={['en']} // Exclude English since officer handles English
              />
              
              {/* Voice Diagnostics Button */}
              <button
                onClick={() => navigate('/voice-diagnostics', { replace: true })}
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 text-left"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Test Voice Support</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Check which languages have text-to-speech voices available
                    </div>
                  </div>
                </div>
                <span className="text-lg" role="img" aria-label="Test voice">
                  <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </span>
              </button>
            </div>
          </section>

          {/* Officer Training Mode */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white px-3 py-2 bg-gray-50 dark:bg-gray-800">Training</h3>
            <div className="bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between p-3">
                <div>
                  <label htmlFor="tips-toggle" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    Officer Training Mode
                  </label>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Show helpful tips and guidance</div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="tips-toggle"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      showTips ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    aria-label={`${showTips ? 'Disable' : 'Enable'} officer training mode`}
                  >
                    <input
                      type="checkbox"
                      id="tips-toggle"
                      checked={showTips}
                      onChange={toggleTips}
                      className="absolute opacity-0 w-full h-full cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                    />
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showTips ? 'translate-x-6' : 'translate-x-1'
                      }`}
                      aria-hidden="true"
                    />
                  </label>
                </div>
              </div>

              {showTips && (
                <div className="px-3 pb-3">
                  <button
                    onClick={resetDismissedTips}
                    className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <div className="font-medium text-blue-700 dark:text-blue-300">Reset Dismissed Tips</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Show all tips that were previously dismissed</div>
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Default Settings Info */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white px-3 py-2 bg-gray-50 dark:bg-gray-800">Default Configuration</h3>
            <div className="p-3 bg-white dark:bg-gray-800">
              <div className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                <div><strong className="text-gray-900 dark:text-white">Professional Mode:</strong> Tips disabled by default</div>
                <div><strong className="text-gray-900 dark:text-white">System Theme:</strong> Automatically follows device preference</div>
                <div><strong className="text-gray-900 dark:text-white">Local Storage:</strong> Settings persist across sessions</div>
                <div className="pt-2 text-xs opacity-75">
                  Settings are stored locally on your device and merged with secure defaults.
                </div>
              </div>
            </div>
          </section>

          {/* App Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white px-3 py-2 bg-gray-50 dark:bg-gray-800">About</h3>
            <div className="p-3 bg-white dark:bg-gray-800">
              <div className="text-gray-600 dark:text-gray-400 space-y-2">
                <div><strong className="text-gray-900 dark:text-white">DHS Translation Tool</strong></div>
                <div>Version 1.0.0</div>
                <div>Secure communication for law enforcement</div>
                <div className="pt-2 text-sm">
                  Designed for field use with offline capabilities, comprehensive audit trails, and accessibility features.
                </div>
              </div>
            </div>
          </section>

          {/* Additional spacing for safe area */}
          <div className="h-2"></div>
        </div>
      </div>
    </div>
  );
};