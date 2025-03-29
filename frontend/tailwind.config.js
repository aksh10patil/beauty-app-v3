/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-skin': '#7d6c5b',
        'side-skin': '#7e746a'
      },
      fontFamily:{
          bad :["Bad Script", "cursive"],
          dm : ["DM Serif Text", "serif"],
      },
    },
  },
  plugins: [],
}