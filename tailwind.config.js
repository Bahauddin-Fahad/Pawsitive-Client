import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "460px",
        // => @media (min-width: 460px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "900px",
        // => @media (min-width: 900px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  darkMode: "class", // Enables dark mode based on class
  plugins: [
    // NextUI plugin
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: {
              DEFAULT: "#71DE6E",
            },

            secondary: {
              DEFAULT: "#8c8c91",
            },
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: {
              DEFAULT: "#71DE6E",
            },

            secondary: {
              DEFAULT: "#8c8c91",
            },
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),

    // DaisyUI plugin
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1B1B1B",

          secondary: "#eaeaec",

          // accent: "#2E603C",
          accent: "#27ae60",

          neutral: "#3D4451",

          "base-100": "#FFFFFF",

          info: "#3ABFF8",

          success: "#065f46",

          warning: "#FBBD23",

          error: "#dc2626",
        },
      },
    ],
  },
};
