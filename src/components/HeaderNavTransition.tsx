import { useEffect, useState } from "react";
import { headerNavWelcome, portraitImageSrc, profile } from "../data/portfolioData";
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
      className="fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#020617]/97 text-center backdrop-blur-[10px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-welcome-title"
      aria-describedby="nav-welcome-desc"
      aria-busy="true"
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <FloatingParticles variant="chat" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 0%, rgba(34,211,238,0.5), transparent 52%), radial-gradient(ellipse 55% 45% at 100% 100%, rgba(139,92,246,0.4), transparent 48%), radial-gradient(ellipse 40% 35% at 0% 90%, rgba(56,189,248,0.2), transparent 45%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex min-h-[100dvh] w-full max-w-[min(32rem,100%)] flex-col items-center justify-center px-4 py-8 pb-[max(1.75rem,env(safe-area-inset-bottom,0px))] pt-[max(1.75rem,calc(env(safe-area-inset-top,0px)+1.25rem))] sm:px-6 sm:py-10 min-[480px]:py-12">
        <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-cyan-400/25 bg-gradient-to-b from-[#0c1629]/95 via-page/90 to-[#080f1c]/95 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.65),0_0_100px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.12)]">
          <div
            className="relative rounded-[1.45rem] px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12"
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

              <div className="mt-4 flex w-full max-w-md items-center justify-center gap-2.5 sm:mt-5 sm:gap-3">
                <span
                  className="h-px min-w-[1.5rem] flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-cyan-400/55 sm:max-w-[5rem]"
                  aria-hidden
                />
                <p className="m-0 min-w-0 shrink py-0.5 font-display text-[clamp(0.68rem,1.85vw,0.78rem)] font-semibold uppercase leading-normal tracking-[0.16em] text-slate-200/95 sm:tracking-[0.18em]">
                  {profile.year} · {profile.title}
                </p>
                <span
                  className="h-px min-w-[1.5rem] flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-violet-400/50 sm:max-w-[5rem]"
                  aria-hidden
                />
              </div>

              <div className="relative mx-auto mt-5 w-fit sm:mt-6">
                <div
                  className="absolute -inset-1 rounded-[1.15rem] bg-gradient-to-br from-accent/55 via-ion/40 to-cyan-300/35 opacity-95 blur-[2px]"
                  aria-hidden
                />
                <img
                  src={portraitImageSrc}
                  alt=""
                  width={112}
                  height={112}
                  decoding="async"
                  className="relative mx-auto block h-[4.75rem] w-[4.75rem] rounded-[1rem] border border-cyan-400/25 bg-surface object-cover object-[center_15%] shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_32px_rgba(34,211,238,0.14)] ring-2 ring-cyan-400/20 sm:h-[5.5rem] sm:w-[5.5rem] sm:rounded-[1.1rem]"
                />
              </div>

              <h2
                id="nav-welcome-title"
                className="nav-welcome-title-shine mt-4 max-w-[18ch] bg-gradient-to-br from-white via-cyan-50 to-violet-200 bg-clip-text font-display text-[clamp(1.5rem,5vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-transparent sm:mt-5"
              >
                {profile.name}
              </h2>
              <p className="mt-2 max-w-[24ch] font-display text-[clamp(0.95rem,3vw,1.1rem)] font-medium leading-snug tracking-[-0.01em] text-slate-300/95">
                {headerNavWelcome.title}
              </p>

              <div className="mt-5 flex w-full max-w-md items-center justify-center gap-3 sm:mt-6 sm:gap-4" aria-hidden>
                <span className="h-px min-w-[2rem] flex-1 max-w-[4.5rem] bg-gradient-to-r from-transparent to-cyan-400/45 sm:max-w-[5.5rem]" />
                <p className="nav-welcome-formal-label m-0 shrink-0 font-mono text-[0.7rem] font-semibold text-slate-400">
                  {headerNavWelcome.subtitle}
                </p>
                <span className="h-px min-w-[2rem] flex-1 max-w-[4.5rem] bg-gradient-to-l from-transparent to-violet-400/40 sm:max-w-[5.5rem]" />
              </div>
            </div>

            <ul
              className="relative mx-auto mt-8 flex w-full max-w-md list-none flex-col gap-2.5 p-0 sm:mt-9 sm:gap-3"
              role="list"
            >
              {headerNavWelcome.services.map((label, i) => {
                const rail =
                  i % 4 === 0
                    ? "from-cyan-400 via-cyan-300/70 to-cyan-500/40"
                    : i % 4 === 1
                      ? "from-violet-400 via-violet-300/65 to-fuchsia-500/35"
                      : i % 4 === 2
                        ? "from-sky-400 via-cyan-400/60 to-emerald-400/40"
                        : "from-fuchsia-400 via-violet-400/55 to-cyan-400/35";
                const badgeRing =
                  i % 4 === 0
                    ? "border-cyan-400/40 shadow-[0_0_22px_rgba(34,211,238,0.22)]"
                    : i % 4 === 1
                      ? "border-violet-400/40 shadow-[0_0_22px_rgba(139,92,246,0.2)]"
                      : i % 4 === 2
                        ? "border-sky-400/35 shadow-[0_0_20px_rgba(56,189,248,0.18)]"
                        : "border-fuchsia-400/35 shadow-[0_0_20px_rgba(217,70,239,0.16)]";
                return (
                  <li
                    key={label}
                    role="listitem"
                    className="relative flex min-h-[3.35rem] items-center gap-3.5 overflow-hidden rounded-xl border border-cyan-400/18 bg-gradient-to-r from-[#0c1829]/95 via-[#0a1424]/92 to-[#0f1628]/95 px-3.5 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_6px_28px_rgba(0,0,0,0.38)] ring-1 ring-white/[0.05] motion-safe:animate-nav-welcome-line sm:min-h-[3.5rem] sm:gap-4 sm:rounded-[1rem] sm:px-4 sm:py-3.5"
                    style={{ animationDelay: `${100 + i * 85}ms` }}
                  >
                    <span
                      className={`pointer-events-none absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b ${rail} opacity-90`}
                      aria-hidden
                    />
                    <span
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.65rem] border bg-gradient-to-br from-white/[0.08] to-transparent font-mono text-[0.68rem] font-bold tabular-nums text-white/95 sm:h-10 sm:w-10 sm:rounded-lg sm:text-[0.72rem] ${badgeRing}`}
                      aria-hidden
                    >
                      <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                      <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <span className="min-w-0 flex-1 font-display text-[0.9rem] font-semibold leading-snug tracking-[-0.01em] text-slate-100 sm:text-[0.95rem]">
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="relative mx-auto mt-9 w-full max-w-md sm:mt-10">
              <div className="rounded-xl border border-cyan-400/22 bg-gradient-to-b from-cyan-500/[0.07] via-[#0b1526]/80 to-violet-600/[0.06] px-3 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_28px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.05] sm:px-4 sm:py-4">
                <div className="mb-2.5 flex items-end justify-between gap-3 sm:mb-3">
                  <span
                    id="nav-welcome-desc"
                    className="nav-welcome-formal-label min-w-0 text-left font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cyan-100/95 sm:text-[0.74rem] sm:tracking-[0.18em]"
                  >
                    {headerNavWelcome.progressLabel}
                  </span>
                  <span className="shrink-0 font-display text-[clamp(1.15rem,4vw,1.45rem)] font-bold tabular-nums leading-none tracking-tight text-bolt drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]">
                    {pct}
                    <span className="text-[0.65em] font-semibold text-cyan-200/90">%</span>
                  </span>
                </div>
                <div
                  className="relative h-3.5 w-full overflow-hidden rounded-full border border-cyan-400/25 bg-[#050a12]/90 p-[3px] shadow-[inset_0_2px_6px_rgba(0,0,0,0.55)] sm:h-4"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={pct}
                  aria-labelledby="nav-welcome-desc"
                >
                  <div
                    className="relative h-full min-w-0 rounded-full bg-gradient-to-r from-accent via-cyan-300 to-violet-400 shadow-[0_0_28px_rgba(34,211,238,0.55),0_0_14px_rgba(167,139,250,0.35)] transition-[width] duration-100 ease-linear"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-3 text-center font-display text-[clamp(0.78rem,2.2vw,0.86rem)] font-medium leading-relaxed tracking-[0.02em] text-slate-300/95 sm:mt-3.5">
                  {headerNavWelcome.progressMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
