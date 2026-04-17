import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import GlassCard from '../ui/GlassCard';
import { Camera } from '@phosphor-icons/react';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await api.getGallery();
      setImages(data);
    };
    fetchImages();

    // Re-fetch when local storage changes (custom event)
    window.addEventListener('storage', fetchImages);
    return () => window.removeEventListener('storage', fetchImages);
  }, []);

  return (
    <section id="gallery" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-24">
          <div className="space-y-4">
             <div className="flex items-center space-x-4 text-primary">
               <Camera weight="duotone" size={20} />
               <span className="font-mono text-xs uppercase tracking-[0.4em] font-black">Archive</span>
             </div>
             <h2 className="text-6xl md:text-8xl font-black text-main tracking-tighter uppercase leading-[0.8]">
              Visu<span className="text-primary italic">als.</span>
             </h2>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-muted hidden md:block opacity-60">
            Memory Stream / 2026 Batch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <GlassCard className="!p-0 !rounded-[2.5rem] !bg-background !border-border relative aspect-[3/4] overflow-hidden">
                <img 
                  src={img.src} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" 
                  alt={img.title}
                />
                
                {/* Overlay @har style */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 p-8 text-center">
                  <h4 className="text-main font-black text-3xl uppercase tracking-tighter italic">
                    {img.title}
                  </h4>
                  <div className="w-8 h-1 bg-white mt-4 rounded-full" />
                </div>
                
                {/* Meta info floating */}
                <div className="absolute top-6 right-6 font-mono text-[8px] uppercase tracking-widest text-main/40 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                   {idx + 1} / {images.length}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
