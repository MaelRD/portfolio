import { useEffect, useRef, useState } from "react";
import { Check, Copy, Menu, X } from "lucide-react";
import { CONTACT, CV_FILENAME, CV_PATH, START_PATH } from "../../../data/content";
import { HERO, NAV, UI_TEXT, type Lang } from "../../../data/space";

// Floating pill navigation (after zenwood.studio): availability on the left,
// the site menu in the middle, language and a copy-to-clipboard email on the
// right. Once the page scrolls, the side pills step away and only the menu
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

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // No clipboard access (insecure context, denied): fall back to the mail app.
      window.location.href = `mailto:${text}`;
    }
  };
  return [copied, copy] as const;
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
  const [copied, copy] = useCopy(CONTACT.email);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const emailButton = (
    <button type="button" className="zpill zpill--side zemail" onClick={copy} aria-label={`${UI_TEXT.copyEmail[lang]}: ${CONTACT.email}`}>
      {copied ? <Check size={16} strokeWidth={2.2} aria-hidden /> : <Copy size={16} strokeWidth={2} aria-hidden />}
      <span>{copied ? UI_TEXT.copied[lang] : CONTACT.email}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? UI_TEXT.copied[lang] : ""}
      </span>
    </button>
  );

  return (
    <header id="site-nav" className="znav" data-scrolled={scrolled ? "" : undefined} data-open={open ? "" : undefined}>
      <div className="znav__side znav__side--left">
        <p className="zpill zpill--side zstatus">
          <span className="dot-live" data-blink aria-hidden="true" />
          {HERO.status[lang].toLowerCase()}
        </p>
      </div>

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
        <a href={START_PATH} className="zcta" data-track="Start Project" data-track-label="nav">
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
        {emailButton}
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
        {emailButton}
      </div>
    </header>
  );
}
