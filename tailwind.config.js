/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        display: ['"Syne"', '"Outfit"', "system-ui", "sans-serif"],
        hero: ['"Plus Jakarta Sans"', '"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        page: "#0d0518",
        surface: "#150a24",
        "surface-2": "#1e1038",
        "surface-tile": "#2d1655",
        muted: "#b8a4d9",
        accent: "#f472b6",
        bolt: "#f9a8d4",
        ion: "#c084fc",
        candy: "#e879f9",
        nebula: "#a855f7",
        danger: "#fb7185",
      },
      maxWidth: {
        layout: "1240px",
      },
      borderRadius: {
        section: "16px",
      },
      boxShadow: {
        "candy-sm": "0 0 24px rgba(244, 114, 182, 0.35), 0 0 48px rgba(168, 85, 247, 0.15)",
        "candy-md":
          "0 0 40px rgba(232, 121, 249, 0.28), 0 0 80px rgba(168, 85, 247, 0.18), 0 0 120px rgba(244, 114, 182, 0.08)",
        "ion-sm": "0 0 28px rgba(192, 132, 252, 0.35)",
        panel:
          "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 64px rgba(232, 121, 249, 0.14), 0 0 32px rgba(168, 85, 247, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "panel-ion":
          "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(168, 85, 247, 0.2), 0 0 28px rgba(244, 114, 182, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        tile: "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 32px rgba(232, 121, 249, 0.12)",
        "tile-hover":
          "inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 8px 32px rgba(0, 0, 0, 0.45), 0 0 48px rgba(244, 114, 182, 0.25)",
        /* legacy aliases */
        "bolt-sm": "0 0 24px rgba(244, 114, 182, 0.35), 0 0 48px rgba(168, 85, 247, 0.15)",
        "bolt-md":
          "0 0 40px rgba(232, 121, 249, 0.28), 0 0 80px rgba(168, 85, 247, 0.18)",
      },
      keyframes: {
        "float-particle": {
          "0%, 100%": { transform: "translate3d(0,0,0)", opacity: "0.22" },
          "50%": {
            transform: "translate3d(var(--tx), var(--ty), 0)",
            opacity: "0.72",
          },
        },
        "chat-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(244, 114, 182, 0.6)" },
          "70%": { boxShadow: "0 0 0 12px rgba(232, 121, 249, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(244, 114, 182, 0)" },
        },
        "grid-pulse": {
          "0%, 100%": { opacity: "0.04" },
          "50%": { opacity: "0.09" },
        },
        "typing-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-4px)", opacity: "1" },
        },
        "nav-welcome-line": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "galaxy-shimmer": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "envelope-flap-open": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(-175deg)" },
        },
        "envelope-letter-rise": {
          "0%": { opacity: "0", transform: "translateY(28px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "envelope-seal-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 0 0 rgba(244,114,182,0.55), 0 8px 32px rgba(168,85,247,0.35), inset 0 2px 0 rgba(255,255,255,0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 0 10px rgba(232,121,249,0), 0 12px 40px rgba(168,85,247,0.45), inset 0 2px 0 rgba(255,255,255,0.25)",
          },
        },
        "envelope-shell-fade": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.98)" },
        },
        "envelope-float": {
          "0%, 100%": { transform: "translateY(0) rotateX(2deg)" },
          "50%": { transform: "translateY(-10px) rotateX(0deg)" },
        },
        "unlock-ring-spin": {
          to: { transform: "rotate(360deg)" },
        },
        "flap-shimmer": {
          "0%, 100%": { opacity: "0.35", transform: "translateX(-30%)" },
          "50%": { opacity: "0.85", transform: "translateX(30%)" },
        },
        "unlock-btn-glow": {
          "0%, 100%": { boxShadow: "0 0 24px rgba(232,121,249,0.35), 0 8px 32px rgba(0,0,0,0.45)" },
          "50%": { boxShadow: "0 0 40px rgba(244,114,182,0.55), 0 12px 36px rgba(0,0,0,0.5)" },
        },
      },
      animation: {
        "float-particle": "float-particle var(--d, 30s) ease-in-out infinite",
        "chat-pulse": "chat-pulse 2.4s ease-out infinite",
        "typing-bounce": "typing-bounce 1.2s infinite ease-in-out",
        "grid-pulse": "grid-pulse 8s ease-in-out infinite",
        "nav-welcome-line": "nav-welcome-line 0.55s ease-out both",
        "galaxy-shimmer": "galaxy-shimmer 6s ease-in-out infinite",
        "star-twinkle": "star-twinkle 3s ease-in-out infinite",
        "envelope-flap-open": "envelope-flap-open 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "envelope-letter-rise": "envelope-letter-rise 0.75s cubic-bezier(0.2, 0.7, 0.2, 1) forwards",
        "envelope-seal-pulse": "envelope-seal-pulse 2.4s ease-in-out infinite",
        "envelope-shell-fade": "envelope-shell-fade 0.5s ease-out forwards",
        "envelope-float": "envelope-float 5s ease-in-out infinite",
        "unlock-ring-spin": "unlock-ring-spin 4s linear infinite",
        "flap-shimmer": "flap-shimmer 3.5s ease-in-out infinite",
        "unlock-btn-glow": "unlock-btn-glow 2.5s ease-in-out infinite",
      },
      backgroundImage: {
        "candy-gradient":
          "linear-gradient(135deg, #f472b6 0%, #e879f9 35%, #c084fc 65%, #a855f7 100%)",
        "galaxy-nebula":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232,121,249,0.35), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(168,85,247,0.25), transparent 50%), radial-gradient(ellipse 50% 35% at 0% 80%, rgba(244,114,182,0.2), transparent 45%)",
      },
    },
  },
  plugins: [],
};
