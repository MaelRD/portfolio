import type { Lang } from "@/data/content";
import { GALLERY, GALLERY_TEXT as T } from "@/data/v2";
import { ProjectImage, SectionHeader } from "../kit";

// Selected interfaces: real screenshots in a bento grid (after Aceternity's
// Bento Grid). The images carry it; the name and kind of system sit in an
// overlay that rises on hover or focus, and stay visible on touch screens.

const SIZES: Record<(typeof GALLERY)[number]["size"], string> = {
  full: "(min-width: 1024px) 1200px, 94vw",
  wide: "(min-width: 1024px) 800px, 94vw",
  tall: "(min-width: 1024px) 400px, 47vw",
  std: "(min-width: 1024px) 400px, 94vw",
};

export default function ProjectGallery({ lang }: { lang: Lang }) {
  return (
    <section id="interfaces" className="sec" aria-labelledby="interfaces-title">
      <div className="wrap stack-40">
        <SectionHeader id="interfaces-title" eyebrow={T.eyebrow[lang]} title={T.title[lang]} intro={T.intro[lang]} />
        <ul className="bento-gallery">
          {GALLERY.map((g) => {
            const label = `${g.name} · ${g.kind[lang]}`;
            const body = (
              <>
                <ProjectImage project={g.project} name={g.image} alt={label} sizes={SIZES[g.size]} />
                <span className="tile__overlay">
                  <span className="tile__name">{g.name}</span>
                  <span className="tile__meta">
                    {g.kind[lang]}
                    {g.year ? ` · ${g.year}` : ""}
                  </span>
                  {g.href && (
                    <span className="tile__cta" aria-hidden="true">
                      {T.open[lang]} ↗
                    </span>
                  )}
                </span>
              </>
            );
            return (
              <li key={`${g.project}-${g.image}`} className={`tile tile--${g.size}`} data-project={g.project}>
                {g.href ? (
                  <a href={g.href} target="_blank" rel="noopener noreferrer" className="tile__link" data-track="Gallery" data-track-label={`${g.project}:${g.image}`}>
                    {body}
                  </a>
                ) : (
                  <div className="tile__link">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
