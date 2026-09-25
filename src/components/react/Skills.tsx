import { useState } from "react";
import { SECTIONS, SKILL_GROUPS, SOFT_SKILLS, skillLabel, type Lang, type SkillGroup } from "../../data/content";
import Planet from "./Planet";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// Small per-card variation so the six planets read as a system rather than
// six copies of one sprite.
const SIZES = [40, 36, 38, 42, 34, 38];
const TILTS = [-14, 10, -6, 14, -18, 8];

function SkillCard({ group, lang, index }: { group: SkillGroup; lang: Lang; index: number }) {
  // Hover only brightens the planet — every skill is always visible, so
  // nothing depends on pointer interaction.
  const [lit, setLit] = useState(false);
  const titleId = `skill-${index}`;

  return (
    <Reveal as="li" delay={Math.min(index, 5) * 60} style={{ display: "flex" }}>
      <article
        aria-labelledby={titleId}
        onPointerEnter={() => setLit(true)}
        onPointerLeave={() => setLit(false)}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: "18px 20px 22px",
          border: `1px solid ${lit ? `${group.accent}66` : "rgba(148,163,184,.14)"}`,
          borderRadius: 12,
          background: `radial-gradient(90% 60% at 0% 0%, ${group.accent}${lit ? "1C" : "10"}, transparent 60%), linear-gradient(160deg, rgba(7,11,30,.78), rgba(3,0,20,.88))`,
          transition: "border-color .3s ease, background .3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Planet
            accent={group.accent}
            size={SIZES[index % SIZES.length]}
            ringW={84}
            box={60}
            tilt={TILTS[index % TILTS.length]}
            period={10 + (index % 4) * 2.5}
            active={lit}
          />
          <h3 id={titleId} style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 500, color: "#F8FAFC", lineHeight: 1.25 }}>
            {group.title[lang]}
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#CBD5E1" }}>{group.description[lang]}</p>
        <ul style={{ listStyle: "none", margin: "auto 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 7 }}>
          {group.items.map((item) => (
            <li
              key={item}
              style={{
                padding: "5px 11px",
                borderRadius: 999,
                border: `1px solid ${group.accent}45`,
                background: "rgba(5,8,22,.6)",
                fontSize: 13,
                color: "#E2E8F0",
              }}
            >
              {skillLabel(item, lang)}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export function TechnicalSkills({ lang }: { lang: Lang }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mael-section">
      <SectionHeader header={SECTIONS.skills} lang={lang} id="skills-title" />
      <ul className="mael-grid-3" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {SKILL_GROUPS.map((group, i) => (
          <SkillCard key={group.title.en} group={group} lang={lang} index={i} />
        ))}
      </ul>
    </section>
  );
}

const STAR_COLORS = ["#A78BFA", "#38BDF8", "#E879F9", "#22D3EE", "#60A5FA", "#C4B5FD"];

export function SoftSkills({ lang }: { lang: Lang }) {
  return (
    <section id="soft-skills" aria-labelledby="soft-skills-title" className="mael-section mael-section--tight">
      <SectionHeader header={SECTIONS.softSkills} lang={lang} id="soft-skills-title" accent="#38BDF8" />
      {/* A loose constellation: each skill is a star, joined by a faint line on wide screens. */}
      <ul className="mael-grid-3 soft-constellation" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {SOFT_SKILLS.map((skill, i) => {
          const color = STAR_COLORS[i % STAR_COLORS.length];
          return (
            <Reveal as="li" key={skill.title.en} delay={Math.min(i, 5) * 50} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "6px 4px" }}>
              <span
                aria-hidden="true"
                style={{
                  flex: "none",
                  marginTop: 7,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 0 4px ${color}22, 0 0 16px ${color}`,
                }}
              />
              <div>
                <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 17.5, fontWeight: 500, color: "#F8FAFC" }}>{skill.title[lang]}</h3>
                <p style={{ margin: "6px 0 0", fontSize: 15, lineHeight: 1.6, color: "#CBD5E1" }}>{skill.body[lang]}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
