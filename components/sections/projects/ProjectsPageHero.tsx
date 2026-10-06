"use client";

import { motion } from "framer-motion";

import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { projectsPageCopy } from "@/lib/data/projects";

/**
 * Первый экран страницы проектов. Плашка «Портфолио объектов» и четыре
 * блока со статистикой убраны по решению владельца (статистика живёт на
 * странице «О компании»).
 */
export function ProjectsPageHero() {
  const { hero } = projectsPageCopy;

  return (
    <section className="relative -mt-20 overflow-hidden bg-[#102A4A] pt-20 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_70%_-20%,rgba(66,165,245,0.35),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,rgba(30,136,229,0.18),transparent_55%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 pb-14 pt-12 md:pb-20 md:pt-16">
        <Breadcrumbs className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="mb-5 block h-1 w-14 rounded-full bg-[#F25C1F]" />
          <h1 className="font-heading text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            {hero.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
