import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Auth API
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  try {
    // Ambil hash password dari tabel 'admin' di Supabase
    const { data, error } = await supabase
      .from('admin')
      .select('password_hash')
      .single();

    if (error || !data) {
      // Jika tabel belum ada atau kosong, gunakan password default untuk inisialisasi
      const defaultPass = 'xiia1Smansa2326#';
      if (password === defaultPass) {
        return res.json({ success: true, message: 'Login awal berhasil!' });
      }
      return res.status(401).json({ success: false, message: 'Akses ditolak.' });
    }

    const match = await bcrypt.compare(password, data.password_hash);
    if (match) {
      res.json({ success: true, message: 'Akses diterima!' });
    } else {
      res.status(401).json({ success: false, message: 'Kata sandi salah.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes (Messages)
app.get('/api/messages', async (req, res) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/messages', async (req, res) => {
  const { text, author } = req.body;
  const time = new Date().toLocaleString('id-ID', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const { data, error } = await supabase
    .from('messages')
    .insert([{ text, author, time }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.get('/api/gallery', async (req, res) => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/gallery', async (req, res) => {
  const { src, title } = req.body;
  
  const { data, error } = await supabase
    .from('gallery')
    .insert([{ src, title }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.delete('/api/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// Server start
app.listen(PORT, () => {
  console.log(`Supabase Proxy Server is running on http://localhost:${PORT}`);
});

export default app;
