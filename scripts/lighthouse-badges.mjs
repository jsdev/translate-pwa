#!/usr/bin/env node

/**
 * Generate Lighthouse score badges for README
 */

import fs from 'fs';

console.log('🏆 Generating Lighthouse score badges...');

// Check if summary exists
const summaryPath = './lighthouse-results/summary.json';
if (!fs.existsSync(summaryPath)) {
  console.log('❌ No Lighthouse summary found. Run `npm run lighthouse:report` first.');
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const scores = summary.averageScores;

// Badge helper function
const generateBadge = (label, score, thresholds = { good: 90, ok: 70 }) => {
  const color = score >= thresholds.good ? 'brightgreen' : 
                score >= thresholds.ok ? 'yellow' : 'red';
  return `![${label}](https://img.shields.io/badge/${label}-${score}%25-${color}?style=flat-square)`;
};

// Special thresholds for different categories
const badges = [
  generateBadge('Performance', scores.performance, { good: 95, ok: 85 }),
  generateBadge('Accessibility', scores.accessibility, { good: 100, ok: 95 }),
  generateBadge('Best%20Practices', scores.bestPractices, { good: 95, ok: 85 }),
  generateBadge('SEO', scores.seo, { good: 95, ok: 85 }),
  generateBadge('PWA', scores.pwa, { good: 90, ok: 80 })
];

// Compliance badges
const complianceBadges = [
  `![Section 508](https://img.shields.io/badge/Section%20508-${summary.compliance.section508 ? 'Compliant' : 'Non--Compliant'}-${summary.compliance.section508 ? 'brightgreen' : 'red'}?style=flat-square)`,
  `![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1%20AA-${summary.compliance.wcag21aa ? 'Compliant' : 'Non--Compliant'}-${summary.compliance.wcag21aa ? 'brightgreen' : 'red'}?style=flat-square)`,
  `![Security](https://img.shields.io/badge/Security-${summary.compliance.security ? 'Secure' : 'Review%20Needed'}-${summary.compliance.security ? 'brightgreen' : 'yellow'}?style=flat-square)`
];

console.log('\n📊 LIGHTHOUSE SCORE BADGES');
console.log(''.padEnd(40, '='));
console.log('\nCopy these badges to your README.md:\n');

console.log('## Lighthouse Scores\n');
badges.forEach(badge => console.log(badge));

console.log('\n## Government Compliance\n');
complianceBadges.forEach(badge => console.log(badge));

console.log('\n## Overall Status\n');
const overallColor = summary.compliance.overall ? 'brightgreen' : 'yellow';
const overallText = summary.compliance.overall ? 'Government%20Ready' : 'Review%20Required';
console.log(`![Government Ready](https://img.shields.io/badge/Government%20Ready-${overallText}-${overallColor}?style=flat-square)`);

// Create a markdown file with the badges
const badgeMarkdown = `# Lighthouse Performance Report

Last updated: ${new Date(summary.timestamp).toLocaleString()}

## 📊 Lighthouse Scores

${badges.join(' ')}

## 🏛️ Government Compliance

${complianceBadges.join(' ')}

## 🎯 Overall Status

![Government Ready](https://img.shields.io/badge/Government%20Ready-${overallText}-${overallColor}?style=flat-square)

---

*Scores based on average across ${summary.routeCount} routes. Generated automatically by Lighthouse CI.*
`;

fs.writeFileSync('./lighthouse-results/badges.md', badgeMarkdown);

console.log('\n💾 Badges saved to: ./lighthouse-results/badges.md');
console.log('💡 You can copy the contents to your README.md or include the file directly.');

console.log('\n🎉 Badge generation complete!');
