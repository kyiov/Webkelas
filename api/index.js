import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Jrheveh746:uebeue837ryh@cluster0.278kf40.mongodb.net/webkelas?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('webkelas');
    console.log("Connected to MongoDB Atlas");
    await setupAdmin();
  } catch (e) {
    console.error("MongoDB connection error:", e);
  }
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const setupAdmin = async () => {
  try {
    const adminCol = db.collection('admin');
    const check = await adminCol.findOne({});
    if (!check) {
      console.log("Initializing admin password...");
      const adminPass = process.env.VITE_ADMIN_PASSWORD || 'xiia1Smansa2326#';
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminPass, salt);
      await adminCol.insertOne({ password_hash: hash });
    }
  } catch (e) {
    console.error("Admin init error:", e);
  }
};

// Start DB connection
connectDB();

app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  try {
    const adminCol = db.collection('admin');
    const results = await adminCol.findOne({});
    
    if (!results) {
      const adminPass = process.env.VITE_ADMIN_PASSWORD || 'xiia1Smansa2326#';
      if (password === adminPass) return res.json({ success: true });
      return res.status(401).json({ success: false, message: 'Admin belum terdaftar.' });
    }

    const hash = results.password_hash;
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

app.get('/api/messages', async (req, res) => {
  try {
    const messagesCol = db.collection('messages');
    const data = await messagesCol.find({}).sort({ id: -1 }).toArray();
    res.json(data);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  const { text, author, replyTo } = req.body;
  const time = new Date().toLocaleString('id-ID', { 
    day: '2-digit', month: 'short', year: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
  });
  
  try {
    const id = Date.now();
    const newMessage = { id, text, author, time, replyTo, reactions: {} };
    await db.collection('messages').insertOne(newMessage);
    res.json(newMessage);
  } catch (error) {
    console.error("Save message error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages/:id/react', async (req, res) => {
  const { id } = req.params;
  const { emoji } = req.body;
  try {
    const messagesCol = db.collection('messages');
    const msg = await messagesCol.findOne({ id: parseInt(id) });
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    
    const reactions = msg.reactions || {};
    reactions[emoji] = (reactions[emoji] || 0) + 1;
    
    await messagesCol.updateOne({ id: parseInt(id) }, { $set: { reactions } });
    res.json({ success: true, reactions });
  } catch (error) {
    console.error("React message error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const data = await db.collection('gallery').find({}).sort({ id: -1 }).toArray();
    res.json(data);
  } catch (error) {
    console.error("Fetch gallery error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', async (req, res) => {
  const { src, title } = req.body;
  try {
    const id = Date.now();
    const newItem = { id, src, title };
    await db.collection('gallery').insertOne(newItem);
    res.json(newItem);
  } catch (error) {
    console.error("Save gallery error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('messages').deleteOne({ id: parseInt(id) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('gallery').deleteOne({ id: parseInt(id) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`MongoDB-backed Server running on http://localhost:${PORT}`);
});

export default app;
