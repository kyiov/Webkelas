import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { GALLERY_IMAGES } from '../../lib/constants';
import { Camera } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await api.getGallery();
      setImages(data.length > 0 ? data : GALLERY_IMAGES);
    };
    fetchImages();
    window.addEventListener('storage', fetchImages);
    return () => window.removeEventListener('storage', fetchImages);
  }, []);

  // Split images into two rows for the double carousel
  const half = Math.ceil(images.length / 2);
  const row1 = images.slice(0, half);
  const row2 = images.slice(half);

  const CarouselRow = ({ items, reverse = false }) => (
    <div className="flex overflow-hidden group py-4 select-none">
      <motion.div 
        animate={{ 
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] 
        }}
        transition={{ 
          duration: 40, // Slower for less CPU strain
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex gap-6 whitespace-nowrap will-change-transform"
      >
        {[...items, ...items].map((img, idx) => (
          <div key={idx} className="w-64 lg:w-96 shrink-0 h-40 lg:h-64 relative rounded-[2rem] overflow-hidden border border-base-content/5 shadow-xl group/item bg-base-300">
            <img 
              src={img.src} 
              alt={img.title} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <motion.section 
      id="gallery" 
      className="py-20 overflow-hidden"
      initial={{ opacity: 0, y: 30 }} // Reduced movement
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="flex flex-col items-center mb-12 text-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
         <div className="badge badge-outline badge-primary mb-6 p-4 font-black uppercase tracking-widest">
           <Camera weight="duotone" size={16} className="mr-2" /> Visual Stream
         </div>
         <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-4 leading-none">
           Big Family <span className="text-primary italic">Gallery.</span>
         </h2>
         <p className="max-w-2xl text-xs opacity-50 uppercase tracking-[0.2em]">Infinite scrolling memories from the archive.</p>
      </motion.div>

      <div className="space-y-4">
        <CarouselRow items={row1} />
        <CarouselRow items={row2} reverse={true} />
      </div>
    </motion.section>
  );
};

export default Gallery;
