import React from 'react';
import { Volume2, RotateCcw, Copy } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useTranslationStore } from '../store/translationStore';

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

  const handleSwapLanguages = () => {
    if (translation) {
      useTranslationStore.setState({
        translation: {
          originalText: translation.translatedText,
          translatedText: translation.originalText,
          originalLang: translation.targetLang,
          targetLang: translation.originalLang
        }
      });
    }
  };

  if (!translation) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">No Translation Yet</h2>
          <p className="text-gray-500 text-sm">
            Record speech or select a quick phrase to see translations here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header with Actions */}
      <div className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Translation Result</h2>
          <div className="flex gap-2">
            <button
              onClick={handleSwapLanguages}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Swap languages"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={clearTranslation}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Translation Display */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto prevent-bounce">
        {/* Original Text */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-800">
                {translation.originalLang === 'en' ? 'English' : 'Español'}
              </h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Original</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleCopyText(translation.originalText)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                title="Copy text"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePlayAudio(translation.originalText, translation.originalLang)}
                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                title="Play audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-900 leading-relaxed">
            {translation.originalText}
          </p>
        </div>

        {/* Translated Text */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-800">
                {translation.targetLang === 'en' ? 'English' : 'Español'}
              </h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Translation</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleCopyText(translation.translatedText)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                title="Copy text"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePlayAudio(translation.translatedText, translation.targetLang)}
                className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                title="Play audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-900 leading-relaxed">
            {translation.translatedText}
          </p>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="p-4 bg-green-50 border-t border-green-100 flex-shrink-0">
        <h3 className="font-medium text-green-900 mb-2">Quick Actions:</h3>
        <ul className="text-green-800 text-sm space-y-1">
          <li>• Tap speaker icons to hear audio playback</li>
          <li>• Use copy buttons to share text via other apps</li>
          <li>• Tap swap icon to reverse translation direction</li>
          <li>• Record new speech to update translation</li>
        </ul>
      </div>
    </div>
  );
};