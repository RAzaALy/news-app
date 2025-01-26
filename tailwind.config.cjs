/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'min600': '600px', // Custom screen size with min-width of 600px
      }
    },
  },
  plugins: [],
};
