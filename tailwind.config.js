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
        myYellow1: "#6ECEDA",
        myYellow2: "#83B1C9",
        myPink1: "#B97687",
        myPink2: "#FEA0AE",
        myPink3: "#FFB6C1",
        myBlack1: "#323841",
        myBlack2: "#18181A",
        myBlue: "#7A96B3",
        columnBlue: "#BFE0F4",
        myGray: "#F0F0F0",
        myGary2: "#C9D1D9",
        borderBlue: "#008EE7",
        myBlue1: "#D4E7FC",
        myGold: "#FFED7D",
        myBlue3:"#A0CCC9",
        myBlue4:"#51908A",
        myOrange:"#F29328",
        activityPink:"#FFEAEC",
        activityGreen:"#004F4E",
        invitationPink:"#FFD7DC",
        activityGreen:"#004F4E",
        activityGreen2:"#79AB8A",
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

  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "",
  }, daisyui: {
    themes: false,
  }
}

