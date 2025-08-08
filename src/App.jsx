import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider, useApp } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import AuthModal from './components/auth/AuthModal';
import SettingsModal from './components/settings/SettingsModal';
import StatsModal from './components/stats/StatsModal';
import LoadingSpinner from './components/ui/LoadingSpinner';
import './index.css';

function AppContent() {
  const { state } = useApp();

  useEffect(() => {
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Dynamic background based on current timer mode and its specific color theme
  const getBackgroundClass = () => {
    const currentMode = state.timerState.mode;
    const currentColorTheme = state.modeColorThemes[currentMode];
    
    const backgroundMap = {
      red: 'bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-900 dark:to-red-950',
      blue: 'bg-gradient-to-r from-blue-800 to-indigo-900 dark:from-blue-900 dark:to-blue-950',
      green: 'bg-gradient-to-r from-emerald-500 to-emerald-900 dark:from-green-900 dark:to-green-950',
      purple: 'bg-gradient-to-r from-purple-500 to-purple-900 dark:from-purple-900 dark:to-purple-950',
      yellow: 'bg-gradient-to-t from-amber-500 to-amber-600 dark:from-yellow-900 dark:to-yellow-950',
      gray: 'bg-gradient-to-r from-slate-900 to-slate-700 dark:from-gray-900 dark:to-gray-950'
    };
    
    return backgroundMap[currentColorTheme] || backgroundMap.red;
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-all duration-500 ${getBackgroundClass()}`}>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />

        {/* Modals */}
        <AuthModal />
        <SettingsModal />
        <StatsModal />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: state.theme === 'dark' ? '#374151' : '#ffffff',
              color: state.theme === 'dark' ? '#ffffff' : '#000000',
            },
          }}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
