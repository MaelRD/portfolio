import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms, applied only while the entrance animation plays. */
  delay?: number;
}

type RevealState = "skip" | "hidden" | "visible";

/**
 * Scroll-triggered entrance: fades + rises an element in once, the first time
 * it crosses into the viewport, reusing the same `mael-rise` keyframe the
 * Hero already plays on load so entrances read as one motion language.
 *
 * Progressive-enhancement safe: renders fully visible by default (`skip`) so
 * server-rendered markup and no-JS visitors never see hidden content. Only
 * after mount, and only for elements that are *not already in view* (so
 * above-the-fold content never flashes), does it arm the hide + reveal cycle.
 * No-ops entirely under `prefers-reduced-motion: reduce`.
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("skip");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    if (reduce) return; // stay "skip": fully visible, no motion

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (alreadyInView) return; // stay "skip": avoid hiding content already on screen

    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState("visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    state === "visible" && delay ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`${className} ${
        state === "hidden"
          ? "opacity-0"
          : state === "visible"
          ? "motion-safe:animate-[mael-rise_.6s_ease-out_both]"
          : ""
      }`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
