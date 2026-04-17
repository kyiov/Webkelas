import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, SunDim, MoonStars } from '@phosphor-icons/react';
import { CLASS_META } from '../../lib/constants';

const Navbar = ({ theme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Core', href: '#home' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Archives', href: '#gallery' },
    { name: 'Echoes', href: '#messages' },
  ];

  return (
    <nav className={`
      fixed w-full z-50 transition-all duration-500 
      ${scrolled ? 'py-4 bg-background/60 backdrop-blur-xl border-b border-border' : 'py-10 bg-transparent'}
    `}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo @har style */}
        <a href="#home" className="flex items-center space-x-3 group relative">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Badge Style for JPG Logo */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-primary bg-white shadow-[4px_4px_0px_rgba(16,185,129,0.2)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all flex items-center justify-center">
              <img 
                src={CLASS_META.logo} 
                alt="Logo" 
                className="w-full h-full object-contain block p-1"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-[0.2em] text-main uppercase leading-none">
              {CLASS_META.name}
            </span>
            <span className="font-mono text-[7px] font-bold tracking-[0.4em] text-primary uppercase mt-1">
               Legacy Platform
            </span>
          </div>
        </a>
        
        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center space-x-12">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted hover:text-primary transition-all font-black relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-hover:left-0"></span>
            </a>
          ))}
          
          {/* Theme Toggle Button */}
          <button 
            onClick={onToggleTheme}
            className="p-3 rounded-full bg-surface/50 border border-border text-muted hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <SunDim weight="duotone" size={20} /> : <MoonStars weight="duotone" size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <button 
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-surface/50 text-muted hover:text-primary transition-colors"
          >
            {theme === 'dark' ? <SunDim weight="duotone" size={24} /> : <MoonStars weight="duotone" size={24} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2.5 rounded-xl bg-surface/50 text-main hover:text-primary transition-colors"
          >
            {isOpen ? <X weight="bold" size={28} /> : <List weight="duotone" size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[60] flex flex-col items-center justify-center space-y-8 lg:hidden"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-4 text-main hover:text-primary transition-colors">
              <X weight="bold" size={36} />
            </button>
            
            {links.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-4xl font-black uppercase text-main tracking-tighter hover:text-primary italic transition-all"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
