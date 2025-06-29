import { Smartphone, Monitor, Maximize2, Layout } from 'lucide-react';

export const MobileDesignSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Engineered for mobile-first critical communication scenarios
        </p>
      </div>

      <div className="grid gap-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Maximize2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Maximum Screen Real Estate</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Eliminated unnecessary margins and padding. Every pixel counts in critical situations where officers need maximum text visibility and touch targets.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Layout className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Full-Screen Routes Over Modals</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Chose dedicated pages over mobile modals for better focus, accessibility, and reduced cognitive load during high-stress situations.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">System Theme Default</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Respects device preferences automatically. Dark mode for low-light operations, light mode for daylight scenarios - no manual switching needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Design Philosophy</h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Every interface decision prioritizes speed, clarity, and accessibility in mission-critical contexts where seconds matter.
        </p>
      </div>
    </div>
  );
};
