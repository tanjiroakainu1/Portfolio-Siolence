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

export function PortfolioView({ hidden }: { hidden: boolean }) {
  return (
    <section
      id="view-portfolio"
      className="portfolio-view relative z-10 flex min-h-0 flex-1 flex-col"
      aria-label="Portfolio"
      hidden={hidden}
    >
      <div className="relative z-[1] mx-auto w-full max-w-layout flex-1 px-[clamp(0.875rem,4vw,1.5rem)] py-[clamp(1rem,3vw,2rem)] pb-[clamp(1.5rem,5vw,4rem)]">
        <main className="min-w-0">
          <Hero profile={profile} assistant={assistant} />
          <ContactSection assistant={assistant} social={social} />
          <SkillsSection skills={skills} />
          <ProjectSections groups={projectGroups} />
        </main>
      </div>
    </section>
  );
}
