import { CONTACT, CV_FILENAME, CV_PATH, FOOTER, HERO, SECTIONS, UI, type Lang } from "../../data/content";
import { useMagnetic } from "./hooks";
import { useArmed, useInView } from "./motion";
import SectionHeader from "./SectionHeader";

// Lines entering from the edges of the section and meeting at one point
// above the heading — every connection drawn on the way down ends here.
const CONVERGE = [
  "M0 60 C 240 40, 400 20, 500 18",
  "M0 300 C 220 200, 400 60, 500 18",
  "M1000 60 C 760 40, 600 20, 500 18",
  "M1000 300 C 780 200, 600 60, 500 18",
];

export default function Contact({ lang }: { lang: Lang }) {
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const armed = useArmed();
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.3 });
  const newTab = UI.newTab[lang];

  // LinkedIn goes here once there's a confirmed profile URL.
  const links: { label: string; value: string; href: string; external?: boolean; download?: boolean }[] = [
    { label: CONTACT.links.email[lang], value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: CONTACT.links.github[lang], value: "github.com/MaelRD", href: CONTACT.github, external: true },
    { label: CONTACT.links.cv[lang], value: "cv.pdf", href: CV_PATH, download: true },
  ];

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="mael-section contact" data-converge={!armed ? "static" : inView ? "in" : "out"}>
      <svg className="contact__lines" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
        {CONVERGE.map((d, i) => (
          <path key={d} d={d} pathLength={1} style={{ animationDelay: `${i * 90}ms` }} />
        ))}
      </svg>
      {/* The meeting point, as HTML so it stays round while the SVG stretches. */}
      <span className="contact__core" aria-hidden="true" />

      <SectionHeader header={SECTIONS.contact} lang={lang} id="contact-title" align="center" size="lg" accent="#38BDF8" />

      <a ref={primaryRef} href={`mailto:${CONTACT.email}`} className="mael-btn mael-btn--primary contact__cta" data-cursor="link">
        <span className="mael-btn__label">{CONTACT.ctaPrimary[lang]}</span>
        <span className="mael-btn__arrow" aria-hidden="true">
          →
        </span>
      </a>

      <ul className="contact-links">
        {links.map((link, i) => (
          <li key={link.href} style={{ transitionDelay: `${i * 60}ms` }}>
            <a
              href={link.href}
              className="contact-link"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(link.download ? { download: CV_FILENAME } : {})}
            >
              <span className="contact-link__label">
                {link.label}
                <span className="arrow-link__icon" aria-hidden="true">
                  ↗
                </span>
              </span>
              <span className="contact-link__value">{link.value}</span>
              {link.external && <span className="sr-only"> {newTab}</span>}
            </a>
          </li>
        ))}
      </ul>

      <p className="contact__status">
        <span className="mono-label" style={{ margin: 0 }}>
          {HERO.status.label}
        </span>
        <span>
          <span className="status-dot" aria-hidden="true" /> {HERO.status.value[lang]}
        </span>
      </p>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {FOOTER.name}
      </span>
      <span>{FOOTER.based[lang]}</span>
    </footer>
  );
}
