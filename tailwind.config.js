/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        myGreenDark: "#004F4E",
        myGreenNormal: "rgb(121, 171, 138)",
        myYellow1:"#6ECEDA",
        myYellow2:"#83B1C9",
        myPink1:"#B97687",
        myPink2:"#EFBAD6",
        myBlack1:"#323841",
        myBlack2:"#18181A"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

