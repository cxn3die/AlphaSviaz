"use client";

import { PROJECT_COUNTER, formatCount } from "@/lib/projectCounter";
import { useProjectStats } from "@/lib/useProjectStats";

/** Текущее число сданных проектов — для плашек со статистикой */
export function LiveProjectsTotal() {
  const stats = useProjectStats();
  return <>{formatCount(stats?.total ?? PROJECT_COUNTER.baseTotal)}</>;
}
