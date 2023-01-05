const formKitTailwind = require("@formkit/themes/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        body: ["Nunito", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      container: {
        center: true,
        padding: "16px",
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "984px",
          "2xl": "984px",
        },
      },
      boxShadow: {
        inner: "inset 0px 1px 2px #C7D2FE",
      },
    },
  },
  plugins: [formKitTailwind],
};
