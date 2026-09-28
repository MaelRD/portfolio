import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import type { Lang } from "@/data/content";
import { FOOTER, UI_TEXT } from "@/data/space";
import { listenForTrackedClicks } from "@/lib/analytics";
import { useSpaceEngine } from "../react/space/engine";
import SpaceNav from "../react/space/SpaceNav";
import "../../styles/space.css";

/**
 * Spotlight cards (after React Bits' SpotlightCard): any `.spotlight` element
 * gets a soft light that follows the pointer. One delegated listener feeds the
 * card under the cursor its --mouse-x/--mouse-y; the glow itself is CSS.
 * Mouse and trackpad only: touch has no hover to follow.
 */
function useSpotlight(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    let fine = false;
    try {
      fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    if (!root || !fine) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    return () => root.removeEventListener("pointermove", onMove);
  }, [rootRef]);
}

/** The home page's sky, navigation and footer, for the other pages. */
export default function SiteShell({
  lang,
  setLang,
  active,
  base,
  children,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  active?: string;
  /** "" on the home page (in-page anchors), "/" elsewhere. */
  base: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<SVGPathElement>(null); // no process trajectory on these pages
  useSpaceEngine(rootRef, canvasRef, pathRef);
  useSpotlight(rootRef);
  useEffect(() => listenForTrackedClicks(), []);

  return (
    <div className="space" ref={rootRef}>
      <a href="#main" className="skip">
        {UI_TEXT.skip[lang]}
      </a>
      <div className="sky-nebula sky-nebula--violet" data-drift="0" aria-hidden="true" />
      <div className="sky-nebula sky-nebula--rose" data-drift="1" aria-hidden="true" />
      <div className="sky-nebula sky-nebula--cyan" data-drift="2" aria-hidden="true" />
      <canvas className="sky-stars" ref={canvasRef} aria-hidden="true" />

      <SpaceNav lang={lang} setLang={setLang} active={active} base={base} />

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="sky-footer sky-footer--page">
        <span>{FOOTER.copyright[lang].toUpperCase()}</span>
        <span>
          <span className="dot-live" data-blink aria-hidden="true" />
          {FOOTER.status[lang].toUpperCase()}
        </span>
      </footer>
    </div>
  );
}
