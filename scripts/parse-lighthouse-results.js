#!/usr/bin/env node

const fs = require('fs');

if (process.argv.length < 3) {
  console.log('❌ Error: Please provide a Lighthouse results file path');
  process.exit(1);
}

const resultsFile = process.argv[2];

try {
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  
  // Handle different Lighthouse result structures
  let scores;
  if (results.lhr && results.lhr.categories) {
    scores = results.lhr.categories;
  } else if (results.categories) {
    scores = results.categories;
  } else if (Array.isArray(results) && results[0] && results[0].lhr) {
    scores = results[0].lhr.categories;
  } else if (Array.isArray(results) && results[0] && results[0].categories) {
    scores = results[0].categories;
  } else {
    console.log('⚠️ **Unable to parse Lighthouse results**');
    console.log('');
    console.log('The Lighthouse results file was found but has an unexpected structure.');
    console.log('This may be due to a Lighthouse CI configuration issue or network problems.');
    console.log('');
    console.log('**Debug information:**');
    console.log('- File found: ' + resultsFile);
    console.log('- Top-level keys: ' + Object.keys(results).join(', '));
    if (results.lhr) console.log('- LHR keys: ' + Object.keys(results.lhr).join(', '));
    console.log('');
    console.log('Please check the uploaded artifacts for detailed Lighthouse results.');
    process.exit(0);
  }
  
  const performance = Math.round((scores.performance?.score || 0) * 100);
  const accessibility = Math.round((scores.accessibility?.score || 0) * 100);
  const bestPractices = Math.round((scores['best-practices']?.score || 0) * 100);
  const seo = Math.round((scores.seo?.score || 0) * 100);
  const pwa = Math.round((scores.pwa?.score || 0) * 100);

  const getEmoji = (score) => score >= 90 ? '🟢' : score >= 70 ? '🟡' : '🔴';
  const getStatus = (score, category) => {
    if (category === 'accessibility' && score >= 100) return '✅ WCAG Compliant';
    if (category === 'best-practices' && score >= 100) return '✅ Secure';
    if (score >= 95) return '✅ Excellent';
    if (score >= 90) return '⚠️ Good';
    return '❌ Needs Improvement';
  };
  
  console.log('| Category | Score | Status | Compliance |');
  console.log('|----------|-------|--------|------------|');
  console.log(`| ${getEmoji(performance)} **Performance** | **${performance}/100** | ${getStatus(performance)} | ${performance >= 95 ? 'Government Ready' : 'Review Needed'} |`);
  console.log(`| ${getEmoji(accessibility)} **Accessibility** | **${accessibility}/100** | ${getStatus(accessibility, 'accessibility')} | ${accessibility >= 100 ? 'Section 508 ✅' : 'Section 508 ❌'} |`);
  console.log(`| ${getEmoji(bestPractices)} **Best Practices** | **${bestPractices}/100** | ${getStatus(bestPractices, 'best-practices')} | ${bestPractices >= 100 ? 'Security ✅' : 'Security ⚠️'} |`);
  console.log(`| ${getEmoji(seo)} **SEO** | **${seo}/100** | ${getStatus(seo)} | ${seo >= 95 ? 'Optimized ✅' : 'Review Needed'} |`);
  console.log(`| ${getEmoji(pwa)} **PWA** | **${pwa}/100** | ${getStatus(pwa)} | ${pwa >= 90 ? 'App-Ready ✅' : 'Basic PWA'} |`);
  
  // Overall compliance status
  const isCompliant = accessibility >= 100 && bestPractices >= 95 && performance >= 90;
  console.log('');
  console.log(`**🏛️ Government Compliance:** ${isCompliant ? '✅ FULLY COMPLIANT' : '⚠️ REVIEW REQUIRED'}`);
  
  if (!isCompliant) {
    console.log('');
    console.log('**⚠️ Compliance Issues:**');
    if (accessibility < 100) console.log('- Accessibility score below 100 (Section 508 requirement)');
    if (bestPractices < 95) console.log('- Security/Best Practices score below 95');
    if (performance < 90) console.log('- Performance score below government standards');
  }
  
} catch (error) {
  console.log('❌ Error parsing Lighthouse results:', error.message);
  console.log('Please check the Lighthouse CI configuration and output format.');
}
