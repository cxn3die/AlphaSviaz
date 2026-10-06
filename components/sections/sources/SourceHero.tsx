import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { BRAND_NAVY_HERO } from "@/lib/brand-colors";
import { sourcesPageCopy } from "@/lib/data/sources";

type SourceHeroProps = {
  title: string;
  lead: string;
  /** Крупное значение справа: строка или живой счётчик */
  value: ReactNode;
  suffix?: string;
  caption: string;
};

export function SourceHero({ title, lead, value, suffix, caption }: SourceHeroProps) {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: BRAND_NAVY_HERO }}
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
        <nav aria-label="Хлебные крошки" className="mb-8 flex flex-wrap items-center gap-1 text-sm text-white/60">
          <Link href="/" className="transition hover:text-[#64B5F6]">
            Главная
          </Link>
          <ChevronRight className="size-4 shrink-0 text-white/30" aria-hidden />
          <Link href="/sources" className="transition hover:text-[#64B5F6]">
            {sourcesPageCopy.eyebrow}
          </Link>
          <ChevronRight className="size-4 shrink-0 text-white/30" aria-hidden />
          <span className="text-white/90">{title}</span>
        </nav>

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
