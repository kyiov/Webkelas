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
      const ADMIN_PASS = 'xiia1Smansa2326#';
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

  async saveMessage(text, author) {
    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, author })
      });
      const data = await response.json();
      
      // Also sync to local for offline/fallback support
      const local = JSON.parse(localStorage.getItem('webkelas_messages') || '[]');
      localStorage.setItem('webkelas_messages', JSON.stringify([data, ...local]));
      
      return this.getMessages();
    } catch (e) {
      const local = JSON.parse(localStorage.getItem('webkelas_messages') || '[]');
      const newMessage = { 
        id: Date.now(), 
        text, 
        author, 
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

  async getGallery() {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.length > 0 ? data : JSON.parse(localStorage.getItem('webkelas_gallery') || '[]');
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
      return this.getGallery();
    } catch (e) {
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
