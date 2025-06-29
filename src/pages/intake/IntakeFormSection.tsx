import React, { forwardRef } from 'react';
import { Volume2, ChevronDown } from 'lucide-react';
import { useIntakeStore } from '../../store/intakeStore';
import { useConversationStore } from '../../store/conversationStore';
import { useAppStore } from '../../store/appStore';
import { Phrase } from '../../data/phrases';

interface IntakeFormSectionProps {
  searchTerm: string;
  onPlayAudio: (text: string, lang: string, phrase: Phrase, e: React.MouseEvent) => void;
}

export const IntakeFormSection = forwardRef<HTMLDetailsElement, IntakeFormSectionProps>(
  ({ searchTerm, onPlayAudio }, ref) => {
    const { intakeData, updateIntakeData } = useIntakeStore();
    const { isIntakeComplete } = useIntakeStore();
    const { addConversation } = useConversationStore();
    const { sourceLanguage, targetLanguage } = useAppStore();

    // Define intake questions with multilingual support
    const intakeQuestions = {
      identification: {
        en: "Do you have any identification?",
        es: "¿Tiene alguna identificación?",
        zh: "您有身份证件吗？",
        ar: "هل لديك أي هوية؟"
      },
      name: {
        en: "What is your name?",
        es: "¿Cuál es su nombre?",
        zh: "您叫什么名字？",
        ar: "ما اسمك؟"
      },
      country: {
        en: "What country are you from?",
        es: "¿De qué país es usted?",
        zh: "您来自哪个国家？",
        ar: "من أي بلد أنت؟"
      },
      passport: {
        en: "What is your passport number?",
        es: "¿Cuál es su número de pasaporte?",
        zh: "您的护照号码是什么？",
        ar: "ما هو رقم جواز سفرك؟"
      }
    };

    const getQuestionText = (question: Record<string, string>, langCode: string): string => {
      return question[langCode] || question.en; // Fallback to English
    };

    const handlePlayQuestion = (questionKey: keyof typeof intakeQuestions, e: React.MouseEvent) => {
      e.stopPropagation();
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
      const mockPhrase: Phrase = { 
        en: intakeQuestions[questionKey].en,
        es: intakeQuestions[questionKey].es,
        zh: intakeQuestions[questionKey].zh || intakeQuestions[questionKey].en,
        ar: intakeQuestions[questionKey].ar || intakeQuestions[questionKey].en,
        category: 'intake' 
      };
      onPlayAudio(targetText, targetLanguage, mockPhrase, e);
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

        <div className="border-t border-gray-100 dark:border-gray-700 p-4 space-y-4">
          {/* Identification Status Card */}
          <div className="border-b border-gray-200 dark:border-gray-600 last:border-b-0 pb-4 last:pb-0">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {getQuestionText(intakeQuestions.identification, sourceLanguage)}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {getQuestionText(intakeQuestions.identification, targetLanguage)}
                  </p>
                </div>
                <button
                  onClick={(e) => handlePlayQuestion('identification', e)}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  title={`Play ${targetLanguage.toUpperCase()} audio`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
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
          <div className="border-b border-gray-200 dark:border-gray-600 last:border-b-0 pb-4 last:pb-0">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {getQuestionText(intakeQuestions.name, sourceLanguage)}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {getQuestionText(intakeQuestions.name, targetLanguage)}
                  </p>
                </div>
                <button
                  onClick={(e) => handlePlayQuestion('name', e)}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  title={`Play ${targetLanguage.toUpperCase()} audio`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <input
              type="text"
              value={intakeData.name}
              onChange={(e) => updateIntakeData({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus-visible:outline-none"
              placeholder="Enter full name"
            />
          </div>

          {/* Country Card */}
          <div className="border-b border-gray-200 dark:border-gray-600 last:border-b-0 pb-4 last:pb-0">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {getQuestionText(intakeQuestions.country, sourceLanguage)}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {getQuestionText(intakeQuestions.country, targetLanguage)}
                  </p>
                </div>
                <button
                  onClick={(e) => handlePlayQuestion('country', e)}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  title={`Play ${targetLanguage.toUpperCase()} audio`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
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
            <div className="border-b border-gray-200 dark:border-gray-600 last:border-b-0 pb-4 last:pb-0">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {getQuestionText(intakeQuestions.passport, sourceLanguage)}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {getQuestionText(intakeQuestions.passport, targetLanguage)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handlePlayQuestion('passport', e)}
                    className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                    title={`Play ${targetLanguage.toUpperCase()} audio`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
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
          <div>
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
      </details>
    );
  }
);

IntakeFormSection.displayName = 'IntakeFormSection';