/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Design tokens (couleurs, etc.) sont définis dans src/index.css via @theme
  // (Tailwind v4 CSS-first) — source de vérité unique, pas de doublon ici.
  theme: {
    extend: {},
  },
  plugins: [],
}
