import type { Lang, SectionHeader as Header } from "../../data/content";

/**
 * Shared section heading: a numbered mono eyebrow ("01 — PROJECTS") that
 * reads like a mission log entry, then the real `<h2>` and an optional intro.
 */
export default function SectionHeader({
  header,
  lang,
  id,
  accent = "#A78BFA",
  align = "start",
  size = "md",
}: {
  header: Header;
  lang: Lang;
  /** id for the h2, so the section can be `aria-labelledby` it. */
  id: string;
  accent?: string;
  align?: "start" | "center";
  size?: "md" | "lg";
}) {
  const centered = align === "center";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: centered ? "center" : "flex-start",
        textAlign: centered ? "center" : "left",
        marginBottom: "clamp(28px,4vw,44px)",
      }}
    >
      <p
        style={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: "'Geist Mono',monospace",
          fontSize: 12,
          letterSpacing: ".24em",
          color: "#94A3B8",
        }}
      >
        <span style={{ color: accent }}>{header.index}</span>
        <span aria-hidden="true" style={{ display: "block", width: 28, height: 1, background: `linear-gradient(90deg,${accent},transparent)` }} />
        {header.eyebrow[lang]}
      </p>
      <h2
        id={id}
        style={{
          margin: 0,
          maxWidth: "24ch",
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: size === "lg" ? "clamp(32px,4.6vw,58px)" : "clamp(28px,3.4vw,42px)",
          fontWeight: 500,
          lineHeight: 1.12,
          letterSpacing: "-.015em",
          color: "#F8FAFC",
          textWrap: "balance",
        }}
      >
        {header.title[lang]}
      </h2>
      {header.intro && (
        <p style={{ margin: 0, maxWidth: "58ch", fontSize: "clamp(15.5px,1.2vw,17px)", lineHeight: 1.65, color: "#CBD5E1" }}>{header.intro[lang]}</p>
      )}
    </div>
  );
}
