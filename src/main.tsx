import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Extend Window interface for Trusted Types
declare global {
  interface Window {
    trustedTypes?: {
      createPolicy: (name: string, policy: any) => void;
    };
  }
}

// Enable Trusted Types if supported
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML: (input: string) => input, // Sanitize as needed, e.g., using DOMPurify
    createScript: (input: string) => input,
    createScriptURL: (input: string) => input,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
