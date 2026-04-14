import type { ProjectGroup } from "../data/portfolioData";
import type { ProjectGroupIconKey } from "../data/portfolioData";
import { ExternalLinkIcon, ProjectGroupIcon } from "../icons";

function iconKey(group: ProjectGroup): ProjectGroupIconKey {
  return group.icon ?? "globe";
}

export function ProjectSections({ groups }: { groups: ProjectGroup[] }) {
  return (
    <>
      {groups.map((g) => {
        const key = iconKey(g);
        return (
          <section key={g.title} className="electric-panel electric-panel--projects">
            <h2 className="electric-section-title electric-section-title--ion">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/40 bg-gradient-to-br from-violet-500/20 to-cyan-500/15 text-cyan-100 shadow-ion-sm"
                aria-hidden
              >
                <ProjectGroupIcon name={key} className="h-[1.05rem] w-[1.05rem]" />
              </span>
              <span className="min-w-0">{g.title}</span>
            </h2>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0" role="list">
              {g.items.map((item) => (
                <li key={item.href} role="listitem">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group electric-project-row"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/35 bg-cyan-500/12 text-bolt shadow-bolt-sm"
                      aria-hidden
                    >
                      <ProjectGroupIcon name={key} className="h-[0.88rem] w-[0.88rem]" />
                    </span>
                    <span className="hover-pop-text min-w-0 flex-1 [overflow-wrap:anywhere]">{item.label}</span>
                    <span className="shrink-0 text-slate-500 opacity-80 transition-[opacity,color] group-hover:opacity-100 group-hover:text-bolt">
                      <ExternalLinkIcon className="h-[0.95rem] w-[0.95rem]" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
