/** Raminder Jangao — portfolio content (edit labels/URLs here). */

/**
 * Hero + chat avatar. Source file: `image/picture.jpg` — copied to `public/images/` for the build.
 */
export const portraitImageSrc = "/images/picture.jpg";

export interface Assistant {
  name: string;
  navSubtitle: string;
  headerTagline: string;
  avatarSrc: string;
}

export const assistant: Assistant = {
  name: "SIOLENCE",
  navSubtitle: "Chatbot",
  headerTagline: "Polite help on any topic — portfolio context when it helps.",
  avatarSrc: portraitImageSrc,
};

export interface Profile {
  name: string;
  title: string;
  year: string;
  tagline: string;
  intro: string;
  introClosing: string;
  storyLead: string;
  developmentStories: {
    title: string;
    context: string;
    build: string;
    impact: string;
  }[];
  highlights: string[];
  chipsLabel: string;
  cta: string;
}

export const profile: Profile = {
  name: "Raminder Jangao",
  title: "Full-stack developer",
  year: "2026",
  tagline: "Web, mobile, games, and AI experiences crafted from concept to production-ready systems.",
  intro:
    "I design and deliver full-stack software with clear communication, thoughtful architecture, and flexible scope. Expect transparent pricing, student-friendly options, and demos you can confidently share.",
  introClosing:
    "When you message me, you talk directly with the builder behind the product, not an automated responder.",
  storyLead: "Tech Stack Insights",
  developmentStories: [
    {
      title: "Frontend experience stack",
      context: "React + TypeScript provides a reliable foundation for scalable interfaces and safer long-term refactoring.",
      build: "Tailwind CSS accelerates responsive layout work, reusable UI patterns, and rapid design iteration.",
      impact: "The result is a cleaner user experience, easier upkeep, and stronger performance on every screen size.",
    },
    {
      title: "Backend and API flow",
      context: "Node.js + Express powers chat routing while keeping API credentials protected on the server side.",
      build: "OpenRouter is integrated with structured request/response handling, explicit validation, and fail-safe error paths.",
      impact: "This keeps AI replies dependable, debugging faster, and production behavior more predictable.",
    },
    {
      title: "Deployment and developer workflow",
      context: "Vite enables fast local feedback loops and optimized production bundles for real deployments.",
      build: "Environment-driven configuration (`.env`) plus static hosting targets keeps each release controlled and repeatable.",
      impact: "Updates ship faster, deployments stay stable, and collaboration remains smooth as the project grows.",
    },
  ],
  highlights: [
    "Always open for development",
    "Accepting commissions",
    "Student-budget friendly",
    "Available 24/7",
  ],
  chipsLabel: "At a glance",
  cta:
    "Ready to build something real? Share your concept, goals, or budget and I will handle frontend, backend, databases, and APIs with iterative delivery until it feels exactly right.",
};

export type SkillIconKey =
  | "infra"
  | "backend"
  | "frontend"
  | "mobile"
  | "flutter"
  | "native"
  | "dotnet"
  | "database"
  | "styles"
  | "tools"
  | "os"
  | "code";

export interface SkillRow {
  text: string;
  icon: SkillIconKey;
}

export const skills: SkillRow[] = [
  { text: "Docker · Kubernetes", icon: "infra" },
  { text: "Python (Flask, Django) · PHP (native, Laravel)", icon: "backend" },
  { text: "Vue · React · Angular · Next.js · TypeScript · JavaScript", icon: "frontend" },
  { text: "React Native · Expo · Supabase · Firebase", icon: "mobile" },
  { text: "Flutter · Dart (web & mobile)", icon: "flutter" },
  { text: "Java, Kotlin, Swift · Android APK", icon: "native" },
  { text: "C# · JavaFX", icon: "dotnet" },
  { text: "MySQL · MongoDB · SQLite", icon: "database" },
  { text: "Bootstrap · Tailwind CSS · Bulma · Vanilla HTML/CSS", icon: "styles" },
  { text: "Git · Ruby · Perl · Lua", icon: "tools" },
  { text: "Windows & macOS", icon: "os" },
];

export type ProjectGroupIconKey =
  | "ai"
  | "building"
  | "map"
  | "education"
  | "game"
  | "portfolio"
  | "bot"
  | "globe";

export interface ProjectItem {
  label: string;
  href: string;
}

export interface ProjectGroup {
  title: string;
  icon?: ProjectGroupIconKey;
  items: ProjectItem[];
}

export const projectGroups: ProjectGroup[] = [
  {
    title: "New deployed systems",
    icon: "globe",
    items: [
      {
        label: "Google Drive reference",
        href: "https://drive.google.com/drive/folders/1SB37yUhb2avisPWcPbiI1yQ1rpPi-42i?fbclid=IwY2xjawRK9wFleHRuA2FlbQIxMABicmlkETE0TDhhZ245WW5KellJanhnc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHozanYPraSPYWfmxS8rhRgrdXjlkR0eWxrbMzCj5YJEoaPrsgYS1gz472BXV_aem_KT4lgAJKY-RRQp8_mJi2og",
      },
      { label: "House Rental AI", href: "https://house-rental-ai.vercel.app/" },
      { label: "Drive Ease AI", href: "https://drive-ease-ai.vercel.app/" },
      { label: "School Report System AI", href: "https://school-report-system-ai.vercel.app/" },
    ],
  },
  {
    title: "AI, ERP & guides",
    icon: "ai",
    items: [
      { label: "AI ERP System", href: "https://ai-erp-system-five.vercel.app/" },
      { label: "Document AI Verification", href: "https://document-ai-verification-system.vercel.app/" },
      { label: "System AI Guide", href: "https://system-ai-guide.vercel.app/home" },
      { label: "AI System", href: "https://ai-system123.vercel.app/" },
      { label: "AI Charts Assistant", href: "https://ai-charts-assistant.vercel.app/" },
    ],
  },
  {
    title: "Management & public systems",
    icon: "building",
    items: [
      { label: "Resident AI Management", href: "https://resident-ai-management-system.vercel.app/" },
      { label: "Volunteer Management", href: "https://volunteer-management-system12.vercel.app/" },
      { label: "AI Barangay", href: "https://ai-barangay-system.vercel.app/home" },
      { label: "Employee / Farm Management", href: "https://employee-farm-management-3-3.vercel.app/" },
      { label: "Hospital Management", href: "https://hospital-management-system-4-4.vercel.app/" },
      { label: "Bus Reservation", href: "https://bus-reservation-dusky.vercel.app/" },
      { label: "Facility Reservation (client)", href: "https://facility-reservation-system-beta.vercel.app/client" },
      { label: "Fire Incident System", href: "https://fire-incident-system-7gkj.vercel.app/" },
      { label: "Crime System", href: "https://crimesystem123.vercel.app/" },
      { label: "Galaxy Nutrition", href: "https://galaxy-nutrition-system.vercel.app/" },
      { label: "Vue Dev Ram (customer)", href: "https://vue-dev-ram.vercel.app/customer" },
    ],
  },
  {
    title: "Mapping, layout & specialized",
    icon: "map",
    items: [
      { label: "Teeth Layout", href: "https://teeth-layout-system.vercel.app/" },
      { label: "Parking Area Mapping", href: "https://parking-area-mapping.vercel.app/" },
      { label: "Lot Visualization", href: "https://lot-visualization-customize-abqw.vercel.app/" },
      { label: "Lab Test System", href: "https://labtestsystem.vercel.app/" },
      { label: "8 Roles Base System", href: "https://8-roles-base-system.vercel.app/" },
    ],
  },
  {
    title: "Education & civic",
    icon: "education",
    items: [
      { label: "Quiz System", href: "https://quiz-system-lovat.vercel.app/home" },
      { label: "Class System", href: "https://class-system-xi.vercel.app/" },
      { label: "Books", href: "https://books-three-nu.vercel.app/" },
      { label: "Voting System", href: "https://voting-system123.vercel.app/home" },
      { label: "Cultural Map Journey", href: "https://cultural-map-journeyv1.vercel.app/" },
    ],
  },
  {
    title: "3D, games & experiments",
    icon: "game",
    items: [
      { label: "Snowy Walking World", href: "https://snowy-walking-world.vercel.app/" },
      { label: "3D Space Simulation", href: "https://3-d-space-simulation.vercel.app/" },
      { label: "3D Simulation (Iota)", href: "https://3-d-simulation-iota.vercel.app/" },
      { label: "3D Scene", href: "https://3-dasdasdasd.vercel.app/" },
      { label: "React House", href: "https://react-house-weld.vercel.app/" },
      { label: "Enter the Blood Harvest", href: "https://enter-the-blood-harvest.vercel.app/" },
      { label: "Tales Web", href: "https://tales-web-wpjg.vercel.app/" },
      { label: "Scaling", href: "https://scaling23456.vercel.app/" },
    ],
  },
  {
    title: "Portfolios & services",
    icon: "portfolio",
    items: [
      { label: "Portfolio — Ram Jet", href: "https://portfolio-ram-jet.vercel.app/" },
      { label: "Portfolio 123 (Pink)", href: "https://portfolio123-pink.vercel.app/" },
      { label: "Dev Ram Portfolio", href: "https://dev-ram-portfolio.vercel.app/" },
      { label: "Raminder Jangao", href: "https://raminderjangao.vercel.app/" },
      { label: "Raminder Services (about)", href: "https://raminder-services.vercel.app/about" },
    ],
  },
  {
    title: "AI chatbots",
    icon: "bot",
    items: [
      { label: "Main Chatbot", href: "https://mainchatbot.vercel.app/" },
      { label: "Chatbot 1 (dev)", href: "https://chatbot1-dev-hh17.vercel.app/" },
      { label: "Chatbot 2 (development)", href: "https://chatbot2-development2.vercel.app/" },
    ],
  },
];

export interface YoutubeChannel {
  handle: string;
  href: string;
}

export const youtubeChannel: YoutubeChannel = {
  handle: "@CapstoneDeveloper",
  href: "https://www.youtube.com/@CapstoneDeveloper",
};

export type SocialNetwork = "youtube" | "facebook";

export interface SocialLink {
  label: string;
  href: string;
  network: SocialNetwork;
}

export const social: SocialLink[] = [
  { label: `YouTube — ${youtubeChannel.handle}`, href: youtubeChannel.href, network: "youtube" },
  {
    label: "Facebook — Raminder Jangao",
    href: "https://www.facebook.com/profile.php?id=61577387592988",
    network: "facebook",
  },
  { label: "Facebook — jangao2000", href: "https://www.facebook.com/jangao2000", network: "facebook" },
  { label: "Facebook — asuna.zoe.9", href: "https://www.facebook.com/asuna.zoe.9", network: "facebook" },
];
