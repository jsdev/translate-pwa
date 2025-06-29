import React from 'react';
import { User, UserCheck } from 'lucide-react';

export type Speaker = 'officer' | 'detained';

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
      <legend className="sr-only">Select who is speaking</legend>
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        <span aria-hidden="true" className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          Speaker
        </span>
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1" role="radiogroup" aria-labelledby="speaker-group-label">
          <div className="relative">
            <label
              htmlFor="speaker-officer"
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                selectedSpeaker === 'officer'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <input
                type="radio"
                id="speaker-officer"
                name="speaker"
                value="officer"
                checked={selectedSpeaker === 'officer'}
                onChange={() => onSpeakerChange('officer')}
                className="absolute opacity-0 w-full h-full cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
              />
              <UserCheck className="w-4 h-4" aria-hidden="true" />
              Officer
            </label>
          </div>
          <div className="relative">
            <label
              htmlFor="speaker-detainee"
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                selectedSpeaker === 'detained'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <input
                type="radio"
                id="speaker-detainee"
                name="speaker"
                value="detained"
                checked={selectedSpeaker === 'detained'}
                onChange={() => onSpeakerChange('detained')}
                className="absolute opacity-0 w-full h-full cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
              />
              <User className="w-4 h-4" aria-hidden="true" />
              Detainee
            </label>
          </div>
        </div>
      </div>
    </fieldset>
  );
};