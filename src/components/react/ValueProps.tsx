import { VALUE_PROPS, type Lang } from "../../data/content";
import { useTiltHover } from "./hooks";
import Reveal from "./Reveal";

function ValueCard({ lang, item, delay }: { lang: Lang; item: (typeof VALUE_PROPS)[number]; delay: number }) {
  const ref = useTiltHover<HTMLElement>();
  return (
    <Reveal delay={delay}>
      <article
        ref={ref}
        style={{
          position: "relative",
          padding: "34px 30px 38px",
          border: "1px solid rgba(148,163,184,.12)",
          borderRadius: 10,
          background: `linear-gradient(160deg, ${item.bgTint}, rgba(5,8,22,.6))`,
          overflow: "hidden",
          transition: "transform .3s ease, border-color .3s ease",
        }}
      >
        <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".3em", color: item.accent }}>
          {item.eyebrow}
        </div>
        <h3 style={{ margin: "16px 0 10px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 500, color: "#F8FAFC" }}>
          {item.title[lang]}
        </h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#94A3B8" }}>{item.body[lang]}</p>
      </article>
    </Reveal>
  );
}

export default function ValueProps({ lang }: { lang: Lang }) {
  return (
    <section
      aria-label="Value"
      style={{
        padding: "clamp(60px,9vh,110px) clamp(20px,5vw,80px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
        gap: "clamp(20px,3vw,40px)",
        borderTop: "1px solid rgba(148,163,184,.08)",
      }}
    >
      {VALUE_PROPS.map((item, i) => (
        <ValueCard key={item.title.en} lang={lang} item={item} delay={i * 70} />
      ))}
    </section>
  );
}
