import { Fragment, useRef, useState, type CSSProperties } from "react";
import { tx, type Bi, type Lang, type Text } from "@/data/content";
import { useEntrance, useOnScreen } from "@/lib/motion";
import { touches, useWires } from "./Connectors";

// A flow of stages joined by wires: the building block for project diagrams,
// workflows, architectures and rule chains. A stage with several nodes is
// framed as one group (they converge or fan out together).
//
// direction "responsive" lays the flow out left-to-right when its container is
// wide enough and top-to-bottom otherwise (a container query, so the same
// diagram adapts to a card, a column or a phone). The wires are measured from
// that layout (Connectors.tsx), so they follow whichever one is showing.
//
// The visual is aria-hidden: the caption carries the same information as one
// sentence for screen readers.

export interface FlowNode {
  label: Text;
  sub?: Text;
  accent?: boolean;
}

export interface Flow {
  stages: FlowNode[][];
  links?: ("one" | "two")[];
  direction?: "horizontal" | "vertical" | "responsive";
  label: Bi;
}

export default function DataFlow({
  flow,
  lang,
  size = "md",
  stageLabels,
  caption,
  className = "",
}: {
  flow: Flow;
  lang: Lang;
  size?: "sm" | "md";
  /** Optional small title over a stage (e.g. the inputs group of a rule chain). */
  stageLabels?: (Text | undefined)[];
  /** Visible caption under the diagram; the screen-reader caption is always there. */
  caption?: Bi;
  className?: string;
}) {
  const [ref, state] = useEntrance<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState<string | null>(null);
  // The pulse repeats every few seconds, only while the diagram is visible.
  const visible = useOnScreen(ref);
  const twoWay = flow.stages.slice(1).map((_, i) => flow.links?.[i] === "two");
  // Re-measure when the text changes width (language switch).
  const wires = useWires(trackRef, twoWay, [lang, flow.label.en, flow.stages.length]);
  const stages = flow.stages.length;

  return (
    <figure ref={ref} className={`df df--${size} ${className}`} data-dir={flow.direction ?? "responsive"} data-len={stages} data-state={state} data-visible={visible ? "" : undefined}>
      <div ref={trackRef} className="df__track" aria-hidden="true" onPointerLeave={() => setHot(null)}>
        <svg className="df__wires" width="100%" height="100%">
          {wires.map((w, k) => (
            <g key={k} className="df__wire" data-hot={touches(w, hot) ? "" : undefined} style={{ ["--d" as string]: w.step } as CSSProperties}>
              <path className="df__line" d={w.d} pathLength={1} />
              <path className="df__pulse" d={w.d} pathLength={1} />
              {w.heads.map((h) => (
                <polygon key={h} className="df__head" points={h} />
              ))}
            </g>
          ))}
        </svg>
        {flow.stages.map((stage, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="df__link" />}
            <div className={`df__stage${stage.length > 1 ? " df__stage--group" : ""}`} style={{ ["--i" as string]: i } as CSSProperties}>
              {stageLabels?.[i] && <span className="df__group-label">{tx(stageLabels[i]!, lang)}</span>}
              {stage.map((n, j) => (
                <span
                  key={j}
                  className="df__node"
                  data-accent={n.accent ? "" : undefined}
                  data-hot={hot === `${i}-${j}` ? "" : undefined}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHot(`${i}-${j}`)}
                >
                  <span className="df__label">{tx(n.label, lang)}</span>
                  {n.sub && <span className="df__sub">{tx(n.sub, lang)}</span>}
                </span>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
      <figcaption className={caption ? "df__caption" : "sr-only"}>{(caption ?? flow.label)[lang]}</figcaption>
      {caption && <span className="sr-only">{flow.label[lang]}</span>}
    </figure>
  );
}
