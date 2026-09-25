import { ABOUT, SECTIONS, type Lang } from "../../data/content";
import { useArmed, useInView } from "./motion";
import SectionHeader from "./SectionHeader";

const LEVEL_COLORS = ["#38BDF8", "#8B5CF6", "#E879F9"];

/** Fades a block in once it enters the viewport ("appear"); static without JS / reduced motion. */
function useAppear<T extends Element>() {
  const armed = useArmed();
  const [ref, inView] = useInView<T>({ threshold: 0.2 });
  return { ref, "data-appear": !armed ? "static" : inView ? "in" : "out" } as const;
}

/**
 * Editorial composition instead of a text box: margin annotations on the
 * left like a spec sheet, the text on the right, the three levels as a
 * compact stack, and the soft skills as four large words — each one a verb
 * for how I work with people.
 */
export default function About({ lang }: { lang: Lang }) {
  const notes = useAppear<HTMLDListElement>();
  const text = useAppear<HTMLDivElement>();
  const soft = useAppear<HTMLOListElement>();

  return (
    <section id="about" aria-labelledby="about-title" className="mael-section">
      <SectionHeader header={SECTIONS.about} lang={lang} id="about-title" size="lg" />

      <div className="ed">
        <dl className="ed__notes" {...notes}>
          <div className="ed__id">ABOUT / MYG-01</div>
          {ABOUT.annotations.map((a, i) => (
            <div key={a.k} style={{ transitionDelay: `${i * 60}ms` }}>
              <dt>{a.k}</dt>
              <dd>{a.v[lang]}</dd>
            </div>
          ))}
        </dl>

        <div className="ed__text" {...text}>
          <p className="about-lead">{ABOUT.lead[lang]}</p>
          {ABOUT.paragraphs.map((p) => (
            <p key={p.en} className="body-text" style={{ fontSize: 16.5, lineHeight: 1.75 }}>
              {p[lang]}
            </p>
          ))}
          <ol className="ed__levels">
            {ABOUT.levels.map((level, i) => (
              <li key={level.k} style={{ ["--c" as string]: LEVEL_COLORS[i] }}>
                <span className="ed__levels-k">{level.k}</span>
                <span>{level.v[lang]}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="soft">
        <h3 className="mono-label">{ABOUT.softLabel[lang]}</h3>
        <ol className="soft__list" {...soft}>
          {ABOUT.softEditorial.map((s, i) => (
            <li key={s.word} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="soft__bg" aria-hidden="true">
                {s.word}
              </span>
              <span className="soft__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="soft__word">{s.word}</span>
              <span className="soft__body">{s.body[lang]}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
