import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import { Camera } from '@phosphor-icons/react';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await api.getGallery();
      setImages(data);
    };
    fetchImages();
    window.addEventListener('storage', fetchImages);
    return () => window.removeEventListener('storage', fetchImages);
  }, []);

  return (
    <section id="gallery" className="py-20">
      <div className="flex flex-col items-center mb-12 text-center">
         <div className="badge badge-outline badge-primary mb-4 p-4 font-black uppercase tracking-widest">
           <Camera weight="duotone" size={16} className="mr-2" /> Archive
         </div>
         <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-2">Visu<span className="text-primary italic">als.</span></h2>
         <p className="text-xs opacity-40 uppercase tracking-[0.5em]">Memory Stream / 2026 Batch</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img, idx) => (
          <div key={idx} className="card bg-base-100 shadow-xl image-full border border-white/5 hover:scale-[1.02] transition-transform cursor-pointer group">
            <figure className="aspect-[3/4]">
              <img src={img.src} alt={img.title} className="grayscale group-hover:grayscale-0 transition-all duration-700" />
            </figure>
            <div className="card-body flex items-center justify-center p-4">
              <h2 className="card-title text-center text-2xl font-black uppercase tracking-tighter italic translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                {img.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
