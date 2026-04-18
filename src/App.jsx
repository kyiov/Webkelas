import React, { useEffect, useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gear } from '@phosphor-icons/react';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import AdminDashboard from './components/sections/AdminDashboard';
import ChatBubble from './components/ui/ChatBubble';
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
    <div className="min-h-screen bg-base-100 selection:bg-primary selection:text-primary-content">
      <header>
        <Navbar currentTheme={theme} onThemeChange={handleThemeChange} />
      </header>

      <main>
        <div id="Home" className="bg-base-200/30">
          <Hero />
        </div>

        <div className="container mx-auto px-4 lg:px-20 space-y-32 pb-20 mt-20">
          {/* Class Profile Section */}
          <section id="about" className="py-20 fade-in">
            <div className="hero bg-base-200/50 rounded-[3rem] overflow-hidden border border-base-content/5 shadow-2xl">
              <div className="hero-content flex-col lg:flex-row-reverse p-10 lg:p-20 gap-12">
                <img 
                  src={CLASS_META.logo} 
                  className="max-w-xs rounded-[2rem] shadow-2xl border-4 border-primary/20 rotate-3 hover:rotate-0 transition-transform duration-500" 
                  alt="Class Logo"
                />
                <div className="text-center lg:text-left">
                  <div className="badge badge-primary badge-outline mb-6 p-4 font-black uppercase tracking-widest">Class Profile</div>
                  <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-base-content leading-none mb-4">
                    Big Family <br />
                    <span className="text-primary italic">{CLASS_META.name}</span>
                  </h2>
                  <p className="text-sm font-black uppercase tracking-[0.3em] opacity-40 text-base-content mb-8 italic">Graduation Class of {CLASS_META.graduationYear}</p>
                  <p className="text-lg lg:text-xl opacity-70 leading-relaxed text-base-content max-w-xl">
                    Keluarga besar {CLASS_META.name}. Tempat kami berbagi cerita dan kenangan abadi.
                  </p>
                  <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                     <div className="stats bg-base-100 shadow-lg border border-base-content/5 rounded-2xl">
                        <div className="stat p-4 px-6 text-center">
                           <div className="stat-title text-[10px] uppercase font-bold">Base</div>
                           <div className="stat-value text-xl text-primary">{CLASS_META.batch}</div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Gallery />
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

      <ChatBubble />

      {isPending && (
        <div className="fixed top-4 right-4 z-[100]">
          <span className="loading loading-spinner loading-xs text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default App;
