/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 🔥 Ye line add karna zaroori hai varna Dark Mode nahi chalega
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["'Outfit'", 'sans-serif'],
      },},
  },
  plugins: [],
}