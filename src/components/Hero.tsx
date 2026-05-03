import { portraitImageSrc, type Assistant, type Profile } from "../data/portfolioData";

const CHIP_STYLES = [
  "border-cyan-400/40 bg-cyan-500/10 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.18)]",
  "border-violet-400/40 bg-violet-500/12 text-violet-100 shadow-[0_0_22px_rgba(139,92,246,0.18)]",
  "border-sky-400/40 bg-sky-500/10 text-sky-100 shadow-[0_0_20px_rgba(14,165,233,0.15)]",
  "border-fuchsia-400/35 bg-fuchsia-500/10 text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.14)]",
  "border-bolt/30 bg-cyan-400/8 text-bolt shadow-[0_0_18px_rgba(103,232,249,0.15)]",
];

export function Hero({ profile, assistant }: { profile: Profile; assistant: Assistant }) {
  return (
    <header className="mb-[clamp(0.35rem,1.5vw,1rem)] border-b border-cyan-500/10 pb-[clamp(1rem,3vw,1.5rem)] pt-[clamp(0.35rem,1.5vw,0.6rem)]">
      <div className="relative overflow-hidden rounded-[1.35rem] border border-cyan-400/35 bg-gradient-to-br from-cyan-500/[0.1] via-page/85 to-violet-600/[0.2] p-[clamp(1rem,3vw,1.5rem)] shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_56px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-cyan-400/15 backdrop-blur-[1.5px] sm:rounded-3xl sm:p-8">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-accent/25 to-transparent blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-gradient-to-tr from-ion/30 to-transparent blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-[36rem] flex-col items-center antialiased">
          <div className="mb-5 flex w-full max-w-lg items-center justify-center gap-3 text-center">
            <span className="h-px w-8 max-w-[2.5rem] shrink-0 bg-gradient-to-r from-transparent to-cyan-400/60 sm:w-12" aria-hidden />
            <p className="m-0 min-w-0 shrink font-display text-[clamp(0.65rem,1.85vw,0.72rem)] font-semibold uppercase tracking-[0.22em] text-cyan-200/95">
              {profile.year} · {profile.title}
            </p>
            <span className="h-px w-8 max-w-[2.5rem] shrink-0 bg-gradient-to-l from-transparent to-violet-400/60 sm:w-12" aria-hidden />
          </div>

          <div className="mb-6">
            <div className="relative mx-auto w-fit">
              <div
                className="absolute -inset-1 rounded-[1.45rem] bg-gradient-to-br from-accent/60 via-ion/40 to-cyan-300/35 opacity-95 blur-[2px]"
                aria-hidden
              />
              <img
                src={portraitImageSrc}
                alt=""
                width={160}
                height={160}
                decoding="async"
                fetchPriority="high"
                className="relative mx-auto block h-32 w-32 rounded-[1.25rem] border border-cyan-400/20 bg-surface object-cover object-[center_15%] shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_40px_rgba(34,211,238,0.12)] ring-2 ring-cyan-400/15 sm:h-36 sm:w-36"
              />
            </div>
          </div>

          <h1 className="m-0 max-w-[20ch] text-balance bg-gradient-to-br from-white via-cyan-50 to-cyan-200/95 bg-clip-text text-center font-display text-[clamp(1.7rem,5.2vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-transparent drop-shadow-[0_0_32px_rgba(34,211,238,0.32)]">
            {profile.name}
          </h1>
          <p className="mt-3.5 w-full max-w-[34rem] text-balance bg-gradient-to-r from-cyan-100/95 via-slate-100 to-violet-200/90 bg-clip-text px-2 text-center font-display text-[clamp(0.94rem,2.5vw,1.08rem)] font-medium leading-[1.45] tracking-[-0.01em] text-transparent">
            {profile.tagline}
          </p>

          {/* Single reading column: shared max-width + one left rail so CTA lines up with body copy */}
          <div className="relative mt-8 w-full max-w-[34rem]">
            <div
              className="pointer-events-none absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-cyan-400/70 via-violet-400/55 to-cyan-400/45"
              aria-hidden
            />
            <div className="space-y-5 pl-5 font-hero text-[clamp(0.875rem,2.35vw,0.98rem)] leading-[1.68] tracking-[0.012em]">
              <p className="m-0 text-left text-slate-200/92 [&::selection]:bg-cyan-500/25">{profile.intro}</p>
              <p className="m-0 text-left font-medium text-slate-100/95 [&::selection]:bg-violet-500/20">
                {profile.introClosing}
              </p>
              <div className="rounded-xl border border-cyan-400/30 bg-gradient-to-br from-accent/16 via-ion/10 to-cyan-500/10 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_18px_rgba(0,0,0,0.35),0_0_26px_rgba(34,211,238,0.08)] sm:px-5 sm:py-4">
                <p className="m-0 text-[0.97em] font-medium leading-[1.65] text-slate-200/95">{profile.cta}</p>
              </div>
            </div>
          </div>

          <section className="mt-9 w-full max-w-[34rem] rounded-2xl border border-violet-400/28 bg-gradient-to-br from-violet-500/10 via-page/85 to-cyan-500/10 p-4 text-left shadow-[0_8px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
            <div className="mb-4 flex w-full items-center gap-3">
              <span className="h-px min-w-[1.25rem] flex-1 bg-gradient-to-r from-transparent to-cyan-400/45" aria-hidden />
              <h2 className="m-0 shrink-0 text-center font-display text-[clamp(0.68rem,1.9vw,0.76rem)] font-semibold uppercase tracking-[0.2em] text-cyan-100/95">
                {profile.storyLead}
              </h2>
              <span className="h-px min-w-[1.25rem] flex-1 bg-gradient-to-l from-transparent to-violet-400/45" aria-hidden />
            </div>
            <div className="grid gap-3 font-hero">
              {profile.developmentStories.map((story) => (
                <article
                  key={story.title}
                  className="rounded-xl border border-white/10 bg-surface-2/70 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-4"
                >
                  <h3 className="m-0 font-display text-[0.92rem] font-semibold leading-snug tracking-[-0.015em] text-slate-100 sm:text-[0.94rem]">
                    {story.title}
                  </h3>
                  <p className="mt-2 mb-0 text-[0.83rem] leading-relaxed text-slate-300/95">
                    <span className="font-semibold text-cyan-200">Core:</span> {story.context}
                  </p>
                  <p className="mt-1.5 mb-0 text-[0.83rem] leading-relaxed text-slate-300/95">
                    <span className="font-semibold text-violet-200">Implementation:</span> {story.build}
                  </p>
                  <p className="mt-1.5 mb-0 text-[0.83rem] leading-relaxed text-slate-300/95">
                    <span className="font-semibold text-emerald-200">Outcome:</span> {story.impact}
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
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-accent/50 bg-gradient-to-r from-cyan-500/20 to-accent/15 px-5 py-2.5 text-[clamp(0.82rem,2.3vw,0.9rem)] font-semibold text-bolt no-underline shadow-bolt-sm transition-[background,transform,box-shadow] hover:-translate-y-0.5 hover:from-cyan-500/28 hover:shadow-[0_0_36px_rgba(34,211,238,0.35)]"
        >
          {assistant.name} · {assistant.navSubtitle}
        </a>
        <a
          href="#stack"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-ion/35 bg-gradient-to-r from-violet-600/18 to-indigo-900/20 px-5 py-2.5 text-[clamp(0.82rem,2.3vw,0.9rem)] font-semibold text-violet-200/95 no-underline shadow-ion-sm transition-[background,border,transform] hover:-translate-y-0.5 hover:border-ion/50 hover:from-violet-600/26"
        >
          Stack &amp; tools
        </a>
      </div>
      <p className="mb-2 mt-7 text-center font-display text-[0.7rem] font-semibold uppercase tracking-[0.17em] text-slate-400">
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
