import {
  siAngular,
  siAstro,
  siDocker,
  siFastapi,
  siGit,
  siJira,
  siMariadb,
  siMysql,
  siOdoo,
  siOpenjdk,
  siPostgresql,
  siPython,
  siQuarkus,
  siReact,
  siRedis,
  siSpringboot,
  siTypescript,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";
import { ArrowLeftRight, Bot, Boxes, Cloud, Database, FileCode2, Hexagon, KeyRound, Layers, Network, Plug, Search, Webhook, Workflow, type LucideIcon } from "lucide-react";

// One icon per skill in CAPABILITIES (src/data/space.ts), keyed by its label.
// Tools use their brand mark (Simple Icons); practices and concepts use a
// line icon (Lucide). A skill without an entry simply shows its name.

export type SkillIcon = { brand: SimpleIcon } | { line: LucideIcon };

const ICONS: Record<string, SkillIcon> = {
  "Java 21": { brand: siOpenjdk },
  Java: { brand: siOpenjdk },
  "Spring Boot": { brand: siSpringboot },
  Quarkus: { brand: siQuarkus },
  Python: { brand: siPython },
  FastAPI: { brand: siFastapi },
  Angular: { brand: siAngular },
  React: { brand: siReact },
  Astro: { brand: siAstro },
  TypeScript: { brand: siTypescript },
  PostgreSQL: { brand: siPostgresql },
  MySQL: { brand: siMysql },
  MariaDB: { brand: siMariadb },
  Redis: { brand: siRedis },
  Odoo: { brand: siOdoo },
  Docker: { brand: siDocker },
  Git: { brand: siGit },
  Jira: { brand: siJira },
  AWS: { line: Cloud },
  "Odoo 18": { brand: siOdoo },
  "Angular Material": { brand: siAngular },
  SQL: { line: Database },
  JWT: { line: KeyRound },
  REST: { line: ArrowLeftRight },
  Webhooks: { line: Webhook },
  XML: { line: FileCode2 },
  QWeb: { line: FileCode2 },
  SEO: { line: Search },
  "Schema.org": { line: FileCode2 },
  "Arquitectura Hexagonal": { line: Hexagon },
  SOLID: { line: Layers },
  "REST APIs": { line: ArrowLeftRight },
  "Diseño orientado a dominio": { line: Boxes },
  "XML-RPC": { line: Network },
  "Integraciones ERP": { line: Plug },
  "Automatización de procesos": { line: Workflow },
  "Asistentes con IA": { line: Bot },
  WhatsApp: { brand: siWhatsapp },
};

/** Whether a skill has a mark (brand or line icon). */
export const hasGlyph = (name: string) => name in ICONS;

/** A brand color that still reads on the night sky; near-black marks fall back to the ink color. */
function readable(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.06 ? "var(--ink)" : `#${hex}`;
}

export function SkillGlyph({ name, size = 18 }: { name: string; size?: number }) {
  const icon = ICONS[name];
  if (!icon) return null;
  if ("line" in icon) {
    const Icon = icon.line;
    return (
      <span className="skill__glyph" aria-hidden="true">
        <Icon size={size} strokeWidth={1.6} aria-hidden />
      </span>
    );
  }
  return (
    <span className="skill__glyph" style={{ ["--brand" as string]: readable(icon.brand.hex) }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d={icon.brand.path} />
      </svg>
    </span>
  );
}
