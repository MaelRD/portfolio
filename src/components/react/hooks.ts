import { useEffect, useRef } from "react";

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** Pointer-enter lift + border glow, for simple tilt cards (`data-tilt` in the source design). */
export function useTiltHover<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const onEnter = () => {
      el.style.borderColor = "rgba(56,189,248,.35)";
      el.style.transform = "translateY(-4px)";
    };
    const onLeave = () => {
      el.style.borderColor = "";
      el.style.transform = "";
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ref;
}

/** 3D tilt + pointer-tracked radial spotlight, for the work project cards (`data-card`/`data-spot`). */
export function useCardSpotlight<T extends HTMLElement, S extends HTMLElement>() {
  const cardRef = useRef<T>(null);
  const spotRef = useRef<S>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) return;
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(1100px) rotateY(${((px - 0.5) * 5).toFixed(2)}deg) rotateX(${(
        (0.5 - py) *
        5
      ).toFixed(2)}deg) translateY(-6px)`;
      card.style.borderColor = "rgba(139,92,246,.42)";
      card.style.boxShadow = "0 30px 70px -40px rgba(112,66,248,.9)";
      const spot = spotRef.current;
      if (spot) {
        spot.style.opacity = "1";
        spot.style.setProperty("--mx", `${px * 100}%`);
        spot.style.setProperty("--my", `${py * 100}%`);
      }
    };
    const onLeave = () => {
      card.style.transform = "";
      card.style.borderColor = "";
      card.style.boxShadow = "";
      const spot = spotRef.current;
      if (spot) spot.style.opacity = "0";
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return { cardRef, spotRef };
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
