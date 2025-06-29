import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useIntakeStore } from '../../store/intakeStore';
import { useConversationStore } from '../../store/conversationStore';
import { useAppStore } from '../../store/appStore';
import { Phrase } from '../../data/phrases';
import { PlayTranslationCard } from '../../components/PlayTranslationCard';
import { intakeQuestions, IntakeQuestionKey } from '../../data/intakeQuestions';

interface IntakeFormSectionProps {
  searchTerm: string;
  onPlayAudio: (text: string, lang: string, phrase: Phrase, e: React.MouseEvent) => void;
}

const IntakeFormSection = forwardRef<HTMLDetailsElement, IntakeFormSectionProps>(
  ({ searchTerm, onPlayAudio }, ref) => {
    const { intakeData, updateIntakeData } = useIntakeStore();
    const { isIntakeComplete } = useIntakeStore();
    const { addConversation } = useConversationStore();
    const { sourceLanguage, targetLanguage } = useAppStore();

    const getQuestionText = (question: Record<string, string>, langCode: string): string => {
      return question[langCode] || question.en; // Fallback to English
    };

    const handlePlayQuestion = (questionKey: IntakeQuestionKey) => {
      const englishText = getQuestionText(intakeQuestions[questionKey], sourceLanguage);
      const targetText = getQuestionText(intakeQuestions[questionKey], targetLanguage);
      
      addConversation({
        originalText: englishText,
        translatedText: targetText,
        originalLang: sourceLanguage,
        targetLang: targetLanguage,
        source: 'phrase',
        speaker: 'officer'
      });
      
      // Create a mock phrase object for the onPlayAudio handler
      const question = intakeQuestions[questionKey];
      const mockPhrase: Phrase = { 
        en: question.en,
        es: question.es,
        zh: question.zh,
        ar: question.ar,
        category: 'intake' 
      };
      onPlayAudio(targetText, targetLanguage, mockPhrase, {} as React.MouseEvent);
    };

    return (
      <details 
        ref={ref}
        name="intake-accordion"
        className="group bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        open={searchTerm === ''}
      >
        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset text-gray-900 dark:text-white">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {isIntakeComplete ? 'Intake Complete' : 'Intake Required'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isIntakeComplete 
                  ? 'All required information has been collected'
                  : 'Please complete the required fields below'
                }
              </p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 group-open:rotate-180" />
        </summary>

        <div className="border-t border-gray-100 dark:border-gray-700">
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {/* Identification Status Card */}
            <div className="p-4">
              <PlayTranslationCard
                title={getQuestionText(intakeQuestions.identification, sourceLanguage)}
                subtitle={getQuestionText(intakeQuestions.identification, targetLanguage)}
                onPlay={() => handlePlayQuestion('identification')}
                className="mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => updateIntakeData({ hasIdentification: true })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    intakeData.hasIdentification === true
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => updateIntakeData({ hasIdentification: false })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    intakeData.hasIdentification === false
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Name Card */}
            <div className="p-4">
              <PlayTranslationCard
                title={getQuestionText(intakeQuestions.name, sourceLanguage)}
                subtitle={getQuestionText(intakeQuestions.name, targetLanguage)}
                onPlay={() => handlePlayQuestion('name')}
                className="mb-4"
              />
              <input
                type="text"
                value={intakeData.name}
                onChange={(e) => updateIntakeData({ name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
                placeholder="Enter full name"
              />
            </div>

            {/* Country Card */}
            <div className="p-4">
              <PlayTranslationCard
                title={getQuestionText(intakeQuestions.country, sourceLanguage)}
                subtitle={getQuestionText(intakeQuestions.country, targetLanguage)}
                onPlay={() => handlePlayQuestion('country')}
                className="mb-4"
              />
              <input
                type="text"
                value={intakeData.country}
                onChange={(e) => updateIntakeData({ country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
                placeholder="Enter country of citizenship"
              />
            </div>

            {/* Passport Number Card (conditional) */}
            {intakeData.hasIdentification === true && (
              <div className="p-4">
                <PlayTranslationCard
                  title={getQuestionText(intakeQuestions.passport, sourceLanguage)}
                  subtitle={getQuestionText(intakeQuestions.passport, targetLanguage)}
                  onPlay={() => handlePlayQuestion('passport')}
                  className="mb-4"
                />
                <input
                  type="text"
                  value={intakeData.passportNumber}
                  onChange={(e) => updateIntakeData({ passportNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
                  placeholder="Enter passport or ID number"
                />
              </div>
            )}

            {/* Additional Information */}
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Information
              </label>
              <textarea
                value={intakeData.additionalInfo}
                onChange={(e) => updateIntakeData({ additionalInfo: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
                placeholder="Any additional notes or information"
              />
            </div>
          </div>
        </div>
      </details>
    );
  }
);

IntakeFormSection.displayName = 'IntakeFormSection';

export default IntakeFormSection;
