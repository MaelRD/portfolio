import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Motion tokens — the only timings/easings components should use. Mirrored
 * as CSS custom properties in global.css (`--dur-*`, `--ease-*`,
 * `--reveal-distance`, `--stagger`) so CSS and JS animations agree.
 *
 * Vocabulary (every animation is one of these): appear · connect · process ·
 * transform · validate · flow.
 */
export const MOTION = {
  fast: 180,
  normal: 320,
  slow: 600,
  /** one connection drawing itself */
  draw: 420,
  stagger: 60,
  revealDistance: 24,
  ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** Desktop-class pointer: cursor effects, magnetic and parallax only run here. */
export function hasFinePointer(): boolean {
  try {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  } catch {
    return false;
  }
}

/**
 * `true` once the element has entered the viewport (never flips back).
 * Starts `false` on the server and before hydration; callers render their
 * *final* state until JS has armed them (see `useArmed`), so content is
 * never hidden without JavaScript.
 */
export function useInView<T extends Element>(options: { threshold?: number; rootMargin?: string } = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.2, rootMargin = "0px 0px -10% 0px" } = options;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, inView];
}

/**
 * `true` after mount when motion is allowed. Components use it to switch
 * from their static, fully visible server render to the "hidden until
 * revealed" state — progressive enhancement, and nothing to do under
 * reduced motion.
 */
export function useArmed(): boolean {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!prefersReducedMotion()) setArmed(true);
  }, []);
  return armed;
}

/**
 * Scroll progress (0..1) of an element through the viewport: 0 when its top
 * reaches `start` (fraction of viewport height), 1 when its bottom does.
 * Written straight to a CSS custom property to avoid React re-renders.
 */
export function useScrollProgress<T extends HTMLElement>(varName = "--progress", start = 0.7) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty(varName, "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * start - r.top) / Math.max(1, r.height);
      el.style.setProperty(varName, Math.max(0, Math.min(1, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [varName, start]);
  return ref;
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·";

/**
 * Text scramble for short technical labels only (never paragraphs or
 * headings): resolves left to right into `text`. Returns the text to render.
 */
export function useScramble(text: string, run: boolean, duration = MOTION.slow): string {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!run || prefersReducedMotion()) {
      setOut(text);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const settled = Math.floor(p * text.length);
      let s = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        s += text[i] === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run, duration]);
  return out;
}

/** Counts "00" → target (e.g. section numbers) once `run` turns true. */
export function useCountTo(target: number, run: boolean, duration = MOTION.normal): number {
  const [n, setN] = useState(target);
  const started = useRef(false);
  useEffect(() => {
    if (!run || started.current || prefersReducedMotion()) return;
    started.current = true;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setN(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return n;
}

/** Live `matchMedia` result; `false` on the server and before mount. */
export function useMedia(query: string): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}
