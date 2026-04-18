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

  return (
    <motion.section 
      id="gallery" 
      className="py-20 relative flex flex-col items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center mb-16 text-center px-4">
         <div className="badge badge-primary badge-outline mb-6 p-4 font-black uppercase tracking-widest scrapbook-font">
           <Camera weight="duotone" size={16} className="mr-2" /> Gallery
         </div>
         <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-4 leading-none text-neutral">
           Koleksi <span className="text-primary italic font-black">Kenangan.</span>
         </h2>
         <p className="max-w-2xl text-xs opacity-60 uppercase tracking-[0.2em] text-neutral font-bold">Potongan cerita yang tersimpan rapi.</p>
      </div>

      {/* Scrapbook Grid Area */}
      <div className="flex flex-wrap justify-center gap-12 px-6 w-full max-w-7xl mx-auto">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            drag
            dragMomentum={true}
            initial={{ opacity: 0, y: 20, rotate: idx % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0 }}
            className="paper-card p-4 irregular-border border-2 border-black/5 shadow-xl cursor-grab active:cursor-grabbing bg-white dark:bg-[#fdf6e3] relative w-72 lg:w-96"
          >
            <div className="tape !w-20 !h-8"></div>
            <div className="overflow-hidden rounded-sm h-48 lg:h-64 bg-base-300">
              <img 
                src={img.src} 
                alt={img.title} 
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none" 
              />
            </div>
            <div className="mt-4 text-center">
               <p className="text-sm font-black uppercase tracking-tighter opacity-70 text-neutral line-clamp-1">{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Gallery;
