import { useEffect, useState } from "react";
import { headerNavWelcome } from "../data/portfolioData";
import { FloatingParticles } from "./FloatingParticles";

import { PROJECT_SHOWCASE_HASH } from "../lib/projectShowcaseNav";

type NavTarget = "portfolio" | "chat" | "showcase";

function hashForTarget(target: NavTarget): string {
  if (target === "chat") return "#chat";
  if (target === "showcase") return `#${PROJECT_SHOWCASE_HASH}`;
  return "#portfolio";
}

export function HeaderNavTransition({
  target,
  onDone,
}: {
  target: NavTarget | null;
  onDone: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!target) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setProgress(0);
    const duration = headerNavWelcome.transitionMs;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const doneTimer = window.setTimeout(() => {
      window.location.hash = hashForTarget(target);
      onDone();
    }, duration);
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(frame);
      window.clearTimeout(doneTimer);
    };
  }, [target, onDone]);

  if (!target) return null;

  const pct = Math.round(progress * 100);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#020617]/97 px-4 py-8 text-center backdrop-blur-[10px] sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-welcome-title"
      aria-describedby="nav-welcome-desc"
      aria-busy="true"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <FloatingParticles variant="chat" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 0%, rgba(34,211,238,0.5), transparent 52%), radial-gradient(ellipse 55% 45% at 100% 100%, rgba(139,92,246,0.4), transparent 48%), radial-gradient(ellipse 40% 35% at 0% 90%, rgba(56,189,248,0.2), transparent 45%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        aria-hidden
      />

      <div className="relative z-[1] w-full max-w-[min(32rem,100%)]">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-400/25 bg-gradient-to-b from-[#0c1629]/95 via-page/90 to-[#080f1c]/95 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.65),0_0_100px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.12)]">
          <div
            className="relative rounded-[1.45rem] px-6 py-8 sm:px-10 sm:py-10"
            style={{
              background:
                "linear-gradient(165deg, rgba(15,26,46,0.92) 0%, rgba(8,15,28,0.96) 50%, rgba(10,18,32,0.94) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-12 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl"
              aria-hidden
            />

            <div className="relative flex flex-col items-center text-center antialiased">
              <p className="nav-welcome-formal-label m-0 font-mono text-[0.7rem] font-semibold text-cyan-200/85">
                {headerNavWelcome.eyebrow}
              </p>
              <h2
                id="nav-welcome-title"
                className="nav-welcome-title-shine mt-3 max-w-[22ch] bg-gradient-to-br from-white via-cyan-50 to-violet-200 bg-clip-text font-display text-[clamp(1.75rem,5.5vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-transparent"
              >
                {headerNavWelcome.title}
              </h2>
              <div className="mt-4 flex w-full max-w-md items-center justify-center gap-3 sm:gap-4" aria-hidden>
                <span className="h-px min-w-[2rem] flex-1 max-w-[4.5rem] bg-gradient-to-r from-transparent to-cyan-400/45 sm:max-w-[5.5rem]" />
                <p className="nav-welcome-formal-label m-0 shrink-0 font-mono text-[0.7rem] font-semibold text-slate-400">
                  {headerNavWelcome.subtitle}
                </p>
                <span className="h-px min-w-[2rem] flex-1 max-w-[4.5rem] bg-gradient-to-l from-transparent to-violet-400/40 sm:max-w-[5.5rem]" />
              </div>
            </div>

            <ul
              className="relative mt-8 flex list-none flex-col gap-2 p-0 sm:mt-9 sm:gap-2.5"
              role="list"
            >
              {headerNavWelcome.services.map((label, i) => (
                <li
                  key={label}
                  role="listitem"
                  className="flex items-center gap-3.5 rounded-[0.9rem] border border-white/[0.07] bg-gradient-to-r from-white/[0.04] via-transparent to-violet-500/[0.06] px-4 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] motion-safe:animate-nav-welcome-line sm:gap-4 sm:px-5 sm:py-3.5"
                  style={{ animationDelay: `${100 + i * 85}ms` }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 font-mono text-[0.7rem] font-semibold tabular-nums text-bolt shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 font-sans text-[0.9rem] font-normal leading-snug tracking-[0.02em] text-slate-100 sm:text-[0.9375rem] sm:font-medium">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="relative mt-9 sm:mt-10">
              <div className="mb-2 flex items-center justify-between gap-3 px-0.5">
                <span
                  id="nav-welcome-desc"
                  className="nav-welcome-formal-label min-w-0 font-mono text-[0.65rem] font-semibold text-slate-500"
                >
                  {headerNavWelcome.progressLabel}
                </span>
                <span className="shrink-0 font-mono text-[0.65rem] font-semibold tabular-nums text-cyan-400/90">
                  {pct}%
                </span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full border border-white/[0.06] bg-black/40 p-[2px] shadow-inner"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                aria-labelledby="nav-welcome-desc"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent via-cyan-300 to-ion shadow-[0_0_24px_rgba(34,211,238,0.35)] transition-[width] duration-100 ease-linear"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-3 text-center font-sans text-[0.72rem] font-normal leading-relaxed tracking-[0.01em] text-slate-500">
                {headerNavWelcome.progressMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
