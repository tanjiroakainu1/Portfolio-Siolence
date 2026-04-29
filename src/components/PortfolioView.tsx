import { useEffect, useRef } from "react";
import { Hero } from "./Hero";
import { SkillsSection } from "./SkillsSection";
import { ProjectSections } from "./ProjectSections";
import { ContactSection } from "./ContactSection";
import {
  assistant,
  profile,
  skills,
  projectGroups,
  social,
} from "../data/portfolioData";

export function PortfolioView({
  hidden,
  scrollToProjects,
}: {
  hidden: boolean;
  scrollToProjects: boolean;
}) {
  const projectsAnchorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hidden || !scrollToProjects) return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        projectsAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [hidden, scrollToProjects]);

  return (
    <section
      id="view-portfolio"
      className="portfolio-view relative z-10 flex min-h-0 flex-1 flex-col"
      aria-label="Portfolio"
      hidden={hidden}
    >
      <div className="relative z-[1] mx-auto w-full max-w-layout flex-1 px-[clamp(0.875rem,4vw,1.5rem)] py-[clamp(1rem,3vw,2rem)] pb-[max(5.75rem,clamp(1.5rem,5vw,4rem))] sm:pb-[max(6.25rem,clamp(1.5rem,5vw,4rem))]">
        <main className="min-w-0">
          <Hero profile={profile} assistant={assistant} />
          <ContactSection assistant={assistant} social={social} />
          <SkillsSection skills={skills} />
          <section
            id="projects"
            ref={projectsAnchorRef}
            className="scroll-mt-[5.5rem]"
            aria-label="Projects and live demos"
          >
            <ProjectSections groups={projectGroups} />
          </section>
        </main>
      </div>
    </section>
  );
}
