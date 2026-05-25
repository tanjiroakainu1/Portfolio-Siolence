type ScrollSnapshot = {
  htmlOverflow: string;
  bodyOverflow: string;
  bodyTouchAction: string;
  htmlOverscroll: string;
  bodyOverscroll: string;
};

let lockCount = 0;
let snapshot: ScrollSnapshot | null = null;

function applyLock() {
  const html = document.documentElement;
  const body = document.body;
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.touchAction = "none";
  html.style.overscrollBehavior = "none";
  body.style.overscrollBehavior = "none";
}

function restoreLock() {
  if (!snapshot) return;
  const html = document.documentElement;
  const body = document.body;
  html.style.overflow = snapshot.htmlOverflow;
  body.style.overflow = snapshot.bodyOverflow;
  body.style.touchAction = snapshot.bodyTouchAction;
  html.style.overscrollBehavior = snapshot.htmlOverscroll;
  body.style.overscrollBehavior = snapshot.bodyOverscroll;
  snapshot = null;
}

/** Locks document scroll while overlays (entry gate, loaders) are open. Ref-counted for nested overlays. */
export function lockPageScroll(): () => void {
  if (lockCount === 0) {
    const html = document.documentElement;
    const body = document.body;
    snapshot = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyTouchAction: body.style.touchAction,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverscroll: body.style.overscrollBehavior,
    };
    applyLock();
  }

  lockCount += 1;

  return () => {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) restoreLock();
  };
}

/** Force-unlock scroll (e.g. after portfolio unlock). Clears any stale nested locks. */
export function releasePageScroll(): void {
  lockCount = 0;
  restoreLock();
}
