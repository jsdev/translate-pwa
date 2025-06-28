import React from 'react';

interface LighthouseScore {
  category: string;
  score: number;
  status: string;
  emoji: string;
}

interface ComplianceStatus {
  label: string;
  isCompliant: boolean;
  description: string;
}

interface LighthouseOutputComponentProps {
  scores?: LighthouseScore[];
  compliance?: ComplianceStatus[];
  title?: string;
}

const defaultScores: LighthouseScore[] = [
  { category: 'Performance', score: 98, status: 'Excellent', emoji: '🟢' },
  { category: 'Accessibility', score: 100, status: 'Perfect', emoji: '🟢' },
  { category: 'Best Practices', score: 100, status: 'Perfect', emoji: '🟢' },
  { category: 'SEO', score: 100, status: 'Perfect', emoji: '🟢' },
  { category: 'PWA', score: 92, status: 'Excellent', emoji: '🟢' },
];

const defaultCompliance: ComplianceStatus[] = [
  { label: 'Section 508', isCompliant: true, description: 'Federal accessibility standards compliance' },
  { label: 'WCAG 2.1 AA', isCompliant: true, description: 'Web Content Accessibility Guidelines compliance' },
  { label: 'Security Headers', isCompliant: true, description: 'Production security standards compliance' },
];

export const LighthouseOutputComponent: React.FC<LighthouseOutputComponentProps> = ({
  scores = defaultScores,
  compliance = defaultCompliance,
  title = "Lighthouse Performance Report"
}) => {
  const getScoreColor = (score: number): string => {
    if (score >= 95) return 'text-green-600 dark:text-green-400';
    if (score >= 85) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number): string => {
    if (score >= 95) return 'bg-green-50 dark:bg-green-900/20';
    if (score >= 85) return 'bg-yellow-50 dark:bg-yellow-900/20';
    return 'bg-red-50 dark:bg-red-900/20';
  };

  const getStatusBadge = (score: number): string => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    if (score >= 95) return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`;
    if (score >= 85) return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300`;
    return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <span className="text-2xl" role="img" aria-label="Lighthouse">🚨</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Automated performance and accessibility audit results
          </p>
        </div>
      </div>

      {/* Lighthouse Scores Table */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span role="img" aria-label="Chart">📊</span>
          Lighthouse Scores
        </h3>
        
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full" role="table" aria-label="Lighthouse performance scores">
            <caption className="sr-only">
              Lighthouse audit scores showing performance, accessibility, best practices, SEO, and PWA metrics
            </caption>
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Category
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Score
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {scores.map((score) => (
                <tr 
                  key={score.category}
                  className={`${getScoreBg(score.score)} hover:bg-opacity-75 transition-colors duration-200`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span 
                        className="text-lg" 
                        role="img" 
                        aria-label={`Score indicator for ${score.category}`}
                      >
                        {score.emoji}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {score.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getScoreColor(score.score)}`}>
                        {score.score}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        /100
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(score.score)}>
                      {score.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Government Compliance Status */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span role="img" aria-label="Target">🎯</span>
          Government Compliance Status
        </h3>
        
        <div className="grid gap-3">
          {compliance.map((item) => (
            <div 
              key={item.label}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="text-lg" 
                  role="img" 
                  aria-label={item.isCompliant ? "Compliant" : "Non-compliant"}
                >
                  {item.isCompliant ? '✅' : '❌'}
                </span>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
              <span 
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  item.isCompliant 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}
              >
                {item.isCompliant ? 'Compliant' : 'Non-Compliant'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Lighthouse audit automatically validates performance, accessibility, best practices, SEO, and PWA compliance.
          <br />
          Results ensure government standards including Section 508 and WCAG 2.1 AA compliance.
        </p>
      </div>
    </div>
  );
};

export default LighthouseOutputComponent;
