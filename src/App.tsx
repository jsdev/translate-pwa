import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MobileHeader } from './components/MobileHeader';
import { MobileNav } from './components/MobileNav';
import { PhoneWrapper } from './components/PhoneWrapper';
import { IntakePage } from './pages/IntakePage';
import { QuickPhrasesPage } from './pages/QuickPhrasesPage';
import { RecordPage } from './pages/RecordPage';
import { TranslationPage } from './pages/TranslationPage';
import { ConversationsPage } from './pages/ConversationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { useAppStore } from './store/appStore';

const MobileApp = () => {
  const { theme } = useAppStore();

  // Apply theme on mount and when theme changes
  useEffect(() => {
    const getSystemTheme = (): 'light' | 'dark' => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (currentTheme: typeof theme) => {
      const root = document.documentElement;
      const actualTheme = currentTheme === 'system' ? getSystemTheme() : currentTheme;
      
      if (actualTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <MobileHeader />
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/intake" replace />} />
          <Route path="/intake" element={<IntakePage />} />
          <Route path="/phrases" element={<QuickPhrasesPage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/translate" element={<TranslationPage />} />
          <Route path="/conversations" element={<ConversationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Fallback route for any unmatched paths */}
          <Route path="*" element={<Navigate to="/intake" replace />} />
        </Routes>
      </main>
      <Routes>
        <Route path="/settings" element={null} />
        <Route path="*" element={<MobileNav />} />
      </Routes>
    </div>
  );
};

function App() {
  // Set basename for GitHub Pages deployment
  const basename = import.meta.env.VITE_BASE_URL || '/';
  
  return (
    <Router basename={basename}>
      <PhoneWrapper>
        <MobileApp />
      </PhoneWrapper>
    </Router>
  );
}

export default App;