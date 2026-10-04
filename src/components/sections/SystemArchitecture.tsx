import { useState, type CSSProperties } from "react";
import type { Lang } from "@/data/content";
import { SYSTEM_V2 as T } from "@/data/v2";
import { SectionHeader } from "../kit";

// "I don't see a screen. I see a system." Six layers from the user down to
// the data, joined by one rail a pulse runs down. Each layer is a button that
// opens its explanation inline (no modal): hover or focus previews it on
// desktop, a tap or Enter pins it, so it works the same by touch and keyboard.

export default function SystemArchitecture({ lang }: { lang: Lang }) {
  const [pinned, setPinned] = useState(4);
  const [peek, setPeek] = useState<number | null>(null);
  const open = peek ?? pinned;

  return (
    <section id="system" className="sec" aria-labelledby="system-title">
      <div className="wrap split layers-sec">
        <div className="stack-40" style={{ gap: 24 }}>
          <SectionHeader id="system-title" title={T.title[lang]} intro={T.intro[lang]} />
          <p className="system__closing">
            {T.closing.map((c) => (
              <span key={c.en}>{c[lang]}</span>
            ))}
          </p>
        </div>
        <ol className="layers" onPointerLeave={() => setPeek(null)}>
          {T.layers.map((l, i) => {
            const on = open === i;
            return (
              <li key={l.code} className="layer" data-open={on ? "" : undefined} style={{ ["--k" as string]: i } as CSSProperties}>
                <button
                  type="button"
                  className="layer__btn"
                  aria-expanded={on}
                  aria-controls={`layer-${l.code}`}
                  onClick={() => {
                    setPinned(i);
                    setPeek(null);
                  }}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setPeek(i)}
                  onFocus={() => setPeek(i)}
                  onBlur={() => setPeek(null)}
                >
                  <span className="layer__code">{l.code}</span>
                  <span className="layer__name">{l.name[lang]}</span>
                </button>
                <div id={`layer-${l.code}`} className="layer__text" hidden={!on}>
                  <p>{l.text[lang]}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
