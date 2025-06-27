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
];

const PORT = 8080;
const BASE_URL = `http://localhost:${PORT}`;

console.log('🚀 Starting accessibility tests for all app routes...\n');

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

let allPassed = true;
const results = [];

for (const route of appRoutes) {
  const url = `${BASE_URL}${route}`;
  console.log(`\n🔍 Testing accessibility for: ${url}`);
  try {
    const result = execSync(
      `npx axe ${url} --tags wcag2a,wcag2aa,section508 --save axe-report${route.replace(/\//g, '_') || '_root'}.json`,
      { encoding: 'utf8', stdio: 'pipe', timeout: 45000 }
    );
    
    // Check the generated report file instead of parsing stdout
    const reportFileName = `axe-report${route.replace(/\//g, '_') || '_root'}.json`;
    if (fs.existsSync(reportFileName)) {
      const report = JSON.parse(fs.readFileSync(reportFileName, 'utf8'));
      const violations = report.violations || [];
      
      if (violations.length === 0) {
        console.log('   ✅ No accessibility violations found');
        results.push({ route, status: 'PASS', violations: 0 });
      } else {
        console.log(`   ❌ Found ${violations.length} accessibility violation(s)`);
        results.push({ route, status: 'FAIL', violations: violations.length });
        allPassed = false;
      }
    } else {
      console.log('   ❌ Report file not generated');
      results.push({ route, status: 'FAIL', violations: -1 });
      allPassed = false;
    }
  } catch (error) {
    console.log(`   ❌ Error testing ${route}: ${error.message}`);
    results.push({ route, status: 'FAILED', violations: -1 });
    allPassed = false;
  }
}

console.log('\n📊 Accessibility Test Summary:');
console.log('================================');
results.forEach(({ route, status, violations }) => {
  const emoji = status === 'PASS' ? '✅' : '❌';
  const violationText = violations >= 0 ? `(${violations} violations)` : '(connection error)';
  console.log(`${emoji} ${route.padEnd(15)} ${status.padEnd(6)} ${violationText}`);
});

const passed = results.filter(r => r.status === 'PASS').length;
const failed = results.filter(r => r.status === 'FAILED').length;
const total = results.length;

console.log(`\n🎯 Results: ${passed}/${total} routes passed accessibility tests`);
console.log(`   Passed: ${passed}`);
console.log(`   Failed: ${failed}`);

if (allPassed) {
  console.log('🎉 All accessibility tests passed! Government compliance achieved.');
  process.exit(0);
} else {
  console.log('💥 Some accessibility tests failed. Please fix violations before deployment.');
  process.exit(1);
}
