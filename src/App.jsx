import React, { useEffect, useState, useTransition } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Gear, Paperclip, PushPin } from '@phosphor-icons/react';

import Navbar from './components/layout/Navbar';
import FloatingDock from './components/layout/FloatingDock';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import AdminDashboard from './components/sections/AdminDashboard';
import ChatBubble from './components/ui/ChatBubble';
import InteractiveCanvas from './components/ui/InteractiveCanvas';
import BackgroundEffects from './components/ui/BackgroundEffects';
import ParallaxDoodles from './components/ui/ParallaxDoodles';
import TornPaperEdge from './components/ui/TornPaperEdge';
import { CLASS_META } from './lib/constants';
import { sfx } from './lib/sounds';

const App = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('webkelas_theme') || 'dark');
  const [isPending, startTransition] = useTransition();

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);

    const handleGlobalClick = (e) => {
      const target = e.target;
      if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea')) {
        sfx.playClick();
      }
    };

    const handleGlobalHover = (e) => {
      const target = e.target;
      if (target.closest('button') || target.closest('a') || target.closest('.paper-card')) {

        if (target.dataset.hovered === 'true') return;
        target.dataset.hovered = 'true';
        sfx.playHover();
        setTimeout(() => { target.dataset.hovered = 'false'; }, 200);
      }
    };

    document.addEventListener('mousedown', handleGlobalClick);
    document.addEventListener('mouseover', handleGlobalHover);

    const handleHashChange = () => {
      if (window.location.hash === '#/admin') {
        setIsAdminOpen(true);
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('mousedown', handleGlobalClick);
      document.removeEventListener('mouseover', handleGlobalHover);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('webkelas_theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    startTransition(() => {
      setTheme(newTheme);
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-base-100 selection:bg-primary selection:text-primary-content scrapbook-font overflow-x-hidden pb-32">
      <BackgroundEffects />
      <ParallaxDoodles />
      <InteractiveCanvas />
      
      {/* Scroll-Triggered Scribble Line - Synchronized */}
      <svg 
        className="fixed top-0 left-[2%] sm:left-[5%] lg:left-[8%] w-8 sm:w-12 h-screen pointer-events-none z-[1] opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50 0 Q 90 10 50 20 T 50 40 T 50 60 T 50 80 T 50 100"
          style={{ pathLength: scaleY }}
          className="stroke-primary fill-none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <header>
        <FloatingDock 
          currentTheme={theme} 
          onThemeChange={handleThemeChange}
          isChatOpen={isChatOpen}
          onChatToggle={() => setIsChatOpen(!isChatOpen)}
        />
      </header>

      <main className="relative z-10 pointer-events-none">
        {/* Child elements that need interaction must have pointer-events-auto */}
        <div id="Home" className="bg-base-200/30 pointer-events-auto relative">
          <Hero />
          <TornPaperEdge fill="var(--fallback-b1,oklch(var(--b1)))" />
        </div>

        <div className="container mx-auto px-4 lg:px-10 xl:px-20 space-y-32 pb-20 mt-20 pointer-events-auto relative">
          {/* About Section */}
          <motion.section 
            id="about" 
            className="py-10 will-change-transform"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-5xl xl:max-w-6xl mx-auto text-center space-y-8 paper-card p-10 lg:p-20 irregular-border border-2 border-black/5 relative">
              <div className="tape"></div>
              
              {/* Physical Ornaments */}
              <div className="absolute -top-4 -left-4 -rotate-12 text-base-content/40">
                <Paperclip size={48} weight="duotone" />
              </div>
              <div className="absolute -top-3 -right-3 rotate-45 text-error shadow-sm rounded-full bg-white/50 backdrop-blur-sm">
                <PushPin size={40} weight="fill" />
              </div>

              <div className="badge badge-primary badge-outline p-4 font-black uppercase tracking-widest scrapbook-font">About Us</div>
              <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-neutral leading-none">
                Big Family <br />
                <span className="text-primary italic">{CLASS_META.name}.</span>
              </h2>
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-40 text-neutral italic">Graduation Class of {CLASS_META.graduationYear}</p>
              <p className="text-lg lg:text-xl opacity-70 leading-relaxed text-neutral font-medium">
                Kami adalah keluarga besar {CLASS_META.name} dari {CLASS_META.school}. 
                Web ini adalah <span className="font-bold highlight-marker cursor-default">arsip digital perjalanan kami</span>, tempat menyimpan kenangan, 
                pesan, dan kebersamaan yang tak terbatas.
              </p>
            </div>
          </motion.section>

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

      <ChatBubble isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      {isPending && (
        <div className="fixed top-4 right-4 z-[100]">
          <span className="loading loading-spinner loading-xs text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default App;
