import React from 'react';
import { InstagramLogo, TiktokLogo, MapPin } from '@phosphor-icons/react';
import { CLASS_META } from '../../lib/constants';

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 py-8 bg-base-200 text-base-content border-t border-base-content/5">
      <aside className="space-y-3">
        <div className="avatar">
          <div className="w-14 rounded-2xl border-2 border-primary shadow-lg shadow-primary/10">
            <img src={CLASS_META.logo} alt="Logo" />
          </div>
        </div>
        <div>
          <p className="font-black text-xl tracking-tighter uppercase">
            {CLASS_META.name} <span className="text-primary italic">Big Family.</span>
          </p>
          <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest flex items-center justify-center gap-2 mt-1">
            <MapPin weight="duotone" size={12} className="text-primary" />
            {CLASS_META.school}
          </p>
        </div>
      </aside> 
      
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href={CLASS_META.ig} target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle btn-sm text-muted hover:text-primary transition-all">
            <InstagramLogo size={22} weight="duotone" />
          </a>
          <a href={CLASS_META.tiktok} target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle btn-sm text-muted hover:text-primary transition-all">
            <TiktokLogo size={22} weight="duotone" />
          </a>
        </div>
      </nav>
      
      <div className="flex flex-col items-center gap-1">
        <p className="text-[9px] opacity-30 uppercase tracking-[0.3em] font-bold">Class of {CLASS_META.graduationYear} &bull; {CLASS_META.batch}</p>
        <div className="flex items-center gap-2 text-[9px] opacity-20 uppercase tracking-widest">
          Made by Har
        </div>
      </div>
    </footer>
  );
};

export default Footer;
