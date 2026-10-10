import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { SkillGlyph } from "@/lib/skillIcons";
import { picture } from "@/lib/projectImages";
import CometCard from "../aceternity/CometCard";

// Small building blocks shared by the home page sections. Styles live in
// src/styles/v2.css under the same class names.

/** A project screenshot as <picture>: AVIF, then WebP, sized by `sizes`. Lazy unless `priority`. */
export function ProjectImage({
  project,
  name,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  project: string;
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const p = picture(project, name);
  if (!p) return null;
  return (
    <picture className={`pimg ${className}`}>
      <source type="image/avif" srcSet={p.avif} sizes={sizes} />
      <source type="image/webp" srcSet={p.webp} sizes={sizes} />
      <img
        src={p.src}
        alt={alt}
        width={p.width}
        height={p.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchpriority: "high" } : {})}
      />
    </picture>
  );
}

/** A browser window around a screenshot or UI fragment. */
export function BrowserMockup({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`bm ${className}`}>
      <div className="bm__bar" aria-hidden="true">
        <span className="bm__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="bm__url">{url}</span>
      </div>
      <div className="bm__body">{children}</div>
    </div>
  );
}

/** A phone around a mobile screenshot. */
export function DeviceMockup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <span className="phone__notch" aria-hidden="true" />
      <div className="phone__screen">{children}</div>
    </div>
  );
}

/**
 * Text split into words, each in its own mask, for the word-by-word reveal
 * (data-reveal="words" on an ancestor; see src/styles/motion.css). The real
 * spaces stay between the masks, so the sentence is still one piece of text
 * for screen readers, search engines and copy-paste. `highlight` marks the
 * trailing words that get their own, later beat (the hero's "real problems").
 */
export function SplitWords({ text, highlight, offset = 0 }: { text: string; highlight?: string; offset?: number }) {
  const hl = highlight && text.endsWith(highlight) ? highlight : "";
  const lead = hl ? text.slice(0, -hl.length).trimEnd() : text;
  const words = (t: string, from: number) =>
    t.split(/\s+/).filter(Boolean).map((w, i) => (
      <Fragment key={`${from + i}-${w}`}>
        <span className="sw">
          <span className="sw__i" style={{ ["--w" as string]: from + i + offset } as CSSProperties}>
            {w}
          </span>
        </span>{" "}
      </Fragment>
    ));
  const leadWords = lead.split(/\s+/).filter(Boolean).length;
  return (
    <>
      {words(lead, 0)}
      {hl && <span className="sw-hl">{words(hl, leadWords)}</span>}
    </>
  );
}

/** Section heading: optional mono label, display title (revealed word by word), short intro. */
export function SectionHeader({ id, eyebrow, title, intro, align = "start" }: { id: string; eyebrow?: string; title: string; intro?: string; align?: "start" | "center" }) {
  return (
    <header className={`sh sh--${align}`} data-reveal="words">
      {eyebrow && <p className="sh__eyebrow">{eyebrow}</p>}
      <h2 className="h2" id={id}>
        <SplitWords text={title} />
      </h2>
      {intro && <p className="lede">{intro}</p>}
    </header>
  );
}

/** A technology with its mark. */
export function TechChip({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  return (
    <span className={`tchip tchip--${size}`}>
      <SkillGlyph name={name} size={size === "sm" ? 13 : 15} />
      {name}
    </span>
  );
}

/**
 * Call to action. `moving` adds Aceternity's Moving Border: a short light that
 * travels the outline (CSS only, off under reduced motion).
 */
export function CTAButton({
  href,
  children,
  variant = "solid",
  moving = false,
  magnetic = false,
  arrow = "→",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "line";
  moving?: boolean;
  /** Leans a few px toward the pointer (mouse only; motion system). */
  magnetic?: boolean;
  arrow?: string | null;
  className?: string;
} & Record<`data-${string}`, string> & { target?: string; rel?: string; download?: string }) {
  const dir = arrow === "↓" ? "down" : arrow === "↗" ? "out" : "right";
  return (
    <a href={href} className={`btn btn--${variant}${moving ? " btn--moving" : ""} ${className}`} data-magnetic={magnetic ? "" : undefined} {...rest}>
      {moving && <span className="btn__orbit" aria-hidden="true" />}
      <span className="btn__label">{children}</span>
      {arrow && (
        <span className="btn__arrow" data-dir={dir} aria-hidden="true">
          {arrow}
        </span>
      )}
    </a>
  );
}

/**
 * A card with the About photo's Comet Card effect (turns and drifts toward
 * the pointer, lifts, catches a light). `className` goes on the card itself;
 * `max` is the strongest turn in degrees, and the drift and lift scale with
 * it so larger cards move less. Fine pointers only, still under reduced motion.
 */
export function TiltCard({
  children,
  className = "",
  wrapClassName = "",
  max = 10,
  as,
  style,
}: {
  children: ReactNode;
  className?: string;
  wrapClassName?: string;
  max?: number;
  as?: "div" | "li";
  style?: CSSProperties;
}) {
  return (
    <CometCard as={as} className={wrapClassName} cardClassName={className} rotateDepth={max} translateDepth={max} lift={1 + max / 280} style={style}>
      {children}
    </CometCard>
  );
}

/** Whether an element is on screen; looping effects pause when it isn't. */
export function useVisible<T extends Element>(ref: React.RefObject<T>, rootMargin = "0px") {
  const flag = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      flag.current = e.isIntersecting;
      el.toggleAttribute("data-visible", e.isIntersecting);
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return flag;
}
