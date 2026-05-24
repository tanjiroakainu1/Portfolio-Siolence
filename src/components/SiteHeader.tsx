import type { MouseEvent } from "react";
import type { AppRoute } from "../hooks/useHashRoute";
import type { Assistant } from "../data/portfolioData";
import type { Profile } from "../data/portfolioData";
import { portfolioEnvelope } from "../data/portfolioData";
import { NavChatIcon, NavClientDriveIcon, NavPortfolioIcon } from "../icons";
import { PROJECT_SHOWCASE_ROUTE } from "../lib/projectShowcaseNav";

export type HeaderNavTarget = "portfolio" | "chat" | "showcase";

function LockedNavIcon() {
  return (
    <svg
      className="site-nav__lock-icon"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

function FirstEntryIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function SiteHeader({
  profile,
  assistant,
  route,
  projectsFocus,
  navLocked = false,
  showFirstEntry = false,
  onHeaderNavigate,
  onLockedNavAttempt,
  onReturnToFirstEntry,
}: {
  profile: Profile;
  assistant: Assistant;
  route: AppRoute;
  projectsFocus: boolean;
  navLocked?: boolean;
  showFirstEntry?: boolean;
  onHeaderNavigate: (target: HeaderNavTarget) => void;
  onLockedNavAttempt?: () => void;
  onReturnToFirstEntry?: () => void;
}) {
  const handleNav = (target: HeaderNavTarget) => (e: MouseEvent) => {
    e.preventDefault();
    if (navLocked) {
      onLockedNavAttempt?.();
      return;
    }
    onHeaderNavigate(target);
  };

  const lockedTitle = portfolioEnvelope.navLockHint;

  return (
    <header className="sticky top-0 z-[100] shrink-0 border-b border-fuchsia-400/30 bg-page/92 px-[var(--pad-x)] pb-[max(0.65rem,env(safe-area-inset-top,0px))] pt-[max(0.65rem,env(safe-area-inset-top,0px))] shadow-[0_4px_28px_rgba(0,0,0,0.45),0_0_48px_rgba(232,121,249,0.08),inset_0_-1px_0_rgba(244,114,182,0.12)] backdrop-blur-xl [--pad-x:clamp(0.875rem,4vw,1.5rem)]">
      <div className="mx-auto flex max-w-layout flex-wrap items-center justify-between gap-[clamp(0.65rem,2vw,1rem)]">
        <div className="flex min-w-0 flex-wrap items-center gap-[clamp(0.45rem,1.5vw,0.65rem)]">
          <a
            href="#portfolio"
            className={`rounded-lg bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text py-1.5 text-[clamp(0.95rem,2.5vw,1.05rem)] font-bold tracking-tight text-transparent no-underline transition-opacity ${
              navLocked ? "site-nav__link--locked pointer-events-auto opacity-55" : "hover:opacity-90"
            }`}
            aria-disabled={navLocked || undefined}
            title={navLocked ? lockedTitle : undefined}
            onClick={handleNav("portfolio")}
          >
            {profile.name}
          </a>
          {showFirstEntry ? (
            <button
              type="button"
              className="site-nav__first-entry inline-flex min-h-[40px] items-center justify-center gap-[0.4rem] rounded-full border border-pink-400/35 bg-gradient-to-r from-fuchsia-500/14 via-violet-500/10 to-pink-500/12 px-3 py-1.5 text-[clamp(0.72rem,2vw,0.8rem)] font-semibold text-fuchsia-100 shadow-[0_0_20px_rgba(244,114,182,0.18)] transition-[transform,box-shadow,border-color] hover:-translate-y-px hover:border-pink-300/50 hover:shadow-[0_0_28px_rgba(232,121,249,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400/55 max-[420px]:px-2.5"
              onClick={() => onReturnToFirstEntry?.()}
              aria-label={portfolioEnvelope.firstEntryAria}
              title={portfolioEnvelope.firstEntryAria}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.08] text-current">
                <FirstEntryIcon />
              </span>
              <span className="max-[480px]:hidden">{portfolioEnvelope.firstEntryLabel}</span>
            </button>
          ) : null}
        </div>
        <nav
          className={`site-nav ${navLocked ? "site-nav--locked" : ""}`}
          aria-label="Primary"
          aria-describedby={navLocked ? "site-nav-lock-hint" : undefined}
        >
          {navLocked ? (
            <p id="site-nav-lock-hint" className="site-nav__lock-hint" title={lockedTitle}>
              <LockedNavIcon />
              <span className="site-nav__lock-hint-text site-nav__lock-hint-text--long">{lockedTitle}</span>
              <span className="site-nav__lock-hint-text site-nav__lock-hint-text--short">{portfolioEnvelope.navLockHintShort}</span>
            </p>
          ) : null}
          <ul className="m-0 flex list-none flex-wrap items-center justify-end gap-[0.45rem] p-0">
            <li>
              <a
                href="#portfolio"
                data-nav="portfolio"
                aria-current={route === "portfolio" && !projectsFocus ? "page" : undefined}
                aria-disabled={navLocked || undefined}
                title={navLocked ? lockedTitle : undefined}
                className={`inline-flex min-h-[44px] items-center justify-center gap-[0.45rem] rounded-full border px-4 py-2 text-[clamp(0.84rem,2.4vw,0.91rem)] font-semibold no-underline transition-[color,background,border,box-shadow] ${
                  navLocked
                    ? "site-nav__link--locked"
                    : route === "portfolio" && !projectsFocus
                      ? "border-accent/45 bg-fuchsia-500/12 text-bolt shadow-[0_0_24px_rgba(244,114,182,0.25),0_0_0_1px_rgba(232,121,249,0.2)]"
                      : "border-white/10 bg-white/[0.04] text-muted hover:border-fuchsia-500/30 hover:bg-surface-2/90 hover:text-fuchsia-100"
                }`}
                onClick={handleNav("portfolio")}
              >
                {navLocked ? <LockedNavIcon /> : null}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-current">
                  <NavPortfolioIcon className="block" />
                </span>
                <span>Portfolio</span>
              </a>
            </li>
            <li>
              <a
                href={PROJECT_SHOWCASE_ROUTE}
                data-nav="showcase"
                aria-label="Project image showcase"
                aria-current={route === "showcase" ? "page" : undefined}
                aria-disabled={navLocked || undefined}
                title={navLocked ? lockedTitle : undefined}
                className={`inline-flex min-h-[44px] items-center justify-center gap-[0.45rem] rounded-full border px-3.5 py-2 text-[clamp(0.78rem,2.2vw,0.84rem)] font-semibold no-underline transition-[color,background,border,box-shadow] ${
                  navLocked
                    ? "site-nav__link--locked"
                    : route === "showcase"
                      ? "border-violet-400/45 bg-violet-500/14 text-violet-100 shadow-[0_0_24px_rgba(168,85,247,0.28)]"
                      : "border-white/10 bg-white/[0.04] text-muted hover:border-violet-500/35 hover:bg-surface-2/90 hover:text-violet-100"
                }`}
                onClick={handleNav("showcase")}
              >
                {navLocked ? <LockedNavIcon /> : null}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-current">
                  <NavClientDriveIcon className="block" />
                </span>
                <span className="max-[380px]:hidden">Project</span>
              </a>
            </li>
            <li>
              <a
                href="#chat"
                data-nav="chat"
                aria-label={`${assistant.name} ${assistant.navSubtitle}`}
                aria-current={route === "chat" ? "page" : undefined}
                aria-disabled={navLocked || undefined}
                title={navLocked ? lockedTitle : undefined}
                className={`inline-flex min-h-[44px] flex-wrap items-center justify-center gap-[0.45rem] rounded-full border py-2 pl-[0.82rem] pr-4 text-[clamp(0.84rem,2.4vw,0.91rem)] font-semibold no-underline transition-[color,background,border,box-shadow] max-[420px]:justify-center ${
                  navLocked
                    ? "site-nav__link--locked"
                    : route === "chat"
                      ? "border-ion/45 bg-violet-500/12 text-violet-200 shadow-[0_0_24px_rgba(168,85,247,0.28),0_0_0_1px_rgba(192,132,252,0.22)]"
                      : "border-white/10 bg-white/[0.04] text-muted hover:border-ion/35 hover:bg-surface-2/90 hover:text-violet-100"
                }`}
                onClick={handleNav("chat")}
              >
                {navLocked ? <LockedNavIcon /> : null}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-current">
                  <NavChatIcon className="block" />
                </span>
                <span className="flex flex-wrap items-baseline justify-center gap-x-1 gap-y-0.5 max-[360px]:flex-col max-[360px]:items-center">
                  <span className="font-bold tracking-[0.05em] text-[clamp(0.78rem,2.2vw,0.84rem)] text-current">
                    {assistant.name}
                  </span>
                  <span className="hidden h-3 w-px bg-white/18 max-[360px]:hidden sm:inline" aria-hidden />
                  <span className="text-[clamp(0.68rem,2vw,0.74rem)] font-semibold uppercase tracking-[0.14em] text-current opacity-90">
                    {assistant.navSubtitle}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
