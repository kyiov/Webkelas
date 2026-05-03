import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../lib/api';
import { GALLERY_IMAGES } from '../../lib/constants';
import { Camera, X, ArrowsHorizontal, Image as ImageIcon } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

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
      ref={sectionRef}
      className="py-20 relative flex flex-col items-center overflow-x-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center mb-16 text-center px-4">
         <div className="badge badge-primary badge-outline mb-6 p-4 font-black uppercase tracking-widest scrapbook-font">
           <Camera weight="duotone" size={16} className="mr-2" /> Gallery
         </div>
         <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-4 leading-none text-base-content">
           Koleksi <span className="text-primary italic font-black">Kenangan.</span>
         </h2>
         <div className="flex flex-col items-center gap-2">
           <p className="max-w-2xl text-xs opacity-60 uppercase tracking-[0.2em] text-base-content font-bold">Potongan cerita yang tersimpan rapi.</p>
           {images.length > 0 && (
             <span className="badge badge-ghost badge-sm py-3 px-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-base-content">
               Total {images.length} Foto Terarsip
             </span>
           )}
         </div>
      </div>

      {/* Scrapbook Grid Area */}
      <div 
        className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-12 px-6 w-full max-w-5xl mx-auto min-h-[400px] relative"
      >
        {images.map((img, idx) => (
          <motion.div
            key={img.id || idx}
            drag
            dragConstraints={sectionRef}
            dragElastic={0.05}
            dragMomentum={false}
            initial={{ opacity: 0, y: 20, rotate: idx % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02, zIndex: 50 }}
            whileDrag={{ scale: 1.05, zIndex: 100, rotate: 0 }}
            onTap={() => setSelectedImage(img)}
            className="paper-card p-3 sm:p-4 irregular-border border-2 border-black/5 shadow-xl cursor-grab active:cursor-grabbing bg-white dark:bg-white relative w-full aspect-[1/1.2] flex flex-col will-change-transform"
          >
            {/* Tape Decoration */}
            <div className="tape !w-16 sm:!w-24 !h-6 sm:!h-8 !-top-3 sm:!-top-4 !bg-primary/20 !backdrop-blur-none"></div>
            
            {/* Image Container (Polaroid Style) */}
            <div className="overflow-hidden bg-base-300 flex-1 relative border-2 border-black/5">
              <img 
                src={img.src} 
                alt="Memory" 
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none" 
              />
            </div>
            
            {/* Polaroid Bottom Space */}
            <div className="h-8 sm:h-12 flex items-center justify-center">
               <div className="w-1/2 h-1 bg-base-content/5 rounded-full opacity-20"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center opacity-20 py-20">
          <ImageIcon size={64} weight="thin" className="text-base-content" />
          <p className="text-sm font-black uppercase tracking-widest mt-4 text-base-content">Belum ada foto</p>
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors p-2"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} weight="bold" />
              </button>
              
              <div className="paper-card p-2 sm:p-4 irregular-border border-4 border-white shadow-2xl bg-white">
                <img 
                  src={selectedImage.src} 
                  alt="Memory Preview"
                  className="max-h-[85vh] w-auto object-contain rounded-sm"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Gallery;
