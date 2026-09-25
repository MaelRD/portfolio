import { CONTACT, CV_PATH, FOOTER, SECTIONS, type Lang } from "../../data/content";
import { useMagnetic } from "./hooks";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function ContactFooter({ lang }: { lang: Lang }) {
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const newTab = CONTACT.newTab[lang];

  const links: { label: string; value: string; href: string; external?: boolean; download?: boolean }[] = [
    { label: CONTACT.links.email[lang], value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: CONTACT.links.github[lang], value: "github.com/MaelRD", href: CONTACT.github, external: true },
    { label: CONTACT.links.site[lang], value: "maeldev.netlify.app", href: CONTACT.site, external: true },
    { label: CONTACT.links.cv[lang], value: "cv.pdf", href: CV_PATH, download: true },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mael-section"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingBottom: "clamp(60px,9vh,100px)" }}
    >
      {/* A faint ring behind the heading, echoing the hero orbit. */}
      <div aria-hidden="true" className="contact-orbit" />
      <SectionHeader header={SECTIONS.contact} lang={lang} id="contact-title" align="center" size="lg" accent="#38BDF8" />
      <Reveal>
        <a ref={primaryRef} href={`mailto:${CONTACT.email}`} className="mael-btn mael-btn--primary">
          {CONTACT.ctaPrimary[lang]} <span aria-hidden="true">→</span>
        </a>
      </Reveal>
      <ul className="contact-links">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="contact-link"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(link.download ? { download: "Mario-Yael-Gordillo-CV.pdf" } : {})}
            >
              <span className="contact-link__label">{link.label}</span>
              <span className="contact-link__value">{link.value}</span>
              {link.external && <span className="sr-only"> {newTab}</span>}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer
      style={{
        position: "relative",
        padding: "28px clamp(20px,5vw,80px) 36px",
        borderTop: "1px solid rgba(148,163,184,.12)",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 30px",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "'Geist Mono',monospace",
        fontSize: 12,
        letterSpacing: ".08em",
        color: "#94A3B8",
      }}
    >
      <span>
        © {new Date().getFullYear()} {FOOTER.name}
      </span>
      <span>{FOOTER.based[lang]}</span>
    </footer>
  );
}
