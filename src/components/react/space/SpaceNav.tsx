import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CV_FILENAME, CV_PATH } from "../../../data/content";
import { NAV, UI_TEXT, type Lang } from "../../../data/space";

// Floating pill navigation (after zenwood.studio): the site menu in the
// middle, language on the right. Once the page scrolls, the side pills step away and only the menu
// stays. On narrow screens the menu pill carries a button that opens the rest.

const LINKS = NAV.filter((n) => n.id !== "contact");

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
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
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  // The sheet never traps the page: Escape, a tap outside it or following a
  // link closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
    <header id="site-nav" className="znav" data-scrolled={scrolled ? "" : undefined} data-open={open ? "" : undefined}>
      {/* Empty left column keeps the menu centred in the three-column grid. */}
      <div className="znav__side znav__side--left" />

      <nav className="zpill znav__menu" aria-label={UI_TEXT.nav[lang]}>
        <a href={base || "#hero"} className="zlogo" aria-label={UI_TEXT.home[lang]}>
          <span className="nav__mark" aria-hidden="true" />
        </a>
        <ul className="zlinks">
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
        <a href={`${base}#contact`} className="zcta" data-track="Contact" data-track-label="nav">
          {UI_TEXT.cta[lang]}
        </a>
        <button
          type="button"
          className="zmenu"
          aria-expanded={open}
          aria-controls="znav-sheet"
          aria-label={open ? UI_TEXT.menuClose[lang] : UI_TEXT.menuOpen[lang]}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>

      <div className="znav__side znav__side--right">
        <LangSwitch lang={lang} setLang={setLang} />
      </div>

      {/* Narrow screens: everything the side pills hold, in one sheet. */}
      <div id="znav-sheet" className="zsheet" hidden={!open}>
        <ul>
          {NAV.map((n) => (
            <li key={n.id}>
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
