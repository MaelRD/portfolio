import type { CSSProperties } from "react";
import type { Lang } from "@/data/content";
import { SERVICES, SERVICES_TEXT as T } from "@/data/v2";
import { DeviceMockup, ProjectImage, SectionHeader } from "../kit";

// Four kinds of work in a bento grid (after Aceternity's Bento Grid), each
// tile a different size and with its own picture: a real system screen, a
// phone, a short workflow, a hub of connections. Pictures are aria-hidden;
// the tile's text says the same thing.

function Visual({ k }: { k: (typeof SERVICES)[number]["key"] }) {
  switch (k) {
    case "business":
      return (
        <div className="svc__shot" aria-hidden="true">
          <ProjectImage project="tinta-negra" name="desktop" alt="" sizes="(min-width: 1024px) 720px, 90vw" />
        </div>
      );
    case "web":
      return (
        <div className="svc__phone" aria-hidden="true">
          <DeviceMockup>
            <ProjectImage project="nova-dental" name="mobile" alt="" sizes="160px" />
          </DeviceMockup>
        </div>
      );
    case "automation":
      return (
        <ol className="svc__flow" aria-hidden="true">
          {["FORM", "LEAD", "CRM", "WHATSAPP"].map((n, i) => (
            <li key={n} style={{ ["--k" as string]: i } as CSSProperties}>
              {n}
            </li>
          ))}
        </ol>
      );
    case "integrations":
      return (
        <div className="svc__hub" aria-hidden="true">
          {["ERP", "API", "DB", "AI", "CRM", "WHATSAPP"].map((n, i) => (
            <span key={n} className="svc__spoke" style={{ ["--k" as string]: i } as CSSProperties}>
              {n}
            </span>
          ))}
          <span className="svc__core">SYSTEM</span>
        </div>
      );
  }
}

export default function ServicesBento({ lang }: { lang: Lang }) {
  return (
    <section id="solutions" className="sec" aria-labelledby="solutions-title">
      <div className="wrap stack-40">
        <SectionHeader id="solutions-title" title={T.title[lang]} intro={T.intro[lang]} />
        <ul className="svc-grid">
          {SERVICES.map((s) => (
            <li key={s.key} className={`svc svc--${s.key}`}>
              <div className="svc__text">
                <p className="svc__kicker">{s.kicker[lang]}</p>
                <h3 className="svc__title">{s.title[lang]}</h3>
                <p className="svc__desc">{s.text[lang]}</p>
                <ul className="svc__items">
                  {s.items.map((it) => (
                    <li key={it.en}>{it[lang]}</li>
                  ))}
                </ul>
              </div>
              <Visual k={s.key} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
