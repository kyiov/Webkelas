import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fredoka", "Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark", "cupcake", "luxury", "coffee", "nord", "sunset", "dracula", "synthwave"],
  },
}
