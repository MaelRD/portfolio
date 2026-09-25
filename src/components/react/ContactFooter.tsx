import { CONTACT, FOOTER, type Lang } from "../../data/content";
import { useMagnetic } from "./hooks";
import Reveal from "./Reveal";

export default function ContactFooter({ lang }: { lang: Lang }) {
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const secondaryRef = useMagnetic<HTMLAnchorElement>();

  return (
    <>
      <section
        id="contact"
        style={{
          scrollMarginTop: 100,
          padding: "clamp(70px,12vh,150px) clamp(20px,5vw,80px) clamp(50px,7vh,90px)",
          borderTop: "1px solid rgba(148,163,184,.08)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 34,
        }}
      >
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".3em", color: "#64748B" }}>{CONTACT.eyebrow[lang]}</span>
        <Reveal>
          <h2
            style={{
              margin: 0,
              maxWidth: "19ch",
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(32px,5vw,64px)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-.02em",
              color: "#F8FAFC",
            }}
          >
            {CONTACT.headline[lang]}
          </h2>
        </Reveal>
        <p style={{ margin: 0, maxWidth: "52ch", fontSize: 16, lineHeight: 1.7, color: "#94A3B8" }}>{CONTACT.body[lang]}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
          <a
            ref={primaryRef}
            href={`mailto:${CONTACT.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              minHeight: 48,
              padding: "15px 28px",
              borderRadius: 6,
              background: "linear-gradient(120deg,#5B32E0,#7042F8)",
              color: "#F8FAFC",
              fontFamily: "'Geist Mono',monospace",
              fontSize: 11.5,
              letterSpacing: ".18em",
              boxShadow: "0 14px 44px -14px rgba(112,66,248,.95)",
              transition: "transform .25s ease",
            }}
          >
            {CONTACT.ctaPrimary[lang]} <span aria-hidden="true">→</span>
          </a>
          <a
            ref={secondaryRef}
            href="/cv.pdf"
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              minHeight: 48,
              padding: "15px 28px",
              borderRadius: 6,
              border: "1px solid rgba(148,163,184,.26)",
              color: "#F8FAFC",
              fontFamily: "'Geist Mono',monospace",
              fontSize: 11.5,
              letterSpacing: ".18em",
              transition: "transform .25s ease, border-color .25s ease",
            }}
          >
            {CONTACT.ctaSecondary[lang]} <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 34px", marginTop: 8, fontFamily: "'Geist Mono',monospace", fontSize: 11.5, letterSpacing: ".1em" }}>
          <a href={`mailto:${CONTACT.email}`} style={{ color: "#CBD5E1" }}>
            {CONTACT.email}
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener" style={{ color: "#CBD5E1" }}>
            {CONTACT.githubLabel}
          </a>
          <a href={CONTACT.site} target="_blank" rel="noopener" style={{ color: "#CBD5E1" }}>
            {CONTACT.siteLabel}
          </a>
        </div>
      </section>

      <footer
        style={{
          padding: "34px clamp(20px,5vw,80px) 46px",
          borderTop: "1px solid rgba(148,163,184,.10)",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px 30px",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "'Geist Mono',monospace",
          fontSize: 10,
          letterSpacing: ".2em",
          color: "#64748B",
        }}
      >
        <span>{FOOTER.name}</span>
        <span style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", alignItems: "center" }}>
          <span>{FOOTER.based[lang]}</span>
          <span aria-hidden="true">⊕</span>
          <span>{FOOTER.available[lang]}</span>
        </span>
      </footer>
    </>
  );
}
