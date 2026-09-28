import { useLayoutEffect, useState, type RefObject } from "react";

// The wires of a DataFlow: one curve from every node of a stage to every node
// of the next, measured from the rendered layout so they follow the diagram
// whether it runs left-to-right or top-to-bottom. Each wire draws itself once
// when the diagram enters the viewport, then a single pulse travels it — data
// moving through the system, in stage order. Pointing at a node lights the
// wires attached to it.
//
// A multi-node stage that wraps onto several rows (a group on a phone) is
// wired from its frame instead of from each node, so no wire crosses a box.

export interface Wire {
  d: string;
  /** Arrowhead polygons (end, and start for two-way links). */
  heads: string[];
  from: string;
  to: string;
  /** Stage index of the source: sets the draw order. */
  step: number;
}

type Box = { l: number; r: number; t: number; b: number; cx: number; cy: number };

const box = (el: Element, o: DOMRect): Box => {
  const r = el.getBoundingClientRect();
  const l = r.left - o.left;
  const t = r.top - o.top;
  return { l, r: l + r.width, t, b: t + r.height, cx: l + r.width / 2, cy: t + r.height / 2 };
};

/** A small arrowhead at (x, y) pointing along the angle `a`. */
const head = (x: number, y: number, a: number) => {
  const s = 5;
  const p = (dx: number, dy: number) => `${(x + dx * Math.cos(a) - dy * Math.sin(a)).toFixed(1)},${(y + dx * Math.sin(a) + dy * Math.cos(a)).toFixed(1)}`;
  return `${p(0, 0)} ${p(-s * 1.4, -s * 0.8)} ${p(-s * 1.4, s * 0.8)}`;
};

export function useWires(trackRef: RefObject<HTMLElement>, twoWay: boolean[], deps: unknown[]) {
  const [wires, setWires] = useState<Wire[]>([]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const o = track.getBoundingClientRect();
      const row = getComputedStyle(track).flexDirection === "row";
      const stages = Array.from(track.querySelectorAll<HTMLElement>(":scope > .df__stage"));
      // Anchor boxes per stage: each node, or the whole frame if the group wraps.
      const anchors = stages.map((st, i) => {
        const nodes = Array.from(st.querySelectorAll<HTMLElement>(".df__node"));
        const tops = new Set(nodes.map((n) => Math.round(n.getBoundingClientRect().top)));
        const wrapped = !row && tops.size > 1;
        return wrapped ? [{ id: `${i}`, b: box(st, o) }] : nodes.map((n, j) => ({ id: `${i}-${j}`, b: box(n, o) }));
      });

      const out: Wire[] = [];
      for (let i = 0; i < anchors.length - 1; i++) {
        for (const a of anchors[i]) {
          for (const z of anchors[i + 1]) {
            let sx, sy, ex, ey, c1x, c1y, c2x, c2y, ang;
            if (row) {
              sx = a.b.r; sy = a.b.cy; ex = z.b.l; ey = z.b.cy;
              const k = (ex - sx) / 2;
              c1x = sx + k; c1y = sy; c2x = ex - k; c2y = ey;
              ang = 0;
            } else {
              sx = a.b.cx; sy = a.b.b; ex = z.b.cx; ey = z.b.t;
              const k = (ey - sy) / 2;
              c1x = sx; c1y = sy + k; c2x = ex; c2y = ey - k;
              ang = Math.PI / 2;
            }
            const heads = [head(ex, ey, ang)];
            if (twoWay[i]) heads.push(head(sx, sy, ang + Math.PI));
            out.push({
              d: `M${sx.toFixed(1)} ${sy.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)},${c2x.toFixed(1)} ${c2y.toFixed(1)},${ex.toFixed(1)} ${ey.toFixed(1)}`,
              heads,
              from: a.id,
              to: z.id,
              step: i,
            });
          }
        }
      }
      setWires(out);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    track.querySelectorAll(".df__node").forEach((n) => ro.observe(n));
    // Web fonts change node widths after first paint.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return wires;
}

/** Wires touching a node (by "stage-index" id, or a whole wrapped stage by "stage"). */
export const touches = (w: Wire, hot: string | null) =>
  !!hot && [w.from, w.to].some((id) => id === hot || hot.startsWith(`${id}-`) || id.startsWith(`${hot}-`));
