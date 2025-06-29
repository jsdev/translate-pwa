import React from 'react';
import { Volume2 } from 'lucide-react';

interface PlayTranslationCardProps {
  title: string;
  subtitle: string;
  onPlay: (e: React.MouseEvent) => void;
  className?: string;
  id?: string; // Add optional id prop for accessibility associations
}

export const PlayTranslationCard: React.FC<PlayTranslationCardProps> = ({
  title,
  subtitle,
  onPlay,
  className = '',
  id
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Find the play button within the card and trigger its click
    const playButton = e.currentTarget.querySelector('[data-play-button]') as HTMLButtonElement;
    if (playButton) {
      playButton.click();
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(e);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`w-full p-4 bg-transparent cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-4">
          <h4 id={id} className="font-medium text-gray-900 dark:text-gray-100 mb-1">
            {title}
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {subtitle}
          </p>
        </div>
        <button
          data-play-button
          onClick={handlePlayClick}
          className="flex-shrink-0 p-3 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          title="Play audio"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
