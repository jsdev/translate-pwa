import React from 'react';
import type { WalkthroughSection } from './WalkthroughSection';
import { OverviewSection } from './sections/OverviewSection';
import { MobileDesignSection } from './sections/MobileDesignSection';
import { TechnicalArchitectureSection } from './sections/TechnicalArchitectureSection';
import { QualityAssuranceSection } from './sections/QualityAssuranceSection';
import { AccessibilitySection } from './sections/AccessibilitySection';
import { ComplianceSection } from './sections/ComplianceSection';

export const walkthroughSections: WalkthroughSection[] = [
  {
    id: 'overview',
    title: 'DHS Translation Tool',
    subtitle: 'Professional Communication for Critical Situations',
    content: React.createElement(OverviewSection)
  },
  {
    id: 'mobile-design',
    title: 'Mobile-First Engineering',
    subtitle: 'Maximized Space, Minimized Friction',
    content: React.createElement(MobileDesignSection)
  },
  {
    id: 'technical-architecture',
    title: 'Performance Architecture',
    subtitle: 'Built for Mission-Critical Reliability',
    content: React.createElement(TechnicalArchitectureSection)
  },
  {
    id: 'quality-assurance',
    title: 'Audit-Driven Quality',
    subtitle: 'Zero-Tolerance for Failure',
    content: React.createElement(QualityAssuranceSection)
  },
  {
    id: 'accessibility',
    title: 'Universal Accessibility',
    subtitle: 'Compliant, Inclusive Design',
    content: React.createElement(AccessibilitySection)
  },
  {
    id: 'compliance',
    title: 'Federal Compliance',
    subtitle: 'Exceeding Standards Across All Verticals',
    content: React.createElement(ComplianceSection)
  }
];