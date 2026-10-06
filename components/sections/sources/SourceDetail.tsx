import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageCtaSection } from "@/components/sections/PageCtaSection";
import { ProjectsLivePanel } from "@/components/sections/sources/ProjectsLivePanel";
import { SourceHero } from "@/components/sections/sources/SourceHero";
import { LiveProjectsTotal } from "@/components/stats/LiveProjectsTotal";
import { AppImage as Image } from "@/components/ui/app-image";
import { advantages } from "@/lib/data/advantages";
import { clients, getClientLogoClassName } from "@/lib/data/clients";
import { getProjectIndustries, projects } from "@/lib/data/projects";
import { sources, type SourceEntry } from "@/lib/data/sources";
import { cn } from "@/lib/utils";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#64B5F6]">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">{title}</h2>
    </div>
  );
}

function ProjectsExtra() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="border-t border-white/8 bg-[#0E2542] py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="По месяцам" title="Сколько объектов сдаём" />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <ProjectsLivePanel />
          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <p className="text-sm font-semibold text-white">Примеры сданных объектов</p>
            <ul className="mt-5 space-y-4">
              {featured.map((project) => (
                <li key={project.id} className="border-b border-white/8 pb-4 last:border-0 last:pb-0">
                  <p className="font-heading text-lg font-bold text-white">{project.title}</p>
                  <p className="mt-1 text-sm text-white/55">
                    {project.industry} · {project.category}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/projects"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#64B5F6] transition hover:text-white"
            >
              Все кейсы с описанием
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function OnTimeExtra() {
  return (
    <section className="border-t border-white/8 bg-[#0E2542] py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="За счёт чего" title="Что помогает держать сроки" />
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <li
              key={item.id}
              className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[18px] border border-white/10"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                  className="object-cover"
                />
              )}
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0.2)_0%,rgba(7,26,47,0.6)_45%,rgba(7,26,47,0.95)_100%)]"
                aria-hidden
              />
              <div className="relative p-6">
                <p className="font-heading text-lg font-bold text-white">
                  {item.value ? `${item.value} ${item.title}` : item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ClientsExtra() {
  const industries = getProjectIndustries();

  return (
    <section className="border-t border-white/8 bg-[#0E2542] py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Отрасли" title="С кем работаем" />
        <ul className="mt-8 flex flex-wrap gap-2">
          {industries.map(({ label }) => (
            <li
              key={label}
              className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/80"
            >
              {label}
            </li>
          ))}
        </ul>

        {/* flex + justify-center: неполный последний ряд стоит по центру, без пустых ячеек */}
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex h-24 w-[calc(50%-6px)] items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.04] px-4 sm:w-[calc(33.333%-8px)] md:h-28 lg:w-[calc(20%-10px)]"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.wide ? 200 : 140}
                height={48}
                // multiply на тёмной плитке гасит логотип в чёрное — здесь он не нужен
                className={cn(getClientLogoClassName(client.id, client.wide), "mix-blend-normal")}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const extras: Partial<Record<SourceEntry["slug"], () => JSX.Element>> = {
  projects: ProjectsExtra,
  "on-time": OnTimeExtra,
  clients: ClientsExtra,
};

export function SourceDetail({ source }: { source: SourceEntry }) {
  const Extra = extras[source.slug];
  const others = sources.filter((item) => item.slug !== source.slug);

  return (
    <div className="bg-[#0C2340]">
      <SourceHero
        title={source.title}
        lead={source.lead}
        value={source.slug === "projects" ? <LiveProjectsTotal /> : source.value}
        suffix={source.suffix}
        caption={source.caption}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Методика" title="Как считаем" />
              <ol className="mt-8 space-y-4">
                {source.method.map((item, index) => (
                  <li
                    key={item.title}
                    className="flex gap-4 rounded-[16px] border border-white/10 bg-white/[0.04] p-5 md:p-6"
                  >
                    <span className="font-heading text-2xl font-bold leading-none text-[#64B5F6] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {source.facts.length > 0 && (
              <div>
                <SectionHeading eyebrow="Основание" title="На чём основано" />
                <dl className="mt-8 divide-y divide-white/8 rounded-[16px] border border-white/10 bg-white/[0.03]">
                  {source.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 md:px-6"
                    >
                      <dt className="text-sm text-white/55">{fact.label}</dt>
                      <dd className="text-[15px] font-semibold text-white sm:text-right">
                        {fact.href ? (
                          <Link
                            href={fact.href}
                            className="inline-flex items-center gap-1 text-white transition hover:text-[#64B5F6]"
                          >
                            {fact.value}
                            <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
                          </Link>
                        ) : (
                          fact.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {Extra && <Extra />}

      <section className="border-t border-white/8 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
            Другие цифры
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/sources/${item.slug}`}
                  className={cn(
                    "group flex h-full flex-col rounded-[18px] border border-white/10 bg-white/[0.04] p-5 transition",
                    "hover:border-[#42A5F5]/40 hover:bg-white/[0.07]"
                  )}
                >
                  <span className="font-heading text-3xl font-bold text-[#64B5F6] tabular-nums">
                    {item.slug === "projects" ? <LiveProjectsTotal /> : item.value}
                    {item.suffix}
                  </span>
                  <span className="mt-2 text-sm text-white/65">{item.caption}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/80 transition group-hover:text-white">
                    Источник
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
