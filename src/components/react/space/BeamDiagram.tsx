import { createRef, useRef, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import type { ArchGraph, Lang } from "../../../data/space";

// A project's architecture as columns of nodes joined by Magic UI animated
// beams. Every beam shares one sweep across the diagram's width, so the light
// reaches the left columns first and reads as data flowing left to right.

export default function BeamDiagram({ graph, lang, label }: { graph: ArchGraph; lang: Lang; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, RefObject<HTMLDivElement>>>({});
  const ref = (id: string) => (refs.current[id] ??= createRef<HTMLDivElement>());
  const still = useReducedMotion();

  return (
    <div
      ref={containerRef}
      className="beams"
      style={{ ["--cols" as string]: graph.cols.length }}
      role="group"
      aria-label={label}
    >
      {graph.cols.map((col, i) => (
        <div key={i} className="beams__col">
          {col.map((n) => (
            <div key={n.id} ref={ref(n.id)} className="beam-node">
              <strong>{n.l[lang]}</strong>
              {n.s && <span>{n.s[lang]}</span>}
            </div>
          ))}
        </div>
      ))}
      {graph.edges.map(([from, to]) => (
        <AnimatedBeam
          key={`${from}-${to}`}
          containerRef={containerRef}
          fromRef={ref(from)}
          toRef={ref(to)}
          pathColor="#A78BFA"
          pathOpacity={0.22}
          pathWidth={1.5}
          gradientStartColor="#7DE3FF"
          gradientStopColor="#A78BFA"
          duration={still ? 0 : 3.4}
          repeat={still ? 0 : Infinity}
          repeatDelay={0.8}
        />
      ))}
    </div>
  );
}
