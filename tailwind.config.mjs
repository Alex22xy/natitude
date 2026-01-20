/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        natitude: {
          pink: "#FF00FF",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};