import {
  MONTHS_NOMINATIVE,
  MONTHS_PREPOSITIONAL,
  MONTHS_SHORT,
  plural,
  type ProjectStats,
} from "@/lib/projectCounter";
import { cn } from "@/lib/utils";

const PROJECT_FORMS = ["проект", "проекта", "проектов"] as const;

type ProjectsMonthSummaryProps = {
  stats: ProjectStats;
  /** popover — компактная сводка у счётчика, panel — крупнее, для страницы-источника */
  variant?: "popover" | "panel";
  className?: string;
};

/**
 * Сводка за месяц: сколько сдано с 1-го числа, столбики за полгода,
 * прошлый месяц и среднее. Без библиотек графиков — шесть div.
 */
export function ProjectsMonthSummary({
  stats,
  variant = "popover",
  className,
}: ProjectsMonthSummaryProps) {
  const { currentMonth, previousMonth, history, averagePerMonth } = stats;
  const isPanel = variant === "panel";
  const max = Math.max(...history.map((m) => m.count), 1);
  const monthTitle = `${MONTHS_NOMINATIVE[currentMonth.month - 1]} ${currentMonth.year}`;
  const justStarted = currentMonth.count === 0;

  return (
    <div className={cn("text-left text-white", className)}>
      <div className="flex items-center justify-between gap-3">
        <p
          className={cn(
            "font-semibold uppercase tracking-[0.12em] text-white/55",
            isPanel ? "text-xs" : "text-[11px]"
          )}
        >
          {monthTitle}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/45">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#4ADE80]" />
          </span>
          обновляется
        </span>
      </div>

      <p className={cn("mt-2 flex items-baseline gap-2", isPanel && "mt-3")}>
        <span
          className={cn(
            "font-heading font-bold leading-none tracking-[-0.02em] tabular-nums",
            isPanel ? "text-5xl" : "text-[32px]"
          )}
        >
          {currentMonth.count}
        </span>
        <span className={cn("text-white/70", isPanel ? "text-base" : "text-[13px]")}>
          {justStarted
            ? "месяц только начался"
            : `${plural(currentMonth.count, PROJECT_FORMS)} сдано с начала месяца`}
        </span>
      </p>

      <div
        className={cn("mt-4 flex items-end gap-1.5", isPanel ? "h-24 gap-3" : "h-9")}
        role="img"
        aria-label={history
          .map((m) => `${MONTHS_NOMINATIVE[m.month - 1]}: ${m.count}`)
          .join(", ")}
      >
        {history.map((m, index) => {
          const isCurrent = index === history.length - 1;
          return (
            <div
              key={`${m.year}-${m.month}`}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <span
                className={cn(
                  "block w-full transition-[height] duration-500",
                  isPanel ? "max-w-[28px] rounded-[6px]" : "max-w-[14px] rounded-[4px]",
                  isCurrent ? "bg-[#F25C1F]" : "bg-[#42A5F5]/45"
                )}
                style={{ height: `${Math.max(8, (m.count / max) * 100)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className={cn("mt-1.5 flex gap-1.5", isPanel && "gap-3")} aria-hidden>
        {history.map((m, index) => (
          <span
            key={`${m.year}-${m.month}`}
            className={cn(
              "flex-1 text-center tabular-nums",
              isPanel ? "text-xs" : "text-[10px]",
              index === history.length - 1 ? "text-white/80" : "text-white/40"
            )}
          >
            {isPanel ? `${MONTHS_SHORT[m.month - 1]} · ${m.count}` : MONTHS_SHORT[m.month - 1]}
          </span>
        ))}
      </div>

      <p
        className={cn(
          "mt-3 border-t border-white/10 pt-3 text-white/55",
          isPanel ? "text-sm" : "text-[12px] leading-snug"
        )}
      >
        В {MONTHS_PREPOSITIONAL[previousMonth.month - 1]} — {previousMonth.count}
        <span className="mx-1.5 text-white/25">·</span>в среднем {averagePerMonth} в месяц
      </p>
    </div>
  );
}
