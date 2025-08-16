import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Important for Vercel deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        }
      }
    }
  },
  server: {
    allowedHosts: ['<YOUR-UNIQUE-STRING>.ngrok-free.app'], // used to test app on physical devices using Ngrok tunneling 
    port: 3000,
    host: true
  }
})
