import { stackSectionTitle, type SkillRow } from "../data/portfolioData";
import { ExpertiseCoverageChart } from "./ExpertiseCoverageChart";
import { StackTechPanel } from "./StackTechPanel";

export function SkillsSection({ skills }: { skills: SkillRow[] }) {
  return (
    <section className="electric-panel electric-panel--stack" id="stack">
      <div className="stack-section__head">
        <p className="stack-section__kicker">
          <span className="stack-section__kicker-dot" aria-hidden />
          Stack clearance
          <span className="stack-section__kicker-dot" aria-hidden />
        </p>
        <h2 className="electric-section-title stack-section__title">{stackSectionTitle}</h2>
        <p className="stack-section__lead">
          Radar + bars map live languages · list below is the full delivery stack
        </p>
      </div>

      <div className="stack-section__grid">
        <ExpertiseCoverageChart variant="embedded" className="stack-section__charts" />
        <StackTechPanel
          rows={skills}
          eyebrow="Full stack list"
          className="stack-section__list"
          listAriaLabel={stackSectionTitle}
        />
      </div>
    </section>
  );
}
