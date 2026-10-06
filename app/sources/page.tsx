import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageCtaSection } from "@/components/sections/PageCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { LiveProjectsTotal } from "@/components/stats/LiveProjectsTotal";
import { sources, sourcesPageCopy } from "@/lib/data/sources";

export const metadata: Metadata = {
  title: `${sourcesPageCopy.eyebrow} — Альфа-Связь`,
  description: sourcesPageCopy.description,
};

export default function SourcesPage() {
  return (
    <div className="bg-[#0C2340]">
      <PageHero
        title={sourcesPageCopy.title}
        description={sourcesPageCopy.description}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: sourcesPageCopy.eyebrow },
        ]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {sources.map((source) => (
              <li key={source.slug}>
                <Link
                  href={`/sources/${source.slug}`}
                  className="group flex h-full flex-col rounded-[20px] border border-white/10 bg-white/[0.04] p-7 transition hover:border-[#42A5F5]/40 hover:bg-white/[0.07] md:p-8"
                >
                  <span className="whitespace-nowrap font-heading text-5xl font-bold tracking-[-0.03em] text-[#F25C1F] tabular-nums md:text-6xl">
                    {source.slug === "projects" ? <LiveProjectsTotal /> : source.value}
                    {source.suffix}
                  </span>
                  <span className="mt-3 text-lg font-semibold text-white">{source.caption}</span>
                  <span className="mt-2 text-[15px] leading-relaxed text-white/60">{source.lead}</span>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#64B5F6] transition group-hover:text-white">
                    Как считаем
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCtaSection />
    </div>
  );
}
