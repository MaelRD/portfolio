import { useState } from "react";
import {
  SECTIONS,
  STACK,
  STACK_CENTER,
  STACK_CHAINS,
  STACK_CHAINS_LABEL,
  STACK_EMPHASIS_LABEL,
  STACK_HINT,
  type Lang,
  type Topology,
} from "../../data/content";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { useInView, useMedia } from "./motion";
import SectionHeader from "./SectionHeader";

// Hub-and-spoke map: the areas sit on an ellipse around the center.
const MAP: Topology = {
  aspect: 1.45,
  nodes: [
    { id: "hub", label: STACK_CENTER, x: 50, y: 50 },
    ...STACK.map((g, i) => {
      const a = (-90 + (i * 360) / STACK.length) * (Math.PI / 180);
      return { id: g.id, label: g.title.toUpperCase(), x: 50 + 38 * Math.cos(a), y: 50 + 40 * Math.sin(a) };
    }),
  ],
  edges: STACK.map((g) => ["hub", g.id] as [string, string]),
};

// Left-to-right on wide screens; top-to-bottom on phones (never shrunk to fit).
const chainTopology = (steps: string[], vertical: boolean): Topology => ({
  aspect: vertical ? 1.6 : 5,
  nodes: steps.map((label, i) => {
    const t = (i * 78) / (steps.length - 1);
    return vertical ? { id: `c${i}`, label, x: 50, y: 11 + t } : { id: `c${i}`, label, x: 11 + t, y: 50 };
  }),
  edges: steps.slice(1).map((_, i) => [`c${i}`, `c${i + 1}`] as [string, string]),
});

/**
 * The stack as a system map, not a grid of cards: areas connect to the
 * center, and selecting one (hover, focus or tap) lights its connection,
 * dims the rest and shows what it contains. Below, real combinations from
 * my projects — how the pieces work together, which says more than logos.
 * Phones: the areas become a simple list above the same detail panel.
 */
export default function Stack({ lang }: { lang: Lang }) {
  const [activeId, setActiveId] = useState("engineering");
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const group = STACK.find((g) => g.id === activeId)!;
  const vertical = !useMedia("(min-width: 640px)");

  return (
    <section id="stack" aria-labelledby="stack-title" className="mael-section">
      <SectionHeader header={SECTIONS.stack} lang={lang} id="stack-title" />

      <div ref={ref} className="sn">
        <div className="sn__map">
          <ArchitectureDiagram
            topology={MAP}
            accent={group.accent}
            play={inView}
            pulses={false}
            label={`${STACK_CENTER}: ${STACK.map((g) => g.title).join(", ")}`}
            interactive={{ activeId, onSelect: setActiveId, controls: "sn-detail" }}
          />
        </div>

        {/* Phones: the same areas as a plain list. */}
        <ul className="sn__list">
          {STACK.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                aria-pressed={g.id === activeId}
                aria-controls="sn-detail"
                onClick={() => setActiveId(g.id)}
                style={{ ["--accent" as string]: g.accent }}
              >
                {g.title}
              </button>
            </li>
          ))}
        </ul>

        <div id="sn-detail" className="sn__detail" aria-live="polite" style={{ ["--accent" as string]: group.accent }}>
          <div key={group.id} className="sn__detail-inner">
            {group.emphasis && (
              <p className="mono-label" style={{ color: group.accent, margin: "0 0 4px" }}>
                {STACK_EMPHASIS_LABEL[lang]}
              </p>
            )}
            <h3 className="sn__title">{group.title}</h3>
            <p className="body-text">{group.description[lang]}</p>
            <div className="stack-rows">
              {group.rows.map((row, i) => (
                <ul key={row.join()} className="stack-row" style={{ ["--i" as string]: i }}>
                  {row.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <p className="sn__hint">{STACK_HINT[lang]}</p>
        </div>
      </div>

      <div className="sn-chains">
        <h3 className="mono-label">{STACK_CHAINS_LABEL[lang]}</h3>
        <ul>
          {STACK_CHAINS.map((c) => (
            <li key={c.project}>
              <span className="sn-chains__project">{c.project}</span>
              <ArchitectureDiagram topology={chainTopology(c.steps, vertical)} size="sm" play={inView} label={`${c.project}: ${c.steps.join(" → ")}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
