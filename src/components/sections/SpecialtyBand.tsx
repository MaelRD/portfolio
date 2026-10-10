import type { CSSProperties } from "react";
import type { Lang } from "@/data/content";
import { BAND } from "@/data/v2";

// A line of large type between the work and the developer's story: the
// specialties. It moves only as the page scrolls (--p from the motion
// system), never on its own, so there's nothing to pause and nothing moves for
// reduced motion. Screen readers get the list once; the repeated row is
// presentation.

/** The list repeated `times` so the row stays wider than any screen as it slides. */
const row = (items: string[], times: number) => Array.from({ length: times }, () => items).flat().map((t, i) => (
  <span key={i}>
    {t}
    <i aria-hidden="true">—</i>
  </span>
));

export default function SpecialtyBand({ lang }: { lang: Lang }) {
  return (
    <section className="band" aria-label={BAND.label[lang]} data-scrub>
      <p className="sr-only">{BAND.specialties.join(", ")}</p>
      <div className="band__row band__row--big" aria-hidden="true" style={{ ["--dir" as string]: -1 } as CSSProperties}>
        {row(BAND.specialties, 3)}
      </div>
    </section>
  );
}
