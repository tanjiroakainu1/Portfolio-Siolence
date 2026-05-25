import { useEffect, useState } from "react";
import {
  portraitImageSrc,
  portfolioEnvelope,
  profile,
} from "../data/portfolioData";
import { lockPageScroll } from "../lib/lockPageScroll";
import { FloatingParticles } from "./FloatingParticles";
import { ExpertiseCoverageChart } from "./ExpertiseCoverageChart";
import { usePortfolioUnlock } from "../context/PortfolioUnlockContext";

const SPARKLE_POSITIONS = [
  { style: { top: "6%", left: "10%" }, delay: "0s", size: "md" },
  { style: { top: "14%", right: "6%" }, delay: "0.35s", size: "lg" },
  { style: { top: "38%", left: "2%" }, delay: "0.7s", size: "sm" },
  { style: { top: "52%", right: "4%" }, delay: "1.1s", size: "md" },
  { style: { bottom: "18%", left: "8%" }, delay: "0.5s", size: "lg" },
  { style: { bottom: "8%", right: "10%" }, delay: "0.9s", size: "sm" },
  { style: { top: "28%", left: "46%" }, delay: "1.3s", size: "md" },
  { style: { bottom: "32%", right: "18%" }, delay: "0.15s", size: "lg" },
  { style: { top: "72%", left: "22%" }, delay: "1.6s", size: "sm" },
  { style: { top: "8%", left: "44%" }, delay: "0.85s", size: "sm" },
] as const;

function DeveloperUnlockLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const duration = portfolioEnvelope.loadingDurationMs;
  const stepIndex = Math.min(
    portfolioEnvelope.loadingSteps.length - 1,
    Math.floor((progress / 100) * portfolioEnvelope.loadingSteps.length)
  );
  const status = portfolioEnvelope.loadingSteps[stepIndex] ?? portfolioEnvelope.loadingSteps[0];
  const pct = Math.round(progress);

  useEffect(() => {
    const unlockScroll = lockPageScroll();
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(t * 100);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const doneTimer = window.setTimeout(onComplete, duration);

    return () => {
      unlockScroll();
      cancelAnimationFrame(frame);
      window.clearTimeout(doneTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className="mystery-boot-loader"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mystery-boot-title"
      aria-busy="true"
    >
      <div className="mystery-boot-loader__backdrop" aria-hidden />
      <div className="mystery-boot-loader__grid" aria-hidden />
      <div className="mystery-boot-loader__particles" aria-hidden>
        <FloatingParticles variant="chat" />
      </div>
      <div className="mystery-boot-loader__nebula" aria-hidden />

      <div className="mystery-boot-loader__stage">
        <div className="mystery-boot-loader__card-wrap">
          <span className="mystery-boot-loader__card-orbit" aria-hidden />
          <article className="mystery-boot-loader__card">
            <div className="mystery-boot-loader__card-glow" aria-hidden />
            <p className="mystery-boot-loader__badge">{portfolioEnvelope.entryBadge}</p>
            <p id="mystery-boot-title" className="mystery-boot-loader__eyebrow">
              {portfolioEnvelope.loadingTitle}
            </p>

            <div className="mystery-boot-loader__orbit-wrap">
              <span className="mystery-boot-loader__ring mystery-boot-loader__ring--outer" aria-hidden />
              <span className="mystery-boot-loader__ring mystery-boot-loader__ring--mid" aria-hidden />
              <span className="mystery-boot-loader__ring mystery-boot-loader__ring--inner" aria-hidden />
              <div className="mystery-boot-loader__portrait">
                <img src={portraitImageSrc} alt="" width={88} height={88} decoding="async" />
              </div>
            </div>

            <p className="mystery-boot-loader__name">{profile.name}</p>
            <p className="mystery-boot-loader__role">{portfolioEnvelope.role}</p>

            <div className="mystery-boot-loader__progress">
              <div className="mystery-boot-loader__progress-head">
                <span className="mystery-boot-loader__status">{status}</span>
                <span className="mystery-boot-loader__pct" aria-live="polite">
                  {pct}
                  <span className="mystery-boot-loader__pct-suffix">%</span>
                </span>
              </div>
              <div
                className="mystery-boot-loader__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
              >
                <span className="mystery-boot-loader__fill" style={{ width: `${pct}%` }} />
                <span className="mystery-boot-loader__scan" aria-hidden />
              </div>
              <p className="mystery-boot-loader__foot">
                {pct >= 99 ? portfolioEnvelope.loadingComplete : portfolioEnvelope.classified}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function EntryEnvelope({
  onUnlock,
  unlocking,
  navShake,
}: {
  onUnlock: () => void;
  unlocking: boolean;
  navShake: boolean;
}) {
  return (
    <div
      className={`portfolio-entry-envelope ${unlocking ? "is-unlocking" : ""} ${navShake ? "is-nav-shake" : ""}`}
      aria-label={portfolioEnvelope.screenLabel}
    >
      <div className="portfolio-entry-envelope__aura" aria-hidden />
      <div className="portfolio-entry-envelope__halo" aria-hidden />
      <div className="portfolio-entry-envelope__beam" aria-hidden />

      {SPARKLE_POSITIONS.map((pos, i) => (
        <span
          key={i}
          className={`portfolio-entry-envelope__sparkle portfolio-entry-envelope__sparkle--${pos.size}`}
          style={{ ...pos.style, animationDelay: pos.delay }}
          aria-hidden
        />
      ))}

      <div className={`portfolio-envelope__shell portfolio-entry-envelope__shell ${unlocking ? "is-leaving" : ""}`}>
        <div className="portfolio-envelope__paper portfolio-entry-envelope__paper" aria-hidden>
          <span className="portfolio-entry-envelope__paper-lines" aria-hidden />
        </div>

        <div className="portfolio-envelope__pocket portfolio-envelope__pocket--entry portfolio-entry-envelope__pocket">
          <span className="portfolio-envelope__pocket-fold-left" aria-hidden />
          <span className="portfolio-envelope__pocket-fold-right" aria-hidden />
          <span className="portfolio-envelope__edge portfolio-envelope__edge--left" aria-hidden />
          <span className="portfolio-envelope__edge portfolio-envelope__edge--right" aria-hidden />
          <span className="portfolio-entry-envelope__inner-border" aria-hidden />

          <span className="portfolio-envelope__corner portfolio-envelope__corner--tl" aria-hidden />
          <span className="portfolio-envelope__corner portfolio-envelope__corner--tr" aria-hidden />
          <span className="portfolio-envelope__corner portfolio-envelope__corner--bl" aria-hidden />
          <span className="portfolio-envelope__corner portfolio-envelope__corner--br" aria-hidden />

          <div className="portfolio-envelope__face portfolio-envelope__face--entry portfolio-entry-envelope__face">
            <div className="portfolio-entry-envelope__face-head">
              <span className="portfolio-entry-envelope__entry-pill">{portfolioEnvelope.entryBadge}</span>
              <p className="portfolio-envelope__eyebrow">{portfolioEnvelope.eyebrow}</p>
              <div className="portfolio-envelope__identity">
                <h1 className="portfolio-envelope__name">{profile.name}</h1>
                <p className="portfolio-envelope__role">{portfolioEnvelope.role}</p>
                <span className="portfolio-envelope__role-badge">{profile.year}</span>
              </div>
              <span className="portfolio-entry-envelope__divider" aria-hidden />
            </div>

            <div className="portfolio-entry-envelope__face-foot">
              <div className="portfolio-envelope__seal-wrap portfolio-envelope__seal-wrap--entry">
                <span className="portfolio-entry-envelope__seal-orbit" aria-hidden />
                <div className="portfolio-envelope__seal portfolio-envelope__seal--entry">
                  <img src={portraitImageSrc} alt="" width={80} height={80} decoding="async" />
                </div>
                <span className="portfolio-envelope__seal-glow" aria-hidden />
                <span className="portfolio-entry-envelope__wax" aria-hidden />
              </div>

              <div className={`portfolio-entry-envelope__unlock-wrap ${navShake ? "is-shake" : ""}`}>
                <span className="portfolio-entry-envelope__unlock-ring portfolio-entry-envelope__unlock-ring--outer" aria-hidden />
                <span className="portfolio-entry-envelope__unlock-ring portfolio-entry-envelope__unlock-ring--inner" aria-hidden />
                <span className="portfolio-entry-envelope__unlock-sparks" aria-hidden>
                  <span className="portfolio-entry-envelope__unlock-spark portfolio-entry-envelope__unlock-spark--1">✦</span>
                  <span className="portfolio-entry-envelope__unlock-spark portfolio-entry-envelope__unlock-spark--2">✦</span>
                  <span className="portfolio-entry-envelope__unlock-spark portfolio-entry-envelope__unlock-spark--3">✦</span>
                </span>
                <button
                  type="button"
                  className={`portfolio-envelope__unlock-btn portfolio-envelope__unlock-btn--mystery ${navShake ? "is-pulse" : ""}`}
                  onClick={onUnlock}
                  disabled={unlocking}
                  aria-label={portfolioEnvelope.unlockAria}
                >
                  <span className="portfolio-envelope__unlock-btn-aura" aria-hidden />
                  <span className="portfolio-envelope__unlock-btn-beam" aria-hidden />
                  <span className="portfolio-envelope__unlock-icon-wrap" aria-hidden>
                    <svg className="portfolio-envelope__unlock-icon portfolio-envelope__unlock-icon--key" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="7.5" cy="7.5" r="4.5" />
                      <path d="M10.5 10.5L21 21" />
                      <path d="M18 15l3 3" />
                    </svg>
                    <svg className="portfolio-envelope__unlock-icon portfolio-envelope__unlock-icon--star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" />
                    </svg>
                  </span>
                  <span className="portfolio-envelope__unlock-label">
                    <span className="portfolio-envelope__unlock-label-pre">Unlock</span>
                    <span className="portfolio-envelope__unlock-label-main">Mysteries</span>
                  </span>
                </button>
              </div>

              <p className="portfolio-envelope__hint">{portfolioEnvelope.unlockHint}</p>
              <p className="portfolio-entry-envelope__stuck-note">{portfolioEnvelope.stuckNote}</p>
            </div>
          </div>
        </div>

        <span className={`portfolio-envelope__flap portfolio-entry-envelope__flap ${unlocking ? "is-opening" : ""}`} aria-hidden>
          <span className="portfolio-entry-envelope__flap-shine" aria-hidden />
          <span className="portfolio-entry-envelope__flap-texture" aria-hidden />
        </span>

        <span className="portfolio-envelope__stamp portfolio-envelope__stamp--entry" aria-hidden>
          <span className="portfolio-entry-envelope__stamp-inner">
            <span className="portfolio-entry-envelope__stamp-ring" />
            <span className="flex flex-col items-center leading-none">
              <span className="text-[0.48rem] opacity-80">{portfolioEnvelope.postmark}</span>
              <span>{portfolioEnvelope.stamp}</span>
            </span>
          </span>
        </span>

        <span className="portfolio-envelope__classified" aria-hidden>{portfolioEnvelope.classified}</span>
      </div>
    </div>
  );
}

/** Fixed first-entry screen — portfolio only. Fits viewport; no page scroll. */
export function PortfolioEntryGate() {
  const { loading, startUnlock, completeUnlock, navBlockedTick } = usePortfolioUnlock();
  const [flapTriggered, setFlapTriggered] = useState(false);
  const [navShake, setNavShake] = useState(false);

  useEffect(() => lockPageScroll(), []);

  useEffect(() => {
    if (navBlockedTick === 0) return;
    setNavShake(true);
    const t = window.setTimeout(() => setNavShake(false), 720);
    return () => window.clearTimeout(t);
  }, [navBlockedTick]);

  const handleUnlock = () => {
    setFlapTriggered(true);
    window.setTimeout(startUnlock, 450);
  };

  return (
    <div className="portfolio-entry-screen" role="region" aria-label={portfolioEnvelope.screenLabel}>
      <div className="portfolio-entry-screen__backdrop" aria-hidden />
      <div className="portfolio-entry-screen__grid" aria-hidden />
      <svg className="portfolio-entry-screen__constellation" viewBox="0 0 400 400" aria-hidden>
        <path d="M40 80 L120 140 L200 60 L280 130 L360 70" />
        <path d="M60 320 L160 260 L240 310 L340 240" />
        <circle cx="120" cy="140" r="2" />
        <circle cx="200" cy="60" r="2.5" />
        <circle cx="280" cy="130" r="2" />
        <circle cx="160" cy="260" r="2" />
        <circle cx="340" cy="240" r="2.5" />
      </svg>
      <div className="portfolio-entry-screen__particles" aria-hidden>
        <FloatingParticles variant="portfolio" />
      </div>

      <div className="portfolio-entry-screen__frame">
        <p className="portfolio-entry-screen__label">
          <span className="portfolio-entry-screen__label-dot" aria-hidden />
          {portfolioEnvelope.screenLabel}
          <span className="portfolio-entry-screen__label-dot" aria-hidden />
        </p>

        <div className="portfolio-entry-screen__stage">
          <div className="portfolio-entry-screen__envelope-col">
            <EntryEnvelope
              onUnlock={handleUnlock}
              unlocking={flapTriggered || loading}
              navShake={navShake}
            />
          </div>

          <span className="portfolio-entry-screen__connector" aria-hidden>
            <span className="portfolio-entry-screen__connector-dot" />
            <span className="portfolio-entry-screen__connector-line" />
            <span className="portfolio-entry-screen__connector-dot" />
          </span>

          <div className="portfolio-entry-screen__charts-col">
            <ExpertiseCoverageChart variant="gate" className="portfolio-entry-screen__charts" />
          </div>
        </div>
      </div>

      {loading ? (
        <DeveloperUnlockLoader
          onComplete={() => {
            completeUnlock();
            window.scrollTo(0, 0);
          }}
        />
      ) : null}
    </div>
  );
}
