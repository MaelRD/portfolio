import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/data/content";
import { CAREER_START, STATS_TEXT as T } from "@/data/v2";

// A ruled row of four facts on the sky (no cards): years of experience,
// projects, stack and place. The numbers count up once when the row comes
// into view; the final value is what's rendered on the server and for
// reduced motion, so nothing depends on the animation.

/** Years since the first professional role, rounded down to the half year. */
function careerYears(now = new Date()) {
  const months = (now.getFullYear() - CAREER_START.getFullYear()) * 12 + now.getMonth() - CAREER_START.getMonth();
  return Math.floor(months / 6) / 2;
}

function CountUp({ to, decimals = 0, lang }: { to: number; decimals?: number; lang: Lang }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    if (!el || reduce || !("IntersectionObserver" in window)) return;
    // Already on screen at load: keep the final value instead of flashing back to zero.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / 1100);
          setValue(to * (1 - Math.pow(1 - k, 3)));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <span ref={ref}>{value.toLocaleString(lang === "es" ? "es-MX" : "en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
}

export default function QuickStats({ lang, projects }: { lang: Lang; projects: number }) {
  const years = careerYears();
  return (
    <section className="stats" aria-label={T.label[lang]}>
      <dl className="stats__row wrap">
        <div className="stat">
          <dt className="stat__label">{T.years[lang]}</dt>
          <dd className="stat__value">
            +<CountUp to={years} decimals={years % 1 ? 1 : 0} lang={lang} />
          </dd>
        </div>
        <div className="stat">
          <dt className="stat__label">{T.projects[lang]}</dt>
          <dd className="stat__value">
            <CountUp to={projects} lang={lang} />
          </dd>
        </div>
        <div className="stat">
          <dt className="stat__label">{T.stackSub[lang]}</dt>
          <dd className="stat__value stat__value--text">{T.stack[lang]}</dd>
        </div>
        <div className="stat">
          <dt className="stat__label">{T.placeSub[lang]}</dt>
          <dd className="stat__value stat__value--text">{T.place[lang]}</dd>
        </div>
      </dl>
    </section>
  );
}
