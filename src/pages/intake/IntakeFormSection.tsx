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

// DRY helper to create a mock Phrase object from a question
const makeMockPhrase = (question: Record<string, string>): Phrase => ({
  en: question.en,
  es: question.es,
  zh: question.zh,
  ar: question.ar,
  category: 'intake'
});

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
      // Use DRY helper for mockPhrase
      const question = intakeQuestions[questionKey];
      const mockPhrase: Phrase = makeMockPhrase(question);
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
            <div>
              <PlayTranslationCard
                id="identification-question"
                title={getQuestionText(intakeQuestions.identification, sourceLanguage)}
                subtitle={getQuestionText(intakeQuestions.identification, targetLanguage)}
                onPlay={(e) => {
                  const question = intakeQuestions.identification;
                  const mockPhrase: Phrase = makeMockPhrase(question);
                  onPlayAudio(getQuestionText(question, targetLanguage), targetLanguage, mockPhrase, e);
                }}
                className='border-b-0'
              />
              <fieldset className="p-4" aria-labelledby="identification-question">
                <legend className="sr-only">Do you have identification?</legend>
                <div className="flex gap-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasIdentification"
                      value="true"
                      checked={intakeData.hasIdentification === true}
                      onChange={() => updateIntakeData({ hasIdentification: true })}
                      className="sr-only"
                    />
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 ${
                      intakeData.hasIdentification === true
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                    }`}>
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasIdentification"
                      value="false"
                      checked={intakeData.hasIdentification === false}
                      onChange={() => updateIntakeData({ hasIdentification: false })}
                      className="sr-only"
                    />
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 ${
                      intakeData.hasIdentification === false
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                    }`}>
                      No
                    </span>
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Name Card */}
            <div>
              <PlayTranslationCard
                id="name-question"
                title={getQuestionText(intakeQuestions.name, sourceLanguage)}
                subtitle={getQuestionText(intakeQuestions.name, targetLanguage)}
                onPlay={(e) => {
                  const question = intakeQuestions.name;
                  const mockPhrase: Phrase = makeMockPhrase(question);
                  onPlayAudio(getQuestionText(question, targetLanguage), targetLanguage, mockPhrase, e);
                }}
                className='border-b-0'
              />
              <div className="py-2">
                <label htmlFor="name-input" className="sr-only">
                  Enter your full name
                </label>
                <input
                  id="name-input"
                  type="text"
                  value={intakeData.name}
                  onChange={(e) => updateIntakeData({ name: e.target.value })}
                  aria-labelledby="name-question"
                  className="w-full px-4 py-2 bg-transparent border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            {/* Country Card */}
            <div>
              <PlayTranslationCard
                id="country-question"
                title={getQuestionText(intakeQuestions.country, sourceLanguage)}
                subtitle={getQuestionText(intakeQuestions.country, targetLanguage)}
                onPlay={(e) => {
                  const question = intakeQuestions.country;
                  const mockPhrase: Phrase = makeMockPhrase(question);
                  onPlayAudio(getQuestionText(question, targetLanguage), targetLanguage, mockPhrase, e);
                }}
                className='border-b-0'
              />
              <div className="py-2">
                <label htmlFor="country-input" className="sr-only">
                  Enter your country of citizenship
                </label>
                <input
                  id="country-input"
                  type="text"
                  value={intakeData.country}
                  onChange={(e) => updateIntakeData({ country: e.target.value })}
                  aria-labelledby="country-question"
                  className="w-full px-4 py-2 bg-transparent border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
                  placeholder="Enter country of citizenship"
                />
              </div>
            </div>

            {/* Passport Number Card (conditional) */}
            {intakeData.hasIdentification === true && (
              <div>
                <PlayTranslationCard
                  id="passport-question"
                  title={getQuestionText(intakeQuestions.passport, sourceLanguage)}
                  subtitle={getQuestionText(intakeQuestions.passport, targetLanguage)}
                  onPlay={(e) => {
                    const question = intakeQuestions.passport;
                    const mockPhrase: Phrase = makeMockPhrase(question);
                    onPlayAudio(getQuestionText(question, targetLanguage), targetLanguage, mockPhrase, e);
                  }}
                  className='border-b-0'
                />
                <div className="py-2">
                  <label htmlFor="passport-input" className="sr-only">
                    Enter your passport or ID number
                  </label>
                  <input
                    id="passport-input"
                    type="text"
                    value={intakeData.passportNumber}
                    onChange={(e) => updateIntakeData({ passportNumber: e.target.value })}
                    aria-labelledby="passport-question"
                    className="w-full px-4 py-2 bg-transparent border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
                    placeholder="Enter passport or ID number"
                  />
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="divide-y">
              <label htmlFor="additional-info" className="block font-medium text-gray-900 dark:text-gray-100 mt-4 mb-1">
                <span className="px-4">Additional Information</span>
              </label>
              <textarea
                id="additional-info"
                value={intakeData.additionalInfo}
                onChange={(e) => updateIntakeData({ additionalInfo: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-none bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
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