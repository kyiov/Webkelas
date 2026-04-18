import React, { useState, useEffect } from 'react';
import { CLASS_META } from '../../lib/constants';
import { List, Palette, CheckCircle } from '@phosphor-icons/react';

const Navbar = ({ currentTheme, onThemeChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const themes = ["dark", "cupcake", "luxury", "coffee", "nord", "sunset"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar fixed top-0 z-[100] transition-all duration-500 lg:px-[10%] ${
      isScrolled ? 'bg-base-100/80 backdrop-blur-md py-2 shadow-lg border-b border-white/5' : 'bg-transparent py-4'
    }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-primary/10 transition-colors">
            <List size={24} weight="bold" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-[2rem] w-64 border border-white/10 p-4">
            <li className="menu-title uppercase text-[10px] tracking-[0.3em] opacity-40 mb-2">Navigation</li>
            <li><a href="#Home" className="py-3 rounded-xl">Home</a></li>
            <li><a href="#about" className="py-3 rounded-xl">About</a></li>
            <li><a href="#gallery" className="py-3 rounded-xl">Gallery</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-2xl font-black tracking-tighter group" href="#Home">
          {CLASS_META.name} <span className="text-primary italic group-hover:not-italic transition-all">Legacy</span>
        </a>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold gap-2">
          <li><a href="#Home" className="rounded-full hover:bg-primary hover:text-primary-content transition-all px-6 text-base-content">Home</a></li>
          <li><a href="#about" className="rounded-full hover:bg-primary hover:text-primary-content transition-all px-6 text-base-content">About</a></li>
          <li><a href="#gallery" className="rounded-full hover:bg-primary hover:text-primary-content transition-all px-6 text-base-content">Gallery</a></li>
        </ul>
      </div>

      <div className="navbar-end space-x-3">
        {/* Theme Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors">
            <Palette size={24} weight="duotone" className="text-primary" />
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-3 shadow-2xl bg-base-200 rounded-[2rem] w-64 border border-white/10 mt-4 grid grid-cols-1 gap-2">
            <li className="menu-title uppercase text-[10px] tracking-[0.3em] opacity-40 mb-2 px-2">Visual Palette</li>
            <div className="grid grid-cols-1 gap-1">
              {themes.map((t) => (
                <li key={t}>
                  <button 
                    className={`flex items-center justify-between py-3 px-4 rounded-2xl transition-all ${
                      currentTheme === t ? 'bg-primary text-white font-bold' : 'hover:bg-base-300'
                    }`}
                    onClick={() => onThemeChange(t)}
                    data-theme={t}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-4 rounded-full bg-primary"></div>
                        <div className="w-2 h-4 rounded-full bg-secondary"></div>
                        <div className="w-2 h-4 rounded-full bg-accent"></div>
                      </div>
                      <span className="capitalize text-xs tracking-widest">{t}</span>
                    </div>
                    {currentTheme === t && <CheckCircle size={16} weight="fill" />}
                  </button>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className="avatar group cursor-pointer">
          <div className="w-10 rounded-2xl border-2 border-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden shadow-lg shadow-primary/20">
            <img src={CLASS_META.logo} alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
