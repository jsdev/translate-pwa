import { Volume2, Mic, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useTranslationStore } from '../store/translationStore';
import { getLanguageName } from '../config/languages';
import { TipsPanel } from '../components/TipsPanel';

export const TranslationPage = () => {
  const { speak } = useTextToSpeech();
  const { translation } = useTranslationStore();
  const navigate = useNavigate();

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

  const handleRecordResponse = () => {
    // Navigate to record page with context to toggle speaker for back-and-forth conversation
    navigate('/record?context=response');
  };

  const handleReRecord = () => {
    // Navigate to record page with context to re-record with same speaker
    navigate('/record?context=re-record');
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
            <button
              onClick={handleReRecord}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 flex items-center gap-1"
              title="Re-record with same speaker"
            >
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">Re-record</span>
            </button>
            <button
              onClick={handleRecordResponse}
              className="px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center gap-1"
              title="Record response (toggle speaker)"
            >
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">Record Response</span>
            </button>
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

      {/* Tips Panel */}
      <TipsPanel
        title="Quick Actions"
        color="green"
        storageKey="translation-tips-dismissed"
        tips={[
          "Tap speaker icons to hear audio playback",
          "Use copy buttons to share text via other apps",
          "Use 'Record Response' to automatically toggle speaker for back-and-forth conversation",
          "Use 'Re-record' to record again with the same speaker",
          "All translations are automatically logged"
        ]}
      />
    </div>
  );
};