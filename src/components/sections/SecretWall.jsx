import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatTeardropDots, PaperPlaneTilt, Sparkle, X, UserCircle } from '@phosphor-icons/react';
import { api } from '../../lib/api';

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
    <section id="messages" className="py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div className="badge badge-primary badge-outline p-4 font-black uppercase tracking-widest">
             <ChatTeardropDots weight="duotone" size={16} className="mr-2" /> Community
          </div>
          <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
            The <br /> <span className="text-primary italic">Echoes.</span>
          </h2>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-lg rounded-full px-8 shadow-xl shadow-primary/20">
            Submit an Echo <PaperPlaneTilt weight="bold" size={20} className="ml-2" />
          </button>
        </div>

        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
              <ChatTeardropDots size={48} weight="duotone" />
              <p className="text-xs uppercase tracking-widest mt-4">No echoes yet.</p>
            </div>
          ) : (
            messages.map((m, idx) => (
              <div key={m.id} className={`chat ${idx % 2 === 0 ? 'chat-start' : 'chat-end'}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <UserCircle size={40} weight="duotone" />
                  </div>
                </div>
                <div className="chat-header opacity-50 text-[10px] mb-1 uppercase tracking-widest">
                  {m.author}
                </div>
                <div className={`chat-bubble shadow-xl border border-white/5 ${idx % 2 === 0 ? 'bg-neutral text-white' : 'bg-primary text-white'}`}>
                  {m.text}
                </div>
                <div className="chat-footer opacity-30 text-[8px] uppercase tracking-tighter mt-1">
                  {m.time}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal using DaisyUI classes */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box glass-card !bg-neutral !border-white/10 !rounded-[2.5rem] p-10">
            <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6"><X size={20} weight="bold" /></button>
            <h3 className="font-black text-3xl uppercase tracking-tighter mb-2">Write an <span className="text-primary">Echo.</span></h3>
            <p className="text-xs opacity-50 uppercase tracking-widest mb-8">Send a message to the archive.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea 
                className="textarea textarea-bordered w-full h-32 bg-white/5 border-white/10 focus:border-primary transition-all"
                placeholder="What's on your mind?"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                required
              ></textarea>
              <input 
                type="text" 
                placeholder="Name (Optional)" 
                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary transition-all"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full !rounded-2xl mt-4">
                {isSubmitting ? <span className="loading loading-spinner"></span> : 'Transmit Echo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default SecretWall;
