import { useCallback, useEffect, useState } from "react";
import { assistant, profile } from "./data/portfolioData";
import { useHashRoute } from "./hooks/useHashRoute";
import { SiteHeader, type HeaderNavTarget } from "./components/SiteHeader";
import { PortfolioView } from "./components/PortfolioView";
import { ProjectShowcaseView } from "./components/ProjectShowcaseView";
import { ChatView } from "./components/ChatView";
import { HeaderNavTransition } from "./components/HeaderNavTransition";
import { FloatingParticles } from "./components/FloatingParticles";
import { FloatingChatDock } from "./components/FloatingChatDock";

export default function App() {
  const { route, projectsFocus } = useHashRoute(assistant.name);
  const [navTarget, setNavTarget] = useState<HeaderNavTarget | null>(null);
  const [fabPanelOpen, setFabPanelOpen] = useState(false);

  const finishHeaderNav = useCallback(() => {
    setNavTarget(null);
  }, []);

  useEffect(() => {
    document.title = `${profile.name} · ${assistant.name} ${assistant.navSubtitle} · Portfolio`;
  }, []);

  useEffect(() => {
    if (route === "chat") {
      setFabPanelOpen(false);
      window.scrollTo(0, 0);
      return;
    }
    if ((route === "portfolio" && !projectsFocus) || route === "showcase") {
      window.scrollTo(0, 0);
    }
  }, [route, projectsFocus]);

  const shellClass =
    route === "chat"
      ? "relative flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden"
      : "relative flex min-h-dvh min-h-[100dvh] flex-col";

  return (
    <div className={shellClass}>
      <SiteHeader
        profile={profile}
        assistant={assistant}
        route={route}
        projectsFocus={projectsFocus}
        onHeaderNavigate={setNavTarget}
      />
      <HeaderNavTransition target={navTarget} onDone={finishHeaderNav} />
      {route === "portfolio" || route === "showcase" ? (
        <div
          className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
          aria-hidden
        >
          <FloatingParticles variant="portfolio" />
        </div>
      ) : null}
      <PortfolioView hidden={route !== "portfolio"} scrollToProjects={projectsFocus} />
      <ProjectShowcaseView hidden={route !== "showcase"} />
      <ChatView hidden={route !== "chat"} />
      <FloatingChatDock
        route={route}
        navTarget={navTarget}
        panelOpen={fabPanelOpen}
        setPanelOpen={setFabPanelOpen}
        onOpenFullChat={() => setNavTarget("chat")}
      />
    </div>
  );
}
