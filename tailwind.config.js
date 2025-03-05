/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#103347",
        "light-green": "#3ac867",
        "gray-common": "#1c1c1e",
      },
    },
  },
  darkMode: "media",
  plugins: [],
};
