import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            lineHeight: "2rem",
            a: {
              textDecoration: "none",
              color: theme("colors.zinc.800"),
              "font-weight": "600",
              "&:hover": {
                color: theme("colors.zinc.900"),
                textDecoration: "underline",
              },
            },
            code: {
              color: theme("colors.pink.500"),
              paddingLeft: "4px",
              paddingRight: "4px",
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.zinc.300"),
              "&:hover": {
                color: theme("colors.zinc.200"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
