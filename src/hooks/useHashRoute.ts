import { useCallback, useEffect, useState } from "react";

export type AppRoute = "portfolio" | "chat" | "showcase";

export type HashRouteState = {
  route: AppRoute;
  /** True when hash is #projects (or legacy #client-drive) — scroll to project list on portfolio. */
  projectsFocus: boolean;
};

function parseHash(assistantName: string): HashRouteState {
  const raw = window.location.hash.slice(1).toLowerCase();
  if (raw === "project-showcase" || raw === "showcase" || raw === "project-gallery") {
    return { route: "showcase", projectsFocus: false };
  }
  const legacyProject =
    raw === "projects" ||
    raw === "project" ||
    raw === "client-drive" ||
    raw === "mobile-apks" ||
    raw === "project-drives";
  if (legacyProject) {
    return { route: "portfolio", projectsFocus: true };
  }
  if (raw === "chat" || raw === assistantName.toLowerCase()) {
    return { route: "chat", projectsFocus: false };
  }
  return { route: "portfolio", projectsFocus: false };
}

export function useHashRoute(assistantName: string): HashRouteState {
  const parse = useCallback(() => parseHash(assistantName), [assistantName]);

  const [state, setState] = useState<HashRouteState>(parse);

  useEffect(() => {
    const onHash = () => setState(parse());
    window.addEventListener("hashchange", onHash);
    setState(parse());
    return () => window.removeEventListener("hashchange", onHash);
  }, [parse]);

  return state;
}
