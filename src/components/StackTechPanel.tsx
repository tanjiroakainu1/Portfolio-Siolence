import type { SkillRow } from "../data/portfolioData";
import { SkillIcon } from "../icons";

/**
 * Shared stack list — same card + icon pills on Portfolio (`#stack`) and Project showcase.
 */
export function StackTechPanel({
  rows,
  eyebrow,
  className = "",
  listAriaLabel = "Programming languages, frameworks, and databases",
}: {
  rows: SkillRow[];
  /** When set, renders the small caps line above the list (e.g. project showcase). */
  eyebrow?: string;
  className?: string;
  listAriaLabel?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-cyan-400/18 bg-gradient-to-b from-[#0a1424]/85 to-[#060b14]/92 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.04] sm:p-4 ${className}`}
    >
      {eyebrow ? (
        <p className="m-0 mb-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cyan-300/75 sm:mb-3 sm:text-[0.65rem]">
          {eyebrow}
        </p>
      ) : null}
      <ul className="m-0 grid list-none gap-2 p-0 sm:gap-2" aria-label={listAriaLabel} role="list">
        {rows.map((row, i) => (
          <li
            key={`${row.text}-${i}`}
            className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-page/35 px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:gap-3 sm:px-3 sm:py-2.5"
            role="listitem"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/25 via-cyan-500/10 to-violet-500/15 text-cyan-100 shadow-[0_4px_14px_rgba(34,211,238,0.12)] ring-1 ring-cyan-400/35 sm:h-10 sm:w-10">
              <SkillIcon name={row.icon} className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" />
            </span>
            <span className="min-w-0 flex-1 text-left text-[clamp(0.74rem,1.9vw,0.84rem)] leading-snug text-slate-200/95">
              {row.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
