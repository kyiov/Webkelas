import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Option 3: Parallax Floating Doodles
const ParallaxDoodles = () => {
  const { scrollY } = useScroll();
  
  // Create different movement speeds for parallax effect
  const yFast = useTransform(scrollY, [0, 2000], [0, -300]);
  const yMedium = useTransform(scrollY, [0, 2000], [0, -150]);
  const ySlow = useTransform(scrollY, [0, 2000], [0, -50]);
  const yReverse = useTransform(scrollY, [0, 2000], [0, 200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20 mix-blend-multiply dark:mix-blend-screen">
      {/* Coffee Ring 1 - Moves Reverse/Down */}
      <motion.svg 
        style={{ y: yReverse }}
        className="absolute top-[-2%] right-[-10%] sm:top-[10%] sm:right-[5%] w-48 h-48 sm:w-64 sm:h-64 rotate-12" 
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="#8B4513" strokeWidth="3" strokeDasharray="4 2 8 4 15 5" opacity="0.8" />
        <circle cx="48" cy="52" r="38" fill="none" stroke="#8B4513" strokeWidth="1.5" strokeDasharray="10 5" opacity="0.5" />
      </motion.svg>

      {/* Ink Splatter - Moves Fast Up */}
      <motion.svg 
        style={{ y: yFast }}
        className="absolute top-[40%] left-[-5%] sm:top-[50%] sm:left-[10%] w-24 h-24 sm:w-32 sm:h-32 -rotate-12" 
        viewBox="0 0 100 100"
      >
        <path d="M40,50 Q45,30 60,40 T70,60 T40,50 Z" fill="currentColor" />
        <circle cx="30" cy="30" r="3" fill="currentColor" />
        <circle cx="75" cy="35" r="2" fill="currentColor" />
        <circle cx="65" cy="75" r="4" fill="currentColor" />
      </motion.svg>

      {/* Math Scribbles - Moves Medium Up */}
      <motion.svg 
        style={{ y: yMedium }}
        className="absolute top-[70%] right-[10%] sm:top-[80%] sm:right-[20%] w-32 h-32 sm:w-40 sm:h-40 rotate-6" 
        viewBox="0 0 100 100"
        stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
      >
        <path d="M10,50 Q30,20 50,50 T90,50" />
        <text x="20" y="30" fontSize="15" fill="currentColor" stroke="none" fontFamily="monospace">E=mc²</text>
        <circle cx="80" cy="80" r="10" strokeDasharray="4 4" />
      </motion.svg>

      {/* Coffee Ring 2 - Moves Slow Up */}
      <motion.svg 
        style={{ y: ySlow }}
        className="absolute top-[120%] left-[20%] sm:top-[150%] sm:left-[30%] w-32 h-32 sm:w-48 sm:h-48 -rotate-45" 
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="#8B4513" strokeWidth="4" strokeDasharray="20 10 5 5" opacity="0.6" />
      </motion.svg>
    </div>
  );
};

export default ParallaxDoodles;
