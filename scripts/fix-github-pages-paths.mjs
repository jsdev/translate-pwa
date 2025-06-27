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
  
  console.log('Note: index.html paths are handled by Vite base configuration');
  console.log('GitHub Pages post-processing complete!');
} else {
  console.log('Not building for GitHub Pages, skipping post-processing.');
}
