import { createRef, useRef, useState, type CSSProperties, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import type { Bi, Lang } from "../../../data/content";

/** The light crosses the diagram in BEAM_SWEEP seconds, once every BEAM_CYCLE seconds.
 *  It moves at a steady pace so the eye can follow the data travelling. */
const BEAM_CYCLE = 5.5;
const BEAM_SWEEP = 4;

export interface ArchGraph {
  cols: { id: string; l: Bi; s?: Bi; tone?: string }[][];
  edges: [string, string][];
}

// A project's architecture as columns of nodes joined by Magic UI animated
// beams. Every beam shares one sweep across the diagram's width, so the light
// reaches the left columns first and reads as data flowing left to right.
// When a project is shown its nodes arrive column by column (CSS, keyed on
// --col) and the light only starts once they're in place; pointing at a node
// brightens the beams attached to it.

export default function BeamDiagram({ graph, lang, label }: { graph: ArchGraph; lang: Lang; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, RefObject<HTMLDivElement>>>({});
  const ref = (id: string) => (refs.current[id] ??= createRef<HTMLDivElement>());
  const still = useReducedMotion();
  const [hot, setHot] = useState<string | null>(null);
  // An area node lights its own beams in its color.
  const tones: Record<string, string> = {};
  for (const col of graph.cols) for (const n of col) if (n.tone) tones[n.id] = n.tone;
  // Let the nodes land before the first sweep.
  const lead = still ? 0 : 0.2 + graph.cols.length * 0.08;

  return (
    <div
      ref={containerRef}
      className="beams"
      style={{ ["--cols" as string]: graph.cols.length }}
      role="group"
      aria-label={label}
      onPointerLeave={() => setHot(null)}
    >
      {graph.cols.map((col, i) => (
        <div key={i} className="beams__col" style={{ ["--col" as string]: i } as CSSProperties}>
          {col.map((n) => (
            <div
              key={n.id}
              ref={ref(n.id)}
              className="beam-node"
              data-tone={n.tone ? "" : undefined}
              style={n.tone ? ({ ["--tone" as string]: n.tone } as CSSProperties) : undefined}
              data-hot={hot === n.id ? "" : undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHot(n.id)}
            >
              <strong>{n.l[lang]}</strong>
              {n.s && <span>{n.s[lang]}</span>}
            </div>
          ))}
        </div>
      ))}
      {graph.edges.map(([from, to]) => {
        const tone = tones[from] ?? tones[to];
        return (
          <AnimatedBeam
            key={`${from}-${to}`}
            className={hot && (hot === from || hot === to) ? "beam--hot" : undefined}
            containerRef={containerRef}
            fromRef={ref(from)}
            toRef={ref(to)}
            pathColor={tone ?? "#A78BFA"}
            pathOpacity={0.22}
            pathWidth={1.5}
            gradientStartColor={tone ?? "#7DE3FF"}
            gradientStopColor={tone ?? "#A78BFA"}
            delay={lead}
            duration={still ? 0 : BEAM_SWEEP}
            ease="linear"
            repeat={still ? 0 : Infinity}
            repeatDelay={BEAM_CYCLE - BEAM_SWEEP}
          />
        );
      })}
    </div>
  );
}
