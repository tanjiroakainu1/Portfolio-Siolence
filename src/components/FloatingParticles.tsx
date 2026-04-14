import { useEffect, useRef } from "react";

type Variant = "portfolio" | "chat";

const PORTFOLIO_COLOR_CLASSES = [
  "",
  "floating-particle--violet",
  "floating-particle--amber",
  "floating-particle--coral",
  "floating-particle--sky",
];

export function FloatingParticles({ variant }: { variant: Variant }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const narrow = window.matchMedia("(max-width: 600px)").matches;
    const base = variant === "chat" ? 36 : 64;
    const count = narrow ? Math.round(base * 0.58) : base;

    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      if (Math.random() < 0.18) {
        p.className = "floating-particle floating-particle--dim";
      } else if (variant === "portfolio") {
        const colorClass =
          PORTFOLIO_COLOR_CLASSES[Math.floor(Math.random() * PORTFOLIO_COLOR_CLASSES.length)] ?? "";
        p.className = colorClass
          ? `floating-particle ${colorClass}`
          : "floating-particle";
      } else {
        p.className = "floating-particle";
      }

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 0.4 + Math.random() * 2.6;
      const duration = 18 + Math.random() * 44;
      const delay = -Math.random() * duration;
      const tx = (Math.random() - 0.5) * 52;
      const ty = (Math.random() - 0.5) * 72;
      p.style.setProperty("--x", `${x}%`);
      p.style.setProperty("--y", `${y}%`);
      p.style.setProperty("--s", `${size}px`);
      p.style.setProperty("--d", `${duration}s`);
      p.style.setProperty("--delay", `${delay}s`);
      p.style.setProperty("--tx", `${tx}px`);
      p.style.setProperty("--ty", `${ty}px`);
      frag.appendChild(p);
    }
    layer.appendChild(frag);
    return () => {
      layer.replaceChildren();
    };
  }, [variant]);

  return (
    <div
      ref={layerRef}
      className={
        variant === "chat"
          ? "floating-particles floating-particles--chat"
          : "floating-particles floating-particles--portfolio"
      }
      aria-hidden
    />
  );
}
