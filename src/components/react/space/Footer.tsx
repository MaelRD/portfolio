import { CONTACT, CV_FILENAME, CV_PATH, START_PATH } from "../../../data/content";
import { FOOTER, UI_TEXT, type Lang } from "../../../data/space";

import { Planet, SURFACES } from "./ui";

type FooterLink = { label: string; href: string; external?: boolean; download?: boolean };

export default function Footer({ lang, page = false }: { lang: Lang; page?: boolean }) {
  const es = lang === "es";
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
      { label: es ? "Tecnologías" : "Skills", href: home("stack") },
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

  return (
    <footer className={`sky-footer${page ? " sky-footer--page" : ""}`}>
      <div className="sky-footer__grid">
        <div className="sky-footer__brand">
          <a className="sky-footer__logo" href={home("hero")}>
            <span className="nav__mark" aria-hidden="true" />
            Mario Yael
          </a>
          <p>{FOOTER.role[lang]}</p>
          <small>{FOOTER.copyright}</small>
          <p className="sky-footer__status">
            <span className="dot-live" aria-hidden="true" />
            {es ? "Disponible para nuevos proyectos" : "Available for new projects"}
          </p>
        </div>
        {groups.map((group) => (
          <nav className="sky-footer__column" aria-label={group.title} key={group.title}>
            <h2>{group.title}</h2>
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
                    {link.external && <span className="sr-only"> {UI_TEXT.newTab[lang]}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="sky-footer__horizon" aria-hidden="true">
        <Planet className="sky-footer__planet" surface={SURFACES.horizon} speed={5} />
      </div>
    </footer>
  );
}
