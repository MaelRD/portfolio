import { useState } from "react";
import { SECTIONS, SYSTEM_HINT, SYSTEM_NODES, type Lang, type SystemNode } from "../../data/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// The spine runs User → … → Domain; Domain then forks into Data and Integrations.
const SPINE = SYSTEM_NODES.slice(0, 5);
const LEAVES = SYSTEM_NODES.slice(5);

/**
 * A request's path through a typical system I build. Every component is a
 * button: hovering, focusing or tapping it shows its responsibility in the
 * side panel and lights the path from the user down to it. Packets travel
 * the connectors (CSS only, off under reduced motion).
 */
export default function SystemThinking({ lang }: { lang: Lang }) {
  const [activeId, setActiveId] = useState("domain");
  const active = SYSTEM_NODES.find((n) => n.id === activeId)!;
  const activeSpineIndex = SPINE.findIndex((n) => n.id === activeId);
  // Everything above the active node is on its path; leaves sit below the whole spine.
  const pathEnd = activeSpineIndex === -1 ? SPINE.length - 1 : activeSpineIndex;

  const node = (n: SystemNode, onPath: boolean) => (
    <button
      type="button"
      className="sys-node"
      data-active={n.id === activeId ? "" : undefined}
      data-path={onPath ? "" : undefined}
      aria-pressed={n.id === activeId}
      aria-controls="sys-detail"
      onMouseEnter={() => setActiveId(n.id)}
      onFocus={() => setActiveId(n.id)}
      onClick={() => setActiveId(n.id)}
    >
      <span className="sys-node__label">{n.label}</span>
      {n.tech && <span className="sys-node__tech">{n.tech}</span>}
      {/* Phones: the responsibility is read inline (the side panel is hidden there). */}
      <span className="sys-node__desc">{n.body[lang]}</span>
    </button>
  );

  return (
    <section id="system" aria-labelledby="system-title" className="mael-section">
      <SectionHeader header={SECTIONS.system} lang={lang} id="system-title" accent="#38BDF8" />

      <Reveal className="sys-layout">
        <div className="sys-diagram">
          <ol className="sys-spine">
            {SPINE.map((n, i) => (
              <li key={n.id} className="sys-row" data-path={i <= pathEnd ? "" : undefined}>
                {node(n, i <= pathEnd)}
              </li>
            ))}
          </ol>
          {/* Domain forks into persistence and integrations. */}
          <svg className="sys-fork" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0 V10 Q50 16 44 16 H31 Q25 16 25 22 V32" data-on={activeId === "data" ? "" : undefined} />
            <path d="M50 0 V10 Q50 16 56 16 H69 Q75 16 75 22 V32" data-on={activeId === "external" ? "" : undefined} />
          </svg>
          <div className="sys-leaves">
            {LEAVES.map((n) => (
              <div key={n.id}>{node(n, false)}</div>
            ))}
          </div>
        </div>

        <div id="sys-detail" className="sys-detail" aria-live="polite">
          <p className="mono-label" style={{ color: "#7DD3FC" }}>
            {active.area === active.label ? "RESPONSIBILITY" : active.area}
          </p>
          <p className="sys-detail__name">{active.label}</p>
          {active.tech && <p className="sys-detail__tech">{active.tech}</p>}
          <p className="sys-detail__body">{active.body[lang]}</p>
          <p className="sys-detail__hint">{SYSTEM_HINT[lang]}</p>
        </div>
      </Reveal>
    </section>
  );
}
