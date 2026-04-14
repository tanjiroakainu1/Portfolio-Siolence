import type { ProjectGroup } from "../data/portfolioData";
import type { ProjectGroupIconKey } from "../data/portfolioData";
import { ExternalLinkIcon, ProjectGroupIcon } from "../icons";

function iconKey(group: ProjectGroup): ProjectGroupIconKey {
  return group.icon ?? "globe";
}

function projectPreviewUrl(href: string): string {
  return `https://image.thum.io/get/width/900/noanimate/${href}`;
}

function projectHost(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
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
                    <span className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-cyan-400/35 bg-surface-2/90 shadow-[0_8px_22px_rgba(0,0,0,0.35)]">
                      <img
                        src={projectPreviewUrl(item.href)}
                        alt={`${item.label} preview`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        onError={(e) => {
                          e.currentTarget.src = "/images/picture.jpg";
                        }}
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-page/45 via-transparent to-cyan-500/10" />
                      <span className="absolute bottom-1 left-1 inline-flex h-5 w-5 items-center justify-center rounded-md border border-accent/35 bg-page/70 text-bolt backdrop-blur-sm">
                        <ProjectGroupIcon name={key} className="h-[0.65rem] w-[0.65rem]" />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="hover-pop-text block [overflow-wrap:anywhere]">{item.label}</span>
                      <span className="mt-0.5 block text-[0.68rem] font-medium text-slate-400">
                        {projectHost(item.href)}
                      </span>
                    </span>
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
