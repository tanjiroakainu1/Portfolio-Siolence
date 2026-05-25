import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { releasePageScroll } from "../lib/lockPageScroll";

const STORAGE_KEY = "portfolio-developer-unlocked";

type PortfolioUnlockContextValue = {
  unlocked: boolean;
  loading: boolean;
  navBlockedTick: number;
  startUnlock: () => void;
  completeUnlock: () => void;
  signalNavBlocked: () => void;
  resetToFirstEntry: () => void;
};

const PortfolioUnlockContext = createContext<PortfolioUnlockContextValue | null>(null);

function readUnlocked(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function PortfolioUnlockProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [loading, setLoading] = useState(false);
  const [navBlockedTick, setNavBlockedTick] = useState(0);

  const signalNavBlocked = useCallback(() => {
    setNavBlockedTick((n) => n + 1);
  }, []);

  const startUnlock = useCallback(() => {
    if (unlocked || loading) return;
    setLoading(true);
  }, [unlocked, loading]);

  const completeUnlock = useCallback(() => {
    setLoading(false);
    setUnlocked(true);
    releasePageScroll();
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private browsing */
    }
  }, []);

  const resetToFirstEntry = useCallback(() => {
    setLoading(false);
    setUnlocked(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* private browsing */
    }
  }, []);

  const value = useMemo(
    () => ({
      unlocked,
      loading,
      navBlockedTick,
      startUnlock,
      completeUnlock,
      signalNavBlocked,
      resetToFirstEntry,
    }),
    [unlocked, loading, navBlockedTick, startUnlock, completeUnlock, signalNavBlocked, resetToFirstEntry]
  );

  return (
    <PortfolioUnlockContext.Provider value={value}>{children}</PortfolioUnlockContext.Provider>
  );
}

export function usePortfolioUnlock(): PortfolioUnlockContextValue {
  const ctx = useContext(PortfolioUnlockContext);
  if (!ctx) {
    throw new Error("usePortfolioUnlock must be used within PortfolioUnlockProvider");
  }
  return ctx;
}
