import React from 'react';
import { motion } from 'framer-motion';
import { CLASS_META } from '../../lib/constants';
import { 
  ArrowDown, Star, Heart, 
  PaperPlaneTilt, Sparkle, 
  Smiley, MusicNotes, Trophy,
  Palette, PencilLine, Sticker
} from '@phosphor-icons/react';

const Doodle = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 0.2, 
      scale: 1,
      y: [0, -15, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay,
      opacity: { duration: 1, delay }
    }}
    className={`absolute pointer-events-none hidden lg:block ${className}`}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  return (
    <div className="hero min-h-screen relative overflow-hidden bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:25px_25px]">
      {/* Background Doodles - Many of them to fill the space */}
      <Doodle className="top-10 left-[5%] text-primary" delay={0.2}>
        <Star size={64} weight="duotone" />
      </Doodle>
      <Doodle className="top-32 left-[20%] text-secondary" delay={0.8}>
        <Sparkle size={32} weight="bold" />
      </Doodle>
      <Doodle className="top-16 right-[15%] text-accent" delay={0.5}>
        <Heart size={56} weight="duotone" />
      </Doodle>
      <Doodle className="top-40 right-[25%] text-primary" delay={1.2}>
        <PaperPlaneTilt size={48} weight="duotone" />
      </Doodle>
      <Doodle className="top-60 left-[10%] text-secondary/60" delay={1.5}>
        <PencilLine size={40} weight="duotone" />
      </Doodle>
      <Doodle className="bottom-60 right-[5%] text-accent/60" delay={2}>
        <MusicNotes size={52} weight="duotone" />
      </Doodle>
      <Doodle className="bottom-20 left-[15%] text-primary/40" delay={2.5}>
        <Smiley size={44} weight="duotone" />
      </Doodle>
      <Doodle className="bottom-32 right-[20%] text-secondary/40" delay={3}>
        <Trophy size={40} weight="duotone" />
      </Doodle>
      <Doodle className="top-1/2 left-[5%] -translate-y-1/2 text-accent/30" delay={1}>
        <Palette size={48} weight="duotone" />
      </Doodle>
      <Doodle className="top-1/4 right-[5%] text-primary/30" delay={0.3}>
        <Sticker size={60} weight="duotone" />
      </Doodle>

      <div className="hero-content text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Top Decorative Element */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-primary/20"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/60">Digital Class Archive</span>
            <div className="h-px w-12 bg-primary/20"></div>
          </motion.div>

          <div className="relative inline-block">
            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter mb-4" id="Glow">
              WELCOME
            </h1>
            {/* Overlay Sticker */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -15 }}
              transition={{ delay: 1.5, type: "spring" }}
              className="absolute -top-6 -right-12 bg-primary text-primary-content text-[10px] px-4 py-1 font-black rounded-full shadow-2xl border-2 border-white/20 hidden lg:block"
            >
              MEMORIES! 📸
            </motion.div>
          </div>
          
          <h2 className="text-xl lg:text-2xl font-black tracking-[0.5em] uppercase opacity-80 mb-6 flex items-center justify-center gap-4">
            <Sparkle size={20} weight="fill" className="text-secondary" />
            TO {CLASS_META.name}
            <Sparkle size={20} weight="fill" className="text-secondary" />
          </h2>

          <div className="badge badge-outline py-5 px-8 font-black uppercase tracking-[0.3em] mb-12 text-[11px] bg-base-100/50 backdrop-blur-sm border-2 border-primary/20 text-primary">
            Graduation Class of {CLASS_META.graduationYear}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="stats shadow-2xl bg-base-100/40 backdrop-blur-xl border-2 border-white/10 text-base-content !rounded-[3rem] p-3 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50"></div>
              
              <div className="stat place-items-center px-12">
                <div className="stat-title text-[10px] font-black uppercase tracking-widest opacity-40">Members</div>
                <div className="stat-value text-primary text-5xl font-black tracking-tighter">36</div>
              </div>
              
              <div className="stat place-items-center border-x-2 border-base-content/5 px-12">
                <div className="stat-title text-[10px] font-black uppercase tracking-widest opacity-40">Laki-laki</div>
                <div className="stat-value text-primary text-5xl font-black tracking-tighter">16</div>
              </div>
              
              <div className="stat place-items-center px-12">
                <div className="stat-title text-[10px] font-black uppercase tracking-widest opacity-40">Perempuan</div>
                <div className="stat-value text-secondary text-5xl font-black tracking-tighter">20</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5 }}
            className="mt-20 flex flex-col items-center gap-3"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Explore Our Story</p>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={24} className="text-primary" weight="bold" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
