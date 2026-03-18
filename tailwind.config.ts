import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111827",
        primary: "#ffffff",
        accent: {
          red: "#b91c1c", // professional red
          yellow: "#eab308", // hint of yellow
          grey: "#f3f4f6"
        }
      },
      fontFamily: {
        heading: ["Georgia", "Times New Roman", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
