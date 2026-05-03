/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        display: ['"Outfit"', '"DM Sans"', "system-ui", "sans-serif"],
        hero: ['"Plus Jakarta Sans"', '"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        page: "#030712",
        surface: "#0a1220",
        "surface-2": "#0f1a2e",
        "surface-tile": "#152a48",
        muted: "#94a3b8",
        accent: "#22d3ee",
        bolt: "#67e8f9",
        ion: "#a78bfa",
        danger: "#f87171",
      },
      maxWidth: {
        layout: "1240px",
      },
      borderRadius: {
        section: "14px",
      },
      boxShadow: {
        "bolt-sm": "0 0 20px rgba(34, 211, 238, 0.25)",
        "bolt-md": "0 0 40px rgba(34, 211, 238, 0.2), 0 0 80px rgba(139, 92, 246, 0.08)",
        "ion-sm": "0 0 24px rgba(167, 139, 250, 0.2)",
        panel:
          "0 8px 40px rgba(0, 0, 0, 0.45), 0 0 56px rgba(34, 211, 238, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "panel-ion":
          "0 8px 40px rgba(0, 0, 0, 0.45), 0 0 52px rgba(139, 92, 246, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        tile: "inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 18px rgba(0, 0, 0, 0.35), 0 0 26px rgba(34, 211, 238, 0.08)",
        "tile-hover":
          "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 8px 28px rgba(0, 0, 0, 0.4), 0 0 36px rgba(34, 211, 238, 0.18)",
      },
      keyframes: {
        "float-particle": {
          "0%, 100%": { transform: "translate3d(0,0,0)", opacity: "0.22" },
          "50%": {
            transform: "translate3d(var(--tx), var(--ty), 0)",
            opacity: "0.62",
          },
        },
        "chat-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(34, 211, 238, 0.55)" },
          "70%": { boxShadow: "0 0 0 10px rgba(34, 211, 238, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(34, 211, 238, 0)" },
        },
        "grid-pulse": {
          "0%, 100%": { opacity: "0.03" },
          "50%": { opacity: "0.06" },
        },
        "typing-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-4px)", opacity: "1" },
        },
        "nav-welcome-line": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-particle": "float-particle var(--d, 30s) ease-in-out infinite",
        "chat-pulse": "chat-pulse 2.4s ease-out infinite",
        "typing-bounce": "typing-bounce 1.2s infinite ease-in-out",
        "grid-pulse": "grid-pulse 8s ease-in-out infinite",
        "nav-welcome-line": "nav-welcome-line 0.55s ease-out both",
      },
    },
  },
  plugins: [],
};
