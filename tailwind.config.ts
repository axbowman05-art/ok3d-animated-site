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
        background: "#0A0A0A",
        foreground: "#F8FAFC",
        accent: "#0074FF",
        "accent-dark": "#0058CC",
        "accent-glow": "rgba(0, 116, 255, 0.4)",
        cta: "#FFDD00",
        "cta-dark": "#E5C700",
        "cta-glow": "rgba(255, 221, 0, 0.4)",
        card: "#111827",
        "card-hover": "#1F2937",
        border: "#1E3A5F",
        "border-light": "#2A4A70",
        muted: "#94A3B8",
        navy: "#002A5E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(255, 221, 0, 0.3), 0 0 30px rgba(255, 221, 0, 0.1)" },
          "50%": { boxShadow: "0 0 25px rgba(255, 221, 0, 0.5), 0 0 60px rgba(255, 221, 0, 0.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
