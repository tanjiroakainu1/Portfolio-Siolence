import type { ProjectGroup } from "../data/portfolioData";
import type { ProjectGroupIconKey } from "../data/portfolioData";
import { portraitImageSrc } from "../data/portfolioData";
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
  const totalProjects = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="projects-universe">
      <header className="projects-universe__hero">
        <p className="projects-universe__kicker">
          <span className="projects-universe__kicker-dot" aria-hidden />
          Live demos · production builds
          <span className="projects-universe__kicker-dot" aria-hidden />
        </p>
        <h2 className="projects-universe__title">Project galaxy</h2>
        <p className="projects-universe__sub">
          {totalProjects} shipped links across {groups.length} orbits — tap any tile to open the live site
        </p>
      </header>

      {groups.map((g, groupIndex) => {
        const key = iconKey(g);
        return (
          <section
            key={g.title}
            className="electric-panel electric-panel--projects projects-universe__group"
            style={{ animationDelay: `${groupIndex * 80}ms` }}
          >
            <h3 className="electric-section-title electric-section-title--ion projects-universe__group-title">
              <span
                className="projects-universe__group-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/45 bg-gradient-to-br from-violet-500/25 to-fuchsia-500/18 text-fuchsia-100 shadow-ion-sm"
                aria-hidden
              >
                <ProjectGroupIcon name={key} className="h-[1.05rem] w-[1.05rem]" />
              </span>
              <span className="min-w-0 flex-1">{g.title}</span>
              <span className="projects-universe__count" aria-label={`${g.items.length} projects`}>
                {g.items.length}
              </span>
            </h3>
            <ul className="projects-universe__list m-0 flex list-none flex-col gap-2.5 p-0" role="list">
              {g.items.map((item, itemIndex) => (
                <li key={item.href} role="listitem" className="projects-universe__item">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group electric-project-row projects-universe__row"
                  >
                    <span className="projects-universe__index" aria-hidden>
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-fuchsia-400/35 bg-surface-2/90 shadow-[0_8px_22px_rgba(0,0,0,0.38)] ring-1 ring-fuchsia-400/15 transition-[box-shadow,transform] duration-300 group-hover:shadow-[0_12px_32px_rgba(232,121,249,0.22)]">
                      <img
                        src={projectPreviewUrl(item.href)}
                        alt={`${item.label} preview`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                        onError={(e) => {
                          e.currentTarget.src = portraitImageSrc;
                        }}
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-page/45 via-transparent to-fuchsia-500/18" />
                      <span className="absolute bottom-1 left-1 inline-flex h-5 w-5 items-center justify-center rounded-md border border-accent/40 bg-page/70 text-bolt backdrop-blur-sm">
                        <ProjectGroupIcon name={key} className="h-[0.65rem] w-[0.65rem]" />
                      </span>
                      <span className="projects-universe__live-pill">Live</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="hover-pop-text block font-semibold [overflow-wrap:anywhere]">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.65rem] font-medium uppercase tracking-[0.08em] text-muted">
                        {projectHost(item.href)}
                      </span>
                    </span>
                    <span className="projects-universe__arrow shrink-0 text-slate-500 opacity-80 transition-[opacity,color,transform] group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-bolt">
                      <ExternalLinkIcon className="h-[0.95rem] w-[0.95rem]" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
