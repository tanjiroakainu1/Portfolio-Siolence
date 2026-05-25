import { useCallback, useEffect, useState } from "react";
import { assistant, profile } from "./data/portfolioData";
import { useHashRoute } from "./hooks/useHashRoute";
import { usePortfolioUnlock } from "./context/PortfolioUnlockContext";
import { SiteHeader, type HeaderNavTarget } from "./components/SiteHeader";
import { PortfolioView } from "./components/PortfolioView";
import { ProjectShowcaseView } from "./components/ProjectShowcaseView";
import { ChatView } from "./components/ChatView";
import { HeaderNavTransition } from "./components/HeaderNavTransition";
import { FloatingParticles } from "./components/FloatingParticles";
import { FloatingChatDock } from "./components/FloatingChatDock";
import { releasePageScroll } from "./lib/lockPageScroll";

export default function App() {
  const { route, projectsFocus } = useHashRoute(assistant.name);
  const { unlocked, loading, signalNavBlocked, resetToFirstEntry } = usePortfolioUnlock();
  const [navTarget, setNavTarget] = useState<HeaderNavTarget | null>(null);
  const [fabPanelOpen, setFabPanelOpen] = useState(false);

  const navLocked = !unlocked || loading;

  const handleHeaderNavigate = useCallback(
    (target: HeaderNavTarget) => {
      if (navLocked) {
        signalNavBlocked();
        return;
      }
      setNavTarget(target);
    },
    [navLocked, signalNavBlocked]
  );

  const handleReturnToFirstEntry = useCallback(() => {
    resetToFirstEntry();
    if (route !== "portfolio") {
      window.location.hash = "#portfolio";
    }
    window.scrollTo(0, 0);
  }, [resetToFirstEntry, route]);

  const finishHeaderNav = useCallback(() => {
    setNavTarget(null);
  }, []);

  useEffect(() => {
    if (!navLocked) return;
    if (route === "chat" || route === "showcase") {
      window.location.hash = "#portfolio";
    }
  }, [navLocked, route]);

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

  useEffect(() => {
    if (navLocked) return;
    releasePageScroll();
  }, [navLocked]);

  const shellClass =
    route === "chat"
      ? "relative flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden"
      : "relative min-h-dvh";

  return (
    <div className={shellClass} data-nav-gate={navLocked ? "locked" : "browse"}>
      <SiteHeader
        profile={profile}
        assistant={assistant}
        route={route}
        projectsFocus={projectsFocus}
        navLocked={navLocked}
        showFirstEntry={unlocked && !loading}
        onHeaderNavigate={handleHeaderNavigate}
        onLockedNavAttempt={signalNavBlocked}
        onReturnToFirstEntry={handleReturnToFirstEntry}
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
        onOpenFullChat={() => handleHeaderNavigate("chat")}
        hidden={navLocked}
      />
    </div>
  );
}
