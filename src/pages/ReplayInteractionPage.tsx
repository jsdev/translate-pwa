import React, { useState } from 'react';
import { useConversationStore } from '../store/conversationStore';
import { Volume2, CheckCircle } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const ReplayInteractionPage: React.FC = () => {
  const { conversations } = useConversationStore();
  const { speak } = useTextToSpeech();
  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [audioLang, setAudioLang] = useState<'en' | 'foreign' | 'source'>('en');

  const getAudioText = (conversation: any) => {
    if (audioLang === 'en') return conversation.originalLang === 'en' ? conversation.originalText : conversation.translatedText;
    if (audioLang === 'foreign') return conversation.originalLang !== 'en' ? conversation.originalText : conversation.translatedText;
    // 'source' returns the original text regardless of language
    return conversation.originalText;
  };

  const getAudioLang = (conversation: any) => {
    if (audioLang === 'en') return 'en';
    if (audioLang === 'foreign') return conversation.originalLang !== 'en' ? conversation.originalLang : conversation.targetLang;
    return conversation.originalLang;
  };

  const handlePlay = (conversation: any) => {
    const text = getAudioText(conversation);
    const lang = getAudioLang(conversation);
    speak(text, lang);
    setPlayedIds((prev) => prev.includes(conversation.id) ? prev : [...prev, conversation.id]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Replay Interaction</h2>
        <div className="flex gap-2 mt-2">
          <button
            className={`px-3 py-1 rounded ${audioLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setAudioLang('en')}
          >
            English
          </button>
          <button
            className={`px-3 py-1 rounded ${audioLang === 'foreign' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setAudioLang('foreign')}
          >
            Foreign
          </button>
          <button
            className={`px-3 py-1 rounded ${audioLang === 'source' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setAudioLang('source')}
          >
            Source
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversations.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">No conversations to replay.</div>
        ) : (
          conversations.map((conversation, idx) => (
            <div
              key={conversation.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between transition-opacity ${playedIds.includes(conversation.id) ? 'opacity-60' : ''}`}
            >
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Step {idx + 1}
                </div>
                <div className="text-gray-900 dark:text-gray-100 text-base leading-relaxed">
                  {getAudioText(conversation)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {playedIds.includes(conversation.id) && (
                  <CheckCircle className="w-5 h-5 text-green-500" title="Played" />
                )}
                <button
                  className="p-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  title="Play audio"
                  onClick={() => handlePlay(conversation)}
                  aria-pressed={playedIds.includes(conversation.id)}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
