// Use relative path for production (Vercel) and absolute for local development
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export const api = {
  async login(password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      return await response.json();
    } catch (e) {
      // Fallback untuk local development jika backend tidak jalan
      console.warn("Backend login failed, using fallback check");
      const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'xiia1Smansa2326#';
      return { success: password === ADMIN_PASS };
    }
  },

  async getMessages() {
    try {
      const response = await fetch(`${API_URL}/messages`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (e) {
      console.warn("Backend not running or error, falling back to localStorage");
      return JSON.parse(localStorage.getItem('webkelas_messages') || '[]');
    }
  },

  async saveMessage(text, author, replyTo = null) {
    const authorName = author || 'Anonim';
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, author: authorName, replyTo })
      });
      if (!response.ok) throw new Error('Backend save failed');
      return this.getMessages();
    } catch (e) {
      console.warn("Backend save failed, using localStorage fallback");
      const local = JSON.parse(localStorage.getItem('webkelas_messages') || '[]');
      const newMessage = { 
        id: Date.now(), 
        text, 
        author: authorName, 
        replyTo,
        reactions: {},
        time: new Date().toLocaleString('id-ID', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }) 
      };
      const updated = [newMessage, ...local];
      localStorage.setItem('webkelas_messages', JSON.stringify(updated));
      return updated;
    }
  },

  async addReaction(id, emoji) {
    try {
      const response = await fetch(`${API_URL}/messages/${id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji })
      });
      if (!response.ok) throw new Error('Reaction failed');
      return this.getMessages();
    } catch (e) {
      console.warn("Backend reaction failed, fallback local");
      const local = JSON.parse(localStorage.getItem('webkelas_messages') || '[]');
      const updated = local.map(m => {
        if (m.id === id) {
          const rx = m.reactions || {};
          rx[emoji] = (rx[emoji] || 0) + 1;
          return { ...m, reactions: rx };
        }
        return m;
      });
      localStorage.setItem('webkelas_messages', JSON.stringify(updated));
      return updated;
    }
  },

  async getGallery() {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      // If backend is empty but localStorage has data, sync them? 
      // For now just prefer backend if it returns something
      return data;
    } catch (e) {
      return JSON.parse(localStorage.getItem('webkelas_gallery') || '[]');
    }
  },

  async addImage(src, title) {
    try {
      const response = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src, title })
      });
      if (!response.ok) throw new Error('Backend upload failed');
      return this.getGallery();
    } catch (e) {
      console.warn("Backend upload failed, using localStorage");
      const local = JSON.parse(localStorage.getItem('webkelas_gallery') || '[]');
      const newImage = { 
        id: Date.now() + Math.random(), 
        src, 
        title 
      };
      const updated = [newImage, ...local];
      localStorage.setItem('webkelas_gallery', JSON.stringify(updated));
      return updated;
    }
  },

  async deleteMessage(id) {
    try {
      const response = await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      return this.getMessages();
    } catch (e) {
      const local = JSON.parse(localStorage.getItem('webkelas_messages') || '[]');
      const updated = local.filter(m => m.id !== id);
      localStorage.setItem('webkelas_messages', JSON.stringify(updated));
      return updated;
    }
  },

  async deleteGallery(id) {
    try {
      const response = await fetch(`${API_URL}/gallery/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      return this.getGallery();
    } catch (e) {
      const local = JSON.parse(localStorage.getItem('webkelas_gallery') || '[]');
      const updated = local.filter(img => img.id !== id);
      localStorage.setItem('webkelas_gallery', JSON.stringify(updated));
      return updated;
    }
  }
};
