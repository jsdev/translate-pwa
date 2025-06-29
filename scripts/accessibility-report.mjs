#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

// Import routes directly - these should match src/routes.ts
const appRoutes = [
  '/',
  '/intake',
  '/phrases',
  '/record',
  '/translate',
  '/conversations',
  '/settings',
  '/voice-diagnostics',
];

const PORT = 8080;
const BASE_URL = `http://localhost:${PORT}`;

console.log('📊 Generating accessibility reports for all app routes...\n');

// Wait for server to be ready
function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      execSync(`curl -f -s ${BASE_URL} > /dev/null`, { stdio: 'ignore' });
      console.log('✅ Server is ready');
      return true;
    } catch {
      console.log(`   Waiting for server... (${i + 1}/${maxAttempts})`);
      execSync('sleep 1');
    }
  }
  console.log('❌ Server failed to start');
  return false;
}

if (!waitForServer()) {
  process.exit(1);
}

const allReports = [];

for (const route of appRoutes) {
  const url = `${BASE_URL}${route}`;
  const reportFileName = `axe-report${route.replace(/\//g, '_') || '_root'}.json`;
  
  console.log(`\n🔍 Testing: ${route}`);
  
  try {
    const result = execSync(
      `npx axe ${url} --tags wcag2a,wcag2aa,section508 --save ${reportFileName}`,
      { encoding: 'utf8', stdio: 'pipe', timeout: 45000 }
    );
    
    // Read the generated report
    if (fs.existsSync(reportFileName)) {
      const report = JSON.parse(fs.readFileSync(reportFileName, 'utf8'));
      allReports.push({
        route,
        url,
        violations: report.violations || [],
        passes: report.passes || [],
        incomplete: report.incomplete || [],
        inapplicable: report.inapplicable || []
      });
      
      const violationCount = report.violations?.length || 0;
      if (violationCount === 0) {
        console.log(`   ✅ No violations found`);
      } else {
        console.log(`   ❌ ${violationCount} violation(s) found`);
        report.violations.forEach((violation, i) => {
          console.log(`      ${i + 1}. ${violation.id}: ${violation.description}`);
        });
      }
      console.log(`   📄 Report saved: ${reportFileName}`);
    }
  } catch (error) {
    console.log(`   ❌ Error testing ${route}: ${error.message}`);
    allReports.push({
      route,
      url,
      violations: [{ id: 'CONNECTION_ERROR', description: 'Failed to connect to server or load page' }],
      error: error.message
    });
  }
}

// Generate a summary report
const summaryReport = {
  timestamp: new Date().toISOString(),
  totalRoutes: appRoutes.length,
  reports: allReports,
  summary: {
    totalViolations: allReports.reduce((sum, report) => sum + (report.violations?.length || 0), 0),
    routesWithViolations: allReports.filter(report => (report.violations?.length || 0) > 0).length,
    routesPassed: allReports.filter(report => (report.violations?.length || 0) === 0 && !report.error).length,
    routesWithErrors: allReports.filter(report => report.error).length
  }
};

fs.writeFileSync('axe-summary-report.json', JSON.stringify(summaryReport, null, 2));

console.log('\n📋 Accessibility Test Summary:');
console.log('===============================');
allReports.forEach(({ route, violations, error }) => {
  if (error) {
    console.log(`❌ ${route.padEnd(15)} FAILED (Error: ${error.split('\n')[0]})`);
  } else {
    const emoji = violations.length === 0 ? '✅' : '❌';
    const status = violations.length === 0 ? 'PASSED' : 'FAILED';
    console.log(`${emoji} ${route.padEnd(15)} ${status} (${violations.length} violations)`);
  }
});

console.log(`\n📊 Overall Results:`);
console.log(`   Total routes: ${summaryReport.totalRoutes}`);
console.log(`   Passed: ${summaryReport.summary.routesPassed}`);
console.log(`   Failed: ${summaryReport.summary.routesWithViolations + summaryReport.summary.routesWithErrors}`);
console.log(`   - With violations: ${summaryReport.summary.routesWithViolations}`);
console.log(`   - With errors: ${summaryReport.summary.routesWithErrors}`);
console.log(`   Total violations: ${summaryReport.summary.totalViolations}`);

console.log(`\n📁 Generated files:`);
console.log(`   - axe-summary-report.json`);
allReports.forEach(({ route }) => {
  const fileName = `axe-report${route.replace(/\//g, '_') || '_root'}.json`;
  console.log(`   - ${fileName}`);
});

console.log('\n🎉 Report generation complete!');

// Exit with failure code if any routes failed
const totalFailures = summaryReport.summary.routesWithViolations + summaryReport.summary.routesWithErrors;
if (totalFailures > 0) {
  console.log(`\n💥 ${totalFailures} route(s) failed accessibility testing. Please fix issues before deployment.`);
  process.exit(1);
} else {
  console.log('\n🎉 All accessibility tests passed! Government compliance achieved.');
  process.exit(0);
}
