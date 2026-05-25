import { portraitImageSrc, type Assistant, type Profile } from "../data/portfolioData";

const CHIP_STYLES = [
  "border-fuchsia-400/45 bg-fuchsia-500/12 text-fuchsia-100 shadow-[0_0_22px_rgba(232,121,249,0.22)]",
  "border-violet-400/45 bg-violet-500/14 text-violet-100 shadow-[0_0_22px_rgba(168,85,247,0.22)]",
  "border-pink-400/40 bg-pink-500/12 text-pink-100 shadow-[0_0_20px_rgba(244,114,182,0.18)]",
  "border-candy/40 bg-fuchsia-500/10 text-bolt shadow-[0_0_20px_rgba(217,70,239,0.16)]",
  "border-accent/35 bg-accent/10 text-bolt shadow-candy-sm",
];

export function Hero({ profile, assistant }: { profile: Profile; assistant: Assistant }) {
  return (
    <header className="portfolio-hero mb-[clamp(0.25rem,1vh,0.65rem)] border-b border-fuchsia-500/15 pb-[clamp(0.75rem,2vh,1.15rem)] pt-[clamp(0.15rem,0.8vh,0.4rem)] motion-safe:animate-envelope-letter-rise">
      <div className="relative overflow-hidden rounded-[1.2rem] border border-fuchsia-400/35 bg-gradient-to-br from-fuchsia-500/[0.12] via-page/88 to-violet-600/[0.22] p-[clamp(0.85rem,2.5vw,1.15rem)] shadow-panel ring-1 ring-fuchsia-400/20 backdrop-blur-[1.5px] sm:rounded-3xl sm:p-6">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-accent/30 to-transparent blur-3xl motion-safe:animate-galaxy-shimmer"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-gradient-to-tr from-ion/35 to-transparent blur-3xl motion-safe:animate-galaxy-shimmer"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nebula/10 blur-[80px]"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-[36rem] flex-col items-center antialiased">
          <div className="mb-3 flex w-full max-w-lg items-center justify-center gap-2 text-center sm:mb-4 sm:gap-3">
            <span className="h-px w-8 max-w-[2.5rem] shrink-0 bg-gradient-to-r from-transparent to-fuchsia-400/65 sm:w-12" aria-hidden />
            <p className="m-0 min-w-0 shrink font-display text-[clamp(0.65rem,1.85vw,0.72rem)] font-semibold uppercase tracking-[0.22em] text-fuchsia-200/95">
              {profile.year} · {profile.title}
            </p>
            <span className="h-px w-8 max-w-[2.5rem] shrink-0 bg-gradient-to-l from-transparent to-violet-400/65 sm:w-12" aria-hidden />
          </div>

          <div className="mb-4 sm:mb-5">
            <div className="relative mx-auto w-fit">
              <div className="absolute -inset-1 rounded-[1.45rem] bg-candy-gradient opacity-95 blur-[3px]" aria-hidden />
              <img
                src={portraitImageSrc}
                alt=""
                width={160}
                height={160}
                decoding="async"
                fetchPriority="high"
                className="relative mx-auto block h-28 w-28 rounded-[1.15rem] border border-fuchsia-400/25 bg-surface object-cover object-[center_15%] shadow-[0_16px_48px_rgba(0,0,0,0.55),0_0_48px_rgba(232,121,249,0.18)] ring-2 ring-fuchsia-400/20 sm:h-32 sm:w-32"
              />
            </div>
          </div>

          <h1 className="m-0 max-w-[20ch] text-balance bg-gradient-to-br from-white via-fuchsia-100 to-violet-200 bg-clip-text text-center font-display text-[clamp(1.7rem,5.2vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-transparent drop-shadow-[0_0_36px_rgba(232,121,249,0.35)]">
            {profile.name}
          </h1>
          <p className="mt-2.5 w-full max-w-[34rem] text-balance bg-gradient-to-r from-fuchsia-100/95 via-slate-100 to-violet-200/90 bg-clip-text px-2 text-center font-display text-[clamp(0.88rem,2.3vw,1.02rem)] font-medium leading-[1.42] tracking-[-0.01em] text-transparent sm:mt-3">
            {profile.tagline}
          </p>

          <div className="relative mt-5 w-full max-w-[34rem] sm:mt-6">
            <div
              className="pointer-events-none absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-fuchsia-400/75 via-violet-400/60 to-pink-400/50"
              aria-hidden
            />
            <div className="space-y-3.5 pl-4 font-hero text-[clamp(0.84rem,2.2vw,0.94rem)] leading-[1.62] tracking-[0.012em] sm:space-y-4 sm:pl-5 sm:text-[0.94rem]">
              <p className="m-0 text-left text-slate-200/92 [&::selection]:bg-fuchsia-500/25">{profile.intro}</p>
              <p className="m-0 text-left font-medium text-slate-100/95 [&::selection]:bg-violet-500/25">
                {profile.introClosing}
              </p>
              <div className="rounded-xl border border-fuchsia-400/32 bg-gradient-to-br from-accent/18 via-ion/12 to-fuchsia-500/12 px-4 py-3.5 shadow-tile sm:px-5 sm:py-4">
                <p className="m-0 text-[0.97em] font-medium leading-[1.65] text-slate-200/95">{profile.cta}</p>
              </div>
            </div>
          </div>

          <section className="mt-6 w-full max-w-[34rem] rounded-2xl border border-violet-400/32 bg-gradient-to-br from-violet-500/12 via-page/88 to-fuchsia-500/12 p-3.5 text-left shadow-[0_8px_28px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] sm:mt-7 sm:p-4">
            <div className="mb-4 flex w-full items-center gap-3">
              <span className="h-px min-w-[1.25rem] flex-1 bg-gradient-to-r from-transparent to-fuchsia-400/50" aria-hidden />
              <h2 className="m-0 shrink-0 text-center font-display text-[clamp(0.68rem,1.9vw,0.76rem)] font-semibold uppercase tracking-[0.2em] text-fuchsia-100/95">
                {profile.storyLead}
              </h2>
              <span className="h-px min-w-[1.25rem] flex-1 bg-gradient-to-l from-transparent to-violet-400/50" aria-hidden />
            </div>
            <div className="grid gap-3 font-hero">
              {profile.developmentStories.map((story) => (
                <article
                  key={story.title}
                  className="rounded-xl border border-white/10 bg-surface-2/75 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-4"
                >
                  <h3 className="m-0 font-display text-[0.92rem] font-semibold leading-snug tracking-[-0.015em] text-slate-100 sm:text-[0.94rem]">
                    {story.title}
                  </h3>
                  <p className="mt-2 mb-0 text-[0.83rem] leading-relaxed text-slate-300/95">
                    <span className="font-semibold text-fuchsia-200">Core:</span> {story.context}
                  </p>
                  <p className="mt-1.5 mb-0 text-[0.83rem] leading-relaxed text-slate-300/95">
                    <span className="font-semibold text-violet-200">Implementation:</span> {story.build}
                  </p>
                  <p className="mt-1.5 mb-0 text-[0.83rem] leading-relaxed text-slate-300/95">
                    <span className="font-semibold text-pink-200">Outcome:</span> {story.impact}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="#chat"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-accent/50 bg-gradient-to-r from-fuchsia-500/22 to-accent/18 px-5 py-2.5 text-[clamp(0.82rem,2.3vw,0.9rem)] font-semibold text-bolt no-underline shadow-candy-sm transition-[background,transform,box-shadow] hover:-translate-y-0.5 hover:from-fuchsia-500/30 hover:shadow-candy-md"
        >
          {assistant.name} · {assistant.navSubtitle}
        </a>
        <a
          href="#stack"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-ion/40 bg-gradient-to-r from-violet-600/22 to-nebula/20 px-5 py-2.5 text-[clamp(0.82rem,2.3vw,0.9rem)] font-semibold text-violet-200/95 no-underline shadow-ion-sm transition-[background,border,transform] hover:-translate-y-0.5 hover:border-ion/55 hover:from-violet-600/30"
        >
          Stack &amp; tools
        </a>
      </div>
      <p className="mb-2 mt-7 text-center font-display text-[0.7rem] font-semibold uppercase tracking-[0.17em] text-muted">
        {profile.chipsLabel}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {profile.highlights.map((t, i) => (
          <span
            key={t}
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[clamp(0.75rem,2.1vw,0.82rem)] font-medium ${CHIP_STYLES[i % CHIP_STYLES.length]}`}
          >
            {t}
          </span>
        ))}
      </div>
    </header>
  );
}
