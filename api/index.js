import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import SawitDB from '@wowoengine/sawitdb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = './database.sawit';

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images

// Initialize SawitDB
const db = new SawitDB(DB_PATH);

// Setup Tables with clear structure if possible
// SawitDB LAHAN usually creates a table if it doesn't exist
db.query("LAHAN messages");
db.query("LAHAN gallery");
db.query("LAHAN admin");

// API Routes
app.get('/api/messages', (req, res) => {
  try {
    const data = db.query("PANEN * DARI messages URUTKAN BERDASARKAN id TURUN");
    // Parse JSON fields if they exist as strings
    const parsedData = (Array.isArray(data) ? data : []).map(m => ({
      ...m,
      replyTo: m.replyTo ? JSON.parse(m.replyTo) : null,
      reactions: m.reactions ? JSON.parse(m.reactions) : {}
    }));
    res.json(parsedData);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', (req, res) => {
  const { text, author, replyTo } = req.body;
  const time = new Date().toLocaleString('id-ID', { 
    day: '2-digit', month: 'short', year: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
  });
  
  try {
    const id = Date.now();
    const replyToStr = replyTo ? JSON.stringify(replyTo) : null;
    const reactionsStr = JSON.stringify({});
    db.query("TANAM KE messages (id, text, author, time, replyTo, reactions) BIBIT (?, ?, ?, ?, ?, ?)", [id, text, author, time, replyToStr, reactionsStr]);
    res.json({ id, text, author, time, replyTo, reactions: {} });
  } catch (error) {
    console.error("Save message error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages/:id/react', (req, res) => {
  const { id } = req.params;
  const { emoji } = req.body;
  try {
    const data = db.query("PANEN * DARI messages DIMANA id = ?", [id]);
    if (!data || data.length === 0) return res.status(404).json({ error: 'Message not found' });
    
    const msg = data[0];
    const reactions = msg.reactions ? JSON.parse(msg.reactions) : {};
    reactions[emoji] = (reactions[emoji] || 0) + 1;
    
    // Simulate update by delete + insert to preserve simple AQL usage
    db.query("GUSUR DARI messages DIMANA id = ?", [id]);
    db.query("TANAM KE messages (id, text, author, time, replyTo, reactions) BIBIT (?, ?, ?, ?, ?, ?)", 
      [msg.id, msg.text, msg.author, msg.time, msg.replyTo, JSON.stringify(reactions)]
    );
    
    res.json({ success: true, reactions });
  } catch (error) {
    console.error("React message error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/gallery', (req, res) => {
  try {
    const data = db.query("PANEN * DARI gallery URUTKAN BERDASARKAN id TURUN");
    res.json(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Fetch gallery error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', (req, res) => {
  const { src, title } = req.body;
  try {
    const id = Date.now();
    db.query("TANAM KE gallery (id, src, title) BIBIT (?, ?, ?)", [id, src, title]);
    res.json({ id, src, title });
  } catch (error) {
    console.error("Save gallery error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query("GUSUR DARI messages DIMANA id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gallery/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query("GUSUR DARI gallery DIMANA id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`SawitDB Server running on http://localhost:${PORT}`);
});

export default app;
