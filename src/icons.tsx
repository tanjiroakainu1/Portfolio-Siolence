import type { ProjectGroupIconKey, SkillIconKey, SocialNetwork } from "./data/portfolioData";

type IconProps = { className?: string };

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function NavPortfolioIcon({ className }: IconProps) {
  return (
    <svg className={className} width={18} height={18} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

export function NavChatIcon({ className }: IconProps) {
  return (
    <svg className={className} width={18} height={18} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function SocialIcon({ network, className }: IconProps & { network: SocialNetwork }) {
  if (network === "youtube") {
    return (
      <svg className={className} viewBox="0 0 24 24" width={22} height={22} aria-hidden>
        <path
          fill="currentColor"
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg className={className} width={18} height={18} viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2.25}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

const skillPaths: Record<
  SkillIconKey,
  (p: IconProps) => JSX.Element
> = {
  infra: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  backend: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  frontend: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  ),
  mobile: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  flutter: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M12 3l8 5v8l-8 5-8-5V8l8-5z" />
    </svg>
  ),
  native: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  dotnet: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
    </svg>
  ),
  database: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  styles: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
    </svg>
  ),
  tools: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9v2a4 4 0 0 1-4 4H6" />
    </svg>
  ),
  os: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  code: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

export function SkillIcon({ name, className }: IconProps & { name: SkillIconKey }) {
  const R = skillPaths[name] ?? skillPaths.code;
  return <R className={className} />;
}

const projectPaths: Record<ProjectGroupIconKey, (p: IconProps) => JSX.Element> = {
  ai: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  building: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22V12h6v10" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  ),
  map: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  education: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  game: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4" />
      <path d="M8 10v4" />
      <path d="M15 13h.01" />
      <path d="M18 11h.01" />
    </svg>
  ),
  portfolio: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  bot: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M13 8H7" />
      <path d="M17 12h.01" />
      <path d="M13 12H9" />
    </svg>
  ),
  globe: (p) => (
    <svg className={p.className} viewBox="0 0 24 24" aria-hidden {...stroke}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export function ProjectGroupIcon({ name, className }: IconProps & { name: ProjectGroupIconKey }) {
  const R = projectPaths[name] ?? projectPaths.globe;
  return <R className={className} />;
}
