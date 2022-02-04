module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: { zodiac: "#0C1335" },
      gold: { mari: "#C08329", serria: "#DCAC60" },
      red: { robin: "#75371E", crown: "#751E1E", pure: "#C82C2F" },
      gray: { base: "#808080", light: "#C3C2C5" },
      green: { fern: "#467F44" },
      white: "#ffffff",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      spacing: {
        base: "7rem",
        sm: "8rem",
        md: "9rem",
        lg: "10rem",
        xl: "11rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
