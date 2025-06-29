import { Volume2 } from 'lucide-react';
import { Phrase } from '../data/phrases';
import { getLanguageName } from '../config/languages';

interface PhraseCardProps {
  phrase: Phrase;
  sourceLanguage: string;
  targetLanguage: string;
  onPlayAudio: (text: string, lang: string, phrase: Phrase, e: React.MouseEvent) => void;
  getPhraseText: (phrase: Phrase, langCode: string) => string;
  className?: string;
}

export const PhraseCard = ({
  phrase,
  sourceLanguage,
  targetLanguage,
  onPlayAudio,
  getPhraseText,
  className = ''
}: PhraseCardProps) => {
  return (
    <div
      onClick={(e) => e.currentTarget.querySelectorAll('button')[1]?.click()}
      className={`p-4 bg-white dark:bg-gray-800 active:bg-blue-50 dark:active:bg-blue-900/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
    >
      {/* Source Language */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {getLanguageName(sourceLanguage)}
          </div>
          <div className="font-medium text-gray-900 dark:text-white">
            {getPhraseText(phrase, sourceLanguage)}
          </div>
        </div>
        <button
          onClick={(e) => onPlayAudio(getPhraseText(phrase, sourceLanguage), sourceLanguage, phrase, e)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          title={`Play ${getLanguageName(sourceLanguage)} audio`}
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Target Language */}
      <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
        <div className="flex-1">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {getLanguageName(targetLanguage)}
          </div>
          <div className="font-medium text-gray-900 dark:text-white">
            {getPhraseText(phrase, targetLanguage)}
          </div>
        </div>
        <button
          onClick={(e) => onPlayAudio(getPhraseText(phrase, targetLanguage), targetLanguage, phrase, e)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          title={`Play ${getLanguageName(targetLanguage)} audio`}
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
