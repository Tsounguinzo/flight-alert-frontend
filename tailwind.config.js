import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Josefin Sans"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#F0EBE4", // or DEFAULT
            foreground: "#303131", // or 50 to 900 DEFAULT
            primary: {
              50: "#fff5db",
              100: "#ffe3ad",
              200: "#ffd07e",
              300: "#febd4c",
              400: "#fdaa1b",
              500: "#e49002",
              600: "#b17000",
              700: "#7f5000",
              800: "#4d2f00",
              900: "#1d0f00",
              foreground: "#303131",
              DEFAULT: "#FDA50F",
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: "#F0EBE4", // or DEFAULT
            foreground: "#303131", // or 50 to 900 DEFAULT
            primary: {
              50: "#fff5db",
              100: "#ffe3ad",
              200: "#ffd07e",
              300: "#febd4c",
              400: "#fdaa1b",
              500: "#e49002",
              600: "#b17000",
              700: "#7f5000",
              800: "#4d2f00",
              900: "#1d0f00",
              foreground: "#303131",
              DEFAULT: "#FDA50F",
            },
          },
          // ... rest of the colors
        },
      },
    }),
  ],
};
