import React, { useState, useRef } from 'react';
import { CheckCircle, AlertCircle, Save } from 'lucide-react';
import { intakePhrases, Phrase } from '../../data/phrases';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useTranslationStore } from '../../store/translationStore';
import { useConversationStore } from '../../store/conversationStore';
import { useIntakeStore } from '../../store/intakeStore';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar';
import { TipsPanel } from '../../components/TipsPanel';
import { IntakeFormSection } from './IntakeFormSection';
import { AdditionalPhrasesSection } from './AdditionalPhrasesSection';

export const IntakePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { speak } = useTextToSpeech();
  const { setTranslation } = useTranslationStore();
  const { addConversation } = useConversationStore();
  const { isIntakeComplete } = useIntakeStore();
  const navigate = useNavigate();
  const intakeFormRef = useRef<HTMLDetailsElement>(null);
  const additionalPhrasesRef = useRef<HTMLDetailsElement>(null);

  const filteredPhrases = intakePhrases.filter(phrase => {
    if (searchTerm === '') return true;
    const searchLower = searchTerm.toLowerCase();
    return phrase.en.toLowerCase().includes(searchLower) ||
           phrase.es.toLowerCase().includes(searchLower);
  });

  const handleScrollToAdditionalPhrases = () => {
    if (searchTerm.trim() && filteredPhrases.length > 0) {
      // Open additional phrases section
      if (additionalPhrasesRef.current) {
        additionalPhrasesRef.current.open = true;
        // Scroll to the section
        setTimeout(() => {
          additionalPhrasesRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
    } else if (searchTerm === '') {
      // If search is cleared, open intake form
      if (intakeFormRef.current) {
        intakeFormRef.current.open = true;
      }
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

  const handleSaveIntake = () => {
    // Trigger completion check
    useIntakeStore.getState().checkIntakeCompletion();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Required Intake</h2>
            {isIntakeComplete && (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            )}
          </div>
          <button
            onClick={handleSaveIntake}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Save className="w-4 h-4 inline mr-1" />
            Save
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search intake follow up questions"
          onSearch={handleScrollToAdditionalPhrases}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto prevent-bounce scrollbar-hide">
        {/* Status Banner */}
        <div className={`p-4 border-b ${
          isIntakeComplete 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' 
            : 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800'
        }`}>
          <div className="flex items-center gap-2">
            {isIntakeComplete ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            )}
            <div>
              <h3 className={`font-medium ${
                isIntakeComplete ? 'text-green-900 dark:text-green-100' : 'text-orange-900 dark:text-orange-100'
              }`}>
                {isIntakeComplete ? 'Intake Complete' : 'Intake Required'}
              </h3>
              <p className={`text-sm ${
                isIntakeComplete ? 'text-green-800 dark:text-green-200' : 'text-orange-800 dark:text-orange-200'
              }`}>
                {isIntakeComplete 
                  ? 'All required information has been collected'
                  : 'Please complete the required fields below'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Intake Form Section */}
        <IntakeFormSection
          ref={intakeFormRef}
          searchTerm={searchTerm}
          onPlayAudio={handlePlayAudio}
        />

        {/* Additional Intake Phrases Section */}
        <AdditionalPhrasesSection
          ref={additionalPhrasesRef}
          searchTerm={searchTerm}
          filteredPhrases={filteredPhrases}
          onPhraseSelect={handlePhraseSelect}
          onPlayAudio={handlePlayAudio}
        />
      </div>

      {/* Tips Panel */}
      <TipsPanel
        title="Intake Requirements"
        color="yellow"
        storageKey="intake-tips-dismissed"
        tips={[
          "Tap Spanish audio buttons to ask questions directly",
          "Complete all required fields for proper documentation",
          "Use Record tab to capture detainee responses",
          "Search automatically switches between form and phrases",
          "All interactions are automatically logged"
        ]}
      />
    </div>
  );
};