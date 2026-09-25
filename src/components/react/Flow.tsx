import type { CSSProperties } from "react";

/**
 * A process/architecture flow: nodes joined by connectors that a small pulse
 * travels along (CSS only, off under reduced motion — see `.flow` in
 * global.css). `vertical` always stacks; `responsive` runs left-to-right on
 * wide screens and turns vertical on phones instead of shrinking.
 * It's an ordered list, so screen readers get the sequence for free.
 */
export default function Flow({
  items,
  accent = "#8B5CF6",
  orientation = "vertical",
  label,
  highlight,
}: {
  items: string[];
  accent?: string;
  orientation?: "vertical" | "responsive";
  label?: string;
  /** Index of the node to emphasize (e.g. where the business logic lives). */
  highlight?: number;
}) {
  return (
    <ol className={`flow flow--${orientation}`} aria-label={label} style={{ "--flow-accent": accent } as CSSProperties}>
      {items.map((item, i) => (
        <li key={item} className="flow__node" data-highlight={highlight === i ? "" : undefined} style={{ "--i": i } as CSSProperties}>
          {item}
        </li>
      ))}
    </ol>
  );
}
