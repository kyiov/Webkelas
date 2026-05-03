import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatTeardropDots, PaperPlaneTilt, UserCircle, Minus } from '@phosphor-icons/react';
import { api } from '../../lib/api';

const ChatBubble = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([]);
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef(null);

  const fetchMessages = async () => {
    const data = await api.getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setIsSubmitting(true);
    try {
      const updated = await api.saveMessage(newText, newAuthor.trim() || 'Anonim');
      setMessages(updated);
      setNewText('');
      setNewAuthor('');
    } catch (error) {
      console.error("Failed to save message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-primary', 'bg-secondary', 'bg-accent', 
      'bg-info', 'bg-success', 'bg-warning', 'bg-error'
    ];
    const index = (name || 'A').charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[320px] sm:w-[380px] h-[500px] paper-card irregular-border border-2 border-black/5 shadow-2xl flex flex-col overflow-hidden scrapbook-font pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 bg-primary/10 text-primary flex items-center justify-between border-b-2 border-dashed border-primary/20 relative">
              <div className="tape !w-24 !h-7 !-top-3"></div>
              <div className="flex items-center gap-3 mt-2">
                <ChatTeardropDots weight="duotone" size={24} />
                <div>
                  <h3 className="font-black uppercase tracking-tighter text-lg leading-none">Chatting</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">Community Voice</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-xs btn-circle text-primary hover:bg-primary/10 mt-2"
              >
                <Minus weight="bold" size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:15px_15px]"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center p-10">
                  <ChatTeardropDots size={48} weight="duotone" />
                  <p className="text-xs uppercase tracking-widest mt-4 leading-relaxed font-bold">
                    Kosong nih. <br/> Yuk mulai ngobrol!
                  </p>
                </div>
              ) : (
                messages.map((m, idx) => (
                  <div key={m.id} className={`chat ${idx % 2 === 0 ? 'chat-start' : 'chat-end'}`}>
                    <div className="chat-image avatar">
                      <div className={`${getAvatarColor(m.author)} text-white rounded-full w-8 h-8 shadow-md border-2 border-white flex items-center justify-center`}>
                        <UserCircle size={20} weight="duotone" />
                      </div>
                    </div>
                    <div className="chat-header opacity-50 text-[10px] mb-1 uppercase tracking-widest font-black">
                      {m.author}
                    </div>
                    <div className={`chat-bubble text-sm shadow-md py-2 px-4 min-h-0 irregular-border border border-black/5 ${idx % 2 === 0 ? 'bg-white text-neutral rotate-1' : 'bg-primary text-white -rotate-1'}`}>
                      {m.text}
                    </div>
                    <div className="chat-footer opacity-40 text-[9px] uppercase tracking-tighter mt-1 font-bold italic">
                      {m.time}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 backdrop-blur-sm border-t-2 border-dashed border-black/5">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <textarea 
                    className="textarea textarea-bordered w-full h-20 bg-base-100 border-2 border-base-content/5 focus:border-primary transition-all text-sm resize-none pr-10 custom-scrollbar text-base-content placeholder:opacity-30"
                    placeholder="Tulis pesan rahasia..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    required
                  ></textarea>
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !newText.trim()} 
                    className="absolute bottom-3 right-3 btn btn-circle btn-primary btn-xs shadow-lg"
                  >
                    {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : <PaperPlaneTilt weight="bold" size={12} />}
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="Nama Kamu (Opsional)" 
                  className="input input-bordered input-xs w-full bg-base-100 border-2 border-base-content/5 focus:border-primary transition-all uppercase tracking-widest text-[10px] font-black text-base-content"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBubble;
