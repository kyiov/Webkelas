import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, onClick, initial, whileInView, transition }) => {
  const baseClasses = `
    glass-card p-6 md:p-8 
    relative overflow-hidden group 
    ${hover ? 'hover:border-primary/50' : ''}
    ${className}
  `;

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true }}
      transition={transition}
      onClick={onClick}
      className={baseClasses}
    >
      {/* Decorative gradient blur in background from @har style */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
