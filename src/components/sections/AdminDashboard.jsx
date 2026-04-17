import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Trash2, Plus, 
  Image as ImageIcon, MessageSquare, 
  X, Check, Lock, Shield
} from 'lucide-react';
import { api } from '../../lib/api';
import GlassCard from '../ui/GlassCard';

const AdminDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [newItem, setNewItem] = useState({ text: '', author: '', src: '', title: '' });
  
  // Stealth Session Token
  const SESSION_KEY = '_session_verify_v1_legacy';
  const [authenticated, setAuthenticated] = useState(localStorage.getItem(SESSION_KEY) === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  // Anti-Brute Force Stats
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);

  // New Secure Password
  const ADMIN_PASS = 'xiia1Smansa2326#';

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  // Lockout Timer Logic
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
        setLockTimeLeft(300); // 5 Minutes lockout
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

  const deleteGallery = async (idx) => {
    const updated = gallery.filter((_, i) => i !== idx);
    await api.updateGallery(updated);
    setGallery(updated);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-3xl"
    >
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col glass-card !bg-surface !border-border !rounded-[3rem] shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-border flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-main uppercase tracking-tighter">System Control</h2>
              <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted">Admin Panel v1.0</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface/50 text-muted hover:text-main transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {!authenticated ? (
            <form onSubmit={handleLogin} className="max-w-xs mx-auto py-24 text-center">
              {isLocked ? (
                <div className="space-y-4">
                   <p className="font-mono text-[10px] uppercase tracking-widest text-red-500 font-bold">System Locked</p>
                   <p className="text-3xl font-black text-red-500 font-mono">
                     {Math.floor(lockTimeLeft / 60)}:{(lockTimeLeft % 60).toString().padStart(2, '0')}
                   </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <input 
                    type="password"
                    placeholder="Terminal Key"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-surface/50 border p-4 rounded-2xl text-center font-mono text-sm outline-none transition-all ${error ? 'border-red-500 animate-shake' : 'border-border focus:border-primary'}`}
                  />
                  <button className="w-full py-4 bg-primary text-background font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-primary-hover transition-all">
                    Verify
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-12">
              {/* Tab Selector & Logout */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex space-x-4">
                  {[
                    { id: 'messages', icon: MessageSquare, label: 'Echoes' },
                    { id: 'gallery', icon: ImageIcon, label: 'Archives' }
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center space-x-3 px-6 py-3 rounded-2xl font-mono text-[9px] uppercase tracking-widest transition-all
                        ${activeTab === tab.id ? 'bg-primary text-background font-black' : 'bg-surface/50 text-muted hover:text-main'}
                      `}
                    >
                      <tab.icon size={14} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-2xl bg-red-500/10 text-red-500 font-mono text-[9px] uppercase tracking-widest font-black hover:bg-red-500 hover:text-white transition-all"
                >
                   Secure Logout
                </button>
              </div>

              {/* View/Edit List */}
              <AnimatePresence mode="wait">
                {activeTab === 'messages' ? (
                  <motion.div key="msg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                    {/* Add New */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 p-6 bg-white/[0.02] border border-border rounded-3xl">
                      <input 
                        placeholder="Echo text..." 
                        value={newItem.text} 
                        onChange={(e) => setNewItem({...newItem, text: e.target.value})}
                        className="bg-transparent border-b border-border p-2 font-medium focus:border-primary outline-none transition-all"
                      />
                      <input 
                        placeholder="Author" 
                        value={newItem.author}
                        onChange={(e) => setNewItem({...newItem, author: e.target.value})}
                        className="bg-transparent border-b border-border p-2 font-mono text-[10px] uppercase focus:border-primary outline-none"
                      />
                      <button onClick={addMessage} className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary transition-all hover:text-background">
                        <Plus size={20} />
                      </button>
                    </div>

                    {/* List */}
                    <div className="space-y-4">
                      {messages.map(m => (
                        <div key={m.id} className="flex justify-between items-center p-6 bg-white/[0.01] border border-border rounded-3xl group">
                          <div>
                            <p className="font-bold text-main mb-2 leading-tight">"{m.text}"</p>
                            <span className="font-mono text-[8px] uppercase tracking-widest text-muted">{m.author} &bull; {m.date || 'Today'} &bull; {m.time}</span>
                          </div>
                          <button onClick={() => deleteMessage(m.id)} className="p-2 text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="gal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                    {/* Add New */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 p-6 bg-white/[0.02] border border-border rounded-3xl">
                      <input 
                        placeholder="Image URL (Unsplash or direct)..." 
                        value={newItem.src} 
                        onChange={(e) => setNewItem({...newItem, src: e.target.value})}
                        className="bg-transparent border-b border-border p-2 font-mono text-[10px] focus:border-primary outline-none"
                      />
                      <input 
                        placeholder="Title" 
                        value={newItem.title}
                        onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                        className="bg-transparent border-b border-border p-2 font-black uppercase text-[10px] focus:border-primary outline-none"
                      />
                      <button onClick={addGallery} className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary transition-all hover:text-background">
                        <Plus size={20} />
                      </button>
                    </div>

                    {/* Grid List */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {gallery.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                          <img src={img.src} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" />
                          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                             <button onClick={() => deleteGallery(idx)} className="p-3 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-main transition-all">
                               <Trash2 size={20} />
                             </button>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="font-mono text-[7px] font-black uppercase tracking-widest text-main truncate">{img.title}</p>
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
    </motion.div>
  );
};

export default AdminDashboard;
