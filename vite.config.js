import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Ensures React Router handles all paths — prevents "this site can't be reached"
    // when navigating directly to /verify-email, /reset-password etc.
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // Also proxy /uploads so certificate/poster files load correctly
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  // Ensure build also falls back to index.html for SPA routing
  build: {
    outDir: 'dist',
  },
  preview: {
    port: 3000,
  },
})
