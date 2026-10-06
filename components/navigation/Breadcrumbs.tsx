"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { normalizePath } from "@/lib/navigation";
import { PAGE_TITLES, structuralTrail, visit } from "@/lib/navigationTrail";
import { cn } from "@/lib/utils";

/** Сколько крошек показывать; длиннее — середина сворачивается в «…» */
const MAX_VISIBLE = 4;

/**
 * Крошки по реальному пути посетителя (см. lib/navigationTrail.ts).
 * На сервере и до загрузки скриптов — путь по структуре сайта.
 */
export function Breadcrumbs({ className }: { className?: string }) {
  const path = normalizePath(usePathname());
  const [trail, setTrail] = useState<string[]>(() => structuralTrail(path));

  useEffect(() => {
    setTrail(visit(path));
  }, [path]);

  const hidden = trail.length > MAX_VISIBLE ? trail.slice(1, trail.length - (MAX_VISIBLE - 2)) : [];
  const visible =
    hidden.length > 0 ? [trail[0], "…", ...trail.slice(trail.length - (MAX_VISIBLE - 2))] : trail;

  return (
    <nav
      aria-label="Хлебные крошки"
      className={cn("flex flex-wrap items-center gap-1 text-sm text-white/60", className)}
    >
      {visible.map((item, index) => {
        const isLast = index === visible.length - 1;
        return (
          <Fragment key={`${item}-${index}`}>
            {index > 0 && <ChevronRight className="size-4 shrink-0 text-white/30" aria-hidden />}
            {item === "…" ? (
              <span
                className="px-0.5 text-white/40"
                title={hidden.map((p) => PAGE_TITLES[p]).join(" › ")}
              >
                …
              </span>
            ) : isLast ? (
              <span className="text-white/90" aria-current="page">
                {PAGE_TITLES[item]}
              </span>
            ) : (
              <Link href={item} className="transition hover:text-[#64B5F6]">
                {PAGE_TITLES[item]}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
