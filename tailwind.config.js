/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        surface: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ["Fredoka", "Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "cupcake", "retro"],
  },
}
