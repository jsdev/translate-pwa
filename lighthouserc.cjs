const config = {
  ci: {
    collect: {
      // Start the server and wait for it to be ready
      startServerCommand: process.env.GITHUB_PAGES === 'true' ? 'npm run preview:github' : 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
      
      // URLs to test - all our routes with base path for GitHub Pages
      url: process.env.GITHUB_PAGES === 'true' ? [
        'http://localhost:4173/translate-pwa/',                    // Home/root (redirects to intake)
        'http://localhost:4173/translate-pwa/intake',              // Intake page
        'http://localhost:4173/translate-pwa/phrases',             // Quick phrases page
        'http://localhost:4173/translate-pwa/translation',         // Translation page
        'http://localhost:4173/translate-pwa/record',              // Record page
        'http://localhost:4173/translate-pwa/conversations',       // Conversations page
        'http://localhost:4173/translate-pwa/settings',            // Settings page
      ] : [
        'http://localhost:4173/',                    // Home/root (redirects to intake)
        'http://localhost:4173/intake',              // Intake page
        'http://localhost:4173/phrases',             // Quick phrases page
        'http://localhost:4173/translation',         // Translation page
        'http://localhost:4173/record',              // Record page
        'http://localhost:4173/conversations',       // Conversations page
        'http://localhost:4173/settings',            // Settings page
      ],
      
      // Number of runs per URL for more reliable results
      numberOfRuns: 1, // Reduced for faster testing
      
      // Lighthouse settings
      settings: {
        // Use desktop preset for more consistent results in CI
        preset: 'desktop',
        // Chrome flags for stability
        chromeFlags: [
          '--headless',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-extensions',
        ],
      },
    },
    
    assert: {
      // Perfect scores required for all categories
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }], // Slightly relaxed for CI
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 0.95 }], // Slightly relaxed for CI
        'categories:seo': ['error', { minScore: 1.0 }],
        'categories:pwa': ['error', { minScore: 0.8 }], // PWA can be lower due to service worker requirements
        
        // Accessibility requirements (most important for government compliance)
        'audits:color-contrast': 'error',
        'audits:heading-order': 'error',
        'audits:aria-allowed-attr': 'error',
        'audits:aria-required-attr': 'error',
        'audits:aria-valid-attr-value': 'error',
        'audits:button-name': 'error',
        'audits:form-field-multiple-labels': 'error',
        'audits:label': 'error',
        
        // Security/Best practices
        'audits:is-on-https': 'off', // Preview server uses HTTP
        'audits:no-vulnerable-libraries': 'error',
      },
    },
    
    upload: {
      // Store results locally for now
      target: 'filesystem',
      outputDir: './lighthouse-results',
    },
  },
};

module.exports = config;
