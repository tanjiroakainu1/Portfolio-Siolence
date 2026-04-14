import type { AppRoute } from "../hooks/useHashRoute";
import type { Assistant } from "../data/portfolioData";
import type { Profile } from "../data/portfolioData";
import { NavChatIcon, NavPortfolioIcon } from "../icons";

export function SiteHeader({
  profile,
  assistant,
  route,
}: {
  profile: Profile;
  assistant: Assistant;
  route: AppRoute;
}) {
  return (
    <header className="sticky top-0 z-[100] shrink-0 border-b border-cyan-400/30 bg-page/92 px-[var(--pad-x)] pb-[max(0.65rem,env(safe-area-inset-top,0px))] pt-[max(0.65rem,env(safe-area-inset-top,0px))] shadow-[0_4px_28px_rgba(0,0,0,0.4),0_0_40px_rgba(34,211,238,0.06),inset_0_-1px_0_rgba(34,211,238,0.1)] backdrop-blur-xl [--pad-x:clamp(0.875rem,4vw,1.5rem)]">
      <div className="mx-auto flex max-w-layout flex-wrap items-center justify-between gap-[clamp(0.65rem,2vw,1rem)]">
        <a
          href="#portfolio"
          className="rounded-lg py-1.5 text-[clamp(0.95rem,2.5vw,1.05rem)] font-bold tracking-tight text-slate-100 no-underline transition-colors hover:text-bolt"
        >
          {profile.name}
        </a>
        <nav className="site-nav" aria-label="Primary">
          <ul className="m-0 flex list-none flex-wrap items-center justify-end gap-[0.45rem] p-0">
            <li>
              <a
                href="#portfolio"
                data-nav="portfolio"
                aria-current={route === "portfolio" ? "page" : undefined}
                className={`inline-flex min-h-[44px] items-center justify-center gap-[0.45rem] rounded-full border px-4 py-2 text-[clamp(0.84rem,2.4vw,0.91rem)] font-semibold no-underline transition-[color,background,border,box-shadow] ${
                  route === "portfolio"
                    ? "border-accent/40 bg-cyan-500/10 text-bolt shadow-[0_0_20px_rgba(34,211,238,0.2),0_0_0_1px_rgba(34,211,238,0.15)]"
                    : "border-white/10 bg-white/[0.04] text-muted hover:border-cyan-500/25 hover:bg-surface-2/90 hover:text-slate-200"
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-current">
                  <NavPortfolioIcon className="block" />
                </span>
                <span>Portfolio</span>
              </a>
            </li>
            <li>
              <a
                href="#chat"
                data-nav="chat"
                aria-label={`${assistant.name} ${assistant.navSubtitle}`}
                aria-current={route === "chat" ? "page" : undefined}
                className={`inline-flex min-h-[44px] flex-wrap items-center justify-center gap-[0.45rem] rounded-full border py-2 pl-[0.82rem] pr-4 text-[clamp(0.84rem,2.4vw,0.91rem)] font-semibold no-underline transition-[color,background,border,box-shadow] max-[420px]:justify-center ${
                  route === "chat"
                    ? "border-ion/40 bg-violet-500/10 text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.22),0_0_0_1px_rgba(167,139,250,0.2)]"
                    : "border-white/10 bg-white/[0.04] text-muted hover:border-ion/30 hover:bg-surface-2/90 hover:text-slate-200"
                }`}
              >
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
