import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../../lib/api';
import { GALLERY_IMAGES } from '../../lib/constants';
import { Camera, ArrowsClockwise } from '@phosphor-icons/react';
import { motion, useAnimation } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [positions, setPositions] = useState([]);
  const controls = useAnimation();

  const generateRandomPositions = useCallback((count) => {
    return Array.from({ length: count }).map(() => ({
      x: Math.random() * 100 - 50, // Range -50 to 50
      y: Math.random() * 40 - 20, // Range -20 to 20
      rotate: Math.random() * 30 - 15, // Range -15 to 15 deg
    }));
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await api.getGallery();
      const finalImages = data.length > 0 ? data : GALLERY_IMAGES;
      setImages(finalImages);
      setPositions(generateRandomPositions(finalImages.length));
    };
    fetchImages();
    window.addEventListener('storage', fetchImages);
    return () => window.removeEventListener('storage', fetchImages);
  }, [generateRandomPositions]);

  // Shake detection logic
  useEffect(() => {
    let lastX, lastY, lastZ;
    let threshold = 15; // Shake sensitivity

    const handleMotion = (event) => {
      let acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      if (lastX !== undefined) {
        let deltaX = Math.abs(lastX - acceleration.x);
        let deltaY = Math.abs(lastY - acceleration.y);
        let deltaZ = Math.abs(lastZ - acceleration.z);

        if ((deltaX > threshold && deltaY > threshold) || 
            (deltaX > threshold && deltaZ > threshold) || 
            (deltaY > threshold && deltaZ > threshold)) {
          shufflePile();
        }
      }

      lastX = acceleration.x;
      lastY = acceleration.y;
      lastZ = acceleration.z;
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  const shufflePile = () => {
    setPositions(generateRandomPositions(images.length));
  };

  return (
    <motion.section 
      id="gallery" 
      className="py-20 relative min-h-[800px] flex flex-col items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center mb-12 text-center px-4 z-10">
         <div className="badge badge-primary badge-outline mb-6 p-4 font-black uppercase tracking-widest scrapbook-font">
           <Camera weight="duotone" size={16} className="mr-2" /> Memory Pile
         </div>
         <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-4 leading-none text-neutral drop-shadow-sm">
           Tumpukan <span className="text-primary italic font-black">Kenangan.</span>
         </h2>
         <p className="max-w-2xl text-xs opacity-60 uppercase tracking-[0.2em] text-neutral font-bold">Tarik, Lempar, dan Goyangkan HP untuk Acak!</p>
         
         <button 
           onClick={shufflePile}
           className="mt-6 btn btn-circle btn-primary btn-outline btn-sm shadow-lg hover:rotate-180 transition-transform duration-500"
           title="Shuffle Pile"
         >
           <ArrowsClockwise size={18} weight="bold" />
         </button>
      </div>

      {/* Memory Pile Area */}
      <div className="relative w-full h-[600px] max-w-5xl mt-10 perspective-1000">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            drag
            dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: positions[idx]?.x || 0,
              y: positions[idx]?.y || 0,
              rotate: positions[idx]?.rotate || 0
            }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: idx * 0.05 
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 lg:w-72 paper-card p-3 irregular-border cursor-grab active:cursor-grabbing will-change-transform bg-white dark:bg-[#fdf6e3]"
          >
            <div className="tape !w-20 !h-8"></div>
            <div className="overflow-hidden rounded-sm h-32 sm:h-44 lg:h-52 bg-base-300">
              <img 
                src={img.src} 
                alt={img.title} 
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none" 
              />
            </div>
            <div className="mt-4 text-center">
               <p className="text-[10px] sm:text-xs font-black uppercase tracking-tighter opacity-70 text-neutral line-clamp-1">{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Gallery;
