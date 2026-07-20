import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["class", ".theme-dark"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        lime: "var(--lime)",
        coral: "var(--coral)",
        lavender: "var(--lavender)",
        teal: "var(--teal)",
        line: "var(--line)",
        panel: "var(--panel)",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        hard: "var(--shadow)",
        "hard-sm": "var(--shadow-small)",
      },
    },
  },
  plugins: [],
};

export default config;
