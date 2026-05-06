<div align="center">

# 📔 Webkelas: XII A1 Digital Archive
### *Arsip Digital & Hub Komunitas XII A1 SMAN 1 Rasau Jaya*

[![GitHub license](https://img.shields.io/github/license/kyiov/Webkelas?style=for-the-badge&color=blue)](https://github.com/kyiov/Webkelas/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/kyiov/Webkelas?style=for-the-badge&color=gold)](https://github.com/kyiov/Webkelas/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kyiov/Webkelas?style=for-the-badge&color=orange)](https://github.com/kyiov/Webkelas/network)
[![GitHub issues](https://img.shields.io/github/issues/kyiov/Webkelas?style=for-the-badge&color=red)](https://github.com/kyiov/Webkelas/issues)

<p align="center">
  <a href="#core-features">Features</a> •
  <a href="#technology-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#configuration">Config</a> •
  <a href="#license">License</a>
</p>

---

</div>

## 🌟 Overview

**Webkelas** adalah aplikasi web modern yang dirancang sebagai buku kenangan digital (scrapbook) dan pusat interaksi bagi alumni kelas **XII A1 SMAN 1 Rasau Jaya**. Platform ini berfungsi sebagai arsip persisten untuk kenangan kolektif, interaksi komunitas, dan dokumentasi visual dengan estetika yang personal dan interaktif.

## 🚀 Core Features

### 1. 🎨 Interactive Digital Scrapbook
Antarmuka terinspirasi dari buku tempel nyata, menggunakan coretan (doodles) melayang dan elemen SVG gambar tangan.
- **Interactive Canvas:** Coret-coret langsung di background yang akan memudar secara otomatis.
- **Physical Ornaments:** Ornamen seperti klip kertas, pin, dan washi tape acak memberikan kedalaman visual 3D.
- **Highlighter Effects:** Efek stabilo otomatis saat kursor diarahkan ke teks tertentu.

### 2. 📸 Dynamic Memory Gallery
Grid foto gaya polaroid dengan dekorasi doodle prosedural yang unik.
- **Shake to Develop (Kocok Polaroid):** Simulasi foto polaroid asli! Gambar awalnya kosong, gerakkan kursor atau jari Anda di atas foto untuk "memunculkan" gambarnya.

### 3. 💬 Community Communication System
Papan pesan persisten bagi siswa untuk berbagi catatan publik dan sapaan, mendukung anonimitas atau identitas opsional.

### 4. 🔐 Administrative Control Panel
Dashboard aman dengan proteksi password untuk manajemen konten (Upload foto, moderasi pesan, dll).

### 5. 🌗 Adaptive User Experience
Dukungan penuh untuk Dark/Light mode dengan persistensi state dan desain yang sepenuhnya responsif.

---

## 🛠 Technology Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyui-5500FF?style=for-the-badge&logo=daisyui&logoColor=white)

### Backend & Database
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## 📂 Project Structure

```text
├── api/                # Backend server & API routes
├── src/                # React application source
│   ├── components/     # UI & Layout components
│   ├── lib/            # Utilities, API helpers, & Constants
│   └── assets/         # Images, Icons, & Global styles
└── public/             # Static assets
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. **Clone & Enter**
   ```bash
   git clone https://github.com/kyiov/Webkelas.git
   cd Webkelas
   ```
2. **Install Deps**
   ```bash
   npm install
   ```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 🔐 Configuration

Buat file `.env` di root direktori (gunakan `.env.example` sebagai referensi):
- `VITE_ADMIN_PASSWORD`: Password aman untuk akses Dashboard Admin.
- `MONGODB_URI`: Connection string untuk database MongoDB Atlas.

---

## 📄 License

Project ini dilisensikan di bawah **MIT License**. Lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---

## 📊 Analytics

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=kyiov&show_icons=true&theme=radical&count_private=true" alt="kyiov Stats" />
  <br/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=kyiov&layout=compact&theme=radical" alt="Top Langs" />
</div>

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/kyiov">kyiov</a>
</div>
