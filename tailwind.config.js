/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary colors - Blue
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",  // Light backgrounds, hover states
          200: "#bfdbfe",
          300: "#93c5fd",  // Borders, dividers
          400: "#60a5fa",
          500: "#3b82f6",  // Icons, secondary buttons
          600: "#2563eb",  // Main buttons, links, focus states
          700: "#1d4ed8",  // Hover states for main buttons
          800: "#1e40af",  // Text on light backgrounds
          900: "#1e3a8a",  // Dark mode accents
        },
        // Secondary colors - Medical Green
        medical: {
          50: "#f0fdf4",   // Light mode backgrounds
          100: "#dcfce7",  // Light mode containers
          200: "#bbf7d0",  // Borders, dividers
          300: "#86efac",  // Success states, checkmarks
          400: "#4ade80",  // Icons, indicators
          500: "#22c55e",  // Secondary buttons
          600: "#16a34a",  // Main actions, links
          700: "#15803d",  // Hover states
          800: "#166534",  // Text on light backgrounds
          900: "#14532d",  // Dark mode variants
        },
      },
    },
  },
  plugins: [],
};
