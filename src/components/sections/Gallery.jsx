import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { GALLERY_IMAGES } from '../../lib/constants';
import { Camera, Plus } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await api.getGallery();
      // Combine API data with our stylized constants as fallback/starters
      const combined = data.length > 0 ? data : GALLERY_IMAGES;
      setImages(combined);
    };
    fetchImages();
    window.addEventListener('storage', fetchImages);
    return () => window.removeEventListener('storage', fetchImages);
  }, []);

  // Helper to determine grid span based on style
  const getGridSpan = (style) => {
    switch (style) {
      case 'large': return 'md:col-span-2 md:row-span-2 aspect-square';
      case 'tall': return 'md:row-span-2 aspect-[3/4]';
      case 'wide': return 'md:col-span-2 aspect-[16/9]';
      default: return 'aspect-square';
    }
  };

  return (
    <section id="gallery" className="py-20">
      <div className="flex flex-col items-center mb-16 text-center">
         <div className="badge badge-outline badge-primary mb-6 p-4 font-black uppercase tracking-widest">
           <Camera weight="duotone" size={16} className="mr-2" /> Visual Archive
         </div>
         <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-4 leading-none">
           Big Family <span className="text-primary italic">Gallery.</span>
         </h2>
         <p className="max-w-2xl text-sm opacity-50 uppercase tracking-[0.2em]">Capturing the essence of MMXXVI through a curated digital lens.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-min">
        {images.map((img, idx) => (
          <motion.div 
            key={img.id || idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className={`group relative overflow-hidden rounded-[2rem] bg-base-200 border border-white/5 cursor-pointer ${getGridSpan(img.style)}`}
          >
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
              loading="lazy" 
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
               <span className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Archive {idx + 1}</span>
               <h3 className="text-white font-black uppercase tracking-tighter text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{img.title}</h3>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus size={12} weight="bold" className="text-white" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Visual Hint */}
      <div className="flex justify-center mt-16">
         <div className="flex items-center gap-3 opacity-30">
            <div className="h-[1px] w-12 bg-current"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-black">End of Collection</span>
            <div className="h-[1px] w-12 bg-current"></div>
         </div>
      </div>
    </section>
  );
};

export default Gallery;
