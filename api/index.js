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
app.use(express.json({ limit: '50mb' }));

const db = new SawitDB(DB_PATH);

db.query("LAHAN messages");
db.query("LAHAN gallery");
db.query("LAHAN admin");

const setupAdmin = () => {
  try {
    const check = db.query("PANEN * DARI admin HANYA 1");
    if (!check || check.length === 0) {
      console.log("Initializing admin password from environment...");
      const adminPass = process.env.VITE_ADMIN_PASSWORD || 'xiia1Smansa2326#';
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminPass, salt);
      db.query("TANAM KE admin (password_hash) BIBIT (?)", [hash]);
    }
  } catch (e) {
    console.error("Admin init error:", e);
  }
};
setupAdmin();

app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  try {
    const results = db.query("PANEN password_hash DARI admin HANYA 1");
    
    if (!results || results.length === 0) {
      const adminPass = process.env.VITE_ADMIN_PASSWORD || 'xiia1Smansa2326#';
      if (password === adminPass) return res.json({ success: true });
      return res.status(401).json({ success: false, message: 'Admin belum terdaftar.' });
    }

    const hash = results[0].password_hash;
    const match = await bcrypt.compare(password, hash);
    
    if (match) {
      res.json({ success: true, message: 'Akses diterima!' });
    } else {
      res.status(401).json({ success: false, message: 'Kata sandi salah.' });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/messages', (req, res) => {
  try {
    const data = db.query("PANEN * DARI messages URUTKAN BERDASARKAN id TURUN");

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
