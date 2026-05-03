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
app.use(express.json());

// Initialize SawitDB
const db = new SawitDB(DB_PATH);

// Setup Tables using AQL
db.query("LAHAN messages");
db.query("LAHAN gallery");
db.query("LAHAN admin");

// Robust check for admin initialization
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

// Auth API
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  try {
    const results = db.query("PANEN password_hash DARI admin HANYA 1");
    
    if (!results || results.length === 0) {
      // Fallback jika database admin kosong entah kenapa
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

// API Routes
app.get('/api/messages', (req, res) => {
  try {
    const data = db.query("PANEN * DARI messages URUTKAN BERDASARKAN id TURUN");
    res.json(Array.isArray(data) ? data : []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', (req, res) => {
  const { text, author } = req.body;
  const time = new Date().toLocaleString('id-ID', { 
    day: '2-digit', month: 'short', year: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
  });
  
  try {
    db.query("TANAM KE messages (text, author, time) BIBIT (?, ?, ?)", [text, author, time]);
    const last = db.query("PANEN * DARI messages URUTKAN BERDASARKAN id TURUN HANYA 1");
    res.json(last[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/gallery', (req, res) => {
  try {
    const data = db.query("PANEN * DARI gallery");
    res.json(Array.isArray(data) ? data : []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', (req, res) => {
  const { src, title } = req.body;
  try {
    db.query("TANAM KE gallery (src, title) BIBIT (?, ?)", [src, title]);
    const last = db.query("PANEN * DARI gallery URUTKAN BERDASARKAN id TURUN HANYA 1");
    res.json(last[0]);
  } catch (error) {
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
