import React from 'react';

export const AuditComplianceSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Comprehensive security, performance, and accessibility compliance ensuring enterprise-grade reliability and government standards adherence.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Google Lighthouse Perfect Scores</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">100</div>
            <div className="text-sm font-medium text-green-800 dark:text-green-200">Performance</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">100</div>
            <div className="text-sm font-medium text-green-800 dark:text-green-200">Accessibility</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">100</div>
            <div className="text-sm font-medium text-green-800 dark:text-green-200">Best Practices</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">100</div>
            <div className="text-sm font-medium text-green-800 dark:text-green-200">SEO</div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Enterprise-Grade Achievement</h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Perfect 100/100 scores across all Google Lighthouse categories demonstrate production-ready quality 
            suitable for government and law enforcement deployment.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Compliance</h3>
        
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">XSS Attack Prevention</h4>
            <ul className="space-y-1 text-red-800 dark:text-red-200 text-sm">
              <li>• <strong>Content Security Policy (CSP):</strong> Comprehensive CSP headers prevent script injection</li>
              <li>• <strong>Script Source Control:</strong> Only trusted sources allowed for JavaScript execution</li>
              <li>• <strong>Inline Script Protection:</strong> Controlled inline script execution with nonce validation</li>
              <li>• <strong>Frame Ancestors:</strong> Complete prevention of iframe embedding attacks</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Origin Isolation & Clickjacking Protection</h4>
            <ul className="space-y-1 text-orange-800 dark:text-orange-200 text-sm">
              <li>• <strong>Cross-Origin-Opener-Policy (COOP):</strong> Same-origin policy isolates top-level window</li>
              <li>• <strong>X-Frame-Options:</strong> DENY directive prevents all iframe embedding</li>
              <li>• <strong>Frame Ancestors:</strong> CSP directive provides additional clickjacking protection</li>
              <li>• <strong>Window Isolation:</strong> Prevents malicious sites from accessing app context</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Additional Security Headers</h4>
            <ul className="space-y-1 text-purple-800 dark:text-purple-200 text-sm">
              <li>• <strong>HSTS:</strong> Strict-Transport-Security forces HTTPS connections</li>
              <li>• <strong>Content Type Protection:</strong> X-Content-Type-Options prevents MIME sniffing</li>
              <li>• <strong>Referrer Policy:</strong> Strict origin control for cross-site requests</li>
              <li>• <strong>Permissions Policy:</strong> Granular control over browser features</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Accessibility Excellence</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">WCAG 2.1 AA Compliance</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Semantic HTML structure throughout</li>
              <li>• Proper ARIA labels and landmarks</li>
              <li>• High contrast ratios (4.5:1 minimum)</li>
              <li>• Keyboard navigation support</li>
              <li>• Screen reader compatibility</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Universal Design</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Large touch targets (44px minimum)</li>
              <li>• Clear focus indicators</li>
              <li>• Multi-modal communication support</li>
              <li>• Responsive design for all devices</li>
              <li>• Audio and visual feedback</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Performance Optimization</h3>
        
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Core Web Vitals Excellence</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{'< 100ms'}</div>
                <div className="text-xs text-green-800 dark:text-green-200">First Input Delay</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{'< 0.1'}</div>
                <div className="text-xs text-green-800 dark:text-green-200">Cumulative Layout Shift</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{'< 1.2s'}</div>
                <div className="text-xs text-green-800 dark:text-green-200">Largest Contentful Paint</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Bundle Optimization</h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Tree-shaking eliminates unused code</li>
                <li>• Minimal dependencies ({'< 500KB total'})</li>
                <li>• Code splitting for optimal loading</li>
                <li>• Efficient asset compression</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Runtime Performance</h4>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Optimized React rendering</li>
                <li>• Efficient state management</li>
                <li>• Native browser features utilized</li>
                <li>• Minimal JavaScript execution</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Government Standards Compliance</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Section 508 Compliance:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Full accessibility for federal agency deployment</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">OWASP Security Standards:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Comprehensive protection against top 10 vulnerabilities</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">NIST Cybersecurity Framework:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Aligned with federal cybersecurity requirements</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Privacy by Design:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Local-first data storage with optional cloud sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};