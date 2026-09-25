import type { Lang, SectionHeader as Header } from "../../data/content";
import { useArmed, useCountTo, useInView } from "./motion";
import RevealText from "./RevealText";

/**
 * Section opener, the same everywhere so sections read as parts of one system:
 *   a hairline draws across to the section's coordinate ("── 03 / EXPERIENCE"),
 *   the number counts 00 → 03, the label opens its tracking,
 *   the title reveals line by line through a mask, the intro fades in.
 * Server render / no JS / reduced motion: final state.
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
  const armed = useArmed();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const target = parseInt(header.index, 10);
  const n = useCountTo(target, armed && inView);
  const state = !armed ? "static" : inView ? "in" : "out";

  return (
    <div ref={ref} className={`sh sh--${align} sh--${size}`} data-sh={state} style={{ ["--sh-accent" as string]: accent }}>
      <p className="sh__coord">
        <span className="sh__rule" aria-hidden="true" />
        <span className="sh__n">{String(n).padStart(2, "0")}</span>
        <span aria-hidden="true">/</span>
        <span className="sh__eyebrow">{header.eyebrow}</span>
      </p>
      <RevealText as="h2" id={id} text={header.title[lang]} className="sh__title" play={armed ? inView : undefined} delay={120} />
      {header.intro && <p className="sh__intro">{header.intro[lang]}</p>}
    </div>
  );
}
