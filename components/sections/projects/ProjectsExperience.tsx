"use client";

import { AppImage as Image } from "@/components/ui/app-image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  Factory,
  Flame,
  Gauge,
  GraduationCap,
  KeyRound,
  MapPin,
  Network,
  Plane,
  Shield,
  Store,
  TrafficCone,
  Wheat,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  categoryThemes,
  getProjectIndustries,
  projectIndustryById,
  projects,
  projectsPageCopy,
  type ProjectCategory,
  type ProjectIndustry,
  type ProjectItem,
} from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const categoryIcons: Record<ProjectCategory, typeof Camera> = {
  Видеонаблюдение: Camera,
  СКУД: KeyRound,
  "Пожарная безопасность": Flame,
  Сети: Network,
  "Мониторинг и интеграция": Gauge,
};

const serviceLinks: Record<string, string> = {
  Видеонаблюдение: "/services/video-surveillance",
  СКУД: "/services/access-control",
  "Пожарная безопасность": "/services/fire-safety",
  Сети: "/services/networks",
};

const industryIcons: Record<ProjectIndustry, typeof Camera> = {
  Производство: Factory,
  "Торговля и склад": Store,
  "Соцобъекты и образование": GraduationCap,
  Агропром: Wheat,
  Транспорт: Plane,
  "Дорожное строительство": TrafficCone,
};

function FilterButton({
  label,
  count,
  icon: Icon,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  icon: typeof Camera;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition duration-300",
        isActive
          ? "bg-[#1E88E5] text-white shadow-[0_0_24px_rgba(30,136,229,0.35)]"
          : "border border-white/15 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white"
      )}
    >
      <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 text-xs tabular-nums",
          isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/60"
        )}
      >
        {count}
      </span>
    </button>
  );
}

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

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.25 },
  },
};

export function ProjectsExperience() {
  const [activeIndustry, setActiveIndustry] = useState<string>("Все");

  const industries = useMemo(() => getProjectIndustries(), []);

  const filtered = useMemo(() => {
    const list =
      activeIndustry === "Все"
        ? projects
        : projects.filter(
            (project) => projectIndustryById[project.id] === activeIndustry
          );

    // Сильные кейсы вперёд — размером карточки не выделяем, только порядком
    return [...list].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    );
  }, [activeIndustry]);

  return (
    <section className="relative overflow-hidden bg-[#0C2340] pb-20 pt-4 md:pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0C2340] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/3 size-80 rounded-full bg-[#1E88E5]/10 blur-[100px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {projectsPageCopy.intro}
          </p>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Фильтр по отраслям"
          >
            <FilterButton
              label="Все"
              count={projects.length}
              icon={Shield}
              isActive={activeIndustry === "Все"}
              onClick={() => setActiveIndustry("Все")}
            />
            {industries.map(({ label, count }) => (
              <FilterButton
                key={label}
                label={label}
                count={count}
                icon={industryIcons[label]}
                isActive={activeIndustry === label}
                onClick={() => setActiveIndustry(label)}
              />
            ))}
          </div>
        </div>

        {/*
          Тринадцать кейсов на телефоне — это очень долгая прокрутка.
          Кнопка перебрасывает сразу за список, к блоку с заявкой.
        */}
        <a
          href="#projects-end"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-[#42A5F5]/40 hover:text-white lg:hidden"
        >
          <ArrowDown className="size-4" aria-hidden />
          Пролистать {filtered.length} {caseWord(filtered.length)}
        </a>

        <AnimatePresence mode="wait">
          <motion.ul
            key={activeIndustry}
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.ul>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-lg text-white/50">
            {projectsPageCopy.emptyFilter}
          </p>
        )}

        <span id="projects-end" className="block scroll-mt-24" aria-hidden />

        {filtered.some((project) => project.illustrative) && (
          <p className="mt-10 border-t border-white/10 pt-6 text-sm text-white/40">
            Часть кадров иллюстрирует сценарий работы системы и снята не на этих
            объектах. Фотографии с площадок заказчика публикуем по согласованию.
          </p>
        )}
      </div>
    </section>
  );
}

function CaseBlock({
  label,
  text,
  accent,
  highlight,
}: {
  label: string;
  text: string;
  accent: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative pl-4",
        highlight && "rounded-r-[10px] bg-white/[0.04] py-3 pr-4"
      )}
    >
      <span
        className="absolute inset-y-0 left-0 w-[2px] rounded-full"
        style={{ background: highlight ? accent : "rgba(255,255,255,0.15)" }}
        aria-hidden
      />
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.12em]"
        style={{ color: highlight ? accent : "rgba(255,255,255,0.4)" }}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 text-sm leading-relaxed md:text-[15px]",
          highlight ? "text-white/90" : "text-white/60"
        )}
      >
        {text}
      </p>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const theme = categoryThemes[project.category];
  const Icon = categoryIcons[project.category];

  return (
    <motion.li variants={cardVariants} layout className="group relative list-none">
      <article
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#133456]/80 transition duration-500",
          "hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        )}
      >
        <div
          className="relative aspect-[16/9] overflow-hidden"
          style={{ background: theme.gradient }}
        >
          {project.image && (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          <CctvFrame />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <span
              className="size-1.5 rounded-full bg-red-500"
              style={{ animation: "projects-rec 1.2s ease-in-out infinite" }}
            />
            REC
          </div>

          {project.year && (
            <div className="absolute right-4 top-4 rounded-md border border-white/20 bg-black/40 px-2 py-1 font-mono text-[10px] text-white/70 backdrop-blur-sm">
              {project.year}
            </div>
          )}

          {!project.image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex size-20 items-center justify-center rounded-2xl border border-white/20 bg-black/25 backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:border-white/40 md:size-24"
                style={{ boxShadow: `0 0 40px ${theme.glow}` }}
              >
                <Icon
                  className="size-10 text-white/90 md:size-12"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0C2340] to-transparent"
            aria-hidden
          />
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-7">
          <div className="flex items-start justify-between gap-3">
            <p
              className="text-xs font-semibold uppercase tracking-[0.1em]"
              style={{ color: theme.accent }}
            >
              {project.category}
            </p>
            {project.scale && (
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/55">
                {project.scale}
              </span>
            )}
          </div>

          <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-white">
            {project.title}
          </h2>

          <p className="mt-1 text-sm text-white/50">{project.industry}</p>

          {project.location && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {project.location}
            </p>
          )}

          <div className="mt-5 space-y-4">
            <CaseBlock label="Задача" text={project.task} accent={theme.accent} />
            <CaseBlock label="Решение" text={project.solution} accent={theme.accent} />
            <CaseBlock
              label="Результат"
              text={project.result}
              accent={theme.accent}
              highlight
            />
          </div>

          {project.stats && project.stats.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-4 border-t border-white/10 pt-4">
              {project.stats.map((stat) => (
                <li key={stat.label}>
                  <p className="font-heading text-lg font-bold text-white md:text-xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/45">{stat.label}</p>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.services.map((service) => {
              const href = serviceLinks[service];
              return href ? (
                <li key={service}>
                  <Link
                    href={href}
                    className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:border-[#1E88E5]/50 hover:bg-[#1E88E5]/15 hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ) : (
                <li
                  key={service}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {service}
                </li>
              );
            })}
          </ul>

          <Link
            href="/contacts"
            className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#42A5F5] transition group-hover:gap-3 hover:text-white"
          >
            Обсудить похожий объект
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </article>
    </motion.li>
  );
}

function CctvFrame() {
  const corner =
    "absolute size-5 border-white/40 transition duration-500 group-hover:border-white/70 group-hover:size-6";

  return (
    <>
      <span className={cn(corner, "left-3 top-3 border-l-2 border-t-2")} aria-hidden />
      <span className={cn(corner, "right-3 top-3 border-r-2 border-t-2")} aria-hidden />
      <span className={cn(corner, "bottom-3 left-3 border-b-2 border-l-2")} aria-hidden />
      <span className={cn(corner, "right-3 bottom-3 border-b-2 border-r-2")} aria-hidden />
    </>
  );
}

