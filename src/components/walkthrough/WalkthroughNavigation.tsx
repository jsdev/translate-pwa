import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import type { WalkthroughSection } from './WalkthroughSection';

interface WalkthroughNavigationProps {
  sections: WalkthroughSection[];
  currentSection: number;
  onSectionChange: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onGoToOverview: () => void;
}

export const WalkthroughNavigation: React.FC<WalkthroughNavigationProps> = ({
  sections,
  currentSection,
  onSectionChange,
  onNext,
  onPrevious,
  onGoToOverview
}) => {
  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-600 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {currentSection > 0 && (
              <button
                onClick={onGoToOverview}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                title="Back to overview"
              >
                <Home className="w-4 h-4" />
              </button>
            )}
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Section {currentSection + 1} of {sections.length}
            </div>
          </div>
          <div className="flex gap-1">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => onSectionChange(index)}
                className={`relative w-11 h-11 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 group ${
                  index === currentSection 
                    ? 'bg-transparent' 
                    : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={`Go to ${sections[index].title}`}
                aria-label={`Go to ${sections[index].title}`}
                aria-current={index === currentSection ? 'true' : undefined}
              >
                <span
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none ${
                    index === currentSection
                      ? 'bg-gray-600 dark:bg-gray-400'
                      : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {sections[currentSection].title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          {sections[currentSection].subtitle}
        </p>
      </div>

      {/* Footer Navigation */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={onPrevious}
            disabled={currentSection === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 ${
              currentSection === 0
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {currentSection < sections.length - 1 ? 'Next:' : 'End of walkthrough'}
            </div>
            {currentSection < sections.length - 1 && (
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {sections[currentSection + 1].title}
              </div>
            )}
          </div>

          <button
            onClick={onNext}
            disabled={currentSection === sections.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 ${
              currentSection === sections.length - 1
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};