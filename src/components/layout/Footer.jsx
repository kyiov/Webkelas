import React from 'react';
import { InstagramLogo, TiktokLogo, MapPin, Heart } from '@phosphor-icons/react';
import { CLASS_META } from '../../lib/constants';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t-2 border-dashed border-base-content/10 bg-base-200/50 pt-16 pb-8 overflow-hidden z-10 pointer-events-auto">
      {/* Decorative Washi Tape */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-8 bg-primary/20 backdrop-blur-sm -rotate-2 border border-primary/10"></div>

      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Column 1: Brand & Logo & Location */}
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
              
              {/* School and Location */}
              <div className="mt-4 flex flex-col gap-1">
                <p className="text-sm font-black opacity-80 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2 text-base-content">
                  <MapPin weight="fill" size={18} className="text-primary" />
                  {CLASS_META.school}
                </p>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest text-base-content ml-0 md:ml-6">
                  {CLASS_META.address}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Social, Links & Roman Numerals */}
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
            
            {/* Class info & Roman Numerals */}
            <div className="mt-4 flex flex-col items-center md:items-end gap-1">
              <p className="text-xl font-black text-primary tracking-widest">
                {CLASS_META.batch}
              </p>
              <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold text-base-content">
                Angkatan {CLASS_META.graduationYear}
              </p>
            </div>
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