"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { BlueprintPattern } from "@/components/decorative/BlueprintPattern";
import { aboutPageCopy, companyInfo } from "@/lib/data/company";

export function AboutPageHero() {
  const { hero, stats } = aboutPageCopy;

  return (
    <section className="relative overflow-hidden bg-[#102A4A] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_20%_-30%,rgba(66,165,245,0.38),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_80%,rgba(30,136,229,0.2),transparent_50%)]"
        aria-hidden
      />
      <BlueprintPattern variant="plan" />

      <div className="container relative z-10 mx-auto px-4 pb-14 pt-12 md:pb-20 md:pt-16">
        <nav
          aria-label="Хлебные крошки"
          className="mb-8 flex flex-wrap items-center gap-1 text-sm text-white/60"
        >
          <Link href="/" className="transition hover:text-[#64B5F6]">
            Главная
          </Link>
          <ChevronRight className="size-4 shrink-0 text-white/30" aria-hidden />
          <span className="text-white/90">О компании</span>
        </nav>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#64B5F6]">
              {hero.eyebrow}
            </p>
            <span className="mt-4 mb-5 block h-1 w-16 rounded-full bg-[#42A5F5]" />
            <h1 className="font-heading text-[clamp(2rem,5.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
              {hero.description}
            </p>
            <p className="mt-4 text-sm text-white/45">
              {companyInfo.brand} · {companyInfo.tagline}
            </p>
          </motion.div>

        </div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
        >
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur-sm md:py-5"
            >
              <p className="font-heading text-2xl font-bold text-[#64B5F6] md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-white/55 md:text-sm">{stat.label}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
