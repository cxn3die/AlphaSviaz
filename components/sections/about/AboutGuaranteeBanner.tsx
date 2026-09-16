"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Shield } from "lucide-react";

import { aboutPageCopy, companyInfo } from "@/lib/data/company";

export function AboutGuaranteeBanner() {
  const { guarantee } = aboutPageCopy;

  return (
    <section className="relative overflow-hidden bg-[#0C2340] py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-[#42A5F5]/25 bg-gradient-to-br from-[#1E88E5]/20 via-[#133456] to-[#0E2542] p-8 md:p-12"
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#42A5F5]/15 blur-[80px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-[#1E88E5]/12 blur-[70px]"
            aria-hidden
          />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-[#42A5F5]/30 bg-[#42A5F5]/10">
                <Shield className="size-8 text-[#64B5F6]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#64B5F6]">
                  Наше обещание
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-white md:text-3xl">
                  {guarantee.title}
                </h2>
                <p className="mt-2 max-w-lg text-base text-white/70">{guarantee.description}</p>
              </div>
            </div>
            <Link
              href="/contacts"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1E88E5] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#42A5F5] hover:shadow-[0_12px_32px_rgba(30,136,229,0.35)]"
            >
              Обсудить проект
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </motion.div>

        {/*
          Раньше под группу был отдельный блок с тремя карточками —
          он пересказывал первый экран и занимал экран впустую.
          Клиенту достаточно знать факт принадлежности.
        */}
        <p className="mt-8 flex items-start gap-2.5 text-sm leading-relaxed text-white/45">
          <Building2 className="mt-0.5 size-4 shrink-0 text-white/35" aria-hidden />
          <span>
            «Альфа-Связь» входит в группу компаний «{companyInfo.groupName}» —
            инженерные системы, теплоэнергоснабжение и пожарная безопасность.
          </span>
        </p>
      </div>
    </section>
  );
}
