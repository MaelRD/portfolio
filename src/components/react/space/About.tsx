import { useReducedMotion } from "motion/react";
import { ABOUT, HEADS, HERO, type Lang } from "../../../data/space";
import ProfileCard from "@/components/reactbits/ProfileCard/ProfileCard";

export default function About({ lang }: { lang: Lang }) {
  const still = useReducedMotion();
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="wrap stack-48">
        <div className="split">
          <div className="about__copy">
            <h2 className="h2" id="about-title">
              {HEADS.about.title[lang]}
            </h2>
            {ABOUT.paragraphs.map((p) => (
              <p key={p.en} className="body">
                {p[lang]}
              </p>
            ))}
            <p className="about__lead">{ABOUT.question[lang]}</p>
            {ABOUT.closing.map((p) => (
              <p key={p.en} className="body">
                {p[lang]}
              </p>
            ))}
            <div className="about__langs">
              <h3 className="label label--11">{ABOUT.languagesLabel[lang]}</h3>
              <dl>
                {ABOUT.languages.map((l) => (
                  <div key={l.k.en}>
                    <dt>{l.k[lang]}</dt>
                    <dd>{l.v[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="about__card">
            <ProfileCard
              avatarUrl="/about/mario.webp"
              miniAvatarUrl="/about/icon.jpg"
              iconUrl=""
              grainUrl=""
              name={`${HERO.first} ${HERO.last}`}
              title={ABOUT.card.title[lang]}
              handle="MaelRD"
              status={ABOUT.card.status[lang]}
              contactText={ABOUT.card.contact[lang]}
              innerGradient="linear-gradient(145deg, rgba(167, 139, 250, 0.35) 0%, rgba(125, 227, 255, 0.18) 100%)"
              behindGlowColor="rgba(167, 139, 250, 0.55)"
              enableTilt={!still}
              onContactClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: still ? "auto" : "smooth" })}
            />
          </div>
        </div>

        <ul className="levels">
          {ABOUT.levels.map((l) => (
            <li key={l.k.en} className="spotlight">
              <span className="label label--12" style={{ color: l.color }}>
                {l.k[lang]}
              </span>
              <strong>{l.v[lang]}</strong>
            </li>
          ))}
        </ul>
        <p className="about__note">{ABOUT.levelsNote[lang]}</p>
      </div>
    </section>
  );
}
