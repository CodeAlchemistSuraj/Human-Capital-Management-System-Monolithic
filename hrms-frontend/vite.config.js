import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// If you're using this for a Vite plugin specific to Tailwind, keep it.
// Otherwise, TailwindCSS is typically configured in tailwind.config.js and imported in your CSS.
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // This is correct: Ensures relative paths for assets in the Electron app
  build: {
    // This MUST be 'dist' (or another folder name) relative to your frontend project root.
    // Vite will create this folder and put the built files inside it.
    outDir: 'dist',
    // It's often good practice to empty the output directory before building
    // emptyOutDir: true,
  },
  
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
