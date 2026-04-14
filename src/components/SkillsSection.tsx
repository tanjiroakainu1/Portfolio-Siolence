import type { SkillRow } from "../data/portfolioData";
import { SkillIcon } from "../icons";

export function SkillsSection({ skills }: { skills: SkillRow[] }) {
  return (
    <section className="electric-panel" id="stack">
      <h2 className="electric-section-title">Stack & tools</h2>
      <ul
        className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:gap-x-4 lg:gap-y-3"
        role="list"
      >
        {skills.map((row) => (
          <li key={row.text} className="min-w-0" role="listitem">
            <span className="electric-skill-chip">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/35 bg-cyan-500/15 text-bolt shadow-bolt-sm">
                <SkillIcon name={row.icon} className="h-3.5 w-3.5" />
              </span>
              <span className="hover-pop-text min-w-0 flex-1 leading-snug">{row.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
