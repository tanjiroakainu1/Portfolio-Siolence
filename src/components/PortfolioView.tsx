import { useEffect, useRef } from "react";
import { Hero } from "./Hero";
import { SkillsSection } from "./SkillsSection";
import { ProjectSections } from "./ProjectSections";
import { ContactSection } from "./ContactSection";
import { PortfolioEntryGate } from "./PortfolioEntryGate";
import { usePortfolioUnlock } from "../context/PortfolioUnlockContext";
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
  const { unlocked, loading } = usePortfolioUnlock();
  const projectsAnchorRef = useRef<HTMLElement>(null);
  const showHome = unlocked && !loading;

  useEffect(() => {
    if (hidden || !scrollToProjects || !unlocked) return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        projectsAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [hidden, scrollToProjects, unlocked]);

  return (
    <section
      id="view-portfolio"
      className={`portfolio-view relative z-10 ${showHome ? "portfolio-view--browse" : ""}`}
      aria-label="Portfolio"
      hidden={hidden}
    >
      {!hidden && !showHome ? <PortfolioEntryGate /> : null}

      {showHome ? (
        <div className="portfolio-view__main relative z-[1] mx-auto w-full max-w-layout px-[clamp(0.875rem,4vw,1.5rem)] pt-[clamp(0.45rem,1.2vh,0.85rem)] pb-[max(5rem,clamp(1.25rem,4vw,3rem))] sm:pb-[max(5.5rem,clamp(1.5rem,4vw,3.5rem))]">
          <main className="min-w-0">
            <Hero profile={profile} assistant={assistant} />
            <ContactSection assistant={assistant} social={social} />
            <SkillsSection skills={skills} />
            <section
              id="projects"
              ref={projectsAnchorRef}
              className="scroll-mt-[calc(var(--site-header-offset,3rem)+0.35rem)]"
              aria-label="Projects and live demos"
            >
              <ProjectSections groups={projectGroups} />
            </section>
          </main>
        </div>
      ) : null}
    </section>
  );
}
