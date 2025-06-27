#!/usr/bin/env node

/**
 * Post-build script to fix paths for GitHub Pages deployment
 */

import fs from 'fs';
import path from 'path';

console.log('Script starting...');
console.log('Environment check - GITHUB_PAGES:', process.env.GITHUB_PAGES);

const GITHUB_PAGES_BASE = '/translate-pwa';
const distDir = './dist';

// Only run if we're building for GitHub Pages
if (process.env.GITHUB_PAGES === 'true') {
  console.log('Post-processing for GitHub Pages deployment...');
  
  // Update manifest.json
  const manifestPath = path.join(distDir, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    console.log('Updating manifest.json...');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Update start_url and scope only if they're still at root
    if (manifest.start_url === '/') {
      manifest.start_url = GITHUB_PAGES_BASE + '/';
    }
    if (manifest.scope === '/') {
      manifest.scope = GITHUB_PAGES_BASE + '/';
    }
    
    // Update icon paths only if they don't already have the base path
    if (manifest.icons) {
      manifest.icons = manifest.icons.map(icon => {
        if (icon.src.startsWith('/') && !icon.src.startsWith(GITHUB_PAGES_BASE)) {
          return {
            ...icon,
            src: GITHUB_PAGES_BASE + icon.src
          };
        }
        return icon;
      });
    }
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Manifest updated successfully');
  }
  
  // Ensure 404.html has the correct redirect logic for GitHub Pages
  const notFoundPath = path.join(distDir, '404.html');
  if (fs.existsSync(notFoundPath)) {
    console.log('Verifying 404.html for GitHub Pages...');
    let html404 = fs.readFileSync(notFoundPath, 'utf8');
    
    // Make sure the 404.html uses the correct base path
    if (!html404.includes('/translate-pwa/')) {
      console.log('Updating 404.html redirect paths...');
      html404 = html404.replace(
        /l\.pathname\.slice\(1\)\.split\('\/'\)\.slice\(pathSegmentsToKeep\)/g,
        "l.pathname.slice('/translate-pwa/'.length)"
      );
      html404 = html404.replace(
        /l\.pathname\.split\('\/'\)\.slice\(0, 1 \+ pathSegmentsToKeep\)\.join\('\/'\)/g,
        "'/translate-pwa'"
      );
      fs.writeFileSync(notFoundPath, html404);
      console.log('404.html updated for GitHub Pages');
    } else {
      console.log('404.html already configured for GitHub Pages');
    }
  }
  
  // Update index.html to include base href for GitHub Pages
  const indexPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('Adding base href to index.html...');
    let indexHtml = fs.readFileSync(indexPath, 'utf8');
    
    // Add base href if it doesn't exist
    if (!indexHtml.includes('<base href=')) {
      indexHtml = indexHtml.replace(
        '<meta charset="UTF-8" />',
        '<meta charset="UTF-8" />\n    <base href="/translate-pwa/">'
      );
      fs.writeFileSync(indexPath, indexHtml);
      console.log('Base href added to index.html');
    } else {
      console.log('Base href already exists in index.html');
    }
  }
  
  console.log('Note: index.html paths are handled by Vite base configuration');
  console.log('GitHub Pages post-processing complete!');
} else {
  console.log('Not building for GitHub Pages, skipping post-processing.');
}
