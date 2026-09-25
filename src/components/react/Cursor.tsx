import { useEffect, useRef, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "./motion";

type Mode = "idle" | "link" | "view" | "node";

/**
 * A small halo that trails the system cursor (which stays visible — this
 * never replaces it). It reacts to what's under the pointer:
 *   links/buttons  → grows slightly, shows ↗ on external/outbound links
 *   projects       → "VIEW ↗"
 *   diagram nodes  → grows
 * Elements opt in with data-cursor="link" | "view" | "node"; plain <a> and
 * <button> count as links. Desktop fine pointers only; off under reduced motion.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [arrow, setArrow] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current!;
    let tx = -100;
    let ty = -100;
    let x = tx;
    let y = ty;
    let raf = 0;
    let visible = false;

    // Eased follow: closes 35% of the gap per frame, stops when settled.
    const loop = () => {
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        x = tx;
        y = ty;
        el.dataset.visible = "";
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-cursor], a, button, summary, [role='button']") as HTMLElement | null;
      if (!t) {
        setMode("idle");
        return;
      }
      const m = (t.dataset.cursor as Mode | undefined) ?? "link";
      setMode(m);
      const href = t.getAttribute("href") ?? "";
      setArrow(m === "view" || /^(https?:|mailto:)/.test(href) || href.endsWith(".pdf"));
    };
    const onLeave = () => {
      visible = false;
      delete el.dataset.visible;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} className="cursor" data-mode={mode} aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__label">{mode === "view" ? "VIEW ↗" : arrow ? "↗" : ""}</span>
    </div>
  );
}
