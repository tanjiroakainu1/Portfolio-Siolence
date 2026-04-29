/**
 * Project image showcase route — use this to redirect from code or deep links.
 * Hash is read by `useHashRoute` and renders `ProjectShowcaseView`.
 */
export const PROJECT_SHOWCASE_HASH = "project-showcase";

export const PROJECT_SHOWCASE_ROUTE = `#${PROJECT_SHOWCASE_HASH}` as const;

/** Sets location hash to open the empty showcase page (no header transition). */
export function redirectToProjectShowcase(): void {
  window.location.hash = PROJECT_SHOWCASE_HASH;
}
