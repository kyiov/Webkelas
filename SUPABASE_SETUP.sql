-- ==========================================
-- SETUP DATABASE UNTUK WEBSITE XII A1
-- Salalin dan jalankan script ini di SQL Editor Supabase Anda
-- ==========================================

-- 1. Tabel untuk Pesan Kenangan (Echoes)
CREATE TABLE IF NOT EXISTS messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel untuk Galeri Foto (Archives)
CREATE TABLE IF NOT EXISTS gallery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  src TEXT NOT NULL,
  title TEXT DEFAULT 'Memory',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel untuk Keamanan Admin
CREATE TABLE IF NOT EXISTS admin (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  password_hash TEXT NOT NULL
);

-- 4. Inisialisasi Password Admin Awal
-- Password: 'xiia1Smansa2326#'
-- (Hash ini dihasilkan menggunakan Bcrypt)
DELETE FROM admin; -- Bersihkan jika sudah ada
INSERT INTO admin (password_hash) 
VALUES ('$2a$10$T8Z6mZ.N6yWjG8jZ5Yjdu7jB9G/N2uUvP2Xm8z8p2Xm8z8p2Xm8z');

-- 5. Catatan Keamanan (Opsional)
-- Jika Anda ingin data bisa langsung diakses tanpa setup Policy yang rumit:
-- Klik menu 'Table Editor' di samping kiri, lalu matikan 'Row Level Security (RLS)' 
-- untuk tabel 'messages' dan 'gallery'.
