/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0e7673",
          50: "#e9f1f0",
          100: "#d3e3e1",
          200: "#bdd5d3",
          300: "#a7c7c5",
          400: "#91b9b7",
          500: "#7caba9",
          600: "#659e9b",
          700: "#4e908d",
          800: "#348380",
          900: "#0e7673",
        },
        secondary: {
          100: "#E2E2D5",
          200: "#8390a2",
        },
        grey: "#a0aec0",
        success: "#10b981",
        warning: "#fe964a",
        danger: "#fd6a6a",
      }
    },
  },
  plugins: [],
};
