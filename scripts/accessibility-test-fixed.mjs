#!/usr/bin/env node

import { execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 4174;
const BASE_URL = `http://localhost:${PORT}`;

// Routes to test for accessibility
const routes = [
  '/',
  '/intake',
  '/phrases', 
  '/translation',
  '/record',
  '/conversations',
  '/settings'
];

// Simple static file server for the dist directory
function createServer() {
  return http.createServer((req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(process.cwd(), 'dist', url);
    
    // Handle SPA routing by serving index.html for unknown routes
    const finalPath = fs.existsSync(filePath) ? filePath : path.join(process.cwd(), 'dist', 'index.html');
    
    fs.readFile(finalPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      
      const ext = path.extname(finalPath);
      const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
      }[ext] || 'text/plain';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
}

async function runAccessibilityTests() {
  console.log('🚀 Starting accessibility tests...\n');
  
  // Start the server
  const server = createServer();
  server.listen(PORT);
  console.log(`📡 Server running at ${BASE_URL}`);
  
  let allPassed = true;
  const results = [];
  
  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    console.log(`\n🔍 Testing accessibility for: ${route}`);
    
    try {
      // Run axe test for this specific URL
      const result = execSync(
        `npx axe "${url}" --tags wcag2a,wcag2aa,section508`,
        { encoding: 'utf8', timeout: 30000 }
      );
      
      // Parse the output to determine if there were violations
      if (result.includes('0 violations found')) {
        console.log(`   ✅ No accessibility violations found`);
        results.push({ route, status: 'PASS', violations: 0 });
      } else {
        // Extract violation count from output
        const violationMatch = result.match(/(\d+) violations? found/);
        const violationCount = violationMatch ? parseInt(violationMatch[1]) : 1;
        
        console.log(`   ❌ Found ${violationCount} accessibility violation(s)`);
        console.log(`   Details: ${result.split('\n').slice(0, 5).join('\n')}`);
        results.push({ route, status: 'FAIL', violations: violationCount });
        allPassed = false;
      }
    } catch (error) {
      console.log(`   ❌ Error testing ${route}: ${error.message}`);
      results.push({ route, status: 'ERROR', violations: -1 });
      allPassed = false;
    }
  }
  
  // Stop the server
  server.close();
  
  // Print summary
  console.log('\n📊 Accessibility Test Summary:');
  console.log('================================');
  results.forEach(({ route, status, violations }) => {
    const emoji = status === 'PASS' ? '✅' : status === 'ERROR' ? '🔥' : '❌';
    const violationText = violations >= 0 ? `(${violations} violations)` : '(error)';
    console.log(`${emoji} ${route.padEnd(15)} ${status.padEnd(6)} ${violationText}`);
  });
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const total = results.length;
  
  console.log(`\n🎯 Results: ${passed}/${total} routes passed accessibility tests`);
  
  if (allPassed) {
    console.log('🎉 All accessibility tests passed! Government compliance achieved.');
    process.exit(0);
  } else {
    console.log('💥 Some accessibility tests failed. Please fix violations before deployment.');
    process.exit(1);
  }
}

// Wait a moment for server to start, then run tests
setTimeout(runAccessibilityTests, 1000);
