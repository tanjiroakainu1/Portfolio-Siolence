import type { MouseEvent, ReactNode } from "react";
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
      width="15"
      height="15"
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

function NavPillIcon({ children }: { children: ReactNode }) {
  return <span className="site-nav__pill-icon">{children}</span>;
}

function NavPill({
  href,
  label,
  icon,
  active,
  locked,
  lockedTitle,
  onClick,
  ariaLabel,
  className = "",
}: {
  href: string;
  label: ReactNode;
  icon: ReactNode;
  active: boolean;
  locked: boolean;
  lockedTitle?: string;
  onClick: (e: MouseEvent) => void;
  ariaLabel?: string;
  className?: string;
}) {
  const stateClass = locked
    ? "site-nav__pill--locked"
    : active
      ? "site-nav__pill--active"
      : "site-nav__pill--idle";

  return (
    <a
      href={href}
      aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
      aria-current={active && !locked ? "page" : undefined}
      aria-disabled={locked || undefined}
      title={locked ? lockedTitle : undefined}
      className={`site-nav__pill ${stateClass} ${className}`.trim()}
      onClick={onClick}
    >
      <NavPillIcon>{icon}</NavPillIcon>
      <span className="site-nav__pill-label">{label}</span>
    </a>
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
  const headerMode = navLocked ? "site-header--gate" : "site-header--browse";

  return (
    <header
      className={`site-header sticky top-0 z-[100] shrink-0 border-b border-fuchsia-400/30 bg-page/92 px-[var(--pad-x)] backdrop-blur-xl [--pad-x:clamp(0.75rem,3.5vw,1.5rem)] ${headerMode}`}
    >
      <div className="site-header__bar mx-auto flex max-w-layout items-center justify-between gap-2">
        <div className="site-header__brand min-w-0">
          <a
            href="#portfolio"
            className={`site-header__name ${navLocked ? "site-header__name--locked" : ""}`}
            aria-disabled={navLocked || undefined}
            title={navLocked ? lockedTitle : undefined}
            onClick={handleNav("portfolio")}
          >
            <span className="site-header__name-text">{profile.name}</span>
          </a>
          {showFirstEntry ? (
            <button
              type="button"
              className="site-nav__first-entry"
              onClick={() => onReturnToFirstEntry?.()}
              aria-label={portfolioEnvelope.firstEntryAria}
              title={portfolioEnvelope.firstEntryAria}
            >
              <span className="site-nav__first-entry-icon" aria-hidden>
                <FirstEntryIcon />
              </span>
              <span className="site-nav__first-entry-label site-nav__first-entry-label--short">Entry</span>
              <span className="site-nav__first-entry-label site-nav__first-entry-label--full">
                {portfolioEnvelope.firstEntryLabel}
              </span>
            </button>
          ) : null}
        </div>

        <nav
          className={`site-nav min-w-0 ${navLocked ? "site-nav--locked" : "site-nav--browse"}`}
          aria-label="Primary"
          aria-describedby={navLocked ? "site-nav-lock-hint" : undefined}
        >
          {navLocked ? (
            <p id="site-nav-lock-hint" className="site-nav__lock-hint" title={lockedTitle}>
              <LockedNavIcon />
              <span className="site-nav__lock-hint-text site-nav__lock-hint-text--long">{lockedTitle}</span>
              <span className="site-nav__lock-hint-text site-nav__lock-hint-text--short">
                {portfolioEnvelope.navLockHintShort}
              </span>
            </p>
          ) : null}

          <ul className="site-nav__list">
            <li>
              <NavPill
                href="#portfolio"
                label="Portfolio"
                icon={navLocked ? <LockedNavIcon /> : <NavPortfolioIcon className="block h-[1.05rem] w-[1.05rem]" />}
                active={route === "portfolio" && !projectsFocus}
                locked={navLocked}
                lockedTitle={lockedTitle}
                onClick={handleNav("portfolio")}
              />
            </li>
            <li>
              <NavPill
                href={PROJECT_SHOWCASE_ROUTE}
                label="Project"
                icon={navLocked ? <LockedNavIcon /> : <NavClientDriveIcon className="block h-[1.05rem] w-[1.05rem]" />}
                active={route === "showcase"}
                locked={navLocked}
                lockedTitle={lockedTitle}
                onClick={handleNav("showcase")}
                ariaLabel="Project image showcase"
                className="site-nav__pill--showcase"
              />
            </li>
            <li>
              <NavPill
                href="#chat"
                label={
                  <span className="site-nav__chat-label">
                    <span className="site-nav__chat-name">{assistant.name}</span>
                    <span className="site-nav__chat-sub">{assistant.navSubtitle}</span>
                  </span>
                }
                icon={navLocked ? <LockedNavIcon /> : <NavChatIcon className="block h-[1.05rem] w-[1.05rem]" />}
                active={route === "chat"}
                locked={navLocked}
                lockedTitle={lockedTitle}
                onClick={handleNav("chat")}
                ariaLabel={`${assistant.name} ${assistant.navSubtitle}`}
                className="site-nav__pill--chat"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
