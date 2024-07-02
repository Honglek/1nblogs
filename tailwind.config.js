/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0" },
          "100%": { backgroundPosition: "1000px" },
        },
      },
      animation: {
        gradient: "gradient 6s linear infinite;",
        heartbeat: "heartbeat 1.5s ease-in-out infinite both",
      },
      fontFamily: {
        Kumar: ["Kumar One", "sans-serif"],
        Fira: ["Fira Sans Condensed", "sans-serif"],
      },
    },
  },
  //plugins: [],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1E3A8A",
          secondary: "#D926A9",
          accent: "#1FB2A6",
          neutral: "#191D24",
          "base-100": "#ffffff", // Set your desired background color here
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
