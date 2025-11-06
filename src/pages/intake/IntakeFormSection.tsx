import React, { forwardRef } from 'react';
import { Volume2, ChevronDown } from 'lucide-react';
import { useIntakeStore } from '../../store/intakeStore';
import { useConversationStore } from '../../store/conversationStore';
import { useAppStore } from '../../store/appStore';

interface IntakeFormSectionProps {
  searchTerm: string;
  onPlayAudio: (text: string, lang: string, phrase: { en: string; es: string; category: string }, e: React.MouseEvent) => void;
}

export const IntakeFormSection = forwardRef<HTMLDetailsElement, IntakeFormSectionProps>(
  ({ searchTerm, onPlayAudio }, ref) => {
    const { intakeData, updateIntakeData } = useIntakeStore();
    const { addConversation } = useConversationStore();
    const { showEmojis } = useAppStore();

    const handlePlayQuestion = (english: string, spanish: string, e: React.MouseEvent) => {
      e.stopPropagation();
      addConversation({
        originalText: english,
        translatedText: spanish,
        originalLang: 'en',
        targetLang: 'es',
        source: 'phrase',
        speaker: 'officer'
      });
      // Create a mock phrase object for the onPlayAudio handler
      const mockPhrase = { en: english, es: spanish, category: 'intake' };
      onPlayAudio(spanish, 'es', mockPhrase, e);
    };

    return (
      <details 
        ref={ref}
        name="intake-accordion"
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        open={searchTerm === ''}
      >
        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset text-gray-900 dark:text-white">
          <div className="flex items-center gap-3">
            {showEmojis && <span className="text-xl">📋</span>}
            <div>
              <h3 className="font-medium">Required Intake Form</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Complete essential documentation
              </p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200" />
        </summary>

        <div className="border-t border-gray-100 dark:border-gray-700 p-4 space-y-4">
          {/* Identification Status Card */}
          <div className="border-b border-gray-200 dark:border-gray-600 last:border-b-0 pb-4 last:pb-0">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Do you have any identification?</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">¿Tiene alguna identificación?</p>
                </div>
                <button
                  onClick={(e) => handlePlayQuestion(
                    "Do you have any identification?",
                    "¿Tiene alguna identificación?",
                    e
                  )}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  title="Play Spanish audio"
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
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">What is your name?</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">¿Cuál es su nombre?</p>
                </div>
                <button
                  onClick={(e) => handlePlayQuestion(
                    "What is your name?",
                    "¿Cuál es su nombre?",
                    e
                  )}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  title="Play Spanish audio"
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
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">What country are you from?</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">¿De qué país es usted?</p>
                </div>
                <button
                  onClick={(e) => handlePlayQuestion(
                    "What country are you from?",
                    "¿De qué país es usted?",
                    e
                  )}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  title="Play Spanish audio"
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
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">What is your passport number?</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">¿Cuál es su número de pasaporte?</p>
                  </div>
                  <button
                    onClick={(e) => handlePlayQuestion(
                      "What is your passport number?",
                      "¿Cuál es su número de pasaporte?",
                      e
                    )}
                    className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                    title="Play Spanish audio"
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