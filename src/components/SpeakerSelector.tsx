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
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Speaker:</span>
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => onSpeakerChange('officer')}
          className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            selectedSpeaker === 'officer'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Officer
        </button>
        <button
          onClick={() => onSpeakerChange('detained')}
          className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            selectedSpeaker === 'detained'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <User className="w-4 h-4" />
          Detained
        </button>
      </div>
    </div>
  );
};