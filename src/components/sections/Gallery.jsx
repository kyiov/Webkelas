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
    <div className="flex overflow-hidden group py-4">
      <motion.div 
        animate={{ 
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] 
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex gap-6 whitespace-nowrap"
      >
        {[...items, ...items].map((img, idx) => (
          <div key={idx} className="w-72 lg:w-96 shrink-0 h-48 lg:h-64 relative rounded-[2rem] overflow-hidden border border-base-content/5 shadow-2xl group/item">
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity p-6 flex flex-col justify-end">
               <h4 className="text-white font-black uppercase tracking-tighter text-lg">{img.title}</h4>
               <p className="text-white/60 text-[10px] uppercase tracking-widest">Archive Record</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <motion.section 
      id="gallery" 
      className="py-20 overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div 
        className="flex flex-col items-center mb-16 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
         <div className="badge badge-outline badge-primary mb-6 p-4 font-black uppercase tracking-widest">
           <Camera weight="duotone" size={16} className="mr-2" /> Visual Stream
         </div>
         <h2 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase mb-4 leading-none">
           Big Family <span className="text-primary italic">Gallery.</span>
         </h2>
         <p className="max-w-2xl text-sm opacity-50 uppercase tracking-[0.2em]">Infinite scrolling memories from the archive.</p>
      </motion.div>

      <div className="space-y-4">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <CarouselRow items={row1} />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <CarouselRow items={row2} reverse={true} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Gallery;
