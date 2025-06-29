import { Award, Globe, Users, Target } from 'lucide-react';

export const ComplianceSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
          <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Exceeding federal standards across all compliance verticals
        </p>
      </div>

      <div className="grid gap-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Section 508 Compliance</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Full keyboard navigation, screen reader compatibility, and proper color contrast ratios. Tested with NVDA, JAWS, and VoiceOver.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Multi-Language Architecture</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Unicode-compliant text rendering, RTL language support, and culturally appropriate phrase collections for diverse communities.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Audit Trail & Accountability</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Comprehensive logging of all translation interactions for compliance reporting and quality assurance review.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Compliance Standards Met</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-amber-800 dark:text-amber-200">WCAG 2.1 AA</div>
            <div className="text-amber-700 dark:text-amber-300">Accessibility</div>
          </div>
          <div>
            <div className="font-medium text-amber-800 dark:text-amber-200">Section 508</div>
            <div className="text-amber-700 dark:text-amber-300">Federal Compliance</div>
          </div>
        </div>
      </div>
    </div>
  );
};
