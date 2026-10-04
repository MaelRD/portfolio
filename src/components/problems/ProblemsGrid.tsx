import type { Lang } from "@/data/content";
import { START_PATH } from "@/data/content";
import { HEADS, PROBLEMS, PROBLEMS_TEXT } from "@/data/space";
import { Head } from "../react/space/ui";

// Scenarios a potential client may recognize, before any talk of solutions.
// Set as an editorial index rather than another card grid: the heading holds
// its place on the left while the scenarios read down the right like a list
// of symptoms.

export default function ProblemsGrid({ lang }: { lang: Lang }) {
  return (
    <section id="problems" className="sec" aria-labelledby="problems-title">
      <div className="wrap stack-40">
        <div className="symptoms">
          <div className="symptoms__head">
            <Head head={HEADS.problems} lang={lang} id="problems-title" />
          </div>
          <ul className="symptoms__list">
            {PROBLEMS.map((p, i) => (
              <li key={p.title.en} className="symptom">
                <h3 className="symptom__title" id={`problem-${i}`}>
                  {p.title[lang]}
                </h3>
                <p className="symptom__text">{p.text[lang]}</p>
              </li>
            ))}
          </ul>
        </div>
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
