import React, { useEffect, useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gear } from '@phosphor-icons/react';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import SecretWall from './components/sections/SecretWall';
import AdminDashboard from './components/sections/AdminDashboard';
import { CLASS_META } from './lib/constants';

const App = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('webkelas_theme') || 'dark');
  const [isPending, startTransition] = useTransition();

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

  const handleThemeChange = (newTheme) => {
    // Optimize INP by lowering priority of theme switching
    startTransition(() => {
      setTheme(newTheme);
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-base-100 selection:bg-primary selection:text-white" data-theme={theme}>
      <header>
        <Navbar currentTheme={theme} onThemeChange={handleThemeChange} />
      </header>

      <main>
        <div id="Home" className="bg-base-200/30">
          <Hero />
        </div>

        <div className="container mx-auto px-4 lg:px-20 space-y-32 pb-20 mt-20">
          {/* About Section */}
          <section id="about" className="py-10 fade-in">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="badge badge-primary badge-outline p-4 font-black uppercase tracking-widest">About Us</div>
              <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter">
                Legacy <span className="text-primary italic">Batch 2026.</span>
              </h2>
              <p className="text-lg lg:text-xl opacity-70 leading-relaxed">
                Kami adalah keluarga besar {CLASS_META.name} dari {CLASS_META.school}. 
                Web ini adalah arsip digital perjalanan kami, tempat menyimpan kenangan, 
                pesan, dan kebersamaan yang tak terbatas.
              </p>
            </div>
          </section>

          <Gallery />
          <SecretWall />
        </div>
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
        aria-label="Admin Dashboard"
      >
        <Gear size={16} weight="duotone" />
      </button>

      {isPending && (
        <div className="fixed top-4 right-4 z-[100]">
          <span className="loading loading-spinner loading-xs text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default App;
