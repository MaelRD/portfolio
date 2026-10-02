import type { Lang } from "@/data/content";
import { START_PATH } from "@/data/content";
import { HEADS, PROBLEMS, PROBLEMS_TEXT } from "@/data/space";
import { Head } from "../react/space/ui";

// Scenarios a potential client may recognize, before any talk of solutions.
// Same card language as the solutions grid, without the diagram.

export default function ProblemsGrid({ lang }: { lang: Lang }) {
  return (
    <section id="problems" className="sec" aria-labelledby="problems-title">
      <div className="wrap stack-40">
        <Head head={HEADS.problems} lang={lang} id="problems-title" />
        <ul className="solutions problems">
          {PROBLEMS.map((p, i) => (
            <li key={p.title.en}>
              <article className="spotlight panel solution problem" aria-labelledby={`problem-${i}`}>
                <span className="solution__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="solution__title" id={`problem-${i}`}>
                  {p.title[lang]}
                </h3>
                <p className="solution__desc">{p.text[lang]}</p>
              </article>
            </li>
          ))}
        </ul>
        <div className="problems__close">
          <p>{PROBLEMS_TEXT.closing[lang]}</p>
          <a href={START_PATH} className="btn btn--solid" data-track="Start Project" data-track-label="problems">
            {PROBLEMS_TEXT.cta[lang]} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
