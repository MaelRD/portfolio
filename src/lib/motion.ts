import { useEffect, useRef, useState, type RefObject } from "react";

export function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Entrance state for diagrams that draw themselves when they scroll into view.
 *
 * "idle"  — server render / no JS / reduced motion: everything fully drawn.
 * "armed" — JS is running and the element is off screen: parts are hidden.
 * "on"    — the element entered the viewport: parts draw in (CSS does the rest).
 *
 * Content is never hidden unless a script is there to reveal it again.
 */
export function useEntrance<T extends Element>(): [RefObject<T>, "idle" | "armed" | "on"] {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "armed" | "on">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const r = el.getBoundingClientRect();
    // Already on screen at load: animate right away instead of flashing hidden.
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
      setState("armed");
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setState("on")));
      return () => cancelAnimationFrame(id);
    }
    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("on");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, state];
}

/**
 * Calls `onFrame` with the element's bounding rect whenever the page scrolls or
 * resizes, at most once per animation frame. Used for scroll-linked progress.
 */
export function useScrollFrame(ref: RefObject<HTMLElement>, onFrame: (rect: DOMRect, vh: number) => void) {
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      cb.current(el.getBoundingClientRect(), window.innerHeight);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Content reflows too (web fonts arriving, a language switch).
    const ro = "ResizeObserver" in window ? new ResizeObserver(schedule) : null;
    ro?.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
}

/**
 * Whether an element is on screen right now (updates both ways), so looping
 * animations can pause while nobody can see them.
 */
export function useOnScreen<T extends Element>(ref: RefObject<T>) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return on;
}

/**
 * Scrolls the page to `top`, through Lenis when it's running (so it doesn't
 * fight the smooth scroll), natively otherwise; instant under reduced motion.
 */
export function scrollPageTo(top: number) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: { duration?: number; immediate?: boolean }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(top, { duration: 0.9 });
  else window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
