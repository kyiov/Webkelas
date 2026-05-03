import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gear, Trash, PlusCircle,
  Image as ImageIcon, ChatTeardropDots,
  X, Check, LockSimple, ShieldCheck,
  UploadSimple
} from '@phosphor-icons/react';
import { api } from '../../lib/api';

const AdminDashboard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [newItem, setNewItem] = useState({ src: '', title: '' });
  const fileInputRef = useRef(null);

  const SESSION_KEY = '_session_verify_v1_xiia1';
  const [authenticated, setAuthenticated] = useState(localStorage.getItem(SESSION_KEY) === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  const loadData = async () => {
    const [m, g] = await Promise.all([api.getMessages(), api.getGallery()]);
    setMessages(m);
    setGallery(g);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await api.login(password);

    if (result.success) {
      setAuthenticated(true);
      localStorage.setItem(SESSION_KEY, 'true');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem(SESSION_KEY);
    onClose();
  };

  const deleteMessage = async (id) => {
    const updated = await api.deleteMessage(id);
    setMessages(updated);
  };

  const addGallery = async () => {
    if (!newItem.src) return;
    const updated = await api.addImage(newItem.src, newItem.title || 'Memory');
    setGallery(updated);
    setNewItem({ ...newItem, src: '', title: '' });
  };

  const deleteGallery = async (id) => {
    const updated = await api.deleteGallery(id);
    setGallery(updated);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Tolong pilih file gambar!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      const updated = await api.addImage(base64String, file.name);
      setGallery(updated);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
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
              <h2 className="text-2xl font-black uppercase tracking-tighter text-base-content">Admin Kontrol</h2>
              <p className="text-[8px] uppercase tracking-[0.4em] opacity-40 text-base-content">Pengaturan Galeri XII A1</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {authenticated && (
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Sesi Aktif</span>
                <span className="text-[8px] opacity-40 uppercase">Administrator</span>
              </div>
            )}
            <button onClick={onClose} className="btn btn-ghost btn-circle text-base-content hover:bg-base-content/10">
              <X size={24} weight="bold" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-base-100">
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
                  <h2 className="card-title text-2xl font-black uppercase tracking-tighter mb-2 text-base-content">Akses Terbatas</h2>
                  <p className="text-xs opacity-50 uppercase tracking-widest mb-8 text-base-content">Masukkan kata sandi admin</p>

                  <form onSubmit={handleLogin} className="w-full space-y-6">
                    <>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text uppercase text-[10px] font-black tracking-widest opacity-40 ml-2 text-base-content">Kata Sandi</span>
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`input input-bordered w-full bg-base-100/50 border-base-content/10 font-mono text-center text-xl tracking-[0.5em] focus:border-primary !rounded-2xl shadow-inner text-base-content ${error ? 'input-error animate-shake' : ''}`}
                          autoFocus
                        />
                        {error && (
                          <label className="label">
                            <span className="label-text-alt text-error uppercase font-bold tracking-widest">Kata Sandi Salah</span>
                          </label>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary w-full !rounded-2xl uppercase tracking-[0.2em] font-black shadow-lg shadow-primary/20">
                        Masuk
                      </button>
                    </>
                  </form>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Quick Help Guide */}
              <div className="bg-primary/5 rounded-3xl p-4 border border-primary/10 flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-xl text-primary mt-1">
                  <ShieldCheck size={20} weight="duotone" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-1 text-base-content">Panduan Admin</h4>
                  <p className="text-[10px] leading-relaxed opacity-60 text-base-content">
                    {activeTab === 'gallery'
                      ? 'Anda bisa menambah foto melalui Link atau pilih langsung dari HP/Laptop. Batas maksimal adalah 15 foto.'
                      : 'Anda dapat mengelola pesan yang masuk dan menghapusnya jika diperlukan.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="tabs tabs-boxed bg-base-content/5 p-1 !rounded-2xl border border-base-content/5">
                  <button onClick={() => setActiveTab('gallery')} className={`tab !rounded-xl transition-all ${activeTab === 'gallery' ? 'tab-active !bg-primary !text-white' : 'text-base-content'}`}>
                    <ImageIcon weight="bold" className="mr-2" /> Kelola Galeri
                  </button>
                  <button onClick={() => setActiveTab('messages')} className={`tab !rounded-xl transition-all ${activeTab === 'messages' ? 'tab-active !bg-primary !text-white' : 'text-base-content'}`}>
                    <ChatTeardropDots weight="bold" className="mr-2" /> Kelola Pesan
                  </button>
                </div>
                <button onClick={handleLogout} className="btn btn-error btn-outline btn-sm !rounded-xl px-6 border-2 font-bold uppercase tracking-widest text-[10px]">Keluar</button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'gallery' ? (
                  <motion.div key="gal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="bg-base-200 p-6 rounded-[2rem] border border-base-content/5 space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-widest opacity-40 text-base-content">Unggah Foto Baru</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="join w-full">
                          <input
                            placeholder="Tempel link foto (https://...)"
                            className="input input-bordered join-item w-full bg-base-100 border-base-content/10 focus:border-primary !rounded-l-2xl text-base-content"
                            value={newItem.src}
                            onChange={(e) => setNewItem({ ...newItem, src: e.target.value })}
                            disabled={gallery.length >= 15}
                          />
                          <button
                            onClick={addGallery}
                            className="btn btn-primary join-item !rounded-r-2xl px-6"
                            disabled={gallery.length >= 15}
                          >
                            <PlusCircle size={20} weight="bold" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="divider divider-horizontal mx-0 hidden sm:flex text-[10px] uppercase font-bold opacity-30 text-base-content">ATAU</div>
                          <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={gallery.length >= 15}
                          />
                          <button
                            onClick={() => fileInputRef.current.click()}
                            className="btn btn-neutral !rounded-2xl flex-1 sm:flex-none whitespace-nowrap px-6 border-none text-white"
                            disabled={gallery.length >= 15}
                          >
                            <UploadSimple size={20} weight="bold" className="mr-2" /> Pilih dari File
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-2">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-base-content">Daftar Aset Foto</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold ${gallery.length >= 15 ? 'text-error' : 'opacity-40 text-base-content'}`}>
                          {gallery.length} / 15 Foto
                        </span>
                        <div className={`w-2 h-2 rounded-full ${gallery.length >= 15 ? 'bg-error animate-pulse' : 'bg-primary/40'}`}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {gallery.map((img, idx) => (
                        <div key={img.id || idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-base-content/10 shadow-sm bg-base-200">
                          <img src={img.src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gallery" />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button onClick={() => deleteGallery(img.id)} className="btn btn-error btn-circle btn-sm shadow-lg scale-75 group-hover:scale-100 transition-transform">
                              <Trash size={18} weight="bold" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {gallery.length === 0 && (
                      <div className="text-center py-20 bg-base-content/5 rounded-3xl border-2 border-dashed border-base-content/10">
                        <ImageIcon size={48} weight="duotone" className="mx-auto mb-4 opacity-20 text-base-content" />
                        <p className="text-xs uppercase tracking-[0.3em] opacity-40 text-base-content">Belum ada foto dalam galeri</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid gap-3">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-2 text-base-content">Daftar Pesan ({messages.length})</h3>
                      {messages.map(m => (
                        <div key={m.id} className="bg-base-200 border border-base-content/5 p-5 rounded-2xl flex justify-between items-center group hover:border-primary/30 transition-all">
                          <div>
                            <p className="font-bold text-base-content leading-relaxed">"{m.text}"</p>
                            <p className="text-[9px] opacity-40 uppercase tracking-widest mt-2 font-bold text-base-content">{m.author} &bull; {m.time}</p>
                          </div>
                          <button onClick={() => deleteMessage(m.id)} className="btn btn-ghost btn-circle text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash size={20} weight="bold" />
                          </button>
                        </div>
                      ))}
                      {messages.length === 0 && (
                        <div className="text-center py-20 bg-base-content/5 rounded-3xl border-2 border-dashed border-base-content/10">
                          <ChatTeardropDots size={48} weight="duotone" className="mx-auto mb-4 opacity-20 text-base-content" />
                          <p className="text-xs uppercase tracking-[0.3em] opacity-40 text-base-content">Belum ada pesan yang masuk</p>
                        </div>
                      )}
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
