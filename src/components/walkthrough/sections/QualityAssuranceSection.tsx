import { Shield, CheckCircle, BarChart3, FileCheck } from 'lucide-react';

export const QualityAssuranceSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Audit-driven development ensuring highest compliance standards
        </p>
      </div>

      <div className="grid gap-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">ESLint + TypeScript Strict Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Zero tolerance for linting errors. Strict TypeScript configuration catches issues at compile-time, preventing runtime failures in critical situations.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Lighthouse CI Automation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Automated performance, accessibility, and SEO audits on every deployment. Maintains 95+ scores across all verticals with detailed reporting.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">WCAG 2.1 AA Compliance</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Automated accessibility testing ensures compliance with federal accessibility standards. Screen reader optimized with proper ARIA attributes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Quality Metrics</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-green-800 dark:text-green-200">Performance: 95+</div>
            <div className="text-green-700 dark:text-green-300">Sub-second load times</div>
          </div>
          <div>
            <div className="font-medium text-green-800 dark:text-green-200">Accessibility: 100</div>
            <div className="text-green-700 dark:text-green-300">WCAG 2.1 AA compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
};
