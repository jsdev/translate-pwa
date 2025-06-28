#!/usr/bin/env node

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Test script to verify Lighthouse URLs are correctly configured
console.log('🧪 Testing Lighthouse URL configuration...\n');

// Test without GITHUB_PAGES
delete process.env.GITHUB_PAGES;
const localConfig = require('./lighthouserc.cjs');
console.log('📍 Local Development URLs:');
localConfig.ci.collect.url.forEach(url => console.log(`  - ${url}`));

console.log('\n🏛️ GitHub Pages URLs:');
process.env.GITHUB_PAGES = 'true';
// Need to re-require to get updated config
delete require.cache[require.resolve('./lighthouserc.cjs')];
const githubConfig = require('./lighthouserc.cjs');
githubConfig.ci.collect.url.forEach(url => console.log(`  - ${url}`));

console.log('\n✅ URL configuration test complete!');
