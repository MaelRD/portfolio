import { Bot, Box, Calculator, CalendarDays, ChartColumn, KanbanSquare, MessageCircle, Network, Plug, ScanBarcode, Share2, UserRound, Users } from "lucide-react";
import type { Lang } from "@/data/content";
import { BUILDS, BUILD_TEXT as T } from "@/data/v2";
import InfiniteMovingCards from "../aceternity/InfiniteMovingCards";
import { SectionHeader } from "../kit";

// Systems I can build, as a slow horizontal showcase (Infinite Moving Cards,
// used for solutions instead of testimonials).

const ICONS = {
  users: Users,
  calendar: CalendarDays,
  pos: ScanBarcode,
  calculator: Calculator,
  chart: ChartColumn,
  box: Box,
  portal: UserRound,
  chat: MessageCircle,
  kanban: KanbanSquare,
  erp: Network,
  bot: Bot,
  social: Share2,
  plug: Plug,
} as const;

export default function SolutionMarquee({ lang }: { lang: Lang }) {
  const items = BUILDS.map((b) => {
    const Icon = ICONS[b.icon as keyof typeof ICONS];
    return {
      key: b.name.en,
      node: (
        <div className="build">
          <span className="build__icon" aria-hidden="true">
            <Icon size={18} strokeWidth={1.6} />
          </span>
          <span className="build__name">{b.name[lang]}</span>
          <span className="build__text">{b.text[lang]}</span>
        </div>
      ),
    };
  });
  return (
    <section id="build" className="sec sec--tight" aria-labelledby="build-title">
      <div className="wrap">
        <SectionHeader id="build-title" title={T.title[lang]} intro={T.intro[lang]} />
      </div>
      <InfiniteMovingCards items={items} label={T.title[lang]} speed={90} pauseLabel={T.pause[lang]} playLabel={T.play[lang]} className="builds" />
    </section>
  );
}
