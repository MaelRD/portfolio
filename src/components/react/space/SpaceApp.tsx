import { useEffect, useRef, useState, type RefObject } from "react";
import { META } from "../../../data/content";
import { UI_TEXT } from "../../../data/space";
import { useLang } from "@/lib/lang";
import { listenForTrackedClicks } from "@/lib/analytics";
import type { Project } from "@/lib/projects";
import { useSpaceEngine } from "./engine";
import SpaceNav from "./SpaceNav";
import Hero from "./Hero";
import Work from "./Work";
import Process from "./Process";
import System from "./System";
import About from "./About";
import Stack from "./Stack";
import Experience from "./Experience";
import Contact from "./Contact";
import IntentSelector from "../../intent/IntentSelector";
import SolutionsGrid from "../../solutions/SolutionsGrid";
import FeaturedCaseStudy from "../../case-study/FeaturedCaseStudy";
import MidCta from "../../case-study/MidCta";
import ProblemsGrid from "../../problems/ProblemsGrid";
import "../../../styles/space.css";

const SECTION_IDS = ["hero", "intent", "problems", "work", "solutions", "process", "case-study", "system", "stack", "experience", "about", "contact"];

/**
 * Spotlight cards (after React Bits' SpotlightCard): any `.spotlight` element
 * gets a soft light that follows the pointer. One delegated listener feeds the
 * card under the cursor its --mouse-x/--mouse-y; the glow itself is CSS.
 * Mouse and trackpad only: touch has no hover to follow.
 */
function useSpotlight(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    let fine = false;
    try {
      fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    if (!root || !fine) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    return () => root.removeEventListener("pointermove", onMove);
  }, [rootRef]);
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const io = new IntersectionObserver(
      (entries) => {
        if (atBottom()) return setActive("contact");
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // Contact is short and last: it may never cross the band, so claim it at the bottom.
    const onScroll = () => {
      if (atBottom()) setActive("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

export default function SpaceApp({ projects }: { projects: Project[] }) {
  const [lang, setLang] = useLang(META.description);
  const active = useActiveSection();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  useSpaceEngine(rootRef, canvasRef, pathRef);
  useSpotlight(rootRef);
  useEffect(() => listenForTrackedClicks(), []);

  return (
    <div className="space" ref={rootRef}>
      <a href="#main" className="skip">
        {UI_TEXT.skip[lang]}
      </a>
      <div className="sky-nebula sky-nebula--violet" data-drift="0" aria-hidden="true" />
      <div className="sky-nebula sky-nebula--rose" data-drift="1" aria-hidden="true" />
      <div className="sky-nebula sky-nebula--cyan" data-drift="2" aria-hidden="true" />
      <canvas className="sky-stars" ref={canvasRef} aria-hidden="true" />

      <SpaceNav lang={lang} setLang={setLang} active={active} />

      <main id="main" tabIndex={-1}>
        <Hero lang={lang} />
        <IntentSelector lang={lang} />
        <ProblemsGrid lang={lang} />
        <Work projects={projects} lang={lang} />
        <SolutionsGrid lang={lang} />
        <Process lang={lang} pathRef={pathRef} />
        <FeaturedCaseStudy lang={lang} />
        <MidCta lang={lang} />
        <System lang={lang} />
        <Stack lang={lang} />
        <Experience lang={lang} />
        <About lang={lang} />
        <Contact lang={lang} />
      </main>
    </div>
  );
}
