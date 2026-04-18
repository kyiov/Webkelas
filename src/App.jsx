import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gear } from '@phosphor-icons/react';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import TabsSection from './components/sections/TabsSection';
import SecretWall from './components/sections/SecretWall';
import AdminDashboard from './components/sections/AdminDashboard';

const App = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('webkelas_theme') || 'dark');

  useEffect(() => {
    setMounted(true);
    
    const handleHashChange = () => {
      if (window.location.hash === '#/admin') {
        setIsAdminOpen(true);
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('webkelas_theme', theme);
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-base-100 selection:bg-primary selection:text-white" data-theme={theme}>
      <div id="Home" className={theme === 'dark' || theme === 'black' || theme === 'night' ? 'home-bg-active' : ''}>
        <Navbar currentTheme={theme} onThemeChange={setTheme} />
        <Hero />
      </div>

      <main className="container mx-auto px-4 lg:px-20 space-y-20 pb-20">
        <Gallery />
        <TabsSection />
        <SecretWall />
      </main>

      <Footer />

      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard 
            isOpen={isAdminOpen} 
            onClose={() => {
              setIsAdminOpen(false);
              window.dispatchEvent(new Event('storage'));
            }} 
          />
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-50 btn btn-circle btn-primary btn-sm opacity-20 hover:opacity-100 transition-opacity"
      >
        <Gear size={16} weight="duotone" />
      </button>
    </div>
  );
};

export default App;
