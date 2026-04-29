import { stackSectionTitle, type SkillRow } from "../data/portfolioData";
import { StackTechPanel } from "./StackTechPanel";

export function SkillsSection({ skills }: { skills: SkillRow[] }) {
  return (
    <section className="electric-panel" id="stack">
      <h2 className="electric-section-title">{stackSectionTitle}</h2>
      <StackTechPanel
        rows={skills}
        className="mt-4 sm:mt-5"
        listAriaLabel={stackSectionTitle}
      />
    </section>
  );
}
