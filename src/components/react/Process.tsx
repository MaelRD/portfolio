import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS, SECTIONS, type Lang } from "../../data/content";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { prefersReducedMotion } from "./motion";
import SectionHeader from "./SectionHeader";

/**
 * WOW 3 — the flow connects as you scroll.
 * One measurement per frame drives everything: the line fills down to the
 * middle of the viewport, every node the line has passed is "reached", and
 * the last one reached is the active step (full intensity, its micro-diagram
 * rebuilding; the others dim). Because line, nodes and active step come from
 * the same number, they can never drift apart.
 * Desktop: the active step's diagram sits in a sticky panel on the right.
 * Phones: each step shows its own diagram inline.
 * Reduced motion / no JS: every step fully visible, line complete.
 */
function useScrollTimeline(count: number) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const nodes = Array.from(list.querySelectorAll<HTMLElement>(".pt-node"));
    const place = () => {
      const r = list.getBoundingClientRect();
      const first = nodes[0].getBoundingClientRect();
      const lastNode = nodes[nodes.length - 1].getBoundingClientRect();
      const top = first.top + first.height / 2;
      const bottom = lastNode.top + lastNode.height / 2;
      fill.parentElement!.style.top = `${top - r.top}px`;
      fill.parentElement!.style.height = `${bottom - top}px`;
      return { top, bottom };
    };
    if (prefersReducedMotion()) {
      place();
      fill.style.transform = "scaleY(1)";
      const ro = new ResizeObserver(place);
      ro.observe(list);
      return () => ro.disconnect();
    }
    list.dataset.armed = "";
    let raf = 0;
    let last = -2;
    const update = () => {
      raf = 0;
      const { top, bottom } = place();
      const probe = window.innerHeight * 0.5;
      const f = Math.max(0, Math.min(1, (probe - top) / Math.max(1, bottom - top)));
      fill.style.transform = `scaleY(${f.toFixed(4)})`;
      let idx = -1;
      nodes.forEach((n, i) => {
        const b = n.getBoundingClientRect();
        if (b.top + b.height / 2 <= probe + 1) idx = i;
      });
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const ro = new ResizeObserver(onScroll);
    ro.observe(list);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return { listRef, fillRef, active };
}

export default function Process({ lang }: { lang: Lang }) {
  const { listRef, fillRef, active } = useScrollTimeline(PROCESS_STEPS.length);
  const shown = PROCESS_STEPS[Math.max(0, active)];

  return (
    <section id="process" aria-labelledby="process-title" className="mael-section">
      <SectionHeader header={SECTIONS.process} lang={lang} id="process-title" accent="#38BDF8" />

      <div className="pt">
        <div className="pt__timeline">
          <div className="pt__track" aria-hidden="true">
            <div ref={fillRef} className="pt__fill" />
          </div>
          <ol ref={listRef} className="pt__list">
            {PROCESS_STEPS.map((step, i) => {
              const state = active === -1 ? undefined : i === active ? "active" : i < active ? "done" : "next";
              return (
                <li key={step.n} className="pt-step" data-state={state} style={{ ["--accent" as string]: step.accent }}>
                  <span className="pt-node process-icon" aria-hidden="true" style={{ border: `1px solid ${step.accent}80`, color: step.accent }}>
                    <span className="process-icon__glyph">{step.icon}</span>
                  </span>
                  <div className="pt-step__body">
                    <h3 className="process-title">
                      <span className="process-n" style={{ color: step.accent }}>
                        {step.n}
                      </span>
                      {step.title}
                    </h3>
                    <p className="process-body">{step.body[lang]}</p>
                    <ul className="process-tags">
                      {step.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    {/* Phones: this step's micro-diagram inline, built once the line reaches the step. */}
                    <div className="pt-step__micro">
                      <ArchitectureDiagram topology={step.micro} accent={step.accent} size="sm" pulses={false} play={i <= active} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Desktop: the active step's micro-diagram, rebuilt each time the step changes. */}
        <div className="pt__stage" aria-hidden="true">
          <div className="pt__stage-inner" style={{ ["--accent" as string]: shown.accent }}>
            <p className="pt__stage-label">
              <span style={{ color: shown.accent }}>{shown.n}</span> / {shown.title.toUpperCase()}
            </p>
            <ArchitectureDiagram topology={shown.micro} accent={shown.accent} playKey={shown.n} pulses={false} play={active >= 0} />
            <p className="pt__stage-tags">{shown.tags.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
