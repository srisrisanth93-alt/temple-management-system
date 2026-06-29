/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        temple: {
          gold: '#D4AF37',       // Gold accent
          goldLight: '#F3E5AB',  // Pale gold
          goldDark: '#AA7C11',   // Deep bronze gold
          maroon: '#6B1D2F',     // Rich temple maroon
          maroonLight: '#8A253C',// Bright temple maroon
          maroonDark: '#4A121F', // Dark maroon
          saffron: '#F28500',    // Saffron orange
          saffronLight: '#FFA33B',
          saffronDark: '#B86200',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'ui-serif', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
