/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        medvanta: {
          amber: "#e99114",
          "amber-hover": "#d27d0a",
          teal: "#046e82",
          "teal-hover": "#035565",
          dark: "#1d1d1d",
          header: "#000000",
          cream: "#f5f3ed",
          light: "#f7f7f7",
          border: "#e5e5e5",
          muted: "#949494",
          success: "#3C9342",
          danger: "#BF262F",
        }
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Libre Franklin", "sans-serif"],
      },
      maxWidth: {
        site: "1400px",
      }
    },
  },
  plugins: [],
};
