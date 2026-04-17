# 🎓 Webkelas: Legacy Batch 2026

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Webkelas** is a modern, high-performance web application built for the **Legacy Batch 2026**. It serves as a digital hub to showcase class philosophy, schedules, galleries, and a unique "Secret Wall" interaction.

---

## ✨ Key Features

- 🌌 **High-Impact UI**: Immersive design with glassmorphism, dynamic glows, and smooth Framer Motion animations.
- 🕰️ **Schedule Management**: Keep track of class activities and important timelines.
- 🖼️ **Digital Gallery**: High-performance photo archives to preserve class memories.
- 🧘 **Philosophy Section**: A dedicated space for the core values and identity of Batch 2026.
- 🕵️ **Stealth Admin**: A hidden Admin Dashboard for content management, accessible only via secure stealth routing.
- 🌓 **Adaptive Theme**: Seamless Dark and Light mode synchronization with local storage persistence.
- ⚡ **Vite Powered**: Ultra-fast Hot Module Replacement (HMR) and optimized build performance.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: Stealth Hash Routing

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Har404-err/Webkelas.git
   cd Webkelas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/     # Navbar, Footer
│   ├── sections/   # Hero, Philosophy, Schedule, Gallery, SecretWall, Admin
│   └── ui/         # Reusable GlassCard and UI atoms
├── lib/            # API utilities and constants
├── assets/         # Images and SVGs
└── App.jsx         # Main application logic and theme provider
```

---

## 🤫 Secret Access

To access the **Admin Dashboard**, append `#/admin` to the URL. The application uses stealth routing to automatically clear the hash after entry to maintain privacy.

---

## 📄 License

This project is part of the **Legacy Batch 2026** archives.

Developed with ❤️ by the Webkelas Team.
