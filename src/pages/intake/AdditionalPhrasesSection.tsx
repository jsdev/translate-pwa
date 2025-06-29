import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Phrase } from '../../data/phrases';
import { useAppStore } from '../../store/appStore';
import { PlayTranslationCard } from '../../components/PlayTranslationCard'; 

interface AdditionalPhrasesSectionProps {
  searchTerm: string;
  filteredPhrases: Phrase[];
  onPlayAudio: (text: string, lang: string, phrase: Phrase, e: React.MouseEvent) => void;
}

export const AdditionalPhrasesSection = forwardRef<HTMLDetailsElement, AdditionalPhrasesSectionProps>(
  ({ searchTerm, filteredPhrases, onPlayAudio }, ref) => {
    const { sourceLanguage, targetLanguage } = useAppStore();
    
    // Helper function to get phrase text in the specified language
    const getPhraseText = (phrase: Phrase, langCode: string): string => {
      const text = (phrase as unknown as Record<string, unknown>)[langCode];
      return typeof text === 'string' ? text : phrase.en; // Fallback to English
    };

    return (
      <details 
        ref={ref}
        name="intake-accordion"
        className="group bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        open={searchTerm !== '' && filteredPhrases.length > 0}
      >
        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset text-gray-900 dark:text-white">
          <div className="flex items-center gap-3">
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
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 group-open:rotate-180" />
        </summary>

        <div className="border-t border-gray-100 dark:border-gray-700">
          {filteredPhrases.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredPhrases.map((phrase, index) => {
                const sourceText = getPhraseText(phrase, sourceLanguage);
                const targetText = getPhraseText(phrase, targetLanguage);
                
                return (
                  <PlayTranslationCard
                    key={index}
                    title={sourceText}
                    subtitle={targetText}
                    onPlay={() => onPlayAudio(targetText, targetLanguage, phrase, {} as React.MouseEvent)}
                  />
                );
              })}
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