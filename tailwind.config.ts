import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Baris ini wajib ada agar folder 'app' terbaca
    "./src/app/journal/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#0f172a",
        primary: "#f59e0b",
        border: "rgba(148, 163, 184, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;