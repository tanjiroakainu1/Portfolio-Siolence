import { useCallback, useEffect, useState } from "react";

export type AppRoute = "portfolio" | "chat";

export function useHashRoute(assistantName: string): AppRoute {
  const parse = useCallback((): AppRoute => {
    const raw = window.location.hash.slice(1).toLowerCase();
    if (raw === "chat" || raw === assistantName.toLowerCase()) return "chat";
    return "portfolio";
  }, [assistantName]);

  const [route, setRoute] = useState<AppRoute>(parse);

  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener("hashchange", onHash);
    setRoute(parse());
    return () => window.removeEventListener("hashchange", onHash);
  }, [parse]);

  return route;
}
