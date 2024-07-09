/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'custom': '-4px 4px 0 #00FF5B', // Custom drop shadow
      }
    },
  },
  plugins: [],
}

