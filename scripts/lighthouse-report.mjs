#!/usr/bin/env node

/**
 * Generate a comprehensive Lighthouse report with scoring breakdown
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

console.log('🚨 Generating comprehensive Lighthouse performance report...\n');

// Check if build exists
if (!fs.existsSync('./dist')) {
  console.log('❌ No build found. Running build first...');
  execSync('npm run build', { stdio: 'inherit' });
}

console.log('🚀 Starting preview server...');

// Start preview server in background
const serverProcess = execSync('npm run preview &', { stdio: 'pipe' });

// Wait for server to be ready
function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      execSync(`curl -f -s ${BASE_URL} > /dev/null`, { stdio: 'ignore' });
      console.log('✅ Preview server is ready');
      return true;
    } catch {
      console.log(`   Waiting for server... (${i + 1}/${maxAttempts})`);
      execSync('sleep 2');
    }
  }
  console.log('❌ Server failed to start');
  return false;
}

if (!waitForServer()) {
  process.exit(1);
}

try {
  console.log('\n🔍 Running Lighthouse audit...');
  
  // Run Lighthouse CI
  execSync('npx lhci autorun --config=./lighthouserc.cjs', { stdio: 'inherit' });
  
  // Find the latest results
  const resultsDir = './lighthouse-results';
  if (!fs.existsSync(resultsDir)) {
    throw new Error('No Lighthouse results found');
  }
  
  const resultFiles = fs.readdirSync(resultsDir)
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      file,
      path: path.join(resultsDir, file),
      mtime: fs.statSync(path.join(resultsDir, file)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);
  
  if (resultFiles.length === 0) {
    throw new Error('No Lighthouse JSON results found');
  }
  
  console.log('\n📊 LIGHTHOUSE PERFORMANCE REPORT');
  console.log(''.padEnd(50, '='));
  
  // Process each result file (one per route)
  const allScores = {
    performance: [],
    accessibility: [],
    bestPractices: [],
    seo: [],
    pwa: []
  };
  
  resultFiles.forEach((resultFile, index) => {
    const results = JSON.parse(fs.readFileSync(resultFile.path, 'utf8'));
    const url = results.finalUrl || results.requestedUrl;
    const route = url.replace(BASE_URL, '') || '/';
    
    const scores = results.categories;
    const performance = Math.round((scores.performance?.score || 0) * 100);
    const accessibility = Math.round((scores.accessibility?.score || 0) * 100);
    const bestPractices = Math.round((scores['best-practices']?.score || 0) * 100);
    const seo = Math.round((scores.seo?.score || 0) * 100);
    const pwa = Math.round((scores.pwa?.score || 0) * 100);
    
    // Collect for averages
    allScores.performance.push(performance);
    allScores.accessibility.push(accessibility);
    allScores.bestPractices.push(bestPractices);
    allScores.seo.push(seo);
    allScores.pwa.push(pwa);
    
    const getScoreColor = (score) => {
      if (score >= 90) return '🟢';
      if (score >= 70) return '🟡';
      return '🔴';
    };
    
    console.log(`\n📄 Route: ${route}`);
    console.log(`   ${getScoreColor(performance)} Performance:    ${performance}/100`);
    console.log(`   ${getScoreColor(accessibility)} Accessibility:  ${accessibility}/100`);
    console.log(`   ${getScoreColor(bestPractices)} Best Practices: ${bestPractices}/100`);
    console.log(`   ${getScoreColor(seo)} SEO:            ${seo}/100`);
    console.log(`   ${getScoreColor(pwa)} PWA:            ${pwa}/100`);
  });
  
  // Calculate averages
  const avgPerformance = Math.round(allScores.performance.reduce((a, b) => a + b, 0) / allScores.performance.length);
  const avgAccessibility = Math.round(allScores.accessibility.reduce((a, b) => a + b, 0) / allScores.accessibility.length);
  const avgBestPractices = Math.round(allScores.bestPractices.reduce((a, b) => a + b, 0) / allScores.bestPractices.length);
  const avgSeo = Math.round(allScores.seo.reduce((a, b) => a + b, 0) / allScores.seo.length);
  const avgPwa = Math.round(allScores.pwa.reduce((a, b) => a + b, 0) / allScores.pwa.length);
  
  console.log('\n🎯 OVERALL AVERAGES');
  console.log(''.padEnd(30, '-'));
  console.log(`Performance:     ${avgPerformance}/100 ${avgPerformance >= 95 ? '✅' : avgPerformance >= 90 ? '⚠️' : '❌'}`);
  console.log(`Accessibility:   ${avgAccessibility}/100 ${avgAccessibility >= 100 ? '✅' : '❌'}`);
  console.log(`Best Practices:  ${avgBestPractices}/100 ${avgBestPractices >= 100 ? '✅' : avgBestPractices >= 95 ? '⚠️' : '❌'}`);
  console.log(`SEO:             ${avgSeo}/100 ${avgSeo >= 95 ? '✅' : '❌'}`);
  console.log(`PWA:             ${avgPwa}/100 ${avgPwa >= 90 ? '✅' : avgPwa >= 80 ? '⚠️' : '❌'}`);
  
  console.log('\n🏛️ GOVERNMENT COMPLIANCE STATUS');
  console.log(''.padEnd(40, '-'));
  
  const isAccessibilityCompliant = avgAccessibility >= 100;
  const isSecurityCompliant = avgBestPractices >= 95;
  const isPerformanceReady = avgPerformance >= 90;
  
  console.log(`Section 508 Compliance:    ${isAccessibilityCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}`);
  console.log(`WCAG 2.1 AA Compliance:   ${isAccessibilityCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}`);
  console.log(`Security Standards:        ${isSecurityCompliant ? '✅ SECURE' : '⚠️ REVIEW NEEDED'}`);
  console.log(`Performance Standards:     ${isPerformanceReady ? '✅ GOVERNMENT READY' : '⚠️ OPTIMIZATION NEEDED'}`);
  
  const isFullyCompliant = isAccessibilityCompliant && isSecurityCompliant && isPerformanceReady;
  console.log(`\nOVERALL STATUS: ${isFullyCompliant ? '✅ FULLY COMPLIANT' : '⚠️ COMPLIANCE ISSUES DETECTED'}`);
  
  if (!isFullyCompliant) {
    console.log('\n🔧 RECOMMENDATIONS:');
    if (!isAccessibilityCompliant) {
      console.log('   • Review accessibility: color contrast, ARIA labels, keyboard navigation');
    }
    if (!isSecurityCompliant) {
      console.log('   • Review security headers and best practices');
    }
    if (!isPerformanceReady) {
      console.log('   • Optimize performance: images, bundle size, loading speed');
    }
  }
  
  console.log('\n📁 Detailed reports available in: ./lighthouse-results/');
  console.log('💡 Open any .html file in the lighthouse-results directory for detailed analysis');
  
  // Create a summary JSON file
  const summary = {
    timestamp: new Date().toISOString(),
    averageScores: {
      performance: avgPerformance,
      accessibility: avgAccessibility,
      bestPractices: avgBestPractices,
      seo: avgSeo,
      pwa: avgPwa
    },
    compliance: {
      section508: isAccessibilityCompliant,
      wcag21aa: isAccessibilityCompliant,
      security: isSecurityCompliant,
      performance: isPerformanceReady,
      overall: isFullyCompliant
    },
    routeCount: resultFiles.length
  };
  
  fs.writeFileSync('./lighthouse-results/summary.json', JSON.stringify(summary, null, 2));
  console.log('\n💾 Summary saved to: ./lighthouse-results/summary.json');
  
} catch (error) {
  console.error('❌ Error running Lighthouse audit:', error.message);
  process.exit(1);
} finally {
  // Clean up server
  try {
    execSync('pkill -f "vite.*preview"', { stdio: 'ignore' });
    console.log('\n🧹 Cleaned up preview server');
  } catch (e) {
    // Server might already be stopped
  }
}

console.log('\n🎉 Lighthouse audit complete!');
