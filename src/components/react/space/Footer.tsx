import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Copy, MessageCircle } from "lucide-react";
import { CONTACT, CV_FILENAME, CV_PATH, START_PATH } from "../../../data/content";
import { FOOTER, UI_TEXT, type Lang } from "../../../data/space";
import { scrollPageTo } from "@/lib/motion";

import { Planet, SURFACES } from "./ui";

// The footer, in three bands above the planetary horizon:
// 1. a contact strip: the closing question, copy-the-email (with feedback),
//    WhatsApp, and back to top;
// 2. the brand (Audiowide wordmark, role, availability, Mexico City time)
//    beside four link columns, which fold into accordions on phones so the
//    footer stays short there;
// 3. a bottom line: copyright and what the site is built with.
// Type: Audiowide for the wordmark, Oxanium for everything else here.

type FooterLink = { label: string; href: string; external?: boolean; download?: boolean };

/** Phones fold the link columns; from tablet up they are always open. */
function useWide(min = 641) {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${min}px)`);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [min]);
  return wide;
}

/** Mexico City time, filled in after mount (no server/client mismatch), updated each minute. */
function useLocalTime(lang: Lang) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Mexico_City" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, [lang]);
  return time;
}

function CopyEmail({ lang }: { lang: Lang }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setState("ok");
    } catch {
      // Older browsers or a blocked Clipboard API: copy from a hidden field.
      const ta = document.createElement("textarea");
      ta.value = CONTACT.email;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(ta);
      ta.select();
      let done = false;
      try {
        done = document.execCommand("copy");
      } catch {
        done = false;
      }
      ta.remove();
      setState(done ? "ok" : "fail");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2400);
  };
  return (
    <button type="button" className="fbtn fbtn--copy" data-state={state} onClick={copy} data-track="Copy Email" data-track-label="footer">
      {state === "ok" ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
      <span className="fbtn__label">{CONTACT.email}</span>
      <span className="fbtn__hint" aria-live="polite">
        {state === "ok" ? FOOTER.copied[lang] : state === "fail" ? FOOTER.copyFail[lang] : <span className="sr-only">{FOOTER.copy[lang]}</span>}
      </span>
    </button>
  );
}

export default function Footer({ lang, page = false }: { lang: Lang; page?: boolean }) {
  const es = lang === "es";
  const wide = useWide();
  const time = useLocalTime(lang);
  const home = (id: string) => `${page ? "/" : ""}#${id}`;
  const groups: { title: string; links: FooterLink[] }[] = [
    { title: es ? "Explora" : "Explore", links: [
      { label: es ? "Inicio" : "Home", href: home("hero") },
      { label: es ? "Proyectos" : "Projects", href: home("work") },
      { label: es ? "Soluciones" : "Solutions", href: home("solutions") },
      { label: es ? "Proceso" : "Process", href: home("process") },
    ] },
    { title: es ? "Proyectos" : "Projects", links: [
      { label: "Nova Dental", href: "https://novadentist.netlify.app/", external: true },
      { label: "Tinta Negra POS", href: "https://pos-tinta-negra-demo.netlify.app/", external: true },
      { label: "Sofía · Recepcionista IA", href: "https://sofiaasis.netlify.app/", external: true },
      { label: "Agenda", href: "https://agendawh.netlify.app/", external: true },
    ] },
    { title: es ? "Perfil" : "Profile", links: [
      { label: es ? "Sobre mí" : "About me", href: home("about") },
      { label: es ? "Experiencia" : "Experience", href: home("experience") },
      { label: es ? "Especialidades" : "Expertise", href: home("stack") },
      { label: es ? "Descargar CV" : "Download resume", href: CV_PATH, download: true },
    ] },
    { title: es ? "Conectemos" : "Connect", links: [
      { label: "GitHub", href: CONTACT.github, external: true },
      { label: "Email", href: `mailto:${CONTACT.email}` },
      { label: "WhatsApp", href: CONTACT.whatsapp, external: true },
      { label: es ? "Contacto" : "Contact", href: home("contact") },
      { label: es ? "Iniciar proyecto" : "Start a project", href: START_PATH },
    ] },
  ];

  const toTop = () => {
    scrollPageTo(0);
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer className={`sky-footer${page ? " sky-footer--page" : ""}`}>
      <div className="sky-footer__cta">
        <div className="sky-footer__ask">
          <p className="sky-footer__question">{FOOTER.cta[lang]}</p>
          <p className="sky-footer__sub">{FOOTER.ctaSub[lang]}</p>
        </div>
        <div className="sky-footer__actions">
          <CopyEmail lang={lang} />
          <a className="fbtn" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" data-track="WhatsApp" data-track-label="footer">
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
            <span className="sr-only"> {UI_TEXT.newTab[lang]}</span>
          </a>
          <button type="button" className="fbtn fbtn--top" onClick={toTop} aria-label={FOOTER.top[lang]}>
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="sky-footer__grid">
        <div className="sky-footer__brand">
          <a className="sky-footer__logo" href={home("hero")}>
            <span className="nav__mark" aria-hidden="true" />
            Mario Yael
          </a>
          <p>{FOOTER.role[lang]}</p>
          <p className="sky-footer__status">
            <span className="dot-live" aria-hidden="true" />
            {FOOTER.available[lang]}
          </p>
          <p className="sky-footer__time">
            <span>{FOOTER.time[lang]}</span>
            <time aria-live="off">{time || "—"}</time>
          </p>
        </div>
        {groups.map((group) => (
          <details className="sky-footer__column" key={group.title} open={wide || undefined}>
            <summary tabIndex={wide ? -1 : undefined} aria-disabled={wide || undefined} onClick={(e) => wide && e.preventDefault()}>
              <h2>{group.title}</h2>
              <span className="sky-footer__chev" aria-hidden="true" />
            </summary>
            <nav aria-label={group.title}>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      download={link.download ? CV_FILENAME : undefined}
                      data-track={link.download ? "Download Resume" : link.label === "GitHub" ? "GitHub" : undefined}
                      data-track-label="footer">
                      {link.label}
                      {link.external && <span className="sky-footer__ext" aria-hidden="true">↗</span>}
                      {link.external && <span className="sr-only"> {UI_TEXT.newTab[lang]}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        ))}
      </div>

      <div className="sky-footer__bottom">
        <small>{FOOTER.copyright}</small>
        <small>{FOOTER.built[lang]}</small>
      </div>

      <div className="sky-footer__horizon" aria-hidden="true">
        <Planet className="sky-footer__planet" surface={SURFACES.horizon} speed={5} />
      </div>
    </footer>
  );
}
