import React from 'react';
import { User, UserCheck } from 'lucide-react';

export type Speaker = 'officer' | 'detainee';

interface SpeakerSelectorProps {
  selectedSpeaker: Speaker;
  onSpeakerChange: (speaker: Speaker) => void;
}

export const SpeakerSelector: React.FC<SpeakerSelectorProps> = ({
  selectedSpeaker,
  onSpeakerChange
}) => {
  return (
    <fieldset className="mb-4">
      <legend className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Speaker</legend>
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1" role="radiogroup">
        <div className="relative">
          <input
            type="radio"
            id="speaker-officer"
            name="speaker"
            value="officer"
            checked={selectedSpeaker === 'officer'}
            onChange={() => onSpeakerChange('officer')}
            className="sr-only"
          />
          <label
            htmlFor="speaker-officer"
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 ${
              selectedSpeaker === 'officer'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Officer
          </label>
        </div>
        <div className="relative">
          <input
            type="radio"
            id="speaker-detainee"
            name="speaker"
            value="detainee"
            checked={selectedSpeaker === 'detainee'}
            onChange={() => onSpeakerChange('detainee')}
            className="sr-only"
          />
          <label
            htmlFor="speaker-detainee"
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 ${
              selectedSpeaker === 'detainee'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <User className="w-4 h-4" />
            Detainee
          </label>
        </div>
      </div>
    </fieldset>
  );
};