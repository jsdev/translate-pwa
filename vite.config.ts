import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Security headers for different environments
function getDevelopmentHeaders() {
  return {
    // CORS headers for development tools
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    
    // Basic security headers (lenient for dev tools)
    'X-Frame-Options': 'SAMEORIGIN', // Allow embedding for dev tools
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Development-friendly CSP (allows inline styles, eval for HMR)
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Allow eval for HMR
      "style-src 'self' 'unsafe-inline'", // Allow inline styles for dev
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' ws: wss: http: https:", // Allow WebSocket for HMR
      "frame-ancestors 'self'", // Allow self-framing for dev tools
      "worker-src 'self' blob:" // Allow workers
    ].join('; ')
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';
  
  return {
    // Set base path for GitHub Pages deployment
    base: isGitHubPages ? '/translate-pwa/' : '/',
    plugins: [
      react({
        // Lighthouse Performance optimizations
        babel: {
          plugins: isDev ? [] : [
            // Remove console.logs in production for better performance
            ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]
          ]
        }
      })
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['react', 'react-dom', 'react-router-dom'] // Pre-bundle for faster loading
    },
    build: {
      // Lighthouse Performance optimizations
      rollupOptions: {
        output: {
          // Optimize chunk splitting for better caching and performance
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            icons: ['lucide-react'],
            store: ['zustand']
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      },
      // Disable source maps for production Lighthouse score
      sourcemap: false,
      // Aggressive minification for Lighthouse performance
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2 // Multiple passes for better compression
        },
        mangle: {
          safari10: true
        }
      },
      // Target modern browsers for better performance
      target: 'es2020',
      // Optimize CSS splitting
      cssCodeSplit: true,
      // Reduce bundle size warnings
      chunkSizeWarningLimit: 1000
    },
    server: {
      // GitHub Codespaces configuration
      host: true,
      port: 5173,
      hmr: {
        port: 5173
      },
      // Development-friendly security headers
      headers: getDevelopmentHeaders()
    },
    // Vite 7.0.0 specific configuration
    define: {
      // Ensure global is defined for compatibility
      global: 'globalThis',
    },
    // Updated for Vite 7.0.0 environment handling
    envPrefix: 'VITE_'
  };
});