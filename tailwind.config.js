module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('/kaibabg.webp')",
      },
      colors: {
        main: '#08D4B0',
        shadeblack: "#00000F",
        error: "#D40845"
      },
    },
  },
  plugins: [],
}
