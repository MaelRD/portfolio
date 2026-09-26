import { useEffect, useRef, useState } from "react";
import { META } from "../../../data/content";
import { UI_TEXT } from "../../../data/space";
import { useLang } from "../hooks";
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
import "../../../styles/space.css";

const SECTION_IDS = ["hero", "work", "process", "system", "about", "stack", "experience", "contact"];

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

export default function SpaceApp() {
  const [lang, setLang] = useLang(META.description);
  const active = useActiveSection();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  useSpaceEngine(rootRef, canvasRef, pathRef);

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
        <Work lang={lang} />
        <Process lang={lang} pathRef={pathRef} />
        <System lang={lang} />
        <About lang={lang} />
        <Stack lang={lang} />
        <Experience lang={lang} />
        <Contact lang={lang} />
      </main>
    </div>
  );
}
