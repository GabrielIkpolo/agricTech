/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D5A27', // AgTech Green
        secondary: '#F4A460', // Sandy Brown
        accent: '#FFD700', // Gold
      }
    },
  },
  plugins: [],
}
