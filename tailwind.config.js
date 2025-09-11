/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [{ pattern: /(bg|text)-(cyan|orange|emerald|purple)-(100|700)/ }],
  plugins: [require("daisyui")],
  darkMode: "class",
};
