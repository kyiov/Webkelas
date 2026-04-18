import React, { useState, useEffect } from 'react';
import { CLASS_META } from '../../lib/constants';
import { List, Sun, Moon } from '@phosphor-icons/react';

const Navbar = ({ currentTheme, onThemeChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'cupcake' : 'dark';
    onThemeChange(nextTheme);
  };

  return (
    <div className={`navbar fixed top-0 z-[100] transition-all duration-500 lg:px-[10%] ${
      isScrolled ? 'bg-base-100/80 backdrop-blur-md py-2 shadow-lg border-b border-base-content/5' : 'bg-transparent py-4'
    }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-primary/10 transition-colors">
            <List size={24} weight="bold" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-[2rem] w-64 border border-base-content/10 p-4">
            <li className="menu-title uppercase text-[10px] tracking-[0.3em] opacity-40 mb-2">Navigation</li>
            <li><a href="#Home" className="py-3 rounded-xl">Home</a></li>
            <li><a href="#about" className="py-3 rounded-xl">About</a></li>
            <li><a href="#gallery" className="py-3 rounded-xl">Gallery</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-2xl font-black tracking-tighter group" href="#Home">
          Big Family <span className="text-primary italic group-hover:not-italic transition-all">{CLASS_META.name}</span>
        </a>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold gap-2">
          <li><a href="#Home" className="rounded-full hover:bg-primary hover:text-primary-content transition-all px-6 text-base-content text-xs uppercase tracking-widest">Home</a></li>
          <li><a href="#about" className="rounded-full hover:bg-primary hover:text-primary-content transition-all px-6 text-base-content text-xs uppercase tracking-widest">About</a></li>
          <li><a href="#gallery" className="rounded-full hover:bg-primary hover:text-primary-content transition-all px-6 text-base-content text-xs uppercase tracking-widest">Gallery</a></li>
        </ul>
      </div>

      <div className="navbar-end space-x-3">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle hover:bg-primary/10 transition-all duration-300"
          title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {currentTheme === 'dark' ? (
            <Sun size={24} weight="duotone" className="text-yellow-400" />
          ) : (
            <Moon size={24} weight="duotone" className="text-primary" />
          )}
        </button>

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
