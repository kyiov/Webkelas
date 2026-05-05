import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Option 1 & 6: Dynamic Lighting & Film Grain Noise
// Option 2: Cursor Trails (Ink Splatters/Stars)

const BackgroundEffects = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);

  // Throttle trail creation for performance
  const createTrail = useCallback((e) => {
    setTrails((prev) => {
      // Keep max 15 trails to avoid DOM bloat
      const newTrails = [...prev.slice(-14), {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        // Randomize rotation and size for organic feel
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
      }];
      return newTrails;
    });
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      // Only create a trail particle every 50ms
      if (now - lastTime > 50) {
        createTrail(e);
        lastTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createTrail]);

  // Clean up old trails continuously
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrails((prev) => prev.filter(t => Date.now() - t.id < 1000)); // Remove after 1s
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {/* Option 6: Film Grain Noise (SVG Filter overlay) */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.15] mix-blend-overlay film-grain-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Option 1: Dynamic Lighting / Paper Flashlight Effect */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, var(--fallback-p,oklch(var(--p)/0.03)), transparent 80%)`,
        }}
      />

      {/* Option 2: Interactive Cursor Trails */}
      <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {trails.map((trail) => (
            <motion.div
              key={trail.id}
              initial={{ opacity: 0.8, scale: 0 }}
              animate={{ opacity: 0.4, scale: trail.scale, rotate: trail.rotation }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute text-primary"
              style={{ left: trail.x - 10, top: trail.y - 10 }}
            >
              {/* Little star / ink dot SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BackgroundEffects;
