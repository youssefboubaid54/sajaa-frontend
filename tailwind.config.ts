import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2A4A",
          dark: "#101827",
          light: "#2A3F6F",
        },
        gold: {
          DEFAULT: "#D4B896",
          light: "#E8D5BC",
          dark: "#B89A72",
        },
        ivory: {
          DEFAULT: "#F8F3EA",
          dark: "#EADCC8",
        },
        beige: "#EADCC8",
        ink: "#101827",
        muted: "#6B7280",
        success: "#2E7D5B",
        error: "#B42318",
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "Noto Kufi Arabic", "system-ui", "sans-serif"],
        latin: ["var(--font-latin)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-arabic)", "var(--font-latin)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(27, 42, 74, 0.08)",
        medium: "0 4px 40px rgba(27, 42, 74, 0.12)",
        large: "0 8px 60px rgba(27, 42, 74, 0.16)",
        gold: "0 4px 20px rgba(212, 184, 150, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "navy-gradient": "linear-gradient(135deg, #1B2A4A 0%, #101827 100%)",
        "ivory-gradient": "linear-gradient(180deg, #F8F3EA 0%, #EADCC8 100%)",
        "gold-shimmer": "linear-gradient(90deg, #D4B896 0%, #E8D5BC 50%, #D4B896 100%)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
