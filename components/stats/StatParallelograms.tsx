"use client";

import { motion } from "framer-motion";

import { LiveProjectsTotal } from "@/components/stats/LiveProjectsTotal";
import { cn } from "@/lib/utils";

export type StatItem = { id: string; value: string; label: string };

/**
 * Четыре цифры компании полосой из параллелограммов, которые заходят
 * друг на друга. Скошен только фон — текст остаётся ровным. Оттенок
 * нарастает слева направо к фирменному синему, последний блок —
 * с оранжевой кромкой.
 *
 * На телефоне — сетка 2×2 с тем же скосом.
 */
const shades = [
  "bg-white/[0.05] border-white/12",
  "bg-[#1E88E5]/[0.12] border-[#42A5F5]/20",
  "bg-[#1E88E5]/[0.22] border-[#42A5F5]/30",
  "bg-[#1E88E5]/[0.85] border-[#F25C1F]",
];

export function StatParallelograms({ items, className }: { items: StatItem[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-3 gap-y-3 lg:flex lg:gap-0", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: "easeOut" }}
            className={cn(
              "group relative min-w-0 flex-1 px-6 py-5 md:px-8 md:py-6",
              // на десктопе блоки наезжают друг на друга — «вливаются»
              index > 0 && "lg:-ml-3"
            )}
            style={{ zIndex: index + 1 }}
          >
            <span
              className={cn(
                "absolute inset-0 -skew-x-[14deg] rounded-[6px] border backdrop-blur-sm transition-colors duration-300",
                shades[index % shades.length],
                isLast ? "border-b-[3px] border-l-0 border-r-0 border-t-0" : "group-hover:border-white/25"
              )}
              aria-hidden
            />
            <div className="relative">
              <p className="whitespace-nowrap font-heading text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-none tracking-[-0.02em] text-white">
                {item.id === "projects" ? <LiveProjectsTotal /> : item.value}
              </p>
              <p
                className={cn(
                  "mt-2 text-[13px] font-medium leading-snug md:text-sm",
                  isLast ? "text-white/85" : "text-white/55"
                )}
              >
                {item.label}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
