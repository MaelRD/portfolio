import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "./motion";

// The home page's motion system, mounted once on the root (SpaceApp). Sections
// opt in with attributes instead of each wiring its own observers:
//
//   data-reveal="up|words|stagger|project|draw"  entrance when it scrolls in
//   data-scrub[="exit"|"read"]                   writes --p (0 → 1) on scroll
//   data-magnetic                                leans toward the pointer
//
// Server HTML is fully visible. An element is only hidden (data-rv="armed")
// once this script is running, it's off screen and motion is allowed; it then
// gets data-rv="on" as it enters and CSS (src/styles/motion.css) animates
// it in. Under reduced motion nothing is armed and --p is never written, so
// everything renders in its final state. Tokens and rules: docs/MOTION-DESIGN.md.

/** Strongest pull of a magnetic element, in px. */
const MAGNET = 6;

export function useMotionSystem(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    // ── Reveals ────────────────────────────────────────────────────────────
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-rv", "on");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const arm = (el: HTMLElement) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.getAttribute("data-reveal") === "stagger") {
        Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
      }
      const r = el.getBoundingClientRect();
      // Already in view at load: leave it as rendered rather than hide it.
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) return;
      el.setAttribute("data-rv", "armed");
      io.observe(el);
    };

    // ── Scrubs ─────────────────────────────────────────────────────────────
    const scrubs = new Set<HTMLElement>();
    const near = new Set<HTMLElement>();
    const nearIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) near.add(e.target as HTMLElement);
          else near.delete(e.target as HTMLElement);
        }
        schedule();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of near) {
        const r = el.getBoundingClientRect();
        // "exit": 0 at rest, 1 once the element has scrolled out the top.
        // Otherwise: 0 as it enters at the bottom, 1 as it leaves at the top.
        // "read": 0 when its top reaches 60% of the screen, 1 when its bottom does.
        const mode = el.getAttribute("data-scrub");
        const p = mode === "exit" ? -r.top / Math.max(1, r.height) : mode === "read" ? (vh * 0.6 - r.top) / Math.max(1, r.height) : (vh - r.top) / (vh + r.height);
        el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const scan = () => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(arm);
      root.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
        if (scrubs.has(el)) return;
        scrubs.add(el);
        nearIo.observe(el);
      });
    };
    scan();
    // Sections that render later (language switch, opened panels) opt in too.
    let scanQueued = 0;
    const mo = new MutationObserver(() => {
      if (!scanQueued) scanQueued = requestAnimationFrame(() => ((scanQueued = 0), scan()));
    });
    mo.observe(root, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // ── Magnetic ───────────────────────────────────────────────────────────
    let fine = false;
    try {
      fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    let pulled: HTMLElement | null = null;
    const release = () => {
      if (!pulled) return;
      pulled.style.setProperty("--mx", "0px");
      pulled.style.setProperty("--my", "0px");
      pulled = null;
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (el !== pulled) release();
      if (!el) return;
      pulled = el;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.setProperty("--mx", `${(x * MAGNET).toFixed(2)}px`);
      el.style.setProperty("--my", `${(y * MAGNET * 0.6).toFixed(2)}px`);
    };
    if (fine) {
      root.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", release);
    }

    return () => {
      io.disconnect();
      nearIo.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scanQueued);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", release);
      release();
    };
  }, [rootRef]);
}
