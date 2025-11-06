import type { WalkthroughSection } from './WalkthroughSection';
import { OverviewSection } from './sections/OverviewSection';
import { GovernmentStandardsSection } from './sections/GovernmentStandardsSection';
import { SmartSectionsSection } from './sections/SmartSectionsSection';
import { IntelligentBehaviorSection } from './sections/IntelligentBehaviorSection';
import { FullWidthDesignSection } from './sections/FullWidthDesignSection';
import { NativeWebStandardsSection } from './sections/NativeWebStandardsSection';
import { CodeDisciplineSection } from './sections/CodeDisciplineSection';
import { AccessibilitySection } from './sections/AccessibilitySection';
import { MultilingualSection } from './sections/MultilingualSection';
import { ConsistencySection } from './sections/ConsistencySection';
import { ModularArchitectureSection } from './sections/ModularArchitectureSection';
import { TechnicalSection } from './sections/TechnicalSection';
import { AuditComplianceSection } from './sections/AuditComplianceSection';

export const walkthroughSections: WalkthroughSection[] = [
  {
    id: 'overview',
    title: 'ICE/CBP Translation Tool',
    subtitle: 'Thoughtful Design for Critical Communication',
    content: OverviewSection({})
  },
  {
    id: 'government-standards',
    title: 'Government Standards Ready',
    subtitle: 'Federal Compliance & Enterprise Security',
    content: GovernmentStandardsSection({})
  },
  {
    id: 'smart-sections',
    title: 'Smart Section Management',
    subtitle: 'Intelligent Interface Adaptation',
    content: SmartSectionsSection({})
  },
  {
    id: 'intelligent-behavior',
    title: 'Intelligent Behavior',
    subtitle: 'Anticipating User Needs',
    content: IntelligentBehaviorSection({})
  },
  {
    id: 'full-width-design',
    title: 'Full-Width Design Pattern',
    subtitle: 'Mobile-Optimized Visual Hierarchy',
    content: FullWidthDesignSection({})
  },
  {
    id: 'native-web-standards',
    title: 'Native Web Standards',
    subtitle: 'Leveraging Browser Capabilities',
    content: NativeWebStandardsSection({})
  },
  {
    id: 'code-discipline',
    title: 'Code Quality Discipline',
    subtitle: 'Semantic HTML & Component Constraints',
    content: CodeDisciplineSection({})
  },
  {
    id: 'accessibility',
    title: 'Universal Accessibility',
    subtitle: 'Inclusive Design for All Agents',
    content: AccessibilitySection({})
  },
  {
    id: 'multilingual',
    title: 'Multi-Language Architecture',
    subtitle: 'Beyond Spanish: Preparing for Diverse Scenarios',
    content: MultilingualSection({})
  },
  {
    id: 'consistency',
    title: 'Standardized Interactions',
    subtitle: 'Ensuring Consistent Communication',
    content: ConsistencySection({})
  },
  {
    id: 'modular-architecture',
    title: 'Modular Architecture',
    subtitle: 'Clean, Maintainable Code Organization',
    content: ModularArchitectureSection({})
  },
  {
    id: 'technical',
    title: 'Technical Excellence',
    subtitle: 'Modern Web Standards & Performance',
    content: TechnicalSection({})
  },
  {
    id: 'audit-compliance',
    title: 'Audit & Compliance Excellence',
    subtitle: 'Perfect Security, Performance & Accessibility Scores',
    content: AuditComplianceSection({})
  }
];