import React, { forwardRef } from 'react';
import { Volume2, ChevronDown } from 'lucide-react';
import { Phrase } from '../../data/phrases';
import { useAppStore } from '../../store/appStore';

interface AdditionalPhrasesSectionProps {
  searchTerm: string;
  filteredPhrases: Phrase[];
  onPhraseSelect: (phrase: Phrase) => void;
  onPlayAudio: (text: string, lang: string, phrase: Phrase, e: React.MouseEvent) => void;
}

export const AdditionalPhrasesSection = forwardRef<HTMLDetailsElement, AdditionalPhrasesSectionProps>(
  ({ searchTerm, filteredPhrases, onPhraseSelect, onPlayAudio }, ref) => {
    const { showEmojis } = useAppStore();

    return (
      <details 
        ref={ref}
        name="intake-accordion"
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        open={searchTerm !== '' && filteredPhrases.length > 0}
      >
        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset text-gray-900 dark:text-white">
          <div className="flex items-center gap-3">
            {showEmojis && <span className="text-xl">💬</span>}
            <div>
              <h3 className="font-medium">
                Additional Intake Phrases
                {searchTerm && filteredPhrases.length > 0 && (
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    ({filteredPhrases.length} result{filteredPhrases.length !== 1 ? 's' : ''})
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Follow-up questions and phrases
              </p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200" />
        </summary>

        <div className="border-t border-gray-100 dark:border-gray-700">
          {filteredPhrases.length > 0 ? (
            <div className="p-4 space-y-3">
              {filteredPhrases.map((phrase, index) => (
                <div
                  key={index}
                  onClick={() => onPhraseSelect(phrase)}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 active:bg-blue-50 dark:active:bg-blue-900/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onPhraseSelect(phrase);
                    }
                  }}
                >
                  {/* English */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">English</div>
                      <div className="font-medium text-gray-900 dark:text-white">{phrase.en}</div>
                    </div>
                    <button
                      onClick={(e) => onPlayAudio(phrase.en, 'en', phrase, e)}
                      className="p-2 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      title="Play English audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Spanish */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Español</div>
                      <div className="font-medium text-gray-900 dark:text-white">{phrase.es}</div>
                    </div>
                    <button
                      onClick={(e) => onPlayAudio(phrase.es, 'es', phrase, e)}
                      className="p-2 text-green-500 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                      title="Play Spanish audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="p-4">
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No intake phrases found matching "{searchTerm}"
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </details>
    );
  }
);

AdditionalPhrasesSection.displayName = 'AdditionalPhrasesSection';