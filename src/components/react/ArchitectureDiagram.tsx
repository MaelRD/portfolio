import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { Topology } from "../../data/content";
import { MOTION, useArmed } from "./motion";

/**
 * Architecture topology that builds itself — the site's core visual
 * language ("connect" → "flow"):
 *   1. root nodes appear;
 *   2. each connection draws from its source (stroke-dashoffset);
 *   3. the target node appears the moment its line arrives;
 *   4. once built, small pulses travel the connections now and then.
 *
 * Lines live in an SVG whose viewBox matches the box in pixels (measured with
 * ResizeObserver), so strokes never distort; nodes are HTML for crisp text.
 * Changing `playKey` rebuilds the diagram (project switcher, process steps).
 * Server render / reduced motion: the finished diagram, no motion.
 */
export default function ArchitectureDiagram({
  topology,
  accent = "#8B5CF6",
  play = true,
  playKey,
  label,
  size = "md",
  pulses = true,
  highlight,
  interactive,
}: {
  topology: Topology;
  accent?: string;
  play?: boolean;
  playKey?: string | number;
  label?: string;
  size?: "sm" | "md";
  pulses?: boolean;
  /** Node id to emphasize. */
  highlight?: string;
  /**
   * Makes nodes selectable buttons (skill map): the selected node and its
   * connections light up, everything else dims.
   */
  interactive?: { activeId?: string; onSelect: (id: string) => void; controls?: string };
}) {
  const armed = useArmed();
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    // Measure right away (lines exist from the first frame), then track resizes.
    const r = el.getBoundingClientRect();
    setBox({ w: r.width, h: r.height });
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build order: each edge starts once its source node exists.
  const timeline = useMemo(() => {
    const appear: Record<string, number> = {};
    const targets = new Set(topology.edges.map(([, to]) => to));
    topology.nodes.forEach((n) => {
      if (!targets.has(n.id)) appear[n.id] = 0;
    });
    const edges = topology.edges.map(([from, to]) => {
      const start = (appear[from] ?? 0) + MOTION.fast / 2;
      const end = start + MOTION.draw;
      if (appear[to] === undefined || end < appear[to]) appear[to] = end;
      return { from, to, start };
    });
    const total = Math.max(0, ...Object.values(appear)) + MOTION.normal;
    return { appear, edges, total };
  }, [topology]);

  const pos = (id: string) => {
    const n = topology.nodes.find((x) => x.id === id)!;
    return { x: (n.x / 100) * box.w, y: (n.y / 100) * box.h };
  };

  const state = !armed ? "static" : play ? "play" : "wait";

  return (
    <div
      ref={boxRef}
      className={`arch arch--${size}`}
      data-state={state}
      role={interactive ? "group" : "img"}
      aria-label={label ?? topology.nodes.map((n) => n.label).join(" → ")}
      data-interactive={interactive ? "" : undefined}
      data-has-active={interactive?.activeId ? "" : undefined}
      style={{ aspectRatio: String(topology.aspect), "--arch-accent": accent } as CSSProperties}
    >
      {/* Keyed layer: a new playKey remounts it, which replays the build. */}
      <div key={playKey} className="arch__layer">
        {box.w > 0 && (
          <svg className="arch__lines" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true">
            {timeline.edges.map((e, i) => {
              const a = pos(e.from);
              const b = pos(e.to);
              return (
                <g key={i} data-on={interactive?.activeId && (e.from === interactive.activeId || e.to === interactive.activeId) ? "" : undefined}>
                  <line className="arch__track" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                  <line className="arch__line" x1={a.x} y1={a.y} x2={b.x} y2={b.y} pathLength={1} style={{ animationDelay: `${e.start}ms` } as CSSProperties} />
                  {pulses && (
                    <circle
                      className="arch__pulse"
                      r={2.5}
                      style={
                        {
                          "--x1": `${a.x}px`,
                          "--y1": `${a.y}px`,
                          "--x2": `${b.x}px`,
                          "--y2": `${b.y}px`,
                          animationDelay: `${timeline.total + i * 900}ms`,
                        } as CSSProperties
                      }
                    />
                  )}
                </g>
              );
            })}
          </svg>
        )}
        {topology.nodes.map((n) => {
          const style = { left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${timeline.appear[n.id] ?? 0}ms` } as CSSProperties;
          const content = (
            <>
              <span className="arch__label">{n.label}</span>
              {n.sub && <span className="arch__sub">{n.sub}</span>}
            </>
          );
          // Only nodes that have a target (not the hub) become buttons.
          if (interactive && topology.edges.some(([, to]) => to === n.id)) {
            const on = interactive.activeId === n.id;
            return (
              <button
                key={n.id}
                type="button"
                className="arch__node"
                data-active={on ? "" : undefined}
                aria-pressed={on}
                aria-controls={interactive.controls}
                data-cursor="node"
                style={style}
                onMouseEnter={() => interactive.onSelect(n.id)}
                onFocus={() => interactive.onSelect(n.id)}
                onClick={() => interactive.onSelect(n.id)}
              >
                {content}
              </button>
            );
          }
          return (
            <span key={n.id} className="arch__node" data-highlight={highlight === n.id ? "" : undefined} style={style}>
              {content}
            </span>
          );
        })}
      </div>
    </div>
  );
}
