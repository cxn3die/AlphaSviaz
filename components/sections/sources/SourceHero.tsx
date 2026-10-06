import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { BRAND_NAVY_HERO } from "@/lib/brand-colors";
import { cn } from "@/lib/utils";

type SourceHeroProps = {
  title: string;
  lead: string;
  /** Крупное значение справа: строка или живой счётчик */
  value: ReactNode;
  suffix?: string;
  caption: string;
  /** Без своего фона — под страницей уже лежит декоративный фон */
  transparent?: boolean;
  /** Заходить под шапку (-mt-20 pt-20). false — если это делает обёртка */
  underHeader?: boolean;
};

export function SourceHero({
  title,
  lead,
  value,
  suffix,
  caption,
  transparent = false,
  underHeader = true,
}: SourceHeroProps) {
  return (
    <section
      className={cn("relative overflow-hidden text-white", underHeader && "-mt-20 pt-20")}
      style={transparent ? undefined : { backgroundColor: BRAND_NAVY_HERO }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_20%_-30%,rgba(66,165,245,0.32),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(242,92,31,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 pb-14 pt-12 md:pb-20 md:pt-16">
        <Breadcrumbs className="mb-8" />

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#64B5F6]">
              Источник цифры
            </p>
            <span className="mb-5 mt-4 block h-1 w-16 rounded-full bg-[#F25C1F]" />
            <h1 className="font-heading text-[clamp(2rem,5.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight [text-wrap:balance]">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/72">{lead}</p>
          </div>

          <div className="relative overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.05] p-8 backdrop-blur-sm">
            <p className="whitespace-nowrap font-heading text-[clamp(4rem,14vw,6.5rem)] font-bold leading-none tracking-[-0.04em] text-[#F25C1F] tabular-nums">
              {value}
              {suffix}
            </p>
            <span className="mt-4 block h-[3px] w-10 rounded-full bg-white/80" />
            <p className="mt-4 text-lg font-semibold leading-snug text-white">{caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
