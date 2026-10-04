import { useRef, type CSSProperties } from "react";
import type { Lang } from "@/data/content";
import { STACK_V2 as T } from "@/data/v2";
import { SkillGlyph } from "@/lib/skillIcons";
import { SectionHeader, useVisible } from "../kit";

// Skills grouped by operation (interface → logic → data → integration →
// infrastructure, plus architecture across all), one card per group after
// Aceternity's Cards Demo 3: the group's tools sit in a row of glass circles,
// largest in the middle, rising one after another while a thin light sweeps
// across. Then the group's name, what it does, and its tools by name.
//
// Motion is CSS only and runs while the grid is on screen; reduced motion
// keeps everything still. The sparkles have fixed positions (no random
// values at render, so server and browser agree).

/** Circle size by distance from the middle of the row. */
const SIZES = [60, 44, 34];
const size = (i: number, n: number) => SIZES[Math.min(SIZES.length - 1, Math.floor(Math.abs(i - (n - 1) / 2)))];

/** A dozen sparkles around the light, in fixed spots. */
const SPARKS = Array.from({ length: 12 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 61 + 13) % 100, d: (i % 5) * 0.6 }));

function Skeleton({ items }: { items: string[] }) {
  return (
    <div className="sk" aria-hidden="true">
      <div className="sk__row">
        {items.map((it, i) => {
          const s = size(i, items.length);
          return (
            <span key={it} className="sk__orb" style={{ width: s, height: s, ["--k" as string]: i } as CSSProperties}>
              <SkillGlyph name={it} size={Math.round(s * 0.42)} />
            </span>
          );
        })}
      </div>
      <span className="sk__beam">
        <span className="sk__sparks">
          {SPARKS.map((p, i) => (
            <i key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}s` }} />
          ))}
        </span>
      </span>
    </div>
  );
}

export default function TechStack({ lang }: { lang: Lang }) {
  const gridRef = useRef<HTMLUListElement>(null);
  useVisible(gridRef, "80px");
  return (
    <section id="stack" className="sec" aria-labelledby="stack-title">
      <div className="wrap stack-40">
        <SectionHeader id="stack-title" title={T.title[lang]} intro={T.intro[lang]} />
        <ul ref={gridRef} className="skc-grid">
          {T.groups.map((g) => (
            <li key={g.code} className="skc">
              <Skeleton items={g.items} />
              <p className="skc__code">{g.code}</p>
              <h3 className="skc__name">{g.name[lang]}</h3>
              <p className="skc__does">{g.does[lang]}</p>
              <p className="skc__tools">{g.items.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
