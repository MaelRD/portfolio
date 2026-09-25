import { useEffect, useRef, useState } from "react";
import { BRAND, NAV_LINKS, UI, type Lang } from "../../data/content";

interface HeaderProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  active: string;
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

export default function Header({ lang, setLang, active }: HeaderProps) {
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
    NAV_LINKS.map((item) => {
      const current = active === item.id;
      return (
        <li key={item.id}>
          <a href={`#${item.id}`} aria-current={current ? "location" : undefined} className="nav-link" onClick={onNavigate}>
            {item.label[lang]}
          </a>
        </li>
      );
    });

  return (
    <header id="site-nav" className="site-header">
      <a href="#main" className="skip-link">
        {UI.skip[lang]}
      </a>

      <a href="#hero" aria-label={UI.home[lang]} className="brand">
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: ".28em", color: "#F8FAFC" }}>{BRAND.name}</span>
        <span className="brand__role" style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: ".2em", color: "#94A3B8" }}>{BRAND.role[lang]}</span>
      </a>

      <nav aria-label={UI.navLabel[lang]} className="nav-desktop">
        <ul>{links()}</ul>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <LangSwitch lang={lang} setLang={setLang} />
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
      </nav>
    </header>
  );
}
