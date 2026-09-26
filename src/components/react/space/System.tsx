import { useState } from "react";
import { HEADS, LAYERS, SYSTEM_TEXT, type Lang } from "../../../data/space";
import { Head } from "./ui";

// The first five layers are concentric shells of one planet (outside in);
// the database and external services orbit it as a moon and a satellite.
const SHELL_SIZES = [84, 68, 52, 36, 20];
const SHELL_BG = [
  "rgba(139,108,255,.06)",
  "rgba(139,108,255,.10)",
  "rgba(124,58,237,.16)",
  "rgba(219,39,119,.16)",
  "radial-gradient(circle at 40% 35%,#fff3dc,#FFC07A 35%,#c2410c 75%)",
];
const MOONS = [
  { layer: 5, phase: 0.8, size: 18, body: "radial-gradient(circle at 35% 30%,#fbcfe8,#db2777 55%,#500724)", glow: "rgba(244,114,182,.7)", color: "#f9a8d4" },
  { layer: 6, phase: 3.94, size: 14, body: "radial-gradient(circle at 35% 30%,#cffafe,#22d3ee 55%,#083344)", glow: "rgba(125,227,255,.7)", color: "#7DE3FF" },
];
const pad = (n: number) => String(n).padStart(2, "0");

export default function System({ lang }: { lang: Lang }) {
  const [sel, setSel] = useState(4);
  const layer = LAYERS[sel];

  return (
    <section id="system" className="sec" aria-labelledby="system-title">
      <div className="wrap split system">
        <div className="stack-40" style={{ gap: 28 }}>
          <Head head={HEADS.system} lang={lang} id="system-title" />
          <ul className="pick-list">
            {LAYERS.map((l, i) => (
              <li key={l.name.en}>
                <button
                  type="button"
                  className="pick"
                  aria-pressed={i === sel}
                  aria-controls="layer-readout"
                  onClick={() => setSel(i)}
                  onMouseEnter={() => setSel(i)}
                >
                  <span className="layer-n">{pad(i + 1)}</span>
                  <span className="layer-name">{l.name[lang]}</span>
                  <span className="layer-geo">{l.geo[lang]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="orbit-col">
          {/* Pointer shortcut to the list above; keyboard and screen readers use the list. */}
          <div className="globe" aria-hidden="true">
            <div className="globe__halo" data-spin="4" />
            {SHELL_SIZES.map((sz, i) => {
              const band = i < 4 ? (sz - SHELL_SIZES[i + 1]) / 4 : 0;
              return (
                <div
                  key={sz}
                  className={`shell${i === 4 ? " shell--core" : ""}`}
                  data-on={i === sel ? "" : undefined}
                  style={{ width: `${sz}%`, height: `${sz}%`, background: SHELL_BG[i] }}
                  onMouseEnter={() => setSel(i)}
                  onClick={() => setSel(i)}
                >
                  <span className="shell__label" style={{ top: i < 4 ? `${(band / sz) * 100}%` : "50%" }}>
                    {LAYERS[i].name[lang].toUpperCase()}
                  </span>
                </div>
              );
            })}
            {MOONS.map((m) => (
              <div
                key={m.layer}
                className="sat"
                style={{ zIndex: 5 }}
                data-orbit="46"
                data-ry="46"
                data-tilt="0"
                data-speed="0.00016"
                data-phase={m.phase}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  className="moon"
                  aria-pressed={sel === m.layer}
                  onClick={() => setSel(m.layer)}
                  onMouseEnter={() => setSel(m.layer)}
                  style={{ color: m.color }}
                >
                  <span className="moon__body" style={{ width: m.size, height: m.size, background: m.body, boxShadow: `0 0 14px ${m.glow}` }} />
                  <span className="moon__tag">{LAYERS[m.layer].name[lang].toUpperCase()}</span>
                </button>
              </div>
            ))}
          </div>

          <div id="layer-readout" className="panel readout" aria-live="polite">
            <span className="label label--11" style={{ color: "var(--cyan)" }}>
              {SYSTEM_TEXT.responsibility[lang]} · {layer.geo[lang]}
            </span>
            <div className="readout__title">
              <strong>{layer.name[lang]}</strong>
              <span>{layer.tech[lang]}</span>
            </div>
            <p>{layer.desc[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
