/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#B79CF5",
        accent: "#F6C343",
        navy: "#1E0B4B",
        surface: "#F5F5F7",
      },
    },
  },
  plugins: [],
};