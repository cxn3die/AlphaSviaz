import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { LogoDriftBackdrop } from "@/components/decorative/LogoDriftBackdrop";
import { ProjectMosaicBackdrop } from "@/components/decorative/ProjectMosaicBackdrop";
import { PageCtaSection } from "@/components/sections/PageCtaSection";
import { SourceHero } from "@/components/sections/sources/SourceHero";
import { LiveProjectsTotal } from "@/components/stats/LiveProjectsTotal";
import { AppImage as Image } from "@/components/ui/app-image";
import { advantages } from "@/lib/data/advantages";
import { clients, getClientLogoClassName } from "@/lib/data/clients";
import { getProjectIndustries, projects } from "@/lib/data/projects";
import { sources, type SourceEntry } from "@/lib/data/sources";
import { cn } from "@/lib/utils";

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#64B5F6]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">{title}</h2>
    </div>
  );
}

/** «Как считаем»: один пункт — абзацем, несколько — карточками */
function MethodSection({ method }: { method: SourceEntry["method"] }) {
  const single = method.length === 1;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Как считаем" />
        {single ? (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
            {method[0].text}
          </p>
        ) : (
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {method.map((item, index) => (
              <li
                key={item.title ?? index}
                className="flex gap-4 rounded-[16px] border border-white/10 bg-white/[0.04] p-5 md:p-6"
              >
                <span className="font-heading text-2xl font-bold leading-none text-[#64B5F6] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  {item.title && (
                    <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                  )}
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

/** Примеры сданных объектов — фото кейсов, без графиков */
function ProjectsExtra() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section className="relative py-16 md:py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading title="Примеры сданных объектов" />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#64B5F6] transition hover:text-white"
          >
            Все кейсы с описанием
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <li key={project.id}>
              <Link
                href="/projects"
                className="group block overflow-hidden rounded-[18px] border border-white/10 bg-[#0C2340]/80 backdrop-blur-sm transition hover:border-[#42A5F5]/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform [transition-duration:900ms] group-hover:scale-105"
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(12,35,64,0.85)_100%)]"
                    aria-hidden
                  />
                </div>
                <div className="p-5">
                  <p className="font-heading text-lg font-bold text-white">{project.title}</p>
                  <p className="mt-1 text-sm text-white/55">{project.industry}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
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
                // multiply на тёмной плитке гаснет в чёрное — здесь он не нужен
                className={cn(getClientLogoClassName(client.id, client.wide), "mix-blend-normal")}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OtherSources({ current }: { current: SourceEntry["slug"] }) {
  const others = sources.filter((item) => item.slug !== current);

  return (
    <section className="relative py-14 md:py-16">
      <div className="container relative z-10 mx-auto px-4">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
          Другие цифры
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/sources/${item.slug}`}
                className={cn(
                  "group flex h-full flex-col rounded-[18px] border border-white/10 bg-[#0C2340]/70 p-5 backdrop-blur-sm transition",
                  "hover:border-[#42A5F5]/40 hover:bg-[#12304F]/80"
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
  );
}

/**
 * Необычные фоны — на двух страницах, и по решению владельца на ВСЮ
 * страницу, без разделительных линий: годы — плывущие ленты из логотипа,
 * проекты — «доска объектов». Остальные страницы без фона.
 */
const backdrops: Partial<Record<SourceEntry["slug"], () => JSX.Element>> = {
  years: () => <LogoDriftBackdrop />,
  projects: () => <ProjectMosaicBackdrop />,
};

const extras: Partial<Record<SourceEntry["slug"], () => JSX.Element>> = {
  projects: ProjectsExtra,
  "on-time": OnTimeExtra,
  clients: ClientsExtra,
};

function PageBody({ source, onBackdrop }: { source: SourceEntry; onBackdrop: boolean }) {
  const Extra = extras[source.slug];

  return (
    <>
      <SourceHero
        title={source.title}
        lead={source.lead}
        value={source.slug === "projects" ? <LiveProjectsTotal /> : source.value}
        suffix={source.suffix}
        caption={source.caption}
        transparent={onBackdrop}
        underHeader={!onBackdrop}
      />
      <MethodSection method={source.method} />
      {Extra && <Extra />}
      <div className={cn(!onBackdrop && "border-t border-white/8")}>
        <OtherSources current={source.slug} />
      </div>
      <PageCtaSection transparent={onBackdrop} />
    </>
  );
}

export function SourceDetail({ source }: { source: SourceEntry }) {
  const Backdrop = backdrops[source.slug];

  if (!Backdrop) {
    return (
      <div className="bg-[#0C2340]">
        <PageBody source={source} onBackdrop={false} />
      </div>
    );
  }

  // Фон лежит под всей страницей, включая первый экран под шапкой
  return (
    <div className="relative -mt-20 overflow-hidden bg-[#0C2340] pt-20">
      <Backdrop />
      <div className="relative">
        <PageBody source={source} onBackdrop />
      </div>
    </div>
  );
}
