# 🛠️ SQLite Backend Blueprint

Karena `sqlite3` memerlukan kompilasi native yang cukup berat di beberapa lingkungan (seperti Termux), saya telah menyiapkan blueprint ini agar kamu bisa menghubungkan web kamu ke database asli kapan saja.

## 1. Struktur Folder
```text
server/
├── index.js          # Entry point server
└── database.sqlite   # File database (otomatis terbuat)
```

## 2. Server Code (`server/index.js`)
Gunakan library `sqlite3` dan `express`.

```javascript
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

app.use(cors());
app.use(express.json());

// Inisialisasi Tabel
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, author TEXT, time TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS gallery (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, title TEXT)");
});

// API Endpoints
app.get('/api/messages', (req, res) => {
  db.all("SELECT * FROM messages ORDER BY id DESC", [], (err, rows) => {
    res.json(rows);
  });
});

app.post('/api/messages', (req, res) => {
  const { text, author, time } = req.body;
  db.run("INSERT INTO messages (text, author, time) VALUES (?, ?, ?)", [text, author, time], function(err) {
    res.json({ id: this.lastID, ...req.body });
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

## 3. Cara Menghubungkan Frontend
Ubah `src/lib/api.js` kamu untuk melakukan fetch ke `http://localhost:3001/api/messages` alih-alih menggunakan `localStorage`.

---
*Catatan: Untuk penggunaan di GitHub Pages (Statis), backend ini tidak bisa berjalan secara otomatis. Kamu memerlukan hosting seperti VPS atau Railway.app untuk menjalankan server Node.js-nya.*
