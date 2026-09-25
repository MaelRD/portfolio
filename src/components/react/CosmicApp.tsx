import { useEffect, useState } from "react";
import { META, SECTIONS } from "../../data/content";
import Cursor from "./Cursor";
import ScrollProgress, { type ProgressSection } from "./ScrollProgress";
import { useLang } from "./hooks";
import Header from "./Header";
import Hero from "./Hero";
import Projects from "./Projects";
import Process from "./Process";
import FeaturedCaseStudy from "./FeaturedCaseStudy";
import SystemThinking from "./SystemThinking";
import About from "./About";
import Stack from "./Stack";
import Experience from "./Experience";
import { Direction, Education } from "./Growth";
import Contact, { Footer } from "./ContactFooter";

// Page story: who → what I've built → how I build → a project in depth →
// how I think about systems → who I am → what I use → where I've worked →
// where I'm heading → contact. Sections without their own nav entry report
// as the closest one.
const SECTION_IDS = ["hero", "work", "process", "case-study", "system", "about", "stack", "experience", "education", "direction", "contact"];
const NAV_ALIAS: Record<string, string> = {
  "case-study": "work",
  system: "process",
  education: "experience",
  direction: "experience",
};

// Coordinates shown on the page spine: every section with its number and label.
const SPINE: ProgressSection[] = (
  [
    ["work", SECTIONS.work],
    ["process", SECTIONS.process],
    ["case-study", SECTIONS.caseStudy],
    ["system", SECTIONS.system],
    ["about", SECTIONS.about],
    ["stack", SECTIONS.stack],
    ["experience", SECTIONS.experience],
    ["education", SECTIONS.education],
    ["direction", SECTIONS.direction],
    ["contact", SECTIONS.contact],
  ] as const
).map(([id, h]) => ({ id, index: h.index, label: h.eyebrow }));

export default function CosmicApp() {
  const [lang, setLang] = useLang(META.description);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(NAV_ALIAS[entry.target.id] ?? entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // The contact section is short and sits at the very bottom, so it may
    // never cross the observer band — mark it active once the page bottoms out.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Header lang={lang} setLang={setLang} active={active} />
      <ScrollProgress sections={SPINE} />
      <Cursor />
      <main id="main" tabIndex={-1} style={{ position: "relative", zIndex: 10 }}>
        <Hero lang={lang} />
        <Projects lang={lang} />
        <Process lang={lang} />
        <FeaturedCaseStudy lang={lang} />
        <SystemThinking lang={lang} />
        <About lang={lang} />
        <Stack lang={lang} />
        <Experience lang={lang} />
        <Education lang={lang} />
        <Direction lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
