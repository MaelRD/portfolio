import { useEffect, useRef } from "react";

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** Buttons that nudge toward the pointer (`data-magnetic`). */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${(dx * 7).toFixed(1)}px,${(dy * 5).toFixed(1)}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ref;
}

/**
 * Scroll-linked progress fill for the Process/Experience timelines: the
 * returned element's `width`/`height` tracks how far its *parent* track has
 * crossed 75% of the viewport, clamped to [0, 1] — same measurement the
 * source design used for its beam elements.
 */
export function useScrollFill<T extends HTMLElement>(prop: "width" | "height") {
  const fillRef = useRef<T>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = fillRef.current;
    const track = el?.parentElement;
    if (!el || !track) return;
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const onScroll = () => {
      const r = track.getBoundingClientRect();
      const p = clamp((window.innerHeight * 0.75 - r.top) / Math.max(1, r.height * 0.85));
      el.style.setProperty(prop, `${(p * 100).toFixed(1)}%`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [prop]);
  return fillRef;
}
