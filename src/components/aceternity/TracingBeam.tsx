import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

// Aceternity's Tracing Beam: a hairline down the left of the content, lit
// from the top as the reader scrolls through it, with a dot riding its end.
// Under reduced motion the line is simply fully lit.

export default function TracingBeam({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.4 });
  const height = useTransform(progress, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`);
  return (
    <div ref={ref} className={`tbeam ${className}`}>
      <span className="tbeam__rail" aria-hidden="true">
        <motion.span className="tbeam__fill" style={{ height: still ? "100%" : height }} />
        <motion.span className="tbeam__dot" style={{ top: still ? "100%" : height }} />
      </span>
      <div className="tbeam__content">{children}</div>
    </div>
  );
}
