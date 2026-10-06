"use client";

import Link from "next/link";
import CountUp from "react-countup";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";

import { companyFacts } from "@/lib/data/site";
import { getSourceHref } from "@/lib/data/sources";
import {
  MONTHS_PREPOSITIONAL,
  PROJECT_COUNTER,
  formatCount,
  plural,
} from "@/lib/projectCounter";
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
    value: companyFacts.yearsOnMarket,
    label: "лет",
    title: "на рынке систем безопасности в России",
    variant: "light",
    desktopHeight: "lg:min-h-[520px]",
    icon: "shield",
    highlight: "orange",
  },
  {
    id: "projects",
    value: 1148,
    label: "проектов",
    title: "реализовано на коммерческих и промышленных объектах",
    variant: "blue",
    desktopHeight: "lg:min-h-[620px]",
    desktopOffset: "lg:mt-16",
    icon: "camera",
    highlight: "white",
  },
  {
    id: "objects",
    value: 100,
    suffix: "%",
    label: "объектов",
    title: "сданы в срок по договору",
    variant: "blue",
    desktopHeight: "lg:min-h-[540px]",
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
    desktopHeight: "lg:min-h-[480px]",
    desktopOffset: "lg:mt-8",
    icon: "shield",
    highlight: "orange",
  },
];

const valueClassName =
  "whitespace-nowrap leading-none font-bold tracking-[-0.03em] text-[clamp(64px,22vw,120px)] md:text-[150px] lg:text-[200px]";

/**
 * На устройствах без наведения (телефон, планшет) — true, когда середина
 * экрана дошла до карточки. Срабатывает один раз.
 */
function useRevealAtCenter(ref: RefObject<HTMLElement>, enabled: boolean) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      // Узкая полоса посередине экрана
      { rootMargin: "-45% 0px -45% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, enabled]);

  return revealed;
}

const PROJECT_FORMS = ["проект", "проекта", "проектов"] as const;

/**
 * Число проектов на главной и строки за месяц под ним.
 *
 * Десктоп: наведение на синюю карточку показывает «N проектов сдано
 * с начала месяца» (тем же шрифтом, медленный серо-белый перелив),
 * наведение на эту строку — ещё «в среднем 10 в месяц».
 * Телефон: обе строки появляются сами, когда карточка доходит
 * до середины экрана (data-revealed на карточке). Нажимать ничего не нужно.
 */
function ProjectsStat({ inView, className }: { inView: boolean; className: string }) {
  const stats = useProjectStats();
  const total = stats?.total ?? PROJECT_COUNTER.baseTotal;

  let monthLine = "";
  if (stats) {
    const { currentMonth, previousMonth } = stats;
    monthLine =
      currentMonth.count > 0
        ? `${currentMonth.count} ${plural(currentMonth.count, PROJECT_FORMS)} сдано с начала месяца`
        : `${previousMonth.count} ${plural(previousMonth.count, PROJECT_FORMS)} сдано в ${MONTHS_PREPOSITIONAL[previousMonth.month - 1]}`;
  }

  const numberRef = useRef<HTMLSpanElement | null>(null);
  const metrics = useNumberMetrics(numberRef);

  const reveal =
    "opacity-0 translate-y-1 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-data-[revealed=true]:translate-y-0 group-data-[revealed=true]:opacity-100";

  return (
    <div className="mt-2">
      <p className={className} aria-label={`${formatCount(total)} проектов`}>
        <span ref={numberRef} className="inline-block">
          {inView && stats ? <CountUp end={total} duration={2} separator="" /> : 0}
        </span>
      </p>

      {/*
        Строки мелкие и почти вплотную под цифрами: отступ снизу у строки
        цифр (место под «хвосты» букв) снимается отрицательным margin.
        Ширина блока = ширина числа, текст прижат к его правому краю.
      */}
      <div
        className="group/month"
        style={metrics ? { width: metrics.width, marginTop: -metrics.gapBelow + 6 } : undefined}
      >
        <p
          className={cn(
            "text-right text-[13px] font-semibold leading-snug [text-wrap:balance] md:text-[15px] lg:text-[18px]",
            reveal
          )}
        >
          <span className="stat-sheen">{monthLine || "\u00A0"}</span>
        </p>
        <p
          className={cn(
            "mt-0.5 text-right text-[11px] font-medium text-white/65 md:text-[12px] lg:text-[14px]",
            "opacity-0 transition-opacity duration-500 ease-out group-hover/month:opacity-100 group-data-[revealed=true]:opacity-100"
          )}
        >
          {stats ? `в среднем ${stats.averagePerMonth} в месяц` : "\u00A0"}
        </p>
      </div>
    </div>
  );
}

/**
 * Ширина числа и пустое место под цифрами внутри строки (у цифр нет
 * «хвостов», а строка оставляет под них место). Следит за шириной числа:
 * она меняется при счёте и при повороте экрана.
 */
function useNumberMetrics(numberRef: RefObject<HTMLElement>) {
  const [metrics, setMetrics] = useState<{ width: number; gapBelow: number } | null>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;
    const ctx = document.createElement("canvas").getContext("2d");

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (!rect.width) return;
      const style = getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);
      let gapBelow = fontSize * 0.2;
      if (ctx) {
        ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
        const m = ctx.measureText("0123456789");
        const ascent = m.fontBoundingBoxAscent;
        const descent = m.fontBoundingBoxDescent;
        if (ascent && descent) {
          // Высота строки = высоте блока; базовая линия делит лишнее место поровну
          const baseline = (rect.height - (ascent + descent)) / 2 + ascent;
          gapBelow = Math.max(0, rect.height - baseline - m.actualBoundingBoxDescent);
        }
      }
      setMetrics({ width: rect.width, gapBelow });
    };

    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [numberRef]);

  return metrics;
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
  const revealed = useRevealAtCenter(ref, card.id === "projects");
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
      data-revealed={revealed}
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        // Без overflow-hidden: сводка у счётчика может выходить за край
        // карточки. z-30 при наведении/фокусе — чтобы она легла поверх соседней
        "group relative rounded-[24px] p-8 hover:z-30 focus-within:z-30 md:p-10 lg:p-14",
        // min-h, а не h: высота растёт под текст. С жёсткой высотой подпись
        // вылезала за карточку (у «Клиентов» на 1024, у «Проектов» везде)
        "flex flex-col self-start min-h-[360px] md:min-h-[440px]",
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

      <div className="relative z-10 flex flex-1 flex-col justify-between">
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
            <ProjectsStat inView={inView} className={cn(valueClassName, valueColor)} />
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
            Компания в цифрах
          </h2>
          <p className="mt-6 text-[18px] text-white/70 md:text-[20px]">
            За {companyFacts.yearsOnMarket} лет работы мы реализовали более тысячи проектов по всей России.
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
