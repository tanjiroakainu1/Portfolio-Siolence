import { useEffect } from "react";
import { assistant, profile } from "./data/portfolioData";
import { useHashRoute } from "./hooks/useHashRoute";
import { SiteHeader } from "./components/SiteHeader";
import { PortfolioView } from "./components/PortfolioView";
import { ChatView } from "./components/ChatView";
import { FloatingParticles } from "./components/FloatingParticles";

export default function App() {
  const route = useHashRoute(assistant.name);

  useEffect(() => {
    document.title = `${profile.name} · ${assistant.name} ${assistant.navSubtitle} · Portfolio`;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const shellClass =
    route === "chat"
      ? "relative flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden"
      : "relative flex min-h-dvh min-h-[100dvh] flex-col";

  return (
    <div className={shellClass}>
      <SiteHeader profile={profile} assistant={assistant} route={route} />
      {/* Full-viewport layer so dots show in side margins & behind scroll (not trapped in a short column) */}
      {route === "portfolio" ? (
        <div
          className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
          aria-hidden
        >
          <FloatingParticles variant="portfolio" />
        </div>
      ) : null}
      <PortfolioView hidden={route !== "portfolio"} />
      <ChatView hidden={route !== "chat"} />
    </div>
  );
}
