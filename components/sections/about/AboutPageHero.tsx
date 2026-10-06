"use client";

import { motion } from "framer-motion";

import { BlueprintPattern } from "@/components/decorative/BlueprintPattern";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { StatParallelograms } from "@/components/stats/StatParallelograms";
import { aboutPageCopy, companyInfo } from "@/lib/data/company";

export function AboutPageHero() {
  const { hero, stats } = aboutPageCopy;

  return (
    <section className="relative -mt-20 pt-20 overflow-hidden bg-[#102A4A] text-white">
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
        <Breadcrumbs className="mb-8" />

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

        <StatParallelograms items={stats} className="mt-14 lg:mr-3" />
      </div>
    </section>
  );
}
