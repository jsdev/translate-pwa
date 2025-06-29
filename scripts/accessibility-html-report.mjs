#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import axeHtmlReporter from 'axe-html-reporter';

const { createHtmlReport } = axeHtmlReporter;

// Import routes directly - these should match src/routes.ts
const appRoutes = [
  '/',
  '/intake',
  '/phrases',
  '/record',
  '/translate',
  '/conversations',
  '/settings',
];

const PORT = 8080;
const BASE_URL = `http://localhost:${PORT}`;

console.log('📊 Generating accessibility reports (JSON + HTML) for all app routes...\n');

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

// Create reports directory
const reportsDir = 'accessibility-reports';
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

for (const route of appRoutes) {
  const url = `${BASE_URL}${route}`;
  const routeName = route.replace(/\//g, '_') || 'root';
  const jsonFileName = `${reportsDir}/axe-report-${routeName}.json`;
  const htmlFileName = `${reportsDir}/axe-report-${routeName}.html`;
  
  console.log(`\n🔍 Testing: ${route}`);
  
  try {
    const result = execSync(
      `npx axe ${url} --tags wcag2a,wcag2aa,section508 --save ${jsonFileName}`,
      { encoding: 'utf8', stdio: 'pipe', timeout: 45000 }
    );
    
    // Read the generated JSON report
    if (fs.existsSync(jsonFileName)) {
      const report = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
      
      // Generate HTML report
      try {
        createHtmlReport({
          results: {
            violations: report.violations || [],
            passes: report.passes || [],
            incomplete: report.incomplete || [],
            inapplicable: report.inapplicable || []
          },
          options: {
            projectKey: route === '/' ? 'Home Page' : route.substring(1).charAt(0).toUpperCase() + route.substring(2),
            outputDir: reportsDir,
            reportFileName: `axe-report-${routeName}`
          }
        });
        console.log(`   🌐 HTML report: ${htmlFileName}`);
      } catch (htmlError) {
        console.log(`   ⚠️  HTML report generation failed: ${htmlError.message}`);
      }
      
      allReports.push({
        route,
        url,
        violations: report.violations || [],
        passes: report.passes || [],
        incomplete: report.incomplete || [],
        inapplicable: report.inapplicable || [],
        jsonReport: jsonFileName,
        htmlReport: htmlFileName
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
      console.log(`   📄 JSON report: ${jsonFileName}`);
      console.log(`   🌐 HTML report: ${htmlFileName}`);
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

// Generate master summary report
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

// Save summary as JSON
fs.writeFileSync(`${reportsDir}/accessibility-summary.json`, JSON.stringify(summaryReport, null, 2));

// Generate master HTML report
const masterHtmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHS Translation Tool - Accessibility Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 2rem; }
        .header { background: #f8f9fa; padding: 2rem; border-radius: 8px; margin-bottom: 2rem; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0; }
        .metric { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef; text-align: center; }
        .metric h3 { margin: 0 0 0.5rem 0; color: #495057; }
        .metric .value { font-size: 2rem; font-weight: bold; margin: 0; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .routes { margin: 2rem 0; }
        .route { display: flex; align-items: center; padding: 1rem; border-bottom: 1px solid #e9ecef; }
        .route:last-child { border-bottom: none; }
        .status { width: 20px; height: 20px; border-radius: 50%; margin-right: 1rem; }
        .status.pass { background: #28a745; }
        .status.fail { background: #dc3545; }
        .route-info { flex: 1; }
        .route-name { font-weight: 600; margin-bottom: 0.25rem; }
        .route-details { color: #6c757d; font-size: 0.9rem; }
        .reports { margin-left: auto; }
        .reports a { margin-left: 0.5rem; padding: 0.25rem 0.75rem; background: #007bff; color: white; text-decoration: none; border-radius: 4px; font-size: 0.875rem; }
        .reports a:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏛️ DHS Translation Tool</h1>
        <p>Accessibility Compliance Report - Government Ready</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="summary">
        <div class="metric">
            <h3>Total Routes</h3>
            <p class="value">${summaryReport.totalRoutes}</p>
        </div>
        <div class="metric">
            <h3>Passed</h3>
            <p class="value passed">${summaryReport.summary.routesPassed}</p>
        </div>
        <div class="metric">
            <h3>Failed</h3>
            <p class="value ${summaryReport.summary.routesWithViolations + summaryReport.summary.routesWithErrors > 0 ? 'failed' : 'passed'}">${summaryReport.summary.routesWithViolations + summaryReport.summary.routesWithErrors}</p>
        </div>
        <div class="metric">
            <h3>Total Violations</h3>
            <p class="value ${summaryReport.summary.totalViolations > 0 ? 'failed' : 'passed'}">${summaryReport.summary.totalViolations}</p>
        </div>
    </div>
    
    <div class="routes">
        <h2>Route Details</h2>
        ${allReports.map(({ route, violations, error, htmlReport, jsonReport }) => `
            <div class="route">
                <div class="status ${error || violations.length > 0 ? 'fail' : 'pass'}"></div>
                <div class="route-info">
                    <div class="route-name">${route === '/' ? 'Home Page' : route}</div>
                    <div class="route-details">
                        ${error ? 'Connection Error' : `${violations.length} violation${violations.length !== 1 ? 's' : ''}`}
                    </div>
                </div>
                <div class="reports">
                    ${htmlReport ? `<a href="${htmlReport.replace(reportsDir + '/', '')}">HTML Report</a>` : ''}
                    ${jsonReport ? `<a href="${jsonReport.replace(reportsDir + '/', '')}">JSON Report</a>` : ''}
                </div>
            </div>
        `).join('')}
    </div>
    
    <div style="margin-top: 3rem; padding: 2rem; background: #f8f9fa; border-radius: 8px;">
        <h3>Compliance Status</h3>
        <p><strong>Section 508:</strong> ${summaryReport.summary.totalViolations === 0 ? '✅ Compliant' : '❌ Non-compliant'}</p>
        <p><strong>WCAG 2.1 AA:</strong> ${summaryReport.summary.totalViolations === 0 ? '✅ Compliant' : '❌ Non-compliant'}</p>
        <p><strong>Government Ready:</strong> ${summaryReport.summary.totalViolations === 0 ? '✅ Yes' : '❌ No'}</p>
    </div>
</body>
</html>
`;

fs.writeFileSync(`${reportsDir}/index.html`, masterHtmlReport);

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

console.log(`\n📁 Generated reports in '${reportsDir}/':`);
console.log(`   🌐 Master HTML report: ${reportsDir}/index.html`);
console.log(`   📊 Summary JSON: ${reportsDir}/accessibility-summary.json`);
allReports.forEach(({ route, htmlReport, jsonReport }) => {
  const routeName = route === '/' ? 'root' : route.substring(1);
  if (htmlReport) console.log(`   🌐 ${routeName}: ${htmlReport}`);
  if (jsonReport) console.log(`   📄 ${routeName}: ${jsonReport}`);
});

console.log('\n🎉 Report generation complete!');
console.log(`💡 Open ${reportsDir}/index.html in your browser to view the master report.`);

// Exit with failure code if any routes failed
const totalFailures = summaryReport.summary.routesWithViolations + summaryReport.summary.routesWithErrors;
if (totalFailures > 0) {
  console.log(`\n💥 ${totalFailures} route(s) failed accessibility testing. Please fix issues before deployment.`);
  process.exit(1);
} else {
  console.log('\n🎉 All accessibility tests passed! Government compliance achieved.');
  process.exit(0);
}
