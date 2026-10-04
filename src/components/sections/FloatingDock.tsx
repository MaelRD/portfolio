import { Briefcase, FolderKanban, Home, Layers, Mail } from "lucide-react";
import type { Lang } from "@/data/content";
import { DOCK } from "@/data/v2";

// Phones only (CSS): a thumb-height dock (after Aceternity's Floating Dock,
// without the magnification, which needs a hover a phone doesn't have). Five
// destinations, each a 48px target with its label; the current section is lit.

const ICONS = { home: Home, work: FolderKanban, solutions: Layers, experience: Briefcase, contact: Mail };

export default function FloatingDock({ lang, active, label }: { lang: Lang; active: string; label: string }) {
  return (
    <nav className="dock" aria-label={label}>
      <ul>
        {DOCK.map((d) => {
          const Icon = ICONS[d.icon];
          const on = active === d.id;
          return (
            <li key={d.id}>
              <a href={`#${d.id}`} aria-current={on ? "true" : undefined}>
                <Icon size={19} strokeWidth={1.7} aria-hidden />
                <span>{d.label[lang]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
