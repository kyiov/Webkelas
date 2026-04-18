const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing! Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// API Routes
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
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  
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

// Only listen if NOT running on Vercel
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
