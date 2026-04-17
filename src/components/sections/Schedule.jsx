import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Zap } from 'lucide-react';
import { SCHEDULE_DATA } from '../../lib/constants';
import GlassCard from '../ui/GlassCard';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(Object.keys(SCHEDULE_DATA)[0]);

  return (
    <section id="schedule" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-20">
          <div className="flex items-center space-x-4 text-primary mb-6">
             <Calendar size={20} />
             <span className="font-mono text-xs uppercase tracking-[0.4em] font-black">Timeline</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-main tracking-tighter uppercase text-center">
            The Daily <span className="text-primary">Routine.</span>
          </h2>
        </div>

        {/* Day Selector - @har style custom tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-20 max-w-4xl mx-auto px-4 py-2 glass-card !rounded-full !border-border">
          {Object.keys(SCHEDULE_DATA).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`
                relative px-6 md:px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all
                ${activeDay === day ? 'text-primary' : 'text-muted hover:text-main'}
              `}
            >
              {activeDay === day && (
                <motion.div
                  layoutId="activeDay"
                  className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{day}</span>
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-6"
            >
              {SCHEDULE_DATA[activeDay].map((item, idx) => (
                <GlassCard 
                  key={idx}
                  className="flex items-center justify-between !py-8 !px-10 group transition-all duration-500"
                >
                  <div className="flex items-center space-x-10">
                    <span className="text-4xl md:text-6xl font-black text-main/5 group-hover:text-primary/20 transition-colors font-mono italic">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xl md:text-3xl font-black text-main uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                        {item}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted mt-2">Section Module</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-full bg-white/5 border border-border text-muted group-hover:text-primary group-hover:border-primary/30 transition-all group-hover:rotate-12">
                    <Clock size={24} />
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
