import React, { useState, useRef } from 'react';
import { Volume2, ChevronDown } from 'lucide-react';
import { phrases, categories, Phrase } from '../data/phrases';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useTranslationStore } from '../store/translationStore';
import { useConversationStore } from '../store/conversationStore';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { TipsPanel } from '../components/TipsPanel';

export const QuickPhrasesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { speak } = useTextToSpeech();
  const { setTranslation } = useTranslationStore();
  const { addConversation } = useConversationStore();
  const { showEmojis } = useAppStore();
  const navigate = useNavigate();
  const phrasesRef = useRef<HTMLDivElement>(null);

  const filteredCategories = categories.filter(category => {
    if (searchTerm === '') return true;
    
    const categoryPhrases = phrases.filter(phrase => phrase.category === category);
    return categoryPhrases.some(phrase => 
      phrase.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.es.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getFilteredPhrasesForCategory = (category: string) => {
    return phrases.filter(phrase => {
      const matchesCategory = phrase.category === category;
      const matchesSearch = searchTerm === '' || 
                           phrase.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           phrase.es.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const handleScrollToPhrases = () => {
    if (searchTerm.trim() && phrasesRef.current) {
      phrasesRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handlePhraseSelect = (phrase: Phrase) => {
    const translation = {
      originalText: phrase.en,
      translatedText: phrase.es,
      originalLang: 'en' as const,
      targetLang: 'es' as const
    };
    
    setTranslation(translation);
    
    // Add to conversation history with officer speaker
    addConversation({
      ...translation,
      source: 'phrase',
      speaker: 'officer'
    });
    
    navigate('/translate');
  };

  const handlePlayAudio = (text: string, lang: string, phrase: Phrase, e: React.MouseEvent) => {
    e.stopPropagation();
    speak(text, lang);
    
    // Add to conversation history when audio is played with officer speaker
    const translation = {
      originalText: phrase.en,
      translatedText: phrase.es,
      originalLang: 'en' as const,
      targetLang: 'es' as const
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

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'medical': '🏥',
      'family': '👨‍👩‍👧‍👦',
      'reassurance': '🤝',
      'communication': '💬',
      'instructions': '📋',
      'basic needs': '🥤'
    };
    return icons[category] || '📝';
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
                    {showEmojis && <span className="text-xl">{getCategoryIcon(category)}</span>}
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
                        onClick={() => handlePhraseSelect(phrase)}
                        className="p-4 bg-white dark:bg-gray-800 active:bg-blue-50 dark:active:bg-blue-900/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handlePhraseSelect(phrase);
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
                            onClick={(e) => handlePlayAudio(phrase.en, 'en', phrase, e)}
                            className="p-2 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            title="Play English audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Spanish */}
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                          <div className="flex-1">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Español</div>
                            <div className="font-medium text-gray-900 dark:text-white">{phrase.es}</div>
                          </div>
                          <button
                            onClick={(e) => handlePlayAudio(phrase.es, 'es', phrase, e)}
                            className="p-2 text-green-500 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                            title="Play Spanish audio"
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