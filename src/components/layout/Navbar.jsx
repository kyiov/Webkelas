import React from 'react';
import { CLASS_META } from '../../lib/constants';
import { List } from '@phosphor-icons/react';

const Navbar = () => {
  return (
    <div className="navbar bg-transparent absolute top-0 z-50 lg:px-[10%]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <List size={24} weight="bold" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 glass-card">
            <li><a href="#Home">Home</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#tabs">Info</a></li>
            <li><a href="#messages">Echoes</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl font-black tracking-tighter" href="#Home">
          {CLASS_META.name}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold space-x-4">
          <li><a href="#Home" className="hover:text-primary transition-colors">Home</a></li>
          <li><a href="#gallery" className="hover:text-primary transition-colors">Gallery</a></li>
          <li><a href="#tabs" className="hover:text-primary transition-colors">Info</a></li>
          <li><a href="#messages" className="hover:text-primary transition-colors">Echoes</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="avatar group">
          <div className="w-10 rounded-xl border-2 border-primary group-hover:scale-110 transition-transform">
            <img src={CLASS_META.logo} alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
