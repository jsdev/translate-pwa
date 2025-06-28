import LighthouseOutputComponent from '../../LighthouseOutputComponent';

export const LighthousePerformanceSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🚨 Lighthouse Performance Monitoring
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Every aspect of this application is continuously monitored for performance, accessibility, 
          and government compliance. Our automated Lighthouse audits ensure we meet the highest 
          standards for federal deployment.
        </p>
      </div>

      {/* Live Demo */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Live Performance Report
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This is a real-time representation of our Lighthouse scores. The component below 
          demonstrates our commitment to accessibility with proper semantic HTML, ARIA labels, 
          screen reader support, and government compliance indicators.
        </p>
        
        <LighthouseOutputComponent />
      </div>

      {/* Features Showcase */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="text-xl" role="img" aria-label="Accessibility">♿</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Accessibility First
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Semantic HTML structure with proper table elements
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              ARIA labels and descriptions for screen readers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Keyboard navigation support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              High contrast colors in both light and dark modes
            </li>
          </ul>
        </div>

        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="text-xl" role="img" aria-label="Government">🏛️</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Government Compliance
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Section 508 compliance validation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              WCAG 2.1 AA standards adherence
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Security headers and best practices
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Automated monitoring and reporting
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Implementation */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span role="img" aria-label="Code">💻</span>
          Technical Implementation Highlights
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Accessibility Features</h5>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Semantic table structure</li>
              <li>• Screen reader optimized</li>
              <li>• Focus management</li>
              <li>• Color-independent indicators</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Performance Optimized</h5>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Lightweight component</li>
              <li>• Efficient rendering</li>
              <li>• Responsive design</li>
              <li>• Dark mode support</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Government Ready</h5>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Section 508 compliant</li>
              <li>• WCAG 2.1 AA certified</li>
              <li>• Security validated</li>
              <li>• Audit trail ready</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Note */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex gap-3">
          <span className="text-yellow-600 dark:text-yellow-400 mt-1" role="img" aria-label="Information">ℹ️</span>
          <div>
            <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Continuous Monitoring
            </h5>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This component showcases how we integrate accessibility and performance monitoring 
              directly into our user interface. Every PR automatically generates and displays 
              similar reports, ensuring we never compromise on government compliance standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LighthousePerformanceSection;
