import React, { useState, useRef } from 'react';
import { Volume2, ChevronDown } from 'lucide-react';
import { phrases, categories, Phrase } from '../data/phrases';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useConversationStore } from '../store/conversationStore';
import { useAppStore } from '../store/appStore';
import { SearchBar } from '../components/SearchBar';
import { TipsPanel } from '../components/TipsPanel';
import { getLanguageName } from '../config/languages';

export const QuickPhrasesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { speak } = useTextToSpeech();
  const { addConversation } = useConversationStore();
  const { sourceLanguage, targetLanguage } = useAppStore();
  const phrasesRef = useRef<HTMLDivElement>(null);

  const filteredCategories = categories.filter(category => {
    // Hide intake category since it's already in IntakePage
    if (category === 'intake') return false;
    
    if (searchTerm === '') return true;
    
    const categoryPhrases = phrases.filter(phrase => phrase.category === category);
    return categoryPhrases.some(phrase => 
      Object.values(phrase).some(text => 
        typeof text === 'string' && 
        text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const getFilteredPhrasesForCategory = (category: string) => {
    return phrases.filter(phrase => {
      const matchesCategory = phrase.category === category;
      const matchesSearch = searchTerm === '' || 
                           Object.values(phrase).some(text => 
                             typeof text === 'string' && 
                             text.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      return matchesCategory && matchesSearch;
    });
  };

  const getPhraseText = (phrase: Phrase, langCode: string): string => {
    // Type assertion to safely access phrase properties
    const text = phrase[langCode as keyof Omit<Phrase, 'category'>];
    return typeof text === 'string' ? text : phrase.en;
  };

  const handleScrollToPhrases = () => {
    if (searchTerm.trim() && phrasesRef.current) {
      phrasesRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };



  const handlePlayAudio = (text: string, lang: string, phrase: Phrase, e: React.MouseEvent) => {
    e.stopPropagation();
    speak(text, lang);
    
    // Add to conversation history when audio is played with officer speaker
    const sourceText = getPhraseText(phrase, sourceLanguage);
    const targetText = getPhraseText(phrase, targetLanguage);
    
    const translation = {
      originalText: sourceText,
      translatedText: targetText,
      originalLang: sourceLanguage,
      targetLang: targetLanguage
    };
    
    addConversation({
      ...translation,
      source: 'phrase',
      speaker: 'officer'
    });
  };

  const getCategoryDisplayName = (category: string) => {
    const names: Record<string, string> = {
      'medical': 'Medical',
      'family': 'Family',
      'reassurance': 'Reassurance',
      'communication': 'Communication',
      'instructions': 'Instructions',
      'basic needs': 'Basic Needs'
    };
    return names[category] || category;
  };


  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Phrases</h2>
        
        {/* Search Bar */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search phrases across categories"
          onSearch={handleScrollToPhrases}
        />
      </div>

      {/* Phrases Accordion */}
      <div className="flex-1 overflow-y-auto prevent-bounce scrollbar-hide">
        <div ref={phrasesRef}>
          {filteredCategories.map((category, categoryIndex) => {
            const categoryPhrases = getFilteredPhrasesForCategory(category);
            const isFirstCategory = categoryIndex === 0;
            
            return (
              <details 
                key={category} 
                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                open={isFirstCategory || searchTerm !== ''}
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset text-gray-900 dark:text-white">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-medium">
                        {getCategoryDisplayName(category)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {categoryPhrases.length} phrase{categoryPhrases.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200" />
                </summary>
                
                <div className="border-t border-gray-100 dark:border-gray-700">
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {categoryPhrases.map((phrase, index) => (
                      <div
                        key={index}
                        onClick={(e) => e.currentTarget.querySelectorAll('button')[1]?.click()}
                        className="p-4 bg-white dark:bg-gray-800 active:bg-blue-50 dark:active:bg-blue-900/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        {/* Source Language */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{getLanguageName(sourceLanguage)}</div>
                            <div className="font-medium text-gray-900 dark:text-white">{getPhraseText(phrase, sourceLanguage)}</div>
                          </div>
                          <button
                            onClick={(e) => handlePlayAudio(getPhraseText(phrase, sourceLanguage), sourceLanguage, phrase, e)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                            title={`Play ${getLanguageName(sourceLanguage)} audio`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Target Language */}
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                          <div className="flex-1">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{getLanguageName(targetLanguage)}</div>
                            <div className="font-medium text-gray-900 dark:text-white">{getPhraseText(phrase, targetLanguage)}</div>
                          </div>
                          <button
                            onClick={(e) => handlePlayAudio(getPhraseText(phrase, targetLanguage), targetLanguage, phrase, e)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                            title={`Play ${getLanguageName(targetLanguage)} audio`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No phrases found matching your search.</p>
          </div>
        )}
      </div>

      {/* Tips Panel */}
      <TipsPanel
        title="Quick Phrases Tips"
        color="blue"
        storageKey="phrases-tips-dismissed"
        tips={[
          "Tap category headers to expand/collapse sections",
          "First category opens automatically for quick access",
          "Use speaker icons to play audio immediately",
          "Search filters across all categories",
          "All interactions are logged for audit purposes"
        ]}
      />
    </div>
  );
};