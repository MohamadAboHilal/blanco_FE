/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern:
        /(bg|text)-(red|orange|emerald|teal|sky|cyan|blue|indigo|violet|purple|pink|rose)-(100|700)/,
    },
  ],
  plugins: [require("daisyui")],
  darkMode: "class",
};
