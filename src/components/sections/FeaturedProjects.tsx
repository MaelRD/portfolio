import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { tx, type Lang } from "@/data/content";
import { HEADS } from "@/data/space";
import { WORK_TEXT as T } from "@/data/v2";
import { caseStudyPath, type Project } from "@/lib/projects";
import ProjectMock from "../react/space/ProjectMock";
import { BrowserMockup, CTAButton, DeviceMockup, ProjectImage, SectionHeader, TechChip, TiltCard } from "../kit";

// Four projects, each large and shown its own way (project data `showcase`):
// - laptop:   the screen opens as the project scrolls into view (after
//             Aceternity's Macbook Scroll), with the phone version over it.
// - tilt:     a browser window that leans toward the pointer (3D Card
//             Effect on the mockup only).
// - pipeline: the interface schematic plus the few steps the data takes.
// - tool:     the interface schematic of a technical tool.
// Text, status, stack and call to action come from src/content/projects.

const host = (url?: string) => (url ? new URL(url).host : undefined);

function href(p: Project) {
  return p.caseStudy ? caseStudyPath(p.slug) : (p.links.live ?? caseStudyPath(p.slug));
}

/** Wide screens only: on phones the scroll-linked 3D is left out. */
function useWide(min = 768) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${min}px)`);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [min]);
  return wide;
}

/** The laptop: the lid starts tilted back and stands up as the section scrolls in. */
function Laptop({ p, lang }: { p: Project; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  // Both hooks always run (no short-circuit), so their order never changes.
  const reduce = useReducedMotion();
  const wide = useWide();
  const still = reduce || !wide;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const [main, phone] = [p.images[0], p.images.find((i) => i.name === "mobile")];
  return (
    <div ref={ref} className="laptop">
      <motion.div className="laptop__lid" style={still ? undefined : { rotateX: rotate, scale }}>
        <div className="laptop__screen">
          {main && <ProjectImage project={p.assets!} name={main.name} alt={main.alt[lang]} sizes="(min-width: 1024px) 640px, 92vw" />}
        </div>
      </motion.div>
      <div className="laptop__base" aria-hidden="true">
        <span className="laptop__notch" />
      </div>
      {phone && (
        <DeviceMockup className="laptop__phone">
          <ProjectImage project={p.assets!} name={phone.name} alt={phone.alt[lang]} sizes="180px" />
        </DeviceMockup>
      )}
    </div>
  );
}

function Window({ p, lang }: { p: Project; lang: Lang }) {
  const main = p.images[0];
  return (
    <BrowserMockup url={host(p.links.live) ?? p.slug}>
      {main && p.assets ? (
        <ProjectImage project={p.assets} name={main.name} alt={main.alt[lang]} sizes="(min-width: 1024px) 680px, 92vw" />
      ) : (
        <>
          <span className="sr-only">{`${T.schematic[lang]}: ${p.title}`}</span>
          <ProjectMock slug={p.slug} lang={lang} />
        </>
      )}
    </BrowserMockup>
  );
}

function Visual({ p, lang }: { p: Project; lang: Lang }) {
  switch (p.showcase) {
    case "laptop":
      return <Laptop p={p} lang={lang} />;
    case "tilt":
      return (
        <TiltCard className="showcase__tilt" max={6}>
          <Window p={p} lang={lang} />
        </TiltCard>
      );
    case "pipeline":
      return (
        <div className="showcase__stack">
          <Window p={p} lang={lang} />
          {p.pipeline && (
            <ol className="pipe" aria-label={p.pipeline.map((s) => tx(s, lang)).join(" → ")}>
              {p.pipeline.map((s, i) => (
                <li key={i} className="pipe__node" data-accent={i === 1 ? "" : undefined} style={{ ["--k" as string]: i } as CSSProperties}>
                  {tx(s, lang)}
                </li>
              ))}
            </ol>
          )}
        </div>
      );
    default:
      return <Window p={p} lang={lang} />;
  }
}

function ProjectShowcase({ p, lang, flip }: { p: Project; lang: Lang; flip: boolean }) {
  const external = !p.caseStudy && !!p.links.live;
  const titleId = `project-${p.slug}`;
  return (
    <article className="showcase" data-flip={flip ? "" : undefined} data-kind={p.showcase} aria-labelledby={titleId}>
      <div className="showcase__visual">
        {!p.images.length && <p className="showcase__note">{T.schematic[lang]}</p>}
        <Visual p={p} lang={lang} />
      </div>
      <div className="showcase__copy">
        <p className="showcase__kicker">{p.category[lang]}</p>
        <h3 className="showcase__title" id={titleId}>
          {p.title}
        </h3>
        <p className="showcase__tagline">{p.subtitle[lang]}</p>
        <dl className="showcase__facts">
          <div>
            <dt>{T.problem[lang]}</dt>
            <dd>{p.problem[lang]}</dd>
          </div>
          <div>
            <dt>{T.solution[lang]}</dt>
            <dd>{p.solution[lang]}</dd>
          </div>
        </dl>
        <ul className="showcase__stack-list" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s}>
              <TechChip name={s} size="sm" />
            </li>
          ))}
        </ul>
        <div className="showcase__foot">
          <p className="showcase__status">
            <span className="showcase__dot" aria-hidden="true" />
            {p.statusPrefix ? `${tx(p.statusPrefix, lang)} · ` : ""}
            {p.status[lang]}
          </p>
          <CTAButton
            href={href(p)}
            variant="line"
            arrow="↗"
            data-track="View Project"
            data-track-label={p.slug}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {p.links.cta[lang]}
          </CTAButton>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProjects({ projects, lang }: { projects: Project[]; lang: Lang }) {
  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="wrap stack-48">
        <SectionHeader id="work-title" eyebrow={HEADS.work.eyebrow[lang]} title={T.title[lang]} intro={T.intro[lang]} />
        <div className="showcases">
          {projects.map((p, i) => (
            <ProjectShowcase key={p.slug} p={p} lang={lang} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
