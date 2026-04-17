import { MESSAGES as DEFAULT_MESSAGES, GALLERY_IMAGES as DEFAULT_GALLERY } from './constants';

// Local storage keys for simple persistence without a full backend for now
const MESSAGES_KEY = 'webkelas_messages';
const GALLERY_KEY = 'webkelas_gallery';

/**
 * Minimal Data API Layer
 * Designed to be easily replaced by Supabase (mirroring @har architecture)
 */
export const api = {
  // --- MESSAGES ---
  async getMessages() {
    const data = localStorage.getItem(MESSAGES_KEY);
    return data ? JSON.parse(data) : DEFAULT_MESSAGES;
  },

  async saveMessage(text, author = 'Anonim') {
    const messages = await this.getMessages();
    const now = new Date();
    const newMessage = {
      id: Date.now(),
      text,
      author,
      time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      fullTimestamp: now.toISOString()
    };
    const updated = [newMessage, ...messages];
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    return updated;
  },

  async deleteMessage(id) {
    const messages = await this.getMessages();
    const updated = messages.filter(m => m.id !== id);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    return updated;
  },

  // --- GALLERY ---
  async getGallery() {
    const data = localStorage.getItem(GALLERY_KEY);
    return data ? JSON.parse(data) : DEFAULT_GALLERY;
  },

  async updateGallery(newImages) {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(newImages));
    return newImages;
  },

  async addImage(src, title = 'New Moment') {
    const gallery = await this.getGallery();
    const updated = [{ src, title }, ...gallery];
    localStorage.setItem(GALLERY_KEY, JSON.stringify(updated));
    return updated;
  }
};
