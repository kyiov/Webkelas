import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gear, Trash, PlusCircle, 
  Image as ImageIcon, ChatTeardropDots, 
  X, Check, LockSimple, ShieldCheck
} from '@phosphor-icons/react';
import { api } from '../../lib/api';

const AdminDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [newItem, setNewItem] = useState({ text: '', author: '', src: '', title: '' });
  
  const SESSION_KEY = '_session_verify_v1_xiia1';
  const [authenticated, setAuthenticated] = useState(localStorage.getItem(SESSION_KEY) === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);

  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'xiia1Smansa2326#';

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  useEffect(() => {
    let timer;
    if (isLocked && lockTimeLeft > 0) {
      timer = setInterval(() => {
        setLockTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (lockTimeLeft === 0) {
      setIsLocked(false);
      setFailedAttempts(0);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockTimeLeft]);

  const loadData = async () => {
    const [m, g] = await Promise.all([api.getMessages(), api.getGallery()]);
    setMessages(m);
    setGallery(g);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLocked) return;
    if (password === ADMIN_PASS) {
      setAuthenticated(true);
      localStorage.setItem(SESSION_KEY, 'true');
      setError(false);
      setFailedAttempts(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setError(true);
      setTimeout(() => setError(false), 1000);
      if (newAttempts >= 5) {
        setIsLocked(true);
        setLockTimeLeft(300);
      }
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem(SESSION_KEY);
    onClose();
  };

  const addMessage = async () => {
    if (!newItem.text) return;
    const updated = await api.saveMessage(newItem.text, newItem.author || 'Anonim');
    setMessages(updated);
    setNewItem({ ...newItem, text: '', author: '' });
  };

  const deleteMessage = async (id) => {
    const updated = await api.deleteMessage(id);
    setMessages(updated);
  };

  const addGallery = async () => {
    if (!newItem.src) return;
    const updated = await api.addImage(newItem.src, newItem.title || 'Untitled');
    setGallery(updated);
    setNewItem({ ...newItem, src: '', title: '' });
  };

  const deleteGallery = async (id) => {
    const updated = await api.deleteGallery(id);
    setGallery(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl glass-card !bg-base-100 !border-base-content/10 !rounded-[3rem] p-0 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b border-base-content/5 flex justify-between items-center bg-base-200/50">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/20 rounded-2xl text-primary">
              <Gear weight="duotone" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-base-content">System Control</h2>
              <p className="text-[8px] uppercase tracking-[0.4em] opacity-40 text-base-content">Admin Panel v2.0</p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-circle text-base-content">
            <X size={24} weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {!authenticated ? (
            <div className="max-w-md mx-auto py-12">
                 <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="card bg-base-200 shadow-xl border border-base-content/5 !rounded-[2.5rem] overflow-hidden"
               >
                 <div className="card-body items-center text-center p-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                       <LockSimple weight="duotone" size={40} />
                    </div>
                    <h2 className="card-title text-2xl font-black uppercase tracking-tighter mb-2">Restricted Access</h2>
                    <p className="text-xs opacity-50 uppercase tracking-widest mb-8">Enter terminal key to initialize session</p>

                    <form onSubmit={handleLogin} className="w-full space-y-6">
                      {isLocked ? (
                        <div className="alert alert-error !rounded-2xl flex flex-col gap-2 p-6 shadow-inner">
                          <div className="flex items-center gap-2">
                             <ShieldCheck weight="bold" size={20} />
                             <span className="font-bold uppercase text-xs">Security Protocol Active</span>
                          </div>
                          <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold italic">
                            System Locked: {Math.floor(lockTimeLeft / 60)}:{(lockTimeLeft % 60).toString().padStart(2, '0')}
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text uppercase text-[10px] font-black tracking-widest opacity-40 ml-2">Terminal Key</span>
                            </label>
                            <input 
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className={`input input-bordered w-full bg-base-100/50 border-base-content/10 font-mono text-center text-xl tracking-[0.5em] focus:border-primary !rounded-2xl shadow-inner ${error ? 'input-error animate-shake' : ''}`}
                              autoFocus
                            />
                            {error && (
                              <label className="label">
                                <span className="label-text-alt text-error uppercase font-bold tracking-widest">Authentication Failed</span>
                              </label>
                            )}
                          </div>
                          <button type="submit" className="btn btn-primary w-full !rounded-2xl uppercase tracking-[0.2em] font-black shadow-lg shadow-primary/20">
                            Unlock Dashboard
                          </button>
                        </>
                      )}
                    </form>
                 </div>
               </motion.div>
               <p className="text-center mt-8 text-[8px] uppercase tracking-[0.5em] opacity-20">Secure Data Management Node</p>
            </div>
          ) : (
            <div className="space-y-10">
               <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="tabs tabs-boxed bg-base-content/5 p-1 !rounded-2xl">
                    <button onClick={() => setActiveTab('messages')} className={`tab !rounded-xl ${activeTab === 'messages' ? 'tab-active !bg-primary' : ''}`}>
                      <ChatTeardropDots weight="duotone" className="mr-2" /> Echoes
                    </button>
                    <button onClick={() => setActiveTab('gallery')} className={`tab !rounded-xl ${activeTab === 'gallery' ? 'tab-active !bg-primary' : ''}`}>
                      <ImageIcon weight="duotone" className="mr-2" /> Archives
                    </button>
                  </div>
                  <button onClick={handleLogout} className="btn btn-error btn-outline btn-sm !rounded-xl">Secure Logout</button>
               </div>

               <AnimatePresence mode="wait">
                  {activeTab === 'messages' ? (
                    <motion.div key="msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                       <div className="join w-full">
                          <input 
                            placeholder="Echo text..." 
                            className="input input-bordered join-item w-full bg-base-content/5 border-base-content/10 focus:border-primary"
                            value={newItem.text}
                            onChange={(e) => setNewItem({...newItem, text: e.target.value})}
                          />
                          <input 
                            placeholder="Author" 
                            className="input input-bordered join-item w-48 bg-base-content/5 border-base-content/10 focus:border-primary"
                            value={newItem.author}
                            onChange={(e) => setNewItem({...newItem, author: e.target.value})}
                          />
                          <button onClick={addMessage} className="btn btn-primary join-item"><PlusCircle size={24} weight="duotone" /></button>
                       </div>

                       <div className="grid gap-4">
                          {messages.map(m => (
                            <div key={m.id} className="bg-base-content/5 border border-base-content/5 p-4 rounded-2xl flex justify-between items-center group">
                               <div>
                                  <p className="font-bold">"{m.text}"</p>
                                  <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">{m.author} &bull; {m.time}</p>
                               </div>
                               <button onClick={() => deleteMessage(m.id)} className="btn btn-ghost btn-circle text-error opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Trash size={20} weight="duotone" />
                               </button>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div key="gal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                       <div className="join w-full">
                          <input 
                            placeholder="Image URL..." 
                            className="input input-bordered join-item w-full bg-base-content/5 border-base-content/10 focus:border-primary"
                            value={newItem.src}
                            onChange={(e) => setNewItem({...newItem, src: e.target.value})}
                          />
                          <input 
                            placeholder="Title" 
                            className="input input-bordered join-item w-48 bg-base-content/5 border-base-content/10 focus:border-primary"
                            value={newItem.title}
                            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                          />
                          <button onClick={addGallery} className="btn btn-primary join-item"><PlusCircle size={24} weight="duotone" /></button>
                       </div>

                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {gallery.map((img, idx) => (
                            <div key={img.id || idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-base-content/5">
                               <img src={img.src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={img.title} />
                               <div className="absolute inset-0 bg-neutral/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => deleteGallery(img.id)} className="btn btn-error btn-circle"><Trash size={20} weight="duotone" /></button>
                               </div>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
