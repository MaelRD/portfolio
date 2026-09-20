import type { CSSProperties } from "react";
import { BRAND, NAV_LINKS, type Lang } from "../../data/content";

interface HeaderProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  active: string;
}

const headerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 24,
  padding: "18px clamp(20px,4vw,64px)",
  backdropFilter: "blur(14px)",
  background: "linear-gradient(180deg, rgba(3,0,20,.82), rgba(3,0,20,.35))",
  borderBottom: "1px solid rgba(148,163,184,.10)",
};

export default function Header({ lang, setLang, active }: HeaderProps) {
  return (
    <header style={headerStyle}>
      <a href="#top" style={{ display: "flex", flexDirection: "column", gap: 3, color: "#F8FAFC" }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: ".28em" }}>
          {BRAND.name}
        </span>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 8.5, letterSpacing: ".34em", color: "#94A3B8" }}>
          {BRAND.role[lang]}
        </span>
      </a>

      <nav
        aria-label="Main"
        className="hidden sm:flex"
        style={{ alignItems: "center", gap: "clamp(10px,2vw,30px)", fontSize: 13.5, letterSpacing: ".02em" }}
      >
        {NAV_LINKS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              color: active === item.id ? "#F8FAFC" : "#94A3B8",
              padding: "6px 2px",
              transition: "color .3s ease",
            }}
          >
            {item.label[lang]}
          </a>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          role="group"
          aria-label="Language"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 3,
            border: "1px solid rgba(148,163,184,.16)",
            borderRadius: 999,
            fontFamily: "'Geist Mono',monospace",
            fontSize: 10,
            letterSpacing: ".12em",
          }}
        >
          <button
            type="button"
            onClick={() => setLang("en")}
            style={{
              background: lang === "en" ? "rgba(112,66,248,.85)" : "transparent",
              color: lang === "en" ? "#F8FAFC" : "#94A3B8",
              border: 0,
              borderRadius: 999,
              padding: "5px 11px",
              cursor: "pointer",
              font: "inherit",
              transition: "all .25s ease",
            }}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("es")}
            style={{
              background: lang === "es" ? "rgba(112,66,248,.85)" : "transparent",
              color: lang === "es" ? "#F8FAFC" : "#94A3B8",
              border: 0,
              borderRadius: 999,
              padding: "5px 11px",
              cursor: "pointer",
              font: "inherit",
              transition: "all .25s ease",
            }}
          >
            ES
          </button>
        </div>
        <span
          aria-hidden="true"
          className="hidden sm:block"
          style={{ width: 44, height: 1, background: "linear-gradient(90deg, transparent, rgba(148,163,184,.5))" }}
        />
      </div>
    </header>
  );
}
