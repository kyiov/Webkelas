import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-slow pointer-events-none delay-1000" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Metadata Tagline @har style */}
          <div className="flex items-center space-x-3 mb-8 px-4 py-1.5 glass-card !rounded-full !p-2 !border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-bold">
              Legacy Batch 2026
            </span>
          </div>

          <h1 className="text-6xl md:text-[10rem] font-black text-main tracking-tighter leading-[0.8] mb-12 uppercase select-none">
            LEG<span className="text-primary italic">A</span>CY
          </h1>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <motion.a
              href="#philosophy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-primary text-background font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-primary-hover transition-colors shadow-xl shadow-primary/20"
            >
              Explore Philosophy
            </motion.a>
            
            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-border text-main font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-surface/50 transition-colors backdrop-blur-md"
            >
              View Archives
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-30"
      >
        <span className="font-mono text-[8px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={14} className="text-primary" />
      </motion.div>
    </section>
  );
};

export default Hero;
