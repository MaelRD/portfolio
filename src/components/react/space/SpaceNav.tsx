import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CV_FILENAME, CV_PATH } from "../../../data/content";
import { NAV, UI_TEXT, type Lang } from "../../../data/space";

// Floating pill navigation (after zenwood.studio): logo, the site menu,
// language and the call to action in one glass pill. A cyan line glides to the
// current section. Once the page scrolls the glass thickens; scrolling down
// tucks the pill away and scrolling up brings it back. On narrow screens the
// links fold into a sheet opened from the pill.

const LINKS = NAV.filter((n) => n.id !== "contact");

/** `scrolled` past the hero's top; `hidden` while the reader scrolls down. */
function useScrollState(threshold = 60, hideAfter = 320) {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      // Small jitters (trackpads, iOS bounce) neither hide nor reveal.
      if (Math.abs(delta) < 6 && y > hideAfter) return;
      setState({ scrolled: y > threshold, hidden: y > hideAfter && delta > 0 });
      last = y;
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(frame);
    };
  }, [threshold, hideAfter]);
  return state;
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="zlang" role="group" aria-label={UI_TEXT.lang[lang]}>
      {(["es", "en"] as const).map((l) => (
        <button key={l} type="button" lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function SpaceNav({
  lang,
  setLang,
  active,
  base = "",
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  active?: string;
  /** "" on the home page (in-page anchors), "/" on the other pages. */
  base?: string;
}) {
  const { scrolled, hidden } = useScrollState();
  const [open, setOpen] = useState(false);
  const linksRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The current-section line: measured from the lit link, so it follows the
  // labels in either language and at any width.
  useEffect(() => {
    const ul = linksRef.current;
    if (!ul) return undefined;
    const place = () => {
      const a = ul.querySelector<HTMLElement>('a[aria-current="true"]');
      if (!a || !a.offsetWidth) {
        ul.removeAttribute("data-ind");
        return;
      }
      ul.style.setProperty("--ind-x", `${a.offsetLeft + 10}px`);
      ul.style.setProperty("--ind-w", `${a.offsetWidth - 20}px`);
      ul.setAttribute("data-ind", "");
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(ul);
    document.fonts?.ready.then(place).catch(() => {});
    return () => ro.disconnect();
  }, [active, lang]);

  // The sheet never traps the page: Escape (focus back on the toggle), a tap
  // outside it or following a link closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!document.getElementById("site-nav")?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <header
      id="site-nav"
      className="znav"
      data-scrolled={scrolled ? "" : undefined}
      data-hidden={hidden && !open ? "" : undefined}
      data-open={open ? "" : undefined}
    >
      <nav className="zpill znav__menu" aria-label={UI_TEXT.nav[lang]}>
        <a href={base || "#hero"} className="zlogo" aria-label={UI_TEXT.home[lang]}>
          <span className="nav__mark" aria-hidden="true" />
        </a>
        <ul className="zlinks" ref={linksRef}>
          {LINKS.map((n) => (
            <li key={n.id}>
              <a href={`${base}#${n.id}`} aria-current={active === n.id ? "true" : undefined}>
                {n.label[lang]}
              </a>
            </li>
          ))}
          <li>
            <a href={CV_PATH} download={CV_FILENAME} data-track="Download Resume" data-track-label="nav">
              {UI_TEXT.resume[lang]}
            </a>
          </li>
        </ul>
        <LangSwitch lang={lang} setLang={setLang} />
        <a href={`${base}#contact`} className="zcta" data-track="Contact" data-track-label="nav">
          {UI_TEXT.cta[lang]}
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="zmenu"
          aria-expanded={open}
          aria-controls="znav-sheet"
          aria-label={open ? UI_TEXT.menuClose[lang] : UI_TEXT.menuOpen[lang]}
          onClick={() => setOpen((o) => !o)}
        >
          {/* Two bars that cross into an X when the sheet is open. */}
          <span className="zmenu__bars" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Narrow screens: the links, language and CV in one sheet. */}
      <div id="znav-sheet" className="zsheet" hidden={!open}>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ "--i": i } as CSSProperties}>
              <a href={`${base}#${n.id}`} aria-current={active === n.id ? "true" : undefined} onClick={() => setOpen(false)}>
                {n.label[lang]}
              </a>
            </li>
          ))}
        </ul>
        <div className="zsheet__row">
          <LangSwitch lang={lang} setLang={setLang} />
          <a href={CV_PATH} download={CV_FILENAME} className="zsheet__cv" data-track="Download Resume" data-track-label="menu">
            {UI_TEXT.cvLabel[lang]}
          </a>
        </div>
      </div>
    </header>
  );
}
