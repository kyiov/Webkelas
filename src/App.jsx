import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import Philosophy from './components/sections/Philosophy';
import Schedule from './components/sections/Schedule';
import Gallery from './components/sections/Gallery';
import SecretWall from './components/sections/SecretWall';
import AdminDashboard from './components/sections/AdminDashboard';

const App = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('webkelas_theme') || 'dark');

  useEffect(() => {
    setMounted(true);
    
    // Stealth Routing for #/admin
    const handleHashChange = () => {
      if (window.location.hash === '#/admin') {
        setIsAdminOpen(true);
        // Clear hash to keep it stealthy
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme Synchronizer
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('webkelas_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return <div className="bg-background min-h-screen" />;

  return (
    <div className="bg-background text-main font-sans selection:bg-primary selection:text-background antialiased scroll-smooth overflow-x-hidden">
      {/* Background Layer @har style */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Dynamic Glows */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        
        <main>
          <Hero />
          
          <div className="space-y-32 mb-32">
             <Philosophy />
             <Schedule />
             <Gallery />
             <SecretWall />
          </div>
        </main>
        
        <Footer />
      </div>

      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard 
            isOpen={isAdminOpen} 
            onClose={() => {
              setIsAdminOpen(false);
              // Trigger a storage event to refresh sections
              window.dispatchEvent(new Event('storage'));
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
