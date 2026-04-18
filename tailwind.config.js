/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1e1e1e",
        surface: "rgba(255, 255, 255, 0.05)",
        primary: "#e06bd5",
      },
      fontFamily: {
        sans: ["Poppins", "Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        webkelas: {
          "primary": "#e06bd5",
          "secondary": "#4b39c6",
          "accent": "#18fff3",
          "neutral": "#1e1e1e",
          "base-100": "#1e1e1e",
          "info": "#14a6ef",
          "success": "#76ffb0",
          "warning": "#ff775c",
          "error": "#ff4359",
        },
      },
      "dark",
    ],
  },
}
