/** @type {import('tailwindcss').Config} */

/**
 * Import a tailwind css library
 * daisy Ui
 */

import daisyui from "daisyui";

export default {
  // darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // colors: {
    //   text: "var(--text)",
    //   background: "var(--background)",
    //   primary: "var(--primary)",
    //   secondary: "var(--secondary)",
    //   accent: "var(--accent)",
    // },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#a59b6f",
          secondary: "#aacac2",
          accent: "#8f9bb7",
          neutral: "#262626",
          "base-100": "#f7f7f7",
        },
        dark: {
          primary: "#90865a",
          secondary: "#35554d",
          accent: "#485470",
          neutral: "#262626",
          "base-100": "#080808",
        },
      },
    ],
  },
};
