import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatTeardropDots, PaperPlaneTilt, Sparkle, X, UserCircle } from '@phosphor-icons/react';
import { api } from '../../lib/api';
import GlassCard from '../ui/GlassCard';

const SecretWall = () => {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMessages = async () => {
    const data = await api.getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();

    // Re-fetch when local storage changes
    window.addEventListener('storage', fetchMessages);
    return () => window.removeEventListener('storage', fetchMessages);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    setIsSubmitting(true);
    try {
      const updated = await api.saveMessage(newText, newAuthor.trim() || 'Anonim');
      setMessages(updated);
      setNewText('');
      setNewAuthor('');
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
               <ChatTeardropDots weight="duotone" size={24} />
               <span className="font-mono text-xs uppercase tracking-[0.4em] font-black">Community</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-main uppercase tracking-tighter leading-[0.8]">
              The <br /> <span className="text-primary italic">Echoes.</span>
            </h2>
            
            <motion.button 
              onClick={() => setIsModalOpen(true)}
              whileHover={{ x: 10 }}
              className="flex items-center space-x-6 group"
            >
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-main group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all shadow-lg group-hover:shadow-primary/20">
                <PaperPlaneTilt weight="duotone" size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-muted group-hover:text-primary transition-colors">Submit an Echo</span>
            </motion.button>
          </motion.div>

          <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-muted opacity-30"
                >
                  <ChatTeardropDots weight="duotone" size={48} className="mb-4" />
                  <p className="font-mono text-xs uppercase tracking-widest">No echoes yet. Be the first.</p>
                </motion.div>
              ) : (
                messages.map((m, idx) => (
                  <GlassCard 
                    key={m.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.1 }}
                    className="!p-10 !bg-white/[0.01] hover:!border-primary/40 transition-all group"
                  >
                    <div className="flex items-start space-x-4 mb-6">
                       <Sparkle weight="duotone" size={16} className="text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Message Modal @har style */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass-card !p-10 relative z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-muted hover:text-main transition-colors"
              >
                <X weight="bold" size={24} />
              </button>

              <div className="mb-10">
                <h3 className="text-3xl font-black text-main uppercase tracking-tighter mb-2">Write an <span className="text-primary">Echo.</span></h3>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Send a message to the archive.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary font-bold ml-2">Your Message</label>
                  <textarea 
                    autoFocus
                    required
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full bg-surface/50 border border-border rounded-2xl p-6 text-main placeholder:text-muted/30 focus:outline-none focus:border-primary/50 transition-all min-h-[150px] resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary font-bold ml-2">Name (Optional)</label>
                  <div className="relative">
                    <UserCircle weight="duotone" size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted/50" />
                    <input 
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Anonim"
                      className="w-full bg-surface/50 border border-border rounded-full py-4 pl-14 pr-6 text-main placeholder:text-muted/30 focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting || !newText.trim()}
                  type="submit"
                  className="w-full py-5 bg-primary text-background font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:shadow-none mt-4 flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <span>Transmit Echo</span>
                      <PaperPlaneTilt weight="bold" size={16} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SecretWall;
