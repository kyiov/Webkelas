# Webkelas: XII A1 Digital Archive

Webkelas is a professional-grade web application designed as a digital scrapbook and community hub for the XII A1 graduating class of SMAN 1 Rasau Jaya. This platform serves as a persistent archive for collective memories, community interactions, and visual documentation.

## Core Features

### 1. Interactive Digital Scrapbook
The application features a unique scrapbook-inspired user interface, utilizing floating doodles and hand-drawn SVG elements to create an authentic, personal atmosphere.

### 2. Dynamic Memory Gallery
A high-performance image gallery displaying photos in a polaroid-style grid. Each entry is uniquely decorated with procedural doodle elements. Admins can upload images via direct file selection (base64) or external URL links.

### 3. Community Communication System
A persistent message board that allows students to share public notes and greetings. The system handles optional authorship, defaulting to anonymous entries when identity is not provided.

### 4. Administrative Control Panel
A secure, password-protected dashboard for content management. Authorized administrators can manage the photo gallery, upload new assets, and moderate community messages.

### 5. Adaptive User Experience
Full support for dark and light theme profiles, with state persistence. The interface is fully responsive, ensuring accessibility across mobile, tablet, and desktop devices.

## Technology Stack

### Frontend
- React 19: Component-based architecture with modern hooks.
- Vite: Optimized build tooling and development environment.
- Tailwind CSS: Utility-first styling for precise layout control.
- DaisyUI 5: Semantic UI components.
- Framer Motion: Hardware-accelerated animations and gesture handling.
- Phosphor Icons: Consistent, high-quality iconography.

### Backend
- Express.js: Lightweight and scalable Node.js server framework.
- SawitDB: A file-based database system utilizing the Palm Oil Query Language (AQL) for efficient data management.
- Bcrypt.js: Secure hashing for administrative credential protection.

## Project Structure

- /api: Backend server implementation and API routes.
- /src: React application source code.
- /src/components/layout: Global layout components (Navbar, Footer, FloatingDock).
- /src/components/sections: Feature-specific sections (Hero, Gallery, Admin).
- /src/components/ui: Reusable atom components (ChatBubble, GlassCard).
- /src/lib: Utility libraries, API helpers, and constants.
- /public: Static assets and icons.

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Har404-err/Webkelas.git
   cd Webkelas
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start both the frontend and backend servers in development mode:
```bash
npm run dev
```

### Production Build
Generate an optimized production build:
```bash
npm run build
```

## Configuration

The application uses environment variables for security. Create a .env file based on .env.example:
- VITE_ADMIN_PASSWORD: The secure password for Administrative Dashboard access.

## Data Persistence

This project utilizes a persistent file-based database located at ./database.sawit. For local development and private server deployments, this file ensures that gallery assets and messages remain intact across server restarts.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
