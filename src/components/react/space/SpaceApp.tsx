import { useEffect, useRef, useState, type RefObject } from "react";
import { META } from "../../../data/content";
import { UI_TEXT } from "../../../data/space";
import { useLang } from "@/lib/lang";
import { listenForTrackedClicks } from "@/lib/analytics";
import type { Project } from "@/lib/projects";
import { useSpaceEngine } from "./engine";
import SpaceNav from "./SpaceNav";
import Hero from "./Hero";
import Process from "./Process";
import Footer from "./Footer";
import { Planet, SURFACES } from "./ui";
import FloatingDock from "../../sections/FloatingDock";
import QuickStats from "../../sections/QuickStats";
import AudienceSelector from "../../sections/AudienceSelector";
import FeaturedProjects from "../../sections/FeaturedProjects";
import ProjectGallery from "../../sections/ProjectGallery";
import ServicesBento from "../../sections/ServicesBento";
import SolutionMarquee from "../../sections/SolutionMarquee";
import BeforeAfter from "../../sections/BeforeAfter";
import ProjectConfigurator from "../../sections/ProjectConfigurator";
import SystemArchitecture from "../../sections/SystemArchitecture";
import TechStack from "../../sections/TechStack";
import Experience from "../../sections/Experience";
import About from "../../sections/About";
import ContactCTA from "../../sections/ContactCTA";
import ContactForm from "../../sections/ContactForm";
import "../../../styles/space.css";
import "../../../styles/v2.css";

const SECTION_IDS = ["hero", "audience", "work", "interfaces", "solutions", "build", "before-after", "configurator", "process", "system", "stack", "experience", "about", "cta", "contact"];

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
        <QuickStats lang={lang} projects={projects.length} />
        <AudienceSelector lang={lang} />
        <FeaturedProjects projects={projects} lang={lang} />
        <ProjectGallery lang={lang} />
        <ServicesBento lang={lang} />
        <SolutionMarquee lang={lang} />
        <BeforeAfter lang={lang} />
        <ProjectConfigurator lang={lang} />
        <Process lang={lang} pathRef={pathRef} />
        <SystemArchitecture lang={lang} />
        <TechStack lang={lang} />
        <Experience lang={lang} />
        <About lang={lang} />
        <ContactCTA lang={lang} />
        <ContactForm lang={lang} />
      </main>

      <div className="contact__horizon">
        <Planet className="contact__world" surface={SURFACES.horizon} speed={5} />
        <Footer lang={lang} />
      </div>
      <FloatingDock lang={lang} active={active} label={UI_TEXT.nav[lang]} />
    </div>
  );
}
