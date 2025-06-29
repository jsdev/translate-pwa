import { Volume2, Mic, Copy } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useTranslationStore } from '../store/translationStore';
import { getLanguageName } from '../config/languages';

export const TranslationPage = () => {
  const { speak } = useTextToSpeech();
  const { translation, clearTranslation } = useTranslationStore();

  const handlePlayAudio = (text: string, lang: string) => {
    speak(text, lang);
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (!translation) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">No Translation Yet</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Record speech or select a quick phrase to see translations here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header with Actions */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Translation Result</h2>
          <div className="flex gap-2">
            <a href='/record'
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
            >
              <Mic className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Translation Display */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto prevent-bounce">
        {/* Original Text */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                {getLanguageName(translation.originalLang)}
              </h3>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">Original</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleCopyText(translation.originalText)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                title="Copy text"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePlayAudio(translation.originalText, translation.originalLang)}
                className="p-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                title="Play audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
            {translation.originalText}
          </p>
        </div>

        {/* Translated Text */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                {getLanguageName(translation.targetLang)}
              </h3>
              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">Translation</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleCopyText(translation.translatedText)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                title="Copy text"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePlayAudio(translation.translatedText, translation.targetLang)}
                className="p-2 text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                title="Play audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
            {translation.translatedText}
          </p>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="p-4 bg-green-50 dark:bg-green-900/20 border-t border-green-100 dark:border-green-800 flex-shrink-0">
        <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Quick Actions:</h3>
        <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
          <li>• Tap speaker icons to hear audio playback</li>
          <li>• Use copy buttons to share text via other apps</li>
          <li>• Tap swap icon to reverse translation direction</li>
          <li>• Record new speech to update translation</li>
        </ul>
      </div>
    </div>
  );
};