"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";

import { AppImage as Image } from "@/components/ui/app-image";
import { categoryThemes, projects, projectsPageCopy, type ProjectItem } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const serviceLinks: Record<string, string> = {
  Видеонаблюдение: "/services/video-surveillance",
  СКУД: "/services/access-control",
  "Пожарная безопасность": "/services/fire-safety",
  Сети: "/services/networks",
};

/** «1 кейс», «2 кейса», «13 кейсов» */
function caseWord(count: number) {
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return "кейсов";
  switch (count % 10) {
    case 1:
      return "кейс";
    case 2:
    case 3:
    case 4:
      return "кейса";
    default:
      return "кейсов";
  }
}

/**
 * Кейсы — «журнал объектов»: крупное фото и описание рядом, ряды
 * чередуются слева/справа, тонкие разделители, номер объекта.
 * Без фильтров, бейджей REC и карточек-коробок — по решению владельца.
 */
export function ProjectsExperience() {
  // Сильные кейсы вперёд
  const list = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  const total = list.length;

  return (
    <section className="relative bg-[#0C2340] pb-20 pt-10 md:pb-28 md:pt-14">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {projectsPageCopy.intro}
          </p>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-white/40">
            {String(total).padStart(2, "0")} объектов
          </p>
        </div>

        {/* На телефоне 13 кейсов — долгая прокрутка: кнопка сразу к заявке */}
        <a
          href="#projects-end"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white lg:hidden"
        >
          <ArrowDown className="size-4" aria-hidden />
          Пролистать {total} {caseWord(total)}
        </a>

        <ol className="mt-4">
          {list.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} total={total} />
          ))}
        </ol>

        <span id="projects-end" className="block scroll-mt-24" aria-hidden />

        {list.some((project) => project.illustrative) && (
          <p className="mt-6 text-sm text-white/40">
            Часть кадров иллюстрирует сценарий работы системы и снята не на этих
            объектах. Фотографии с площадок заказчика публикуем по согласованию.
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectRow({ project, index, total }: { project: ProjectItem; index: number; total: number }) {
  const theme = categoryThemes[project.category];
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group grid grid-cols-1 items-center gap-8 border-b border-white/10 py-12 md:py-16 lg:grid-cols-12 lg:gap-14"
    >
      {/* Фото с тонкими уголками видоискателя — намёк на тему, без «REC» */}
      <div className={cn("relative lg:col-span-7", reversed && "lg:order-2")}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#133456]">
          {project.image && (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover saturate-[0.9] transition [transition-duration:900ms] group-hover:scale-[1.03] group-hover:saturate-100"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(12,35,64,0.45)_100%)]" aria-hidden />
          <Viewfinder />
          {project.imageCredit && (
            <p className="absolute bottom-3 right-4 text-[11px] text-white/60">{project.imageCredit}</p>
          )}
        </div>
      </div>

      <div className={cn("lg:col-span-5", reversed && "lg:order-1")}>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
          <span className="text-white/40">
            Объект {number}
            <span className="text-white/20"> / {String(total).padStart(2, "0")}</span>
          </span>
          <span className="h-px flex-1 bg-white/10" aria-hidden />
          <span style={{ color: theme.accent }}>{project.category}</span>
        </div>

        <h2 className="mt-5 font-heading text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.08] tracking-tight text-white">
          {project.title}
        </h2>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-white/50">
          {project.industry}
          {project.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {project.location}
            </span>
          )}
        </p>

        <dl className="mt-7 space-y-5">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">Задача</dt>
            <dd className="mt-1.5 text-[15px] leading-relaxed text-white/70">{project.task}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">Решение</dt>
            <dd className="mt-1.5 text-[15px] leading-relaxed text-white/70">{project.solution}</dd>
          </div>
          <div className="border-l-2 border-[#F25C1F] pl-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF8A57]">Результат</dt>
            <dd className="mt-1.5 text-[15px] leading-relaxed text-white">{project.result}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col items-start gap-3 border-t border-white/10 pt-5">
          <p className="text-sm text-white/50">
            {project.services.map((service, i) => {
              const href = serviceLinks[service];
              return (
                <span key={service}>
                  {i > 0 && <span className="mx-2 text-white/20">·</span>}
                  {href ? (
                    <Link href={href} className="transition hover:text-white">
                      {service}
                    </Link>
                  ) : (
                    service
                  )}
                </span>
              );
            })}
          </p>
          <Link
            href="/contacts/#request"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#64B5F6] transition hover:text-white"
          >
            Обсудить похожий объект
            <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.li>
  );
}

function Viewfinder() {
  const corner = "absolute size-6 border-white/55 transition-all duration-500 group-hover:size-8 group-hover:border-white/80";
  return (
    <div className="pointer-events-none absolute inset-4" aria-hidden>
      <span className={cn(corner, "left-0 top-0 border-l border-t")} />
      <span className={cn(corner, "right-0 top-0 border-r border-t")} />
      <span className={cn(corner, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(corner, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}
