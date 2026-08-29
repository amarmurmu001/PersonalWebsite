import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ------------------------------------------------------------------
       * Palette: near-black ink, warm near-white paper, ONE accent.
       * Swap these three values to re-skin the entire site.
       * ------------------------------------------------------------------ */
      colors: {
        ink: "#0f0f0e",
        paper: "#efebe4",
        accent: "#ff4d00",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      transitionTimingFunction: {
        // Signature ease used across the site (expo-out feel)
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        // Seamless marquee: track holds two copies of the content,
        // translating exactly -50% loops it perfectly.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.8)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 32s) linear infinite",
        "pulse-dot": "pulse-dot 2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
