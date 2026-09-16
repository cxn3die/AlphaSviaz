"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Briefcase,
  FileCheck,
  PhoneIncoming,
  Trophy,
  Wrench,
} from "lucide-react";

import { videoSurveillanceFlowCopy } from "@/lib/data/projectFlow";
import { cn } from "@/lib/utils";

const channelIcons = {
  tender: Trophy,
  inbound: PhoneIncoming,
  sales: Briefcase,
} as const;

export function ServiceProjectFlowSection() {
  const { eyebrow, title, subtitle, channels, production, note } =
    videoSurveillanceFlowCopy;

  return (
    <section className="border-t border-white/8 bg-[#0E2542] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#64B5F6]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-white/60 md:text-lg">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {channels.map((channel, index) => {
            const Icon = channelIcons[channel.id as keyof typeof channelIcons];
            return (
              <motion.article
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full blur-2xl"
                  style={{ backgroundColor: `${channel.accent}22` }}
                  aria-hidden
                />
                <div className="relative flex items-center gap-3">
                  <span
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${channel.accent}22`, color: channel.accent }}
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {channel.title}
                  </h3>
                </div>
                <ol className="relative mt-5 space-y-2.5">
                  {channel.steps.map((step, stepIndex) => (
                    <li
                      key={step}
                      className="flex gap-3 text-sm leading-snug text-white/65"
                    >
                      <span
                        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          backgroundColor: `${channel.accent}18`,
                          color: channel.accent,
                        }}
                      >
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center" aria-hidden>
          <div className="flex flex-col items-center gap-1 text-[#64B5F6]/60">
            <ArrowDown className="size-6" />
            <ArrowDown className="size-6 -mt-3" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-4 max-w-3xl rounded-2xl border border-[#42A5F5]/25 bg-gradient-to-br from-[#1E88E5]/15 via-[#133456] to-[#0C2340] p-6 md:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#42A5F5]/15 text-[#64B5F6]">
              <Wrench className="size-5" strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="font-heading text-xl font-bold text-white">
              {production.title}
            </h3>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {production.steps.map((step, index) => (
              <li
                key={step}
                className={cn(
                  "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
                )}
              >
                <FileCheck className="mt-0.5 size-4 shrink-0 text-[#64B5F6]" aria-hidden />
                <span>
                  <span className="font-semibold text-white/90">
                    {index + 1}.{" "}
                  </span>
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/45">
          {note}
        </p>
      </div>
    </section>
  );
}
