import { useEffect, useMemo, useState } from "react";
import { headerNavWelcome, portraitImageSrc, profile } from "../data/portfolioData";
import { FloatingParticles } from "./FloatingParticles";

import { PROJECT_SHOWCASE_HASH } from "../lib/projectShowcaseNav";
import { lockPageScroll } from "../lib/lockPageScroll";

type NavTarget = "portfolio" | "chat" | "showcase";

const SPARKLES = [
  { top: "8%", left: "12%", delay: "0s" },
  { top: "18%", right: "8%", delay: "0.4s" },
  { bottom: "22%", left: "6%", delay: "0.8s" },
  { bottom: "12%", right: "14%", delay: "1.2s" },
  { top: "42%", left: "4%", delay: "0.6s" },
  { top: "55%", right: "5%", delay: "1s" },
] as const;

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
    const unlockScroll = lockPageScroll();
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
      unlockScroll();
      cancelAnimationFrame(frame);
      window.clearTimeout(doneTimer);
    };
  }, [target, onDone]);

  const pct = Math.round(progress * 100);
  const steps = headerNavWelcome.progressSteps;
  const stepIndex = Math.min(
    steps.length - 1,
    Math.floor(progress * steps.length)
  );
  const statusLine = steps[stepIndex] ?? headerNavWelcome.progressMessage;

  const activeServiceIndex = useMemo(
    () => Math.min(headerNavWelcome.services.length - 1, Math.floor(progress * headerNavWelcome.services.length)),
    [progress]
  );

  if (!target) return null;

  return (
    <div
      className="nav-welcome-loader"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-welcome-title"
      aria-describedby="nav-welcome-desc"
      aria-busy="true"
    >
      <div className="nav-welcome-loader__backdrop" aria-hidden />
      <div className="nav-welcome-loader__grid" aria-hidden />
      <div className="nav-welcome-loader__particles" aria-hidden>
        <FloatingParticles variant="chat" />
      </div>

      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="nav-welcome-loader__sparkle"
          style={{
            top: "top" in s ? s.top : undefined,
            left: "left" in s ? s.left : undefined,
            right: "right" in s ? s.right : undefined,
            bottom: "bottom" in s ? s.bottom : undefined,
            animationDelay: s.delay,
          }}
          aria-hidden
        />
      ))}

      <div className="nav-welcome-loader__stage">
        <div className="nav-welcome-loader__card-wrap">
          <span className="nav-welcome-loader__card-orbit" aria-hidden />
          <article className="nav-welcome-loader__card">
            <div className="nav-welcome-loader__card-glow" aria-hidden />

            <header className="nav-welcome-loader__head">
              <p className="nav-welcome-loader__eyebrow">{headerNavWelcome.eyebrow}</p>
              <div className="nav-welcome-loader__year-row">
                <span className="nav-welcome-loader__rule" aria-hidden />
                <p className="nav-welcome-loader__year">
                  {profile.year} · {profile.title}
                </p>
                <span className="nav-welcome-loader__rule nav-welcome-loader__rule--flip" aria-hidden />
              </div>

              <div className="nav-welcome-loader__portrait-wrap">
                <span className="nav-welcome-loader__ring nav-welcome-loader__ring--outer" aria-hidden />
                <span className="nav-welcome-loader__ring nav-welcome-loader__ring--mid" aria-hidden />
                <span className="nav-welcome-loader__ring nav-welcome-loader__ring--inner" aria-hidden />
                <img
                  src={portraitImageSrc}
                  alt=""
                  width={112}
                  height={112}
                  decoding="async"
                  className="nav-welcome-loader__portrait"
                />
              </div>

              <h2 id="nav-welcome-title" className="nav-welcome-loader__name">
                {profile.name}
              </h2>
              <p className="nav-welcome-loader__welcome">{headerNavWelcome.title}</p>

              <div className="nav-welcome-loader__divider">
                <span className="nav-welcome-loader__rule" aria-hidden />
                <p className="nav-welcome-loader__inquire">{headerNavWelcome.subtitle}</p>
                <span className="nav-welcome-loader__rule nav-welcome-loader__rule--flip" aria-hidden />
              </div>
            </header>

            <ul className="nav-welcome-loader__services" role="list">
              {headerNavWelcome.services.map((label, i) => (
                <li
                  key={label}
                  role="listitem"
                  className={`nav-welcome-loader__service ${i <= activeServiceIndex ? "is-lit" : ""}`}
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                >
                  <span className="nav-welcome-loader__service-rail" aria-hidden />
                  <span className="nav-welcome-loader__service-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="nav-welcome-loader__service-label">{label}</span>
                  {i <= activeServiceIndex ? (
                    <span className="nav-welcome-loader__service-pulse" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="nav-welcome-loader__progress-block">
              <div className="nav-welcome-loader__progress-head">
                <span id="nav-welcome-desc" className="nav-welcome-loader__progress-label">
                  {headerNavWelcome.progressLabel}
                </span>
                <span className="nav-welcome-loader__pct" aria-live="polite">
                  {pct}
                  <span className="nav-welcome-loader__pct-suffix">%</span>
                </span>
              </div>
              <div
                className="nav-welcome-loader__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                aria-labelledby="nav-welcome-desc"
              >
                <span
                  className="nav-welcome-loader__fill"
                  style={{ width: `${pct}%` }}
                />
                <span className="nav-welcome-loader__scan" aria-hidden />
              </div>
              <p className="nav-welcome-loader__status">{statusLine}</p>
              <p className="nav-welcome-loader__foot">{headerNavWelcome.progressMessage}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
