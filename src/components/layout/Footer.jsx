import React from 'react';
import { InstagramLogo, TiktokLogo, MapPin, Heart } from '@phosphor-icons/react';
import { CLASS_META } from '../../lib/constants';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t-2 border-dashed border-base-content/10 bg-base-200/50 pt-16 pb-8 overflow-hidden z-10 pointer-events-auto">
      {/* Decorative Washi Tape */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-8 bg-primary/20 backdrop-blur-sm -rotate-2 border border-primary/10"></div>

      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="avatar">
              <div className="w-16 rounded-2xl border-4 border-white shadow-lg shadow-primary/10 rotate-3">
                <img src={CLASS_META.logo} alt="Logo" />
              </div>
            </div>
            <div>
              <p className="font-black text-2xl tracking-tighter uppercase text-base-content">
                {CLASS_META.name} <span className="text-primary italic block md:inline">Big Family.</span>
              </p>
              <p className="text-xs font-bold opacity-60 uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2 mt-2 text-base-content">
                <MapPin weight="fill" size={16} className="text-primary" />
                {CLASS_META.school}
              </p>
            </div>
          </div>

          {/* Column 2: Nostalgic Quote / Motto */}
          <div className="flex flex-col items-center md:items-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-2">
              <BookBookmark weight="duotone" size={24} />
            </div>
            <p className="italic font-medium opacity-70 text-sm max-w-xs text-base-content leading-relaxed relative">
              "Masa SMA mungkin telah berlalu, tetapi kenangan dan persahabatan kita akan selalu tertulis di lembaran memori ini."
            </p>
          </div>

          {/* Column 3: Social & Links */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <p className="font-black text-xs uppercase tracking-[0.3em] opacity-40 text-base-content">Tetap Terhubung</p>
            <div className="flex gap-4">
              <a href={CLASS_META.ig} target="_blank" rel="noreferrer" className="btn btn-circle bg-base-100 border border-base-content/10 hover:border-primary hover:text-primary transition-all shadow-sm">
                <InstagramLogo size={24} weight="duotone" />
              </a>
              <a href={CLASS_META.tiktok} target="_blank" rel="noreferrer" className="btn btn-circle bg-base-100 border border-base-content/10 hover:border-primary hover:text-primary transition-all shadow-sm">
                <TiktokLogo size={24} weight="duotone" />
              </a>
            </div>
            <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold mt-4 text-base-content">
              Angkatan {CLASS_META.graduationYear} &bull; {CLASS_META.batch}
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-6 border-t border-base-content/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-bold text-base-content">
            &copy; {new Date().getFullYear()} {CLASS_META.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[9px] opacity-20 uppercase tracking-widest">
            Made by Har
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
