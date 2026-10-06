"use client";

import Link from "next/link";
import CountUp from "react-countup";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useId, useRef, useState, type FocusEvent } from "react";

import { ProjectsMonthSummary } from "@/components/stats/ProjectsMonthSummary";
import { getSourceHref } from "@/lib/data/sources";
import { PROJECT_COUNTER, formatCount } from "@/lib/projectCounter";
import { useProjectStats } from "@/lib/useProjectStats";
import { cn } from "@/lib/utils";

type AchievementCardData = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  title: string;
  variant: "light" | "blue";
  desktopHeight: string;
  desktopOffset?: string;
  icon: "camera" | "shield" | "access";
  highlight: "orange" | "white";
};

const cards: AchievementCardData[] = [
  {
    id: "years",
    value: 12,
    label: "лет",
    title: "на рынке систем безопасности в России",
    variant: "light",
    desktopHeight: "lg:h-[520px]",
    icon: "shield",
    highlight: "orange",
  },
  {
    id: "projects",
    value: 1148,
    label: "проектов",
    title: "реализовано на коммерческих и промышленных объектах",
    variant: "blue",
    desktopHeight: "lg:h-[620px]",
    desktopOffset: "lg:mt-16",
    icon: "camera",
    highlight: "white",
  },
  {
    id: "objects",
    value: 100,
    suffix: "%",
    label: "объектов",
    title: "сданы в срок и работают без сбоев",
    variant: "blue",
    desktopHeight: "lg:h-[540px]",
    desktopOffset: "lg:-mt-8",
    icon: "access",
    highlight: "white",
  },
  {
    id: "clients",
    value: 500,
    suffix: "+",
    label: "клиентов",
    title: "доверяют нам безопасность своих объектов",
    variant: "light",
    desktopHeight: "lg:h-[480px]",
    desktopOffset: "lg:mt-8",
    icon: "shield",
    highlight: "orange",
  },
];

const valueClassName =
  "whitespace-nowrap leading-none font-bold tracking-[-0.03em] text-[clamp(64px,22vw,120px)] md:text-[150px] lg:text-[200px]";

/**
 * Число проектов на главной. При наведении (на телефоне — по нажатию,
 * с клавиатуры — по фокусу) показывает небольшую сводку за месяц.
 */
function ProjectsValue({ inView, className }: { inView: boolean; className: string }) {
  const stats = useProjectStats();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pointerTypeRef = useRef<string>("mouse");
  const summaryId = useId();
  const total = stats?.total ?? PROJECT_COUNTER.baseTotal;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const onFocus = (event: FocusEvent<HTMLButtonElement>) => {
    // Открываем только при фокусе с клавиатуры: касание тоже даёт фокус,
    // и без проверки тап сначала открывал бы сводку, а click сразу закрывал
    if (event.currentTarget.matches(":focus-visible")) setOpen(true);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative mt-2 inline-block"
      // Pointer, а не mouse-события: после тапа браузер шлёт ещё и
      // эмулированный mouseenter, и сводка открывалась и тут же закрывалась
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={summaryId}
        aria-label={`${formatCount(total)} проектов. Сводка за месяц`}
        onPointerDown={(event) => {
          pointerTypeRef.current = event.pointerType;
        }}
        onClick={() => {
          if (pointerTypeRef.current !== "mouse") setOpen((value) => !value);
        }}
        onFocus={onFocus}
        onBlur={() => setOpen(false)}
        className={cn(
          "cursor-default rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
          className
        )}
      >
        {inView && stats ? (
          <CountUp end={total} duration={2} separator="" />
        ) : (
          0
        )}
      </button>

      <AnimatePresence>
        {open && stats && (
          <motion.div
            id={summaryId}
            role="status"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full z-30 mt-3 w-[272px] max-w-[calc(100vw-6rem)] origin-top-left rounded-2xl border border-white/10 bg-[#071A2F]/95 p-4 shadow-[0_18px_50px_rgba(7,26,47,0.45)] backdrop-blur-md"
          >
            <ProjectsMonthSummary stats={stats} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function DecorativeCamera() {
  return (
    <svg viewBox="0 0 220 220" fill="none" className="h-full w-full">
      <rect x="24" y="72" width="172" height="96" rx="26" stroke="currentColor" strokeWidth="6" />
      <circle cx="110" cy="120" r="28" stroke="currentColor" strokeWidth="6" />
      <path d="M70 72v-18h80v18" stroke="currentColor" strokeWidth="6" />
      <path d="M55 168v26m110-26v26" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function DecorativeShield() {
  return (
    <svg viewBox="0 0 220 220" fill="none" className="h-full w-full">
      <path
        d="M110 26c20 17 42 26 64 26v56c0 48-29 71-62 82a9 9 0 0 1-4 0c-33-11-62-34-62-82V52c22 0 44-9 64-26z"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path d="m78 113 20 20 44-44" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function DecorativeAccess() {
  return (
    <svg viewBox="0 0 220 220" fill="none" className="h-full w-full">
      <rect x="46" y="26" width="128" height="168" rx="20" stroke="currentColor" strokeWidth="6" />
      <path d="M78 70h64M78 102h64M78 134h64" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <circle cx="150" cy="166" r="12" stroke="currentColor" strokeWidth="6" />
    </svg>
  );
}

function AchievementCard({
  card,
  darkMode = false,
  className,
}: {
  card: AchievementCardData;
  darkMode?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isBlue = card.variant === "blue";
  const isOrangeHighlight = card.highlight === "orange";

  const Icon = card.icon === "camera" ? DecorativeCamera : card.icon === "access" ? DecorativeAccess : DecorativeShield;
  const valueColor = isBlue
    ? "text-white"
    : isOrangeHighlight
      ? "text-[#F25C1F]"
      : darkMode
        ? "text-white"
        : "text-[#1E88E5]";

  return (
    <motion.article
      ref={ref}
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        // Без overflow-hidden: сводка у счётчика может выходить за край
        // карточки. z-30 при наведении/фокусе — чтобы она легла поверх соседней
        "group relative rounded-[24px] p-8 hover:z-30 focus-within:z-30 md:p-10 lg:p-14",
        "h-[360px] md:h-[440px]",
        isBlue
          ? "bg-[#1E88E5] text-white hover:bg-[#1976D2] hover:shadow-[0_24px_60px_rgba(7,26,47,0.2)]"
          : darkMode
            ? "border border-white/15 bg-white/6 text-white backdrop-blur-[20px] hover:shadow-[0_24px_60px_rgba(7,26,47,0.22)]"
            : "border border-[#E5E9F0] bg-white text-[#101828] hover:shadow-[0_24px_60px_rgba(7,26,47,0.12)]",
        card.desktopHeight,
        card.desktopOffset,
        className
      )}
    >
      <Link
        href={getSourceHref(card.id)}
        className={cn(
          "absolute right-8 top-8 z-20 rounded-full px-5 py-2 text-[13px] font-medium lowercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          isBlue
            ? "border border-white/40 text-white hover:bg-white/10"
            : darkMode
              ? "border border-white/30 text-white/80 hover:bg-white/10 hover:text-white"
              : "border border-[#E5E9F0] text-[#475467] hover:bg-[rgba(242,92,31,0.1)] hover:text-[#F25C1F]"
        )}
      >
        источник
      </Link>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <p
            className={cn(
              "text-[12px] font-semibold uppercase tracking-[0.1em] md:text-[14px]",
              isBlue
                ? "text-white/85"
                : isOrangeHighlight
                  ? "text-[#F25C1F]"
                  : darkMode
                    ? "text-white/85"
                    : "text-[#1E88E5]"
            )}
          >
            {card.label}
            {card.id === "projects" && (
              <span className="relative ml-2 inline-flex size-1.5 align-middle" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-50" />
                <span className="relative inline-flex size-1.5 rounded-full bg-white" />
              </span>
            )}
          </p>
          {card.id === "projects" ? (
            <ProjectsValue inView={inView} className={cn(valueClassName, valueColor)} />
          ) : (
            <p className={cn("mt-2", valueClassName, valueColor)}>
              {inView ? <CountUp end={card.value} duration={2} separator="" /> : 0}
              {card.suffix ?? ""}
            </p>
          )}
          <span
            className={cn(
              "mt-4 block h-[3px] w-10 rounded-full",
              isBlue ? "bg-white/95" : "bg-[#F25C1F]"
            )}
          />
        </div>

        <p
          className={cn(
            "max-w-[22ch] text-[22px] font-semibold leading-[1.1] lg:text-[28px]",
            isBlue ? "text-white" : darkMode ? "text-white" : "text-[#101828]"
          )}
        >
          {card.title}
        </p>
      </div>

      {/* Обрезка только у декоративной иконки — она выступает за угол карточки */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]" aria-hidden>
        <div
          className={cn(
            "absolute -right-10 bottom-[-24px] h-[220px] w-[220px] transition-transform duration-500 ease-out group-hover:translate-x-2 md:h-[250px] md:w-[250px] lg:h-[280px] lg:w-[280px]",
            isBlue ? "text-white/30" : darkMode ? "text-white/20" : "text-[#F25C1F]/20"
          )}
        >
          <Icon />
        </div>
      </div>
    </motion.article>
  );
}

export function AchievementsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={sectionRef}
      id="numbers"
      className="numbers-section relative overflow-hidden bg-transparent pb-20 pt-24 md:pb-24 md:pt-28 lg:pb-28 lg:pt-32"
    >
      <motion.p
        style={{ y: parallaxY }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[clamp(80px,22vw,380px)] font-extrabold tracking-[-0.04em] text-[rgba(255,255,255,0.06)]"
      >
        АЛЬФА-СВЯЗЬ
      </motion.p>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          <p className="text-[14px] font-semibold uppercase tracking-[0.1em] text-[#42A5F5]">
            Цифры и факты
          </p>
          <h2 className="mt-4 text-[40px] font-bold leading-tight text-white md:text-[48px] lg:text-[56px]">
            Нам доверяют безопасность
          </h2>
          <p className="mt-6 text-[18px] text-white/70 md:text-[20px]">
            За 12 лет работы мы реализовали более тысячи проектов по всей России.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:mt-20 lg:grid-cols-12 lg:gap-8"
        >
          <AchievementCard darkMode card={cards[0]} className="lg:col-span-6" />
          <AchievementCard darkMode card={cards[1]} className="lg:col-span-6" />
          <AchievementCard darkMode card={cards[2]} className="lg:col-span-6" />
          <AchievementCard darkMode card={cards[3]} className="lg:col-span-6" />
        </motion.div>
      </div>
    </section>
  );
}
