const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Database
// On Vercel, the filesystem is read-only. We use /tmp for a writable (though ephemeral) database.
const isVercel = process.env.VERCEL === '1';
const dbPath = isVercel ? '/tmp/database.sqlite' : path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log(`Connected to the SQLite database at ${dbPath}`);
});

// Create Tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      author TEXT DEFAULT 'Anonim',
      time DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      src TEXT NOT NULL,
      title TEXT
    )
  `);
});

// API Routes
app.get('/api/messages', (req, res) => {
  db.all("SELECT * FROM messages ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/messages', (req, res) => {
  const { text, author } = req.body;
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  db.run("INSERT INTO messages (text, author, time) VALUES (?, ?, ?)", [text, author, time], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, text, author, time });
  });
});

app.get('/api/gallery', (req, res) => {
  db.all("SELECT * FROM gallery", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/gallery', (req, res) => {
  const { src, title } = req.body;
  db.run("INSERT INTO gallery (src, title) VALUES (?, ?)", [src, title], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, src, title });
  });
});

// Only listen if running locally
if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
