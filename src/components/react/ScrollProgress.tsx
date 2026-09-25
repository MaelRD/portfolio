import { useEffect, useRef, useState } from "react";

export interface ProgressSection {
  id: string;
  index: string;
  label: string;
}

/**
 * The page's spine: a hairline that fills as you scroll, with each section's
 * coordinate (01…10) marked where the section starts and the current one
 * named. Desktop: vertical line on the left edge. Phones: 2px line under the
 * header. Decorative for assistive tech (the nav already says where you are).
 */
export default function ScrollProgress({ sections }: { sections: ProgressSection[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<number[]>([]);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let starts: number[] = [];

    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      starts = sections.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      // A mark sits exactly where the fill will be when its section becomes current.
      setMarks(starts.map((y) => Math.max(0, Math.min(1, (y - window.innerHeight * 0.4) / max))));
    };
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--p", (window.scrollY / max).toFixed(4));
      const probe = window.scrollY + window.innerHeight * 0.4;
      let idx = -1;
      starts.forEach((y, i) => {
        if (probe >= y) idx = i;
      });
      setCurrent(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const cur = sections[current];
  return (
    <div ref={rootRef} className="spine" aria-hidden="true">
      <div className="spine__track">
        <div className="spine__fill" />
        {marks.map((m, i) => (
          <span key={sections[i].id} className="spine__mark" data-on={i <= current ? "" : undefined} style={{ top: `${m * 100}%` }}>
            {sections[i].index}
          </span>
        ))}
      </div>
      <div className="spine__label">{cur ? `${cur.index} · ${cur.label}` : "00 · INIT"}</div>
    </div>
  );
}
