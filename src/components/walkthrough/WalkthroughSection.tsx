import React from 'react';

export interface WalkthroughSection {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

interface WalkthroughSectionProps {
  section: WalkthroughSection;
}

export const WalkthroughSectionComponent: React.FC<WalkthroughSectionProps> = ({ section }) => {
  return (
    <div className="space-y-6">
      {section.content}
    </div>
  );
};