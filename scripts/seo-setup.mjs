#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 Setting up SEO files for deployment environment...');

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const baseUrl = isGitHubPages 
  ? 'https://USERNAME.github.io/translate-pwa' 
  : 'http://localhost:4173';

console.log(`Environment: ${isGitHubPages ? 'GitHub Pages' : 'Local Development'}`);
console.log(`Base URL: ${baseUrl}`);

// Update sitemap.xml with correct URLs
const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemap = sitemap.replace(/https:\/\/username\.github\.io\/translate-pwa/g, baseUrl);
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('✅ Updated sitemap.xml URLs');
}

// Update robots.txt with correct sitemap URL
const robotsPath = path.join(process.cwd(), 'dist', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let robots = fs.readFileSync(robotsPath, 'utf8');
  robots = robots.replace(/https:\/\/username\.github\.io\/translate-pwa/g, baseUrl);
  fs.writeFileSync(robotsPath, robots);
  console.log('✅ Updated robots.txt URLs');
}

// Update index.html with correct URLs
const indexPath = path.join(process.cwd(), 'dist', 'index.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  html = html.replace(/https:\/\/username\.github\.io\/translate-pwa/g, baseUrl);
  fs.writeFileSync(indexPath, html);
  console.log('✅ Updated index.html URLs');
}

console.log('🎯 SEO optimization complete!');
