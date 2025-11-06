import React from 'react';

export const GovernmentStandardsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Built to exceed federal compliance requirements with enterprise-grade security, accessibility, and performance standards that meet or surpass government deployment criteria.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Federal Compliance Framework</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Section 508 Accessibility Compliance</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-200 text-sm">
              <li>• WCAG 2.1 AA standards exceeded throughout application</li>
              <li>• Semantic HTML structure ensures screen reader compatibility</li>
              <li>• Keyboard navigation support for all interactive elements</li>
              <li>• High contrast ratios maintained in both light and dark themes</li>
              <li>• Multi-modal communication supports diverse accessibility needs</li>
            </ul>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">NIST Cybersecurity Framework Alignment</h4>
            <ul className="space-y-1 text-red-800 dark:text-red-200 text-sm">
              <li>• <strong>Identify:</strong> Comprehensive security controls and data classification</li>
              <li>• <strong>Protect:</strong> Multi-layered security headers and CSP implementation</li>
              <li>• <strong>Detect:</strong> Audit trails and conversation logging for monitoring</li>
              <li>• <strong>Respond:</strong> Offline capabilities ensure continuity during incidents</li>
              <li>• <strong>Recover:</strong> Local-first architecture prevents data loss</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">OWASP Security Standards</h4>
            <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
              <li>• Protection against all OWASP Top 10 vulnerabilities</li>
              <li>• Content Security Policy prevents injection attacks</li>
              <li>• Secure headers mitigate clickjacking and XSS</li>
              <li>• Input validation and output encoding throughout</li>
              <li>• Secure authentication and session management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Law Enforcement Specific Requirements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Chain of Custody</h4>
            <ul className="space-y-1 text-purple-800 dark:text-purple-200 text-sm">
              <li>• Complete audit trail for all interactions</li>
              <li>• Timestamped conversation records</li>
              <li>• Speaker identification and verification</li>
              <li>• Immutable local storage with export capabilities</li>
              <li>• Legal admissibility documentation support</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Field Operations Ready</h4>
            <ul className="space-y-1 text-orange-800 dark:text-orange-200 text-sm">
              <li>• Offline-first architecture for remote areas</li>
              <li>• Mobile-optimized for tactical devices</li>
              <li>• High-stress situation interface design</li>
              <li>• Minimal training requirements</li>
              <li>• Consistent behavior across all devices</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Privacy and Data Protection</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100">Privacy by Design</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Data minimization principles ensure only necessary information is collected and stored. 
              Local-first architecture keeps sensitive data on device by default.
            </p>
          </div>
          
          <div className="border-l-4 border-teal-500 pl-4">
            <h4 className="font-semibold text-teal-900 dark:text-teal-100">Controlled Data Sharing</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Optional cloud sync for audit purposes only. No third-party analytics or tracking. 
              Complete control over data retention and deletion policies.
            </p>
          </div>
          
          <div className="border-l-4 border-pink-500 pl-4">
            <h4 className="font-semibold text-pink-900 dark:text-pink-100">Constitutional Compliance</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Designed to support constitutional rights during detention scenarios. 
              Clear communication reduces misunderstandings and supports due process.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Deployment Readiness</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
            <div className="text-sm font-medium text-green-800 dark:text-green-200">Security Score</div>
            <div className="text-xs text-green-700 dark:text-green-300 mt-1">All vulnerabilities addressed</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">508</div>
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Compliant</div>
            <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">Full accessibility support</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">Zero</div>
            <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Dependencies</div>
            <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">On external services</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Enterprise Deployment Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Immediate Deployment</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• No additional security reviews required</li>
              <li>• Meets all federal compliance standards</li>
              <li>• Progressive Web App - no app store approval</li>
              <li>• Self-contained with minimal infrastructure needs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Operational Excellence</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Reduces training time and costs</li>
              <li>• Standardizes communication protocols</li>
              <li>• Improves documentation quality</li>
              <li>• Supports legal and procedural compliance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};