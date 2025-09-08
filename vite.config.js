import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "CareSync",
        short_name: "CareSync",
        description: "A healthcare web application with offline support.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
         maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // allow up to 5MB
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/reminders"),
            handler: "NetworkFirst",
            options: {
              cacheName: "reminders-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/prescriptions"),
            handler: "NetworkFirst",
            options: {
              cacheName: "prescriptions-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/appointments"),
            handler: "NetworkFirst",
            options: {
              cacheName: "appointments-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/user"),
            handler: "NetworkFirst",
            options: {
              cacheName: "user-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    // Bundle analyzer plugin
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunks
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          
          // UI and styling chunks
          ui: ["framer-motion", "react-hot-toast", "@heroicons/react"],
          
          // Authentication and context chunks
          auth: ["firebase/app", "firebase/auth", "firebase/firestore"],
          
          // Chart and visualization libraries
          charts: ["chart.js", "react-chartjs-2"],
          
          // Utilities and other libraries
          utils: ["localforage", "socket.io-client"],
        },
        // Better file naming for caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Enable tree shaking and compression
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    host: true,
    // Enable HMR optimizations
    hmr: {
      overlay: false,
    },
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-hot-toast',
      'framer-motion'
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
});
