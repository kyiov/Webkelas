import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { api } from '../../lib/api';
import GlassCard from '../ui/GlassCard';

const SecretWall = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await api.getMessages();
      setMessages(data);
    };
    fetchMessages();

    // Re-fetch when local storage changes
    window.addEventListener('storage', fetchMessages);
    return () => window.removeEventListener('storage', fetchMessages);
  }, []);

  return (
    <section id="messages" className="py-32 bg-surface/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="flex items-center space-x-4 text-primary">
               <MessageCircle size={24} />
               <span className="font-mono text-xs uppercase tracking-[0.4em] font-black">Community</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-main uppercase tracking-tighter leading-[0.8]">
              The <br /> <span className="text-primary italic">Echoes.</span>
            </h2>
            
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center space-x-6 group"
            >
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-main group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all shadow-lg group-hover:shadow-primary/20">
                <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-muted group-hover:text-primary transition-colors">Submit an Echo</span>
            </motion.button>
          </motion.div>

          <div className="space-y-8">
            {messages.map((m, idx) => (
              <GlassCard 
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="!p-10 !bg-white/[0.01] hover:!border-primary/40 transition-all group"
              >
                <div className="flex items-start space-x-4 mb-6">
                   <Sparkles size={16} className="text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <p className="text-main text-xl md:text-2xl font-bold tracking-tight leading-snug">
                     "{m.text}"
                   </p>
                </div>
                
                <div className="flex justify-between items-center border-t border-border pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted font-bold">
                      {m.author}
                    </span>
                  </div>
                  <div className="flex flex-col items-end font-mono text-[8px] uppercase tracking-widest text-muted/40">
                    <span>{m.date || 'Today'}</span>
                    <span>{m.time}</span>
                  </div>
                </div>

              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecretWall;
