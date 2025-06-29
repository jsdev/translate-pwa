import React from 'react';
import type { WalkthroughSection } from './WalkthroughSection';
import { OverviewSection } from './sections/OverviewSection';
import { AccessibilitySection } from './sections/AccessibilitySection';

export const walkthroughSections: WalkthroughSection[] = [
  {
    id: 'overview',
    title: 'DHS Translation Tool',
    subtitle: 'Professional Communication for Critical Situations',
    content: React.createElement(OverviewSection)
  },
  {
    id: 'accessibility',
    title: 'Universal Accessibility',
    subtitle: 'Compliant, Inclusive Design',
    content: React.createElement(AccessibilitySection)
  }
];