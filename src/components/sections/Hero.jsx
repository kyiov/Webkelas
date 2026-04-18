import React from 'react';
import { motion } from 'framer-motion';
import { CLASS_META } from '../../lib/constants';
import { ArrowDown } from '@phosphor-icons/react';

const Hero = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h5 className="text-xl lg:text-2xl font-semibold opacity-80 mb-2">Hi, Visitor!</h5>
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter mb-4" id="Glow">
            WELCOME
          </h1>
          <h2 className="text-lg lg:text-xl font-bold tracking-[10px] uppercase opacity-70 mb-4">
            TO {CLASS_META.name}
          </h2>
          <div className="badge badge-primary badge-outline py-4 px-6 font-bold uppercase tracking-[4px] mb-10 text-[10px]">
            Tahun Kelulusan {CLASS_META.graduationYear}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
            <div className="stats shadow bg-white/10 backdrop-blur-md border border-white/10 text-white !rounded-3xl">
              <div className="stat place-items-center">
                <div className="stat-title text-white/60">Total Members</div>
                <div className="stat-value" id="AngkaGradientBlue">37</div>
              </div>
              <div className="stat place-items-center border-x border-white/10">
                <div className="stat-title text-white/60">Male</div>
                <div className="stat-value" id="AngkaGradientBlue">25</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title text-white/60">Female</div>
                <div className="stat-value" id="AngkaGradientPink">12</div>
              </div>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-20 opacity-30 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[5px]">Scroll</span>
            <ArrowDown size={16} weight="bold" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
