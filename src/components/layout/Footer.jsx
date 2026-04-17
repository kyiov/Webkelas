import React from 'react';
import { Envelope, Globe, Heart } from '@phosphor-icons/react';
import { CLASS_META } from '../../lib/constants';

const Footer = () => {
  return (
    <footer className="py-20 bg-background border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary bg-white shadow-[8px_8px_0px_rgba(16,185,129,0.1)]">
              <img 
                src={CLASS_META.logo} 
                alt="Logo" 
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>

          <h2 className="text-3xl font-black text-main uppercase tracking-[0.3em] mb-4">
            {CLASS_META.name} <span className="text-primary italic">Legacy.</span>
          </h2>
          
          <div className="flex justify-center space-x-10 mb-12">
            {[Envelope, Globe, Heart].map((Icon, idx) => (
              <a key={idx} href="#" className="text-muted hover:text-primary transition-colors p-2">
                <Icon weight="duotone" size={20} />
              </a>
            ))}
          </div>

          <div className="max-w-2xl mx-auto w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto font-mono text-[8px] uppercase tracking-[0.5em] text-muted/60 font-black">
             <span>{CLASS_META.school}</span>
             <span className="my-4 md:my-0 text-primary">Class of {CLASS_META.batch}</span>
             <span>Established in MMXXVI</span>
          </div>
          
          <p className="mt-12 font-mono text-[7px] text-muted/40 tracking-[0.2em] uppercase">
            Powered by Harz Design System &bull; 2026 Platform
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
