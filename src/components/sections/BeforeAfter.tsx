import type { CSSProperties } from "react";
import { useEntrance } from "@/lib/motion";
import type { Lang } from "@/data/content";
import { BEFORE_AFTER as T } from "@/data/v2";
import TracingBeam from "../aceternity/TracingBeam";
import { SectionHeader } from "../kit";

// Each manual habit beside what replaces it, read top to bottom along a
// tracing beam that lights as you scroll. Rows arrive in order when the list
// comes into view (useEntrance: hidden only once a script is there to reveal
// them, so the content never depends on the animation).

export default function BeforeAfter({ lang }: { lang: Lang }) {
  const [ref, state] = useEntrance<HTMLDivElement>();
  return (
    <section id="before-after" className="sec" aria-labelledby="ba-title">
      <div className="wrap stack-40">
        <SectionHeader id="ba-title" title={T.title[lang]} />
        <TracingBeam>
          <div ref={ref} className="bax" data-state={state}>
            <p className="bax__head bax__head--before">{T.before[lang]}</p>
            <span aria-hidden="true" />
            <p className="bax__head bax__head--after">{T.after[lang]}</p>
            {T.pairs.map(([b, a], i) => (
              <div key={b.en} className="bax__row" style={{ ["--k" as string]: i } as CSSProperties}>
                <span className="bax__before">
                  <span className="sr-only">{T.before[lang]}: </span>
                  {b[lang]}
                </span>
                <span className="bax__arrow" aria-hidden="true" />
                <span className="bax__after">
                  <span className="sr-only">{T.after[lang]}: </span>
                  {a[lang]}
                </span>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
