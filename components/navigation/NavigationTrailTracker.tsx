"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { visit } from "@/lib/navigationTrail";

/**
 * Отмечает каждый переход по сайту в пути для крошек — в том числе
 * заход на главную, где крошек нет, но путь должен сброситься.
 */
export function NavigationTrailTracker() {
  const pathname = usePathname();

  useEffect(() => {
    visit(pathname);
  }, [pathname]);

  return null;
}
