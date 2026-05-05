import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InstagramLogo, TiktokLogo, MapPin, Heart } from '@phosphor-icons/react';
import { CLASS_META } from '../../lib/constants';

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 5) {
      window.location.hash = '#/admin';
      setClickCount(0);
    }

    const timer = setTimeout(() => {
      setClickCount(0);
    }, 2000);
    
    return () => clearTimeout(timer);
  };

  return (
    <footer className="relative mt-32 bg-base-200/50 pb-12 overflow-hidden z-10 pointer-events-auto border-t-2 border-dashed border-base-content/10">
      <div className="container mx-auto px-6 lg:px-20 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:items-start text-center md:text-left">
          
          {/* Column 1: Brand & Logo & Location */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            {/* Transparent Logo Button with Easter Egg */}
            <motion.button
              onClick={handleLogoClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group"
            >
              <img 
                src={CLASS_META.logo} 
                alt="Logo" 
                className="w-14 h-14 object-contain filter drop-shadow-md rounded-2xl"
              />
            </motion.button>

            <div>
              <p className="font-black text-3xl tracking-tighter uppercase text-base-content">
                {CLASS_META.name} <span className="text-primary italic block md:inline">Big Family.</span>
              </p>
              
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-sm font-black opacity-80 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2 text-base-content">
                  <MapPin weight="fill" size={20} className="text-primary" />
                  {CLASS_META.school}
                </p>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em] text-base-content leading-relaxed max-w-xs">
                  {CLASS_META.address}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Social, Links & Roman Numerals */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex flex-col items-center md:items-end gap-3">
              <p className="font-black text-[10px] uppercase tracking-[0.4em] opacity-40 text-base-content">Tetap Terhubung</p>
              <div className="flex gap-4">
                <a href={CLASS_META.ig} target="_blank" rel="noreferrer" className="text-base-content/60 hover:text-primary transition-all p-2">
                  <InstagramLogo size={32} weight="duotone" />
                </a>
                <a href={CLASS_META.tiktok} target="_blank" rel="noreferrer" className="text-base-content/60 hover:text-primary transition-all p-2">
                  <TiktokLogo size={32} weight="duotone" />
                </a>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col items-center md:items-end gap-1">
              <p className="text-3xl font-black text-primary tracking-[0.2em] scrapbook-font">
                {CLASS_META.batch}
              </p>
              <p className="text-xs font-black opacity-40 uppercase tracking-[0.3em] text-base-content">
                Graduation {CLASS_META.graduationYear}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-20 pt-8 border-t-2 border-dashed border-base-content/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em] text-base-content">
            &copy; {new Date().getFullYear()} {CLASS_META.name} Archive
          </p>
          <div className="flex items-center gap-2 text-[10px] opacity-30 uppercase tracking-[0.2em] font-black">
            Made by Har
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
