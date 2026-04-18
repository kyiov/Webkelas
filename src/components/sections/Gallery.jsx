import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Camera, ArrowLeft, ArrowRight } from '@phosphor-icons/react';

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
    <section id="gallery" className="py-10">
      <div className="flex flex-col items-center mb-12 text-center">
         <div className="badge badge-outline badge-primary mb-4 p-4 font-black uppercase tracking-widest">
           <Camera weight="duotone" size={16} className="mr-2" /> Archive
         </div>
         <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-2">Memory <span className="text-primary italic">Gallery.</span></h2>
      </div>

      {images.length === 0 ? (
        <div className="bg-base-200 border-2 border-dashed border-base-300 rounded-[3rem] p-20 text-center opacity-30">
          <Camera size={48} weight="duotone" className="mx-auto mb-4" />
          <p className="uppercase tracking-widest text-sm font-bold">No images in gallery yet.</p>
          <p className="text-xs mt-2 italic">Add images from the Admin Dashboard</p>
        </div>
      ) : (
        <div className="relative group">
          <div className="carousel carousel-center w-full p-4 space-x-6 bg-neutral/5 rounded-[3rem]">
            {images.map((img, idx) => (
              <div key={idx} id={`slide${idx}`} className="carousel-item relative">
                <div className="card w-80 lg:w-96 bg-base-100 shadow-2xl border border-white/5 overflow-hidden group-hover:scale-[1.02] transition-transform">
                  <figure className="aspect-video relative">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" loading="lazy" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                       <h3 className="text-white font-bold uppercase tracking-widest text-sm">{img.title}</h3>
                    </div>
                  </figure>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Navigation Hints */}
          <div className="flex justify-center gap-2 mt-8">
             <div className="badge badge-ghost badge-sm py-3 opacity-30 italic">Drag or Scroll to Explore</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
