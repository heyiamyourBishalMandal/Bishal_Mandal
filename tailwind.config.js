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
        cybergreen: '#00E676', // Iconic Cyber-Green Accent!
        cyberorange: '#00E676',
        cyberblue: '#00E676',
        darknavy: '#080c10', // Deep Obsidian Black
      },
    },
  },
  plugins: [],
}
