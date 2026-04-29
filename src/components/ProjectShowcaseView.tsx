import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { profile, skills, social, stackSectionTitle } from "../data/portfolioData";
import { projectShowcaseImages } from "../data/projectShowcaseImages";
import { showcaseTechLead } from "../data/projectShowcaseTech";
import { SocialIcon } from "../icons";
import { StackTechPanel } from "./StackTechPanel";

const SWIPE_MIN_PX = 48;

const showcaseFacebookLinks = social.filter((s) => s.network === "facebook");

const TRANSACTION_RECEIPTS_HREF = "https://www.facebook.com/share/p/1CqytMvtyU/";
const TRANSACTION_RECEIPTS_LABEL =
  "Transaction receipts of 100+ capstone systems — system development and capstone system development revision";

/**
 * Project image gallery — assets from `images/1.png` … `images/14.png` (bundled via imports).
 * Tap a card to open fullscreen; swipe or use arrows to move through all images.
 */
export function ProjectShowcaseView({ hidden }: { hidden: boolean }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  /** Avoid backdrop `click` firing right after a swipe (mobile). */
  const suppressBackdropCloseRef = useRef(false);

  const total = projectShowcaseImages.length;

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : Math.min(i + 1, total - 1)));
  }, [total]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : Math.max(i - 1, 0)));
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (hidden) setLightboxIndex(null);
  }, [hidden]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null || lightboxIndex === null) return;
    const end = e.changedTouches[0]?.clientX;
    if (end === undefined) return;
    const dx = end - start;
    if (dx < -SWIPE_MIN_PX) {
      suppressBackdropCloseRef.current = true;
      goNext();
      window.setTimeout(() => {
        suppressBackdropCloseRef.current = false;
      }, 450);
    } else if (dx > SWIPE_MIN_PX) {
      suppressBackdropCloseRef.current = true;
      goPrev();
      window.setTimeout(() => {
        suppressBackdropCloseRef.current = false;
      }, 450);
    }
  };

  const onBackdropPointerUp = () => {
    if (suppressBackdropCloseRef.current) return;
    closeLightbox();
  };

  const open = lightboxIndex !== null;
  const current = open ? projectShowcaseImages[lightboxIndex] : null;
  const canPrev = open && lightboxIndex > 0;
  const canNext = open && lightboxIndex < total - 1;

  return (
    <section
      id="view-project-showcase"
      className={`relative flex min-h-0 flex-1 flex-col ${open ? "z-[110] isolate" : "z-10"}`}
      aria-label="Project showcase"
      hidden={hidden}
    >
      <div
        className={`relative mx-auto w-full max-w-layout flex-1 px-[max(0.75rem,min(1.5rem,4vw))] py-[clamp(1rem,3.5vw,2rem)] pb-[max(5.5rem,min(7rem,12vw))] pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] sm:px-[clamp(1rem,4vw,1.5rem)] sm:pb-[max(6rem,min(7.5rem,10vw))] ${open ? "z-0" : "z-[1]"}`}
      >
        <header className="mb-[clamp(1.35rem,4.2vw,2.25rem)] border-b border-cyan-500/15 pb-[clamp(1.1rem,3.2vw,1.65rem)] text-center sm:text-left">
          <p className="m-0 text-[clamp(0.62rem,1.8vw,0.68rem)] font-semibold uppercase tracking-[0.18em] text-cyan-200/85 sm:tracking-[0.2em]">
            {profile.name}
          </p>
          <h1 className="mt-2 bg-gradient-to-br from-white via-cyan-100 to-violet-200 bg-clip-text text-[clamp(1.2rem,4.5vw,1.85rem)] font-bold tracking-tight text-transparent">
            Project showcase
          </h1>
          <p className="mx-auto mt-3 max-w-[min(100%,40rem)] text-[clamp(0.8rem,2.2vw,0.92rem)] leading-relaxed text-slate-400 sm:mx-0 lg:max-w-[42rem]">
            {showcaseTechLead}
          </p>

          <StackTechPanel
            rows={skills}
            eyebrow={stackSectionTitle}
            className="mx-auto mt-4 w-full max-w-[min(100%,40rem)] sm:mx-0 sm:mt-5 lg:max-w-[42rem]"
            listAriaLabel={`${stackSectionTitle} — delivered projects`}
          />
        </header>

        <div className="relative mx-auto mb-[clamp(1.25rem,3.5vw,2rem)] w-full max-w-[min(100%,40rem)] overflow-hidden rounded-[clamp(1rem,2.2vw,1.35rem)] border border-cyan-400/22 bg-gradient-to-b from-surface/55 via-page/40 to-[#060d18]/90 p-[clamp(1rem,2.8vw,1.5rem)] shadow-[0_12px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-md sm:mx-0 sm:p-6 lg:max-w-[42rem]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
            aria-hidden
          />
          <p className="m-0 text-[clamp(0.62rem,1.8vw,0.68rem)] font-semibold uppercase tracking-[0.18em] text-cyan-200/90">
            Facebook and receipts
          </p>

          <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:mt-5 sm:grid-cols-3 sm:gap-3">
            {showcaseFacebookLinks.map((link, index) => (
              <li key={link.href} className="min-w-0">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in new tab)`}
                  className="flex h-full min-h-[5.5rem] flex-col items-center justify-center gap-2.5 rounded-2xl border border-white/[0.08] bg-[#0a1220]/75 px-4 py-4 text-center no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#1877F2]/45 hover:bg-[#1877F2]/[0.08] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35),0_0_28px_rgba(24,119,242,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1877F2]/25 to-[#0c64d4]/10 text-[#1877F2] shadow-[0_4px_16px_rgba(24,119,242,0.2)] ring-1 ring-[#1877F2]/30">
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-md bg-page/95 px-1 text-[0.55rem] font-bold tabular-nums text-cyan-300 ring-1 ring-cyan-400/25">
                      {index + 1}
                    </span>
                    <SocialIcon network="facebook" className="block h-7 w-7" />
                  </span>
                  <span className="text-[clamp(0.85rem,2.2vw,0.95rem)] font-semibold leading-tight tracking-tight text-slate-50">
                    {profile.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="relative mt-5 border-t border-white/[0.08] pt-5 sm:mt-6 sm:pt-6">
            <a
              href={TRANSACTION_RECEIPTS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[3.5rem] w-full items-start gap-4 overflow-hidden rounded-2xl border border-emerald-400/28 bg-gradient-to-r from-emerald-500/[0.09] via-transparent to-violet-500/[0.06] px-4 py-4 no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[border-color,box-shadow,transform] duration-300 hover:border-emerald-400/45 hover:shadow-[0_0_32px_rgba(52,211,153,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/55 sm:min-h-[4rem] sm:items-center"
            >
              <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-emerald-400/80 to-cyan-400/50 opacity-90" aria-hidden />
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1877F2]/15 text-[#1877F2] ring-1 ring-[#1877F2]/28">
                <SocialIcon network="facebook" className="block h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1 text-left text-[clamp(0.78rem,2.1vw,0.9rem)] font-medium leading-snug text-emerald-50/95 group-hover:text-white">
                {TRANSACTION_RECEIPTS_LABEL}
              </span>
            </a>
          </div>
        </div>

        <div
          className="grid w-full min-w-0 grid-cols-1 gap-[clamp(0.75rem,2.4vw,1.25rem)] min-[420px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1400px]:grid-cols-4"
          aria-label="Project showcase gallery"
        >
          {projectShowcaseImages.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative m-0 block w-full min-w-0 cursor-pointer overflow-hidden rounded-[clamp(0.9rem,2.2vw,1.125rem)] border border-white/[0.09] bg-[#0a1220]/90 p-0 text-left shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-cyan-400/[0.07] transition-[border-color,box-shadow,transform,ring-color] duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:shadow-[0_20px_48px_rgba(0,0,0,0.45),0_0_36px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] hover:ring-cyan-400/20 active:translate-y-0 active:scale-[0.995] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:rounded-2xl"
              aria-label={`Open screenshot ${i + 1} of ${total} in fullscreen`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden min-[480px]:aspect-[16/10]">
                <img
                  src={item.src}
                  alt=""
                  width={1280}
                  height={800}
                  sizes="(max-width: 419px) 100vw, (max-width: 899px) 50vw, (max-width: 1399px) 33vw, 25vw"
                  loading={i < 4 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/55 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06] transition-[box-shadow] duration-300 group-hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.15)]"
                  aria-hidden
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && current ? (
        <>
          <div
            className="fixed inset-0 z-[100] cursor-pointer bg-[#020617]/96 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md"
            aria-hidden
            onClick={onBackdropPointerUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
          <div
            className="fixed inset-0 z-[110] flex max-h-[100dvh] flex-col items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain pointer-events-none px-[max(0.35rem,env(safe-area-inset-left,0px))] pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pr-[max(0.35rem,env(safe-area-inset-right,0px))] pt-[max(0.65rem,env(safe-area-inset-top,0px))] min-[400px]:px-3 min-[400px]:pb-4 min-[400px]:pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:px-6 sm:pb-6 sm:pt-4"
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen project image"
          >
            <button
              type="button"
              className="pointer-events-auto absolute left-[max(0.5rem,env(safe-area-inset-left,0px))] top-[max(0.5rem,env(safe-area-inset-top,0px))] z-[120] flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-2.5 text-[0.8rem] font-semibold text-slate-200 shadow-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60 min-[380px]:justify-start min-[380px]:px-3.5 sm:left-[max(0.75rem,env(safe-area-inset-left))] sm:top-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:text-[0.85rem]"
              onClick={closeLightbox}
              aria-label="Back to project gallery"
            >
              <span className="text-lg leading-none opacity-90" aria-hidden>
                ←
              </span>
              <span className="max-[379px]:sr-only">Back</span>
            </button>

            <button
              type="button"
              className="pointer-events-auto absolute right-[max(0.5rem,env(safe-area-inset-right,0px))] top-[max(0.5rem,env(safe-area-inset-top,0px))] z-[120] flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60 sm:right-[max(0.75rem,env(safe-area-inset-right))] sm:top-[max(0.75rem,env(safe-area-inset-top))]"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              <span className="text-2xl leading-none" aria-hidden>
                ×
              </span>
            </button>

            <div
              className="pointer-events-auto my-auto flex w-full min-w-0 max-w-[min(100vw-0.5rem,72rem)] shrink-0 flex-col items-stretch justify-center py-2 sm:py-4"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="flex min-h-0 w-full min-w-0 flex-col items-stretch justify-center gap-2 min-[520px]:min-h-[min(70dvh,32rem)] min-[520px]:flex-row min-[520px]:items-center min-[520px]:gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!canPrev}
                  className="order-2 flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-surface/80 py-2 text-cyan-200 shadow-sm transition-colors hover:enabled:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-35 min-[520px]:order-1 min-[520px]:h-12 min-[520px]:w-11 min-[520px]:min-w-[44px] min-[520px]:max-w-[3rem] sm:h-12 sm:w-12"
                  aria-label="Previous image"
                >
                  <span className="text-xl font-light min-[520px]:text-lg" aria-hidden>
                    ‹
                  </span>
                  <span className="ml-1 text-xs font-medium min-[520px]:sr-only">Previous</span>
                </button>

                <div className="order-1 flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden px-0.5 min-[520px]:order-2 min-[520px]:px-1">
                  <img
                    src={current.src}
                    alt={current.alt}
                    className="max-h-[min(50dvh,420px)] w-auto max-w-full object-contain object-center shadow-2xl ring-1 ring-white/10 min-[400px]:max-h-[min(58dvh,520px)] min-[520px]:max-h-[min(72dvh,calc(100dvh-10rem))] sm:max-h-[min(78dvh,calc(100dvh-9rem))]"
                    width={1600}
                    height={1000}
                    sizes="100vw"
                    decoding="async"
                    draggable={false}
                  />
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canNext}
                  className="order-3 flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-surface/80 py-2 text-cyan-200 shadow-sm transition-colors hover:enabled:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-35 min-[520px]:h-12 min-[520px]:w-11 min-[520px]:min-w-[44px] min-[520px]:max-w-[3rem] sm:h-12 sm:w-12"
                  aria-label="Next image"
                >
                  <span className="mr-1 text-xs font-medium min-[520px]:sr-only">Next</span>
                  <span className="text-xl font-light min-[520px]:text-lg" aria-hidden>
                    ›
                  </span>
                </button>
              </div>

              <p className="mt-2 shrink-0 px-1 text-center text-[clamp(0.72rem,2.5vw,0.82rem)] tabular-nums leading-snug text-slate-400 sm:mt-3">
                <span className="text-slate-200">{lightboxIndex + 1}</span>
                <span className="text-slate-500"> / {total}</span>
                <span className="mt-0.5 block text-[clamp(0.62rem,2.2vw,0.7rem)] text-slate-600 min-[480px]:mt-0 min-[480px]:inline min-[480px]:before:content-['·_']">
                  Swipe or ← → · Back (top left) or Esc to exit
                </span>
              </p>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
