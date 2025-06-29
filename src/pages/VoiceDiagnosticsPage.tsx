import React, { useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const VoiceDiagnosticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { availableVoices, speak, getVoiceInfo } = useTextToSpeech();
  const [testText] = useState({
    en: "Hello, this is a test of English speech synthesis.",
    es: "Hola, esta es una prueba de síntesis de voz en español.",
    zh: "你好，这是中文语音合成的测试。",
    ar: "مرحبا، هذا اختبار لتخليق الكلام العربي."
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  const handleTestSpeech = (langCode: string) => {
    speak(testText[langCode as keyof typeof testText], langCode);
  };

  const handleBack = () => {
    navigate('/settings');
  };

  // Detect platform for specific instructions
  const getPlatform = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();
    
    if (userAgent.includes('iphone') || userAgent.includes('ipad') || platform.includes('iphone') || platform.includes('ipad')) {
      return 'ios';
    } else if (userAgent.includes('mac') || platform.includes('mac')) {
      return 'macos';
    } else if (userAgent.includes('android')) {
      return 'android';
    }
    return 'other';
  };

  const platform = getPlatform();

  const getInstallInstructions = () => {
    switch (platform) {
      case 'ios':
      case 'macos':
        return {
          title: 'Installing Additional Voices on iOS/macOS',
          steps: [
            'Open Settings (iOS) or System Preferences (macOS)',
            'Go to Accessibility → Spoken Content',
            'Tap/Click "Voices" or "System Voice"',
            'Download Chinese (Mandarin) and Arabic voices',
            'Restart your browser after installation'
          ],
          note: 'Voice availability depends on your iOS/macOS version and region settings.'
        };
      case 'android':
        return {
          title: 'Installing Additional Voices on Android',
          steps: [
            'Open Settings → Accessibility → Text-to-speech',
            'Tap "Google Text-to-speech Engine" settings',
            'Tap "Install voice data"',
            'Download Chinese and Arabic language packs',
            'Restart your browser after installation'
          ],
          note: 'Voice availability may vary by Android version and device manufacturer.'
        };
      default:
        return {
          title: 'Installing Additional Voices',
          steps: [
            'Check your system accessibility settings',
            'Look for text-to-speech or voice options',
            'Download additional language packs',
            'Restart your browser after installation'
          ],
          note: 'Voice installation steps vary by operating system.'
        };
    }
  };

  const instructions = getInstallInstructions();

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Back to Settings"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Voice Diagnostics
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto prevent-bounce">
        <div className="p-4 space-y-6">
          {/* System Info */}
          <section>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">System Information</h3>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Total Voices:</strong> {availableVoices.length}</div>
                <div className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Platform:</strong> {platform.charAt(0).toUpperCase() + platform.slice(1)}</div>
                <div className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Browser:</strong> {navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'}</div>
                <div className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Language:</strong> {navigator.language}</div>
              </div>
            </div>
          </section>

          {/* Language Support Test */}
          <section>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Language Support Test</h3>
            <div className="space-y-3">
              {languages.map(lang => {
                const voiceInfo = getVoiceInfo(lang.code);
                const isAvailable = voiceInfo?.available;
                
                return (
                  <div key={lang.code} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{lang.flag}</span>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{lang.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {isAvailable ? (
                              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                <CheckCircle className="w-3 h-3" />
                                Voice available
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                                <VolumeX className="w-3 h-3" />
                                No voice found
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {isAvailable && (
                        <button
                          onClick={() => handleTestSpeech(lang.code)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          <Volume2 className="w-4 h-4" />
                          Test
                        </button>
                      )}
                    </div>
                    
                    {isAvailable && voiceInfo && (
                      <div className="text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="grid grid-cols-1 gap-1">
                          <div><strong>Voice:</strong> {voiceInfo.voice?.name || voiceInfo.fallbackVoice?.name}</div>
                          <div><strong>Language:</strong> {voiceInfo.voice?.lang || voiceInfo.fallbackVoice?.lang}</div>
                          <div><strong>Local:</strong> {voiceInfo.voice?.localService || voiceInfo.fallbackVoice?.localService ? 'Yes' : 'No'}</div>
                        </div>
                      </div>
                    )}
                    
                    {!isAvailable && (
                      <div className="text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium mb-1">Voice not available</div>
                            <div className="text-xs opacity-90">
                              Install {lang.name} voice support using the instructions below.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Installation Instructions */}
          <section>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                    {instructions.title}
                  </div>
                  <ol className="space-y-2 text-blue-700 dark:text-blue-300 list-decimal list-inside">
                    {instructions.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                  <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 opacity-75">
                    {instructions.note}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* All Available Voices */}
          <section>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">All Available Voices</h3>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-60 overflow-y-auto">
              {availableVoices.length > 0 ? (
                <div className="space-y-2 text-sm">
                  {availableVoices.map((voice, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">{voice.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">({voice.lang})</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {voice.localService ? 'Local' : 'Remote'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                  No voices available. Please check your system settings.
                </div>
              )}
            </div>
          </section>

          {/* Additional spacing for safe area */}
          <div className="h-4"></div>
        </div>
      </div>
    </div>
  );
};
