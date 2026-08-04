import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures all asset paths work on GitHub Pages subpaths!
  server: {
    port: 5173,
    host: true
  }
})
