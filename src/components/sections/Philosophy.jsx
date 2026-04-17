import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lightning, Heart } from '@phosphor-icons/react';
import GlassCard from '../ui/GlassCard';
import { CLASS_META } from '../../lib/constants';

const Philosophy = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="philosophy" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <motion.div variants={item} className="flex items-center space-x-4 text-primary">
              <ShieldCheck weight="duotone" size={28} />
              <span className="font-mono text-xs uppercase tracking-[0.4em] font-bold">Foundation</span>
            </motion.div>

            <motion.h2 variants={item} className="text-5xl md:text-7xl font-black text-main tracking-tighter uppercase leading-[1]">
              Pillars of <br /> <span className="text-primary italic">Solidarity.</span>
            </motion.h2>

            <motion.div variants={item} className="grid grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-5xl font-black text-main hover:text-primary transition-colors">30</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted font-bold">Great Minds</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-black text-main hover:text-primary transition-colors">∞</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted font-bold">Limitless Potential</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
            
            <GlassCard className="aspect-square relative flex items-center justify-center p-0 overflow-hidden !rounded-[3rem]">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200" 
                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                alt="Philosophy Background"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              
              <div className="absolute bottom-10 left-10 right-10">
                 <div className="flex items-center space-x-4 mb-4">
                   <div className="w-10 h-1 bg-primary rounded-full" />
                   <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-black">Values</span>
                 </div>
                 <h3 className="text-2xl font-black text-main uppercase italic tracking-tighter">
                   "Vincit Omnia Veritas"
                 </h3>
                 <p className="text-muted text-xs mt-2 uppercase tracking-widest font-mono">Truth Conquers All</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
