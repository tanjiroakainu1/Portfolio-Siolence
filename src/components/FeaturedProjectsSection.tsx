import type { FeaturedProjectItem } from "../data/portfolioData";
import { featuredProjectSection } from "../data/portfolioData";
import { ProjectCardGrid } from "./ProjectCardGrid";

export function FeaturedProjectsSection({ items }: { items: FeaturedProjectItem[] }) {
  return (
    <section
      id={featuredProjectSection.id}
      className="featured-projects scroll-mt-[calc(var(--site-header-offset,3rem)+0.35rem)]"
      aria-label="Featured production systems"
    >
      <header className="featured-projects__hero">
        <p className="featured-projects__kicker">
          <span className="featured-projects__kicker-dot" aria-hidden />
          {featuredProjectSection.kicker}
          <span className="featured-projects__kicker-dot" aria-hidden />
        </p>
        <h2 className="featured-projects__title">{featuredProjectSection.title}</h2>
        <p className="featured-projects__sub">{featuredProjectSection.sub}</p>
        <p className="featured-projects__count" aria-live="polite">
          <span className="featured-projects__count-num">{items.length}</span> spotlight builds
        </p>
      </header>

      <ProjectCardGrid items={items} variant="featured" eagerPreviewCount={6} />
    </section>
  );
}
