import React, { useState } from 'react';
import { WalkthroughSectionComponent } from './walkthrough/WalkthroughSection';
import { WalkthroughNavigation } from './walkthrough/WalkthroughNavigation';
import { walkthroughSections } from './walkthrough/walkthroughSections';

export const DesktopInfoPanel: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const goToNext = () => {
    if (currentSection < walkthroughSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const goToOverview = () => {
    setCurrentSection(0);
  };

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
  };

  return (
    <div className="hidden lg:block flex-1 max-w-2xl h-full">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm h-full flex flex-col border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <WalkthroughNavigation
          sections={walkthroughSections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          onNext={goToNext}
          onPrevious={goToPrevious}
          onGoToOverview={goToOverview}
        />
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto prevent-bounce p-6">
          <WalkthroughSectionComponent section={walkthroughSections[currentSection]} />
        </div>
      </div>
    </div>
  );
};