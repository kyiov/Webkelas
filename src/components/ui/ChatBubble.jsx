import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatTeardropDots, PaperPlaneTilt, X, UserCircle, Minus } from '@phosphor-icons/react';
import { api } from '../../lib/api';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    const interval = setInterval(fetchMessages, 10000); // Poll every 10s for new messages
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

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] glass-card !bg-base-200/90 border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-primary-content flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ChatTeardropDots weight="duotone" size={24} />
                <div>
                  <h3 className="font-black uppercase tracking-tighter text-lg leading-none">Chatting</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">Community Voice</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-xs btn-circle text-primary-content hover:bg-white/10"
              >
                <Minus weight="bold" size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-base-100/30"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center p-10">
                  <ChatTeardropDots size={48} weight="duotone" />
                  <p className="text-[10px] uppercase tracking-widest mt-4 leading-relaxed text-base-content">
                    No messages in the chat yet. Start the conversation!
                  </p>
                </div>
              ) : (
                messages.map((m, idx) => (
                  <div key={m.id} className={`chat ${idx % 2 === 0 ? 'chat-start' : 'chat-end'}`}>
                    <div className="chat-image avatar">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <UserCircle size={32} weight="duotone" />
                      </div>
                    </div>
                    <div className="chat-header opacity-50 text-[9px] mb-1 uppercase tracking-widest font-bold text-base-content">
                      {m.author}
                    </div>
                    <div className={`chat-bubble text-sm shadow-md border border-white/5 py-2 px-4 min-h-0 ${idx % 2 === 0 ? 'bg-base-300 text-base-content' : 'bg-primary text-primary-content'}`}>
                      {m.text}
                    </div>
                    <div className="chat-footer opacity-50 text-[8px] uppercase tracking-tighter mt-1 font-black text-base-content">
                      {m.time}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-base-200 border-t border-white/5">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <textarea 
                    className="textarea textarea-bordered w-full h-20 bg-base-100/50 border-white/10 focus:border-primary transition-all text-sm resize-none pr-10 custom-scrollbar"
                    placeholder="Type your message..."
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
                  placeholder="Your Name (Optional)" 
                  className="input input-bordered input-xs w-full bg-base-100/50 border-white/10 focus:border-primary transition-all uppercase tracking-widest text-[9px] font-bold"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`btn btn-circle shadow-2xl relative ${isOpen ? 'btn-neutral' : 'btn-primary'} w-14 h-14`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} weight="bold" className="text-primary-content" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <ChatTeardropDots size={28} weight="duotone" className="text-primary-content" />
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-content opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-content"></span>
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBubble;
