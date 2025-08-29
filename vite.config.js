import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ✅ This is correct: assets served from root (important on Vercel)
  base: "/",

  build: {
    outDir: "dist", // ✅ Vercel expects dist as output
    assetsDir: "assets", // ✅ default is "assets", good to keep
    sourcemap: false, // ✅ smaller build
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // ✅ splits vendor bundle
          router: ["react-router-dom"], // ✅ splits router bundle
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
  server: {
    port: 3000, // ✅ only used locally
    host: true, // ✅ allows LAN access during dev
  },
});
