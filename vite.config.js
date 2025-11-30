import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "favicon-192x192-maskable.png"],
      manifest: false, // Use the enhanced manifest.json from public folder
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
  ],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
