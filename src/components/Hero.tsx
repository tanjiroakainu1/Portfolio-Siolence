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

        <div className="relative mx-auto flex max-w-[36rem] flex-col items-center text-center">
          <div className="mb-5 flex w-full items-center justify-center gap-3">
            <span className="h-px w-8 max-w-[2.5rem] bg-gradient-to-r from-transparent to-cyan-400/60 sm:w-12" aria-hidden />
            <p className="m-0 shrink-0 text-[clamp(0.68rem,2vw,0.74rem)] font-semibold uppercase tracking-[0.2em] text-cyan-200/95">
              {profile.year} · {profile.title}
            </p>
            <span className="h-px w-8 max-w-[2.5rem] bg-gradient-to-l from-transparent to-violet-400/60 sm:w-12" aria-hidden />
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
                className="relative mx-auto block h-32 w-32 rounded-[1.25rem] border border-cyan-400/20 bg-surface object-cover shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_40px_rgba(34,211,238,0.12)] ring-2 ring-cyan-400/15 sm:h-36 sm:w-36"
              />
            </div>
          </div>

          <h1 className="m-0 max-w-[22ch] bg-gradient-to-br from-white via-cyan-100 to-cyan-300 bg-clip-text text-[clamp(1.65rem,5vw,2.35rem)] font-bold tracking-[-0.03em] text-transparent drop-shadow-[0_0_28px_rgba(34,211,238,0.35)]">
            {profile.name}
          </h1>
          <p className="mt-3 max-w-[34rem] bg-gradient-to-r from-cyan-100 via-slate-100 to-violet-200 bg-clip-text text-[clamp(0.92rem,2.6vw,1.05rem)] font-semibold leading-snug text-transparent">
            {profile.tagline}
          </p>

          <div className="mt-6 w-full max-w-[34rem] space-y-4 text-[clamp(0.88rem,2.4vw,0.97rem)] leading-relaxed">
            <p className="m-0 border-l-2 border-cyan-400/60 pl-4 text-left text-slate-300">
              {profile.intro}
            </p>
            <p className="m-0 border-l-2 border-violet-400/60 pl-4 text-left font-medium text-slate-100">
              {profile.introClosing}
            </p>
            <div className="rounded-xl border border-cyan-400/30 bg-gradient-to-br from-accent/18 via-ion/12 to-cyan-500/12 px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_18px_rgba(0,0,0,0.35),0_0_26px_rgba(34,211,238,0.08)] sm:px-5">
              <p className="m-0 text-[0.92em] leading-relaxed text-slate-300">{profile.cta}</p>
            </div>
          </div>

          <section className="mt-7 w-full max-w-[36rem] rounded-2xl border border-violet-400/28 bg-gradient-to-br from-violet-500/10 via-page/85 to-cyan-500/10 p-4 text-left shadow-[0_8px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
            <p className="m-0 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cyan-200/90">
              {profile.storyLead}
            </p>
            <div className="mt-3 grid gap-3">
              {profile.developmentStories.map((story) => (
                <article
                  key={story.title}
                  className="rounded-xl border border-white/10 bg-surface-2/70 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  <h3 className="m-0 text-[0.9rem] font-semibold tracking-[0.01em] text-slate-100">
                    {story.title}
                  </h3>
                  <p className="mt-2 mb-0 text-[0.82rem] text-slate-300">
                    <span className="font-semibold text-cyan-200">Core:</span> {story.context}
                  </p>
                  <p className="mt-1.5 mb-0 text-[0.82rem] text-slate-300">
                    <span className="font-semibold text-violet-200">Implementation:</span> {story.build}
                  </p>
                  <p className="mt-1.5 mb-0 text-[0.82rem] text-slate-300">
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
      <p className="mb-2 mt-7 text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
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
