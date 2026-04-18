import React from 'react';
import { Envelope, Globe, Heart } from '@phosphor-icons/react';
import { CLASS_META } from '../../lib/constants';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-100 text-base-content border-t border-white/5">
      <aside>
        <div className="avatar mb-4">
          <div className="w-16 rounded-2xl border-2 border-primary">
            <img src={CLASS_META.logo} alt="Logo" />
          </div>
        </div>
        <p className="font-bold text-xl tracking-tighter">
          {CLASS_META.name} <span className="text-primary italic">Legacy.</span>
          <br/>
          <span className="text-xs font-normal opacity-50 uppercase tracking-widest">{CLASS_META.school}</span>
        </p> 
        <p className="text-xs opacity-30 uppercase tracking-[0.3em]">Established in MMXXVI</p>
      </aside> 
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a className="btn btn-ghost btn-circle text-muted hover:text-primary"><Envelope size={24} weight="duotone" /></a>
          <a className="btn btn-ghost btn-circle text-muted hover:text-primary"><Globe size={24} weight="duotone" /></a>
          <a className="btn btn-ghost btn-circle text-muted hover:text-primary"><Heart size={24} weight="duotone" /></a>
        </div>
      </nav>
      <p className="text-[10px] opacity-20 uppercase tracking-widest">Powered by Harz Design System &bull; 2026 Platform</p>
    </footer>
  );
};

export default Footer;
