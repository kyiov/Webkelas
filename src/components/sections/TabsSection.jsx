import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STRUKTUR_DATA, SCHEDULE_DATA } from '../../lib/constants';
import { UsersThree, CalendarBlank, UserCircleGear, Clock } from '@phosphor-icons/react';

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState('structure');

  return (
    <section id="tabs" className="py-20">
      <div className="flex flex-col items-center mb-10">
         <div className="tabs tabs-boxed bg-white/5 border border-white/10 p-1 !rounded-full">
            <button 
              onClick={() => setActiveTab('structure')}
              className={`tab tab-lg !rounded-full transition-all ${activeTab === 'structure' ? 'tab-active !bg-primary !text-white' : 'text-white/60'}`}
            >
              <UsersThree weight="duotone" className="mr-2" /> Structure
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`tab tab-lg !rounded-full transition-all ${activeTab === 'schedule' ? 'tab-active !bg-primary !text-white' : 'text-white/60'}`}
            >
              <CalendarBlank weight="duotone" className="mr-2" /> Schedule
            </button>
         </div>
      </div>

      <div className="glass-card !rounded-[2.5rem] p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'structure' ? (
            <motion.div 
              key="structure"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {STRUKTUR_DATA.map((item, idx) => (
                <div key={idx} className="card bg-white/5 border border-white/10 hover:border-primary/50 transition-all group p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                      <UserCircleGear size={32} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.jabatan}</h3>
                      <p className="text-sm text-primary font-black uppercase tracking-widest">{item.nama}</p>
                      <p className="text-[10px] text-white/40 mt-1">{item.deskripsi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(SCHEDULE_DATA).map(([day, subjects]) => (
                  <div key={day} className="flex flex-col space-y-4">
                    <div className="badge badge-primary badge-lg py-4 w-full font-black uppercase tracking-widest">{day}</div>
                    <ul className="space-y-2">
                      {subjects.map((sub, idx) => (
                        <li key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs flex items-center space-x-2">
                          <Clock size={14} weight="duotone" className="text-primary" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TabsSection;
