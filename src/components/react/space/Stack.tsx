import { useState, type CSSProperties } from "react";
import { CAPABILITIES as AREAS, HEADS, STACK_TEXT, type Lang } from "../../../data/space";
import { Head } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

/** Every skill gets its own planet hue: its place across all areas, spread by the golden angle so neighbours never look alike. */
const HUES: Record<string, number> = Object.fromEntries(AREAS.flatMap((a) => a.items).map((it, i) => [it, Math.round((200 + i * 137.508) % 360)]));

export default function Stack({ lang }: { lang: Lang }) {
  const [sel, setSel] = useState(0);
  const area = AREAS[sel];

  return (
    <section id="stack" className="sec" aria-labelledby="stack-title">
      <div className="wrap stack-40">
        <Head head={HEADS.capabilities} lang={lang} id="stack-title" />

        <div className="chart">
          <ul className="pick-list">
            {AREAS.map((a, i) => (
              <li key={a.code.en}>
                <button
                  type="button"
                  className="pick"
                  style={{ padding: "12px 16px", gap: 12 }}
                  aria-pressed={i === sel}
                  aria-controls="constellation"
                  onClick={() => setSel(i)}
                >
                  <span className="area-dot" aria-hidden="true" />
                  <span className="layer-name">{a.name[lang]}</span>
                  <span className="layer-geo">{pad(a.items.length)}</span>
                </button>
              </li>
            ))}
          </ul>

          <div id="constellation" className="spotlight panel constellation">
            <div className="swap stack-40" style={{ gap: 22 }} key={sel}>
              <h3>{area.name[lang]}</h3>
              <p>{area.desc[lang]}</p>
              <ul className="stars-grid">
                {area.items.map((it) => (
                  <li key={it} style={{ ["--h" as string]: HUES[it] } as CSSProperties}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
