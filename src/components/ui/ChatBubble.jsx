import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatTeardropDots, PaperPlaneTilt, UserCircle, Minus, ArrowBendUpLeft, Smiley, X } from '@phosphor-icons/react';
import { api } from '../../lib/api';

const ChatBubble = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([]);
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [showReactFor, setShowReactFor] = useState(null);
  const scrollRef = useRef(null);

  const fetchMessages = async () => {
    const data = await api.getMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current && !replyTo) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setIsSubmitting(true);

    const authorName = newAuthor.trim() || 'Anonim';
    const replyData = replyTo ? { id: replyTo.id, author: replyTo.author, text: replyTo.text } : null;

    try {
      const updated = await api.saveMessage(newText, authorName, replyData);
      setMessages(updated);
      setNewText('');
      setNewAuthor('');
      setReplyTo(null);
    } catch (error) {
      console.error("Failed to save message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReact = async (id, emoji) => {
    setShowReactFor(null);
    try {
      const updated = await api.addReaction(id, emoji);
      setMessages(updated);
    } catch (e) {
      console.error(e);
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

  const AVAILABLE_EMOJIS = ['❤️', '😂', '👍', '🔥', '😢'];

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[380px] sm:w-[500px] h-[700px] paper-card irregular-border border-2 border-black/5 shadow-2xl flex flex-col overflow-hidden scrapbook-font pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 bg-primary/10 text-primary flex items-center justify-between border-b-2 border-dashed border-primary/20 relative">
              <div className="tape !w-24 !h-7 !-top-3"></div>
              <div className="flex items-center gap-3 mt-2">
                <ChatTeardropDots weight="duotone" size={24} />
                <div>
                  <h3 className="font-black uppercase tracking-tighter text-lg leading-none">Chatting</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">Chatting Yuk</p>
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
              className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:15px_15px] pb-10"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center p-10">
                  <ChatTeardropDots size={48} weight="duotone" />
                  <p className="text-xs uppercase tracking-widest mt-4 leading-relaxed font-bold">
                    Kosong nih. <br /> Yuk mulai ngobrol!
                  </p>
                </div>
              ) : (
                messages.slice().reverse().map((m, idx) => (
                  <div key={m.id} className={`chat ${idx % 2 === 0 ? 'chat-start' : 'chat-end'} relative group`}>
                    <div className="chat-image avatar">
                      <div className={`${getAvatarColor(m.author)} text-white rounded-full w-8 h-8 shadow-md border-2 border-white flex items-center justify-center`}>
                        <UserCircle size={20} weight="duotone" />
                      </div>
                    </div>
                    <div className="chat-header flex items-center gap-2 mb-1">
                      <span className="opacity-50 text-[12px] uppercase tracking-widest font-black">{m.author}</span>
                      <span className="opacity-40 text-[9px] uppercase tracking-tighter font-bold italic">{m.time}</span>
                    </div>

                    <div className={`chat-bubble flex flex-col text-base shadow-md py-3 px-5 min-h-0 irregular-border border border-black/5 relative ${idx % 2 === 0 ? 'bg-white text-neutral rotate-1' : 'bg-primary text-white -rotate-1'}`}>
                      {m.replyTo && (
                        <div className={`mb-2 pl-3 border-l-4 text-sm opacity-80 ${idx % 2 === 0 ? 'border-primary/30' : 'border-white/30'}`}>
                          <span className="font-bold text-[10px] uppercase block mb-1">Membalas {m.replyTo.author}:</span>
                          <p className="line-clamp-2 italic">{m.replyTo.text}</p>
                        </div>
                      )}
                      <span>{m.text}</span>
                    </div>
                    
                    {/* Reactions & Actions */}
                    <div className={`chat-footer mt-2 flex flex-col ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}>
                      {m.reactions && Object.keys(m.reactions).length > 0 && (
                        <div className="flex gap-1 mb-1 flex-wrap max-w-[200px]">
                          {Object.entries(m.reactions).map(([emoji, count]) => (
                            <div key={emoji} className="bg-base-200/80 backdrop-blur-sm border border-base-content/10 rounded-full px-2 py-0.5 text-xs flex items-center gap-1 cursor-pointer hover:bg-base-300 transition-colors" onClick={() => handleReact(m.id, emoji)}>
                              <span>{emoji}</span>
                              <span className="font-bold opacity-60 text-[10px]">{count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Action Buttons (Hover) */}
                      <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative ${showReactFor === m.id ? '!opacity-100' : ''}`}>
                        <button onClick={() => setReplyTo(m)} className="btn btn-xs btn-ghost btn-circle" title="Balas">
                          <ArrowBendUpLeft size={14} weight="bold" />
                        </button>
                        <div className="relative">
                          <button onClick={() => setShowReactFor(showReactFor === m.id ? null : m.id)} className="btn btn-xs btn-ghost btn-circle" title="Beri Reaksi">
                            <Smiley size={14} weight="bold" />
                          </button>
                          
                          <AnimatePresence>
                            {showReactFor === m.id && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                className={`absolute z-50 bottom-full mb-2 bg-base-100 border border-base-content/10 shadow-xl rounded-2xl p-2 flex gap-2 ${idx % 2 === 0 ? 'left-0' : 'right-0'}`}
                              >
                                {AVAILABLE_EMOJIS.map(emoji => (
                                  <button key={emoji} onClick={() => handleReact(m.id, emoji)} className="hover:scale-125 transition-transform text-xl">
                                    {emoji}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white/50 backdrop-blur-sm border-t-2 border-dashed border-black/5 relative">
              <AnimatePresence>
                {replyTo && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-12 left-5 right-5 bg-base-200 border border-base-content/10 rounded-t-xl px-4 py-2 flex items-center justify-between shadow-lg"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <span className="text-[10px] font-black uppercase text-primary block">Membalas pesan {replyTo.author}</span>
                      <p className="text-xs opacity-60 truncate">{replyTo.text}</p>
                    </div>
                    <button onClick={() => setReplyTo(null)} className="btn btn-xs btn-circle btn-ghost text-base-content">
                      <X size={14} weight="bold" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className={`space-y-4 ${replyTo ? 'pt-2' : ''}`}>
                <div className="relative">
                  <textarea
                    className="textarea textarea-bordered w-full h-32 bg-base-100 border-2 border-base-content/5 focus:border-primary transition-all text-base resize-none p-4 custom-scrollbar text-base-content placeholder:opacity-30 !rounded-2xl"
                    placeholder="Tulis pesan..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Nama Kamu (Opsional)"
                    className="input input-bordered flex-1 bg-base-100 border-2 border-base-content/5 focus:border-primary transition-all uppercase tracking-widest text-xs font-black text-base-content !rounded-xl h-12"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !newText.trim()}
                    className="btn btn-primary shadow-lg !rounded-xl px-6 h-12"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <PaperPlaneTilt weight="bold" size={20} />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBubble;
