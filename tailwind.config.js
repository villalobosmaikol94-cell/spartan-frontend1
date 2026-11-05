/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spartan: {
          verde: '#72C924',    // Verde Spartan oficial
          oscuro: '#0B0F19',   // Negro Obsidiana
          gris: '#1F2937',     // Gris tecnológico
        }
      }
    },
  },
  plugins: [],
}
