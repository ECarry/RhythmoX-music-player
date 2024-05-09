/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          100: "#4DCFE0",
          200: "#1185E0",
        },
      },
      fontFamily: {
        RPBold: ["ReadexPro-Bold", "sans-serif"],
        RPExtraLight: ["ReadexPro-ExtraLight", "sans-serif"],
        RPLight: ["ReadexPro-Light", "sans-serif"],
        RPMedium: ["ReadexPro-Medium", "sans-serif"],
        RPRegular: ["ReadexPro-Regular", "sans-serif"],
        RPSemiBold: ["ReadexPro-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
