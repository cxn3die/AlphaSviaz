"use client";

import { ProjectsMonthSummary } from "@/components/stats/ProjectsMonthSummary";
import { useProjectStats } from "@/lib/useProjectStats";

/** Сводка по месяцам на странице-источнике «Реализованные проекты» */
export function ProjectsLivePanel() {
  const stats = useProjectStats();

  return (
    <div className="min-h-[260px] rounded-[20px] border border-white/10 bg-[#071A2F]/70 p-6 md:p-8">
      {stats ? (
        <ProjectsMonthSummary stats={stats} variant="panel" />
      ) : (
        <div className="h-[200px] animate-pulse rounded-xl bg-white/[0.04]" aria-hidden />
      )}
    </div>
  );
}
