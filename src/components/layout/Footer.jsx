import React from 'react';
import { InstagramLogo, TiktokLogo, MapPin, Heart } from '@phosphor-icons/react';
import { CLASS_META } from '../../lib/constants';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content border-t border-white/5">
      <aside className="space-y-4">
        <div className="avatar">
          <div className="w-20 rounded-2xl border-2 border-primary">
            <img src={CLASS_META.logo} alt="Logo" />
          </div>
        </div>
        <div>
          <p className="font-black text-2xl tracking-tighter uppercase">
            {CLASS_META.name} <span className="text-primary italic">Legacy.</span>
          </p>
          <p className="text-xs font-bold opacity-60 uppercase tracking-widest flex items-center justify-center gap-2 mt-2">
            <MapPin weight="duotone" size={14} className="text-primary" />
            {CLASS_META.school}
          </p>
          <p className="text-[10px] opacity-40 mt-1 max-w-xs">{CLASS_META.address}</p>
        </div>
      </aside> 
      
      <nav>
        <div className="grid grid-flow-col gap-6">
          <a href={CLASS_META.ig} target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle text-muted hover:text-primary transition-all">
            <InstagramLogo size={28} weight="duotone" />
          </a>
          <a href={CLASS_META.tiktok} target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle text-muted hover:text-primary transition-all">
            <TiktokLogo size={28} weight="duotone" />
          </a>
        </div>
      </nav>
      
      <div className="flex flex-col items-center gap-2">
        <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] font-bold">Class of {CLASS_META.batch} &bull; Established in MMXXVI</p>
        <div className="flex items-center gap-2 text-[10px] opacity-20 uppercase tracking-widest">
          Made with <Heart weight="fill" className="text-red-500" /> by XII A1 Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;
