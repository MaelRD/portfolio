import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { SkillGlyph } from "@/lib/skillIcons";
import { picture } from "@/lib/projectImages";

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

/** Section heading: optional mono label, display title, short intro. */
export function SectionHeader({ id, eyebrow, title, intro, align = "start" }: { id: string; eyebrow?: string; title: string; intro?: string; align?: "start" | "center" }) {
  return (
    <header className={`sh sh--${align}`}>
      {eyebrow && <p className="sh__eyebrow">{eyebrow}</p>}
      <h2 className="h2" id={id}>
        {title}
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
  arrow = "→",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "line";
  moving?: boolean;
  arrow?: string | null;
  className?: string;
} & Record<`data-${string}`, string> & { target?: string; rel?: string; download?: string }) {
  return (
    <a href={href} className={`btn btn--${variant}${moving ? " btn--moving" : ""} ${className}`} {...rest}>
      {moving && <span className="btn__orbit" aria-hidden="true" />}
      <span className="btn__label">{children}</span>
      {arrow && <span aria-hidden="true">{arrow}</span>}
    </a>
  );
}

/**
 * Aceternity's 3D Card Effect, reduced: the card leans at most `max` degrees
 * toward the pointer. Fine pointers only, still under reduced motion; on
 * touch screens it is a plain card (pressed state comes from CSS).
 */
export function TiltCard({ children, className = "", max = 4, style }: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    let ok = false;
    try {
      ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    if (!el || !ok) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.setAttribute("data-tilting", "");
        el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      // Back to no transform once it has settled, so the content renders crisp at rest.
      window.setTimeout(() => el.style.getPropertyValue("--rx") === "0deg" && el.removeAttribute("data-tilting"), 520);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);
  return (
    <div ref={ref} className={`tilt ${className}`} style={style}>
      {children}
    </div>
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
