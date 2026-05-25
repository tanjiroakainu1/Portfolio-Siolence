/** Locks document scroll while overlays (entry gate, loaders) are open. */
export function lockPageScroll(): () => void {
  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.overflow;
  const prevBody = body.style.overflow;
  const prevBodyTouch = body.style.touchAction;
  const prevHtmlOverscroll = html.style.overscrollBehavior;
  const prevBodyOverscroll = body.style.overscrollBehavior;

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.touchAction = "none";
  html.style.overscrollBehavior = "none";
  body.style.overscrollBehavior = "none";

  return () => {
    html.style.overflow = prevHtml;
    body.style.overflow = prevBody;
    body.style.touchAction = prevBodyTouch;
    html.style.overscrollBehavior = prevHtmlOverscroll;
    body.style.overscrollBehavior = prevBodyOverscroll;
  };
}
