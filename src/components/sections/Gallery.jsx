import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../lib/api';
import { GALLERY_IMAGES } from '../../lib/constants';
import { Camera, X, ArrowsHorizontal, Image as ImageIcon } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const boardRef = useRef(null);

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
      className="py-20 relative flex flex-col items-center overflow-hidden bg-base-200/30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center mb-10 text-center px-4">
         <div className="badge badge-primary badge-outline mb-6 p-4 font-black uppercase tracking-widest scrapbook-font">
           <Camera weight="duotone" size={16} className="mr-2" /> Gallery
         </div>
         <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-4 leading-none text-neutral">
           Papan <span className="text-primary italic font-black">Memori.</span>
         </h2>
         <div className="flex flex-col items-center gap-2">
           <p className="max-w-2xl text-xs opacity-60 uppercase tracking-[0.2em] text-neutral font-bold">Geser ke kanan untuk melihat lebih banyak kenangan.</p>
           <div className="flex items-center gap-2 mt-2 opacity-30 animate-pulse">
             <ArrowsHorizontal size={20} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Scroll Horizontal</span>
           </div>
         </div>
      </div>

      {/* Whiteboard Container */}
      <div className="w-full px-4 md:px-10">
        <div className="relative mx-auto max-w-[100vw] overflow-x-auto custom-scrollbar-h pb-10 pt-6">
          {/* The Actual Papan Tulis (Whiteboard) */}
          <div 
            ref={boardRef}
            className="relative min-w-[1400px] h-[500px] bg-white border-[10px] border-[#3d2b1f] rounded-lg shadow-2xl flex items-center px-10"
            style={{
              backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.05), 0 20px 50px rgba(0,0,0,0.2)'
            }}
          >
            {/* Whiteboard Header Decoration */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[#ddd] rounded-full opacity-50"></div>
            
            {/* Total Indicator in Board */}
            <div className="absolute top-6 right-10 flex items-center gap-2">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Koleksi: {images.length} / 15</span>
               <div className={`w-3 h-3 rounded-full ${images.length > 12 ? 'bg-error/40' : 'bg-primary/20'}`}></div>
            </div>

            {/* Render Images as Draggable Sticky Notes/Photos */}
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                drag
                dragConstraints={boardRef}
                dragElastic={0.02}
                dragMomentum={false}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                  x: idx * 100 + 50, // More compact spacing
                  y: (Math.random() * 150) - 75,
                  rotate: (Math.random() * 10) - 5
                }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
                whileDrag={{ scale: 1.1, zIndex: 100, rotate: 2 }}
                onTap={() => setSelectedImage(img)}
                className="absolute paper-card p-2 sm:p-2.5 irregular-border border-2 border-black/5 shadow-lg cursor-grab active:cursor-grabbing bg-white relative w-44 sm:w-56 aspect-[4/3] flex flex-col will-change-transform"
              >
                <div className="tape !w-12 sm:!w-20 !h-5 sm:!h-7 !-top-3 sm:!-top-4 !bg-primary/20 !backdrop-blur-none"></div>
                <div className="overflow-hidden rounded-sm flex-1 bg-gray-100">
                  <img 
                    src={img.src} 
                    alt="Memory" 
                    loading="lazy"
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                </div>
                {/* Random Magnets/Pins Decoration */}
                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full shadow-md ${idx % 3 === 0 ? 'bg-red-500' : idx % 3 === 1 ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
              </motion.div>
            ))}

            {/* Empty State */}
            {images.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-10">
                <ImageIcon size={80} weight="thin" />
                <p className="text-xl font-black uppercase tracking-[0.5em] mt-4">Papan Kosong</p>
              </div>
            )}
          </div>
        </div>
      </div>

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


