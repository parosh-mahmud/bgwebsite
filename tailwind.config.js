/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "1rem",
        xl: "6rem",
        "2xl": "8rem",
      },
    },
    fontFamily: {
      thin: ["Poppins", "sans-serif"],
      regular: ["Poppins", "sans-serif"],
      semiBold: ["Poppins", "sans-serif"],
      bold: ["Poppins", "sans-serif"],
      extraBold: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#D1AE55",
        secondary: "#222222",
        invalid: "#C2FFF3",
        primaryText: "#333333",
        secondaryText: "#474747",
        grayText: "#333333",
        announce: "#D64E4E",
      },
      backgroundImage: {
        yourcompatiblepartner: "url('/assets/bg/yourcompatiblepartner.png')",
        developmentActive: "url('/src/assets/bg/developmentActive.png')",
        developmentInActive: "url('/src/assets/bg/developmentInActive.png')",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
        "3xl": { min: "1536px" },
      },
      boxShadow: {
        btn: "2px 2px 4px #000000, inset 2px 2px 4px rgba(255, 255, 255, 0.15)",
        header: "8px 0px 16px rgba(213, 213, 213, 0.15)",
        jackpot: "inset 0px 0px 16px 8px rgba(209, 174, 85, 0.2)",
        sliderBtn: "inset 2px 2px 4px rgba(209, 174, 85, 0.15)",
        package: "0px 4px 8px rgba(255, 255, 255, 0.25)",
        slcProjectSlider: "0px 10px 32px 1px rgba(0, 0, 0, 0.15)",
        slcLogoSlider: "0px 8px 18px 6px rgba(97, 97, 97, 0.12)",
        slcTechnology: "5px 8px 12px rgba(0, 0, 0, 0.15)",
      },

      animation: {
        Loading: "Loading 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        slideIn: "slideIn 0.4s cubic-bezier(1, 0, 0, 0  )",
        // Nothing: 'Loading 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        //  loading animation
        Loading: {
          "0%, 100% ": {
            opacity: 0.1,
          },
          "50%": {
            opacity: 0.1,
          },
        },

        //  slidein animation
        slideIn: {
          "75%, 100% ": {
            transform: "scale(1)",
            opacity: 1,
          },
          "0%,50%": {
            transform: "scale(1)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
