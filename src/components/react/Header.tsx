import { useEffect, useRef, useState } from "react";
import { CV_FILENAME, CV_PATH, NAV_LINKS, UI, type Lang } from "../../data/content";

interface HeaderProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  active?: string;
  /** "" on the home page (plain #anchors, smooth-scrolled); "/" on inner pages. */
  base?: string;
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div role="group" aria-label={UI.langLabel[lang]} className="lang-switch">
      {(["es", "en"] as const).map((l) => (
        <button key={l} type="button" lang={l} aria-pressed={lang === l} onClick={() => setLang(l)} className="lang-switch__btn">
          {l === "es" ? "ES" : "EN"}
          <span className="sr-only">{l === "es" ? " — Español" : " — English"}</span>
        </button>
      ))}
    </div>
  );
}

export default function Header({ lang, setLang, active, base = "" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on Escape (returning focus to the toggle) and when
  // the viewport grows past the breakpoint where the desktop nav takes over.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const links = (onNavigate?: () => void) =>
    NAV_LINKS.map((item) => (
      <li key={item.id}>
        <a href={`${base}#${item.id}`} aria-current={active === item.id ? "location" : undefined} className="nav-link" onClick={onNavigate}>
          {item.label[lang]}
        </a>
      </li>
    ));

  const cv = (
    <a href={CV_PATH} download={CV_FILENAME} className="nav-cv" aria-label={UI.cvLabel[lang]}>
      {UI.cv[lang]}
      <span aria-hidden="true">↓</span>
    </a>
  );

  return (
    <header id="site-nav" className="site-header">
      <a href="#main" className="skip-link">
        {UI.skip[lang]}
      </a>

      <a href={base ? "/" : "#hero"} aria-label={UI.home[lang]} className="brand">
        <span className="brand__mark">
          M<span style={{ color: "#8B5CF6" }}>.</span>
        </span>
        <span className="brand__id" aria-hidden="true">
          MYG-01
        </span>
      </a>

      <nav aria-label={UI.navLabel[lang]} className="nav-desktop">
        <ul>{links()}</ul>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <LangSwitch lang={lang} setLang={setLang} />
        <span className="nav-cv-wrap">{cv}</span>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? UI.menuClose[lang] : UI.menuOpen[lang]}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className={open ? "nav-toggle__icon is-open" : "nav-toggle__icon"} />
        </button>
      </div>

      <nav id="mobile-nav" aria-label={UI.navLabel[lang]} className="nav-mobile" hidden={!open}>
        <ul>{links(() => setOpen(false))}</ul>
        <div style={{ marginTop: 14 }}>{cv}</div>
      </nav>
    </header>
  );
}
