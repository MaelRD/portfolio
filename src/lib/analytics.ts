// Analytics events, prepared but provider-agnostic. Nothing is collected unless
// a privacy-friendly provider is added to the page: Plausible (window.plausible)
// or anything listening to the `mael:track` DOM event. No cookies, no
// identifiers, no form contents: only the event name and a short label.

export type TrackEvent =
  | "View Project"
  | "Open Case Study"
  | "Start Project"
  | "Download Resume"
  | "GitHub"
  | "Send Project"
  | "Language Change";

type Props = Record<string, string>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export function track(event: TrackEvent, props?: Props) {
  try {
    window.plausible?.(event, props ? { props } : undefined);
    window.dispatchEvent(new CustomEvent("mael:track", { detail: { event, props } }));
  } catch {
    /* analytics must never break the page */
  }
}

/**
 * Links and buttons opt in declaratively: data-track="Download Resume"
 * (optionally data-track-label="hero"). One delegated listener per page.
 */
export function listenForTrackedClicks(root: Document | HTMLElement = document) {
  const onClick = (e: Event) => {
    const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-track]");
    if (!el) return;
    const label = el.dataset.trackLabel;
    track(el.dataset.track as TrackEvent, label ? { label } : undefined);
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
