"use client";

import { useEffect, useState } from "react";

import { getProjectStats, type ProjectStats } from "@/lib/projectCounter";

/**
 * Статистика проектов на текущий момент.
 *
 * Считается только в браузере: сайт статический и собирается редко,
 * а число должно меняться каждый день. До монтирования — null,
 * компоненты в это время показывают PROJECT_COUNTER.baseTotal.
 */
export function useProjectStats(): ProjectStats | null {
  const [stats, setStats] = useState<ProjectStats | null>(null);

  useEffect(() => {
    const update = () => setStats(getProjectStats());
    update();
    // Вкладку могут держать открытой через полночь
    const timer = window.setInterval(update, 30 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return stats;
}
