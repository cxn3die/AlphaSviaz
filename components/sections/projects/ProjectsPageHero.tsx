"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { LiveProjectsTotal } from "@/components/stats/LiveProjectsTotal";
import { projectsPageCopy, projectsPageStats } from "@/lib/data/projects";

export function ProjectsPageHero() {
  const { hero } = projectsPageCopy;

  return (
    <section className="relative overflow-hidden bg-[#102A4A] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_70%_-20%,rgba(66,165,245,0.35),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,rgba(30,136,229,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 pb-14 pt-12 md:pb-20 md:pt-16">
        <nav
          aria-label="Хлебные крошки"
          className="mb-8 flex flex-wrap items-center gap-1 text-sm text-white/60"
        >
          <Link href="/" className="transition hover:text-[#42A5F5]">
            Главная
          </Link>
          <ChevronRight className="size-4 shrink-0 text-white/30" aria-hidden />
          <span className="text-white/90">Проекты</span>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#42A5F5]/30 bg-[#42A5F5]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#90CAF9]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#42A5F5] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#42A5F5]" />
              </span>
              {hero.eyebrow}
            </div>

            <span className="mb-4 block h-1 w-14 rounded-full bg-[#42A5F5]" />

            <h1 className="font-heading text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              {hero.description}
            </p>
          </motion.div>

        </div>

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-16 lg:gap-4"
        >
          {projectsPageStats.map((stat) => (
            <li
              key={stat.id}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm md:px-5 md:py-5"
            >
              <p className="font-heading text-2xl font-bold text-[#64B5F6] md:text-3xl">
                {stat.id === "projects" ? <LiveProjectsTotal /> : stat.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-white/55 md:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
