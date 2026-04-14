import type { Assistant } from "../data/portfolioData";
import type { SocialLink } from "../data/portfolioData";
import { SocialIcon } from "../icons";

export function ContactSection({
  assistant,
  social,
}: {
  assistant: Assistant;
  social: SocialLink[];
}) {
  return (
    <section id="contact" className="electric-panel scroll-mt-24">
      <h2 className="electric-section-title">Contact & social</h2>
      <p className="mb-5 flex flex-wrap items-start gap-3 text-[clamp(0.84rem,2.4vw,0.92rem)] leading-relaxed text-slate-300">
        <span className="flex shrink-0 gap-2 pt-0.5" aria-hidden>
          <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 p-1.5 text-[#ff3030] shadow-bolt-sm">
            <SocialIcon network="youtube" className="block" />
          </span>
          <span className="rounded-lg border border-violet-400/25 bg-violet-500/10 p-1.5 text-[#1877f2] shadow-ion-sm">
            <SocialIcon network="facebook" className="block" />
          </span>
        </span>
        <span>
          YouTube demos and updates — or message on Facebook for commissions, quotes, and project ideas.
          Open{" "}
          <a href="#chat" className="font-semibold text-bolt no-underline hover:underline">
            <strong>{assistant.name}</strong> {assistant.navSubtitle}
          </a>{" "}
          in the nav anytime — polite help on any topic, plus Raminder’s portfolio when you need it.
        </span>
      </p>
      <ul className="m-0 flex list-none flex-col gap-3 p-0" role="list">
        {social.map((x) => (
          <li key={x.href + x.label} role="listitem">
            <a
              href={x.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`electric-link-tile ${
                x.network === "youtube" ? "hover:[&_.social-ic]:text-[#ff4d4d]" : ""
              }`}
            >
              <span className={`social-ic flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/25 ${x.network === "youtube" ? "text-[#ff3030]" : "text-[#1877f2]"}`}>
                <SocialIcon network={x.network} className="block" />
              </span>
              <span className="hover-pop-text min-w-0 text-[clamp(0.84rem,2.3vw,0.91rem)] font-semibold tracking-tight">{x.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
