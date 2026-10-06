"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FileSearch, PhoneCall, UserRoundSearch } from "lucide-react";
import { useRef } from "react";

import { BlueprintPattern } from "@/components/decorative/BlueprintPattern";
import { aboutPageCopy } from "@/lib/data/company";
import { workSteps } from "@/lib/data/workSteps";

/** Три канала, с которых приходит заявка — дальше маршрут общий */
const channels = [
  { id: "tender", label: "Тендерные площадки", icon: FileSearch },
  { id: "inbound", label: "Входящий звонок", icon: PhoneCall },
  { id: "sales", label: "Активные продажи", icon: UserRoundSearch },
] as const;

export function AboutProcessTimeline() {
  const { process } = aboutPageCopy;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A1F38] py-20 md:py-24"
    >
      <BlueprintPattern variant="network" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#64B5F6]">
            {process.title}
          </p>
          <p className="mt-3 text-lg text-white/65">{process.subtitle}</p>
        </div>

        <ChannelMerge />

        <div className="relative mt-10 hidden lg:block">
          <div className="absolute left-0 right-0 top-[2.75rem] h-0.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#1E88E5] via-[#64B5F6] to-[#1E88E5]"
              style={{ scaleX: lineScale }}
            />
          </div>
          <ol className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {workSteps.map((step, index) => (
              <ProcessStep
                key={step.step}
                step={step}
                index={index}
                variant="desktop"
              />
            ))}
          </ol>
        </div>

        <ol className="relative mt-10 space-y-0 lg:hidden">
          <div className="absolute bottom-4 left-[1.125rem] top-4 w-0.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="w-full origin-top rounded-full bg-gradient-to-b from-[#1E88E5] to-[#64B5F6]"
              style={{ scaleY: lineScale }}
            />
          </div>
          {workSteps.map((step, index) => (
            <ProcessStep
              key={step.step}
              step={step}
              index={index}
              variant="mobile"
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Подзаголовок обещает, что три канала сходятся в один маршрут —
 * этот блок показывает слияние, а не только рассказывает о нём.
 */
function ChannelMerge() {
  return (
    <div className="mt-12">
      <ul className="grid gap-3 sm:grid-cols-3">
        {channels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <motion.li
              key={channel.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.05] px-4 py-3.5 backdrop-blur-sm"
            >
              <Icon
                className="size-5 shrink-0 text-[#64B5F6]"
                strokeWidth={1.75}
              />
              <span className="text-sm font-medium text-white/85">
                {channel.label}
              </span>
            </motion.li>
          );
        })}
      </ul>

      {/* Три ветки стекаются в одну точку */}
      <svg
        className="h-14 w-full text-[#42A5F5] md:h-16"
        viewBox="0 0 600 64"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <path
          d="M100 0v12c0 10 8 18 18 18h164c10 0 18 8 18 18v16"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
        <path d="M300 0v64" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
        <path
          d="M500 0v12c0 10-8 18-18 18H318c-10 0-18 8-18 18v16"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
        <circle cx="300" cy="62" r="4" fill="currentColor" opacity="0.75" />
      </svg>

      <p className="text-center text-sm text-white/45">
        Дальше любая заявка проходит одни и те же этапы
      </p>
    </div>
  );
}

function ProcessStep({
  step,
  index,
  variant,
}: {
  step: (typeof workSteps)[number];
  index: number;
  variant: "desktop" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <motion.li
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ delay: index * 0.08, duration: 0.45 }}
        className="relative flex gap-6 pb-8 pl-12 last:pb-0"
      >
        <span className="absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border-2 border-[#42A5F5] bg-[#0A1F38] font-heading text-sm font-bold text-[#64B5F6]">
          {step.step}
        </span>
        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-5">
          <h3 className="font-heading text-lg font-bold text-white">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {step.description}
          </p>
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex h-full flex-col pt-14 text-center"
    >
      <span className="absolute left-1/2 top-0 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#42A5F5] bg-[#0A1F38] font-heading text-lg font-bold text-[#64B5F6] shadow-[0_0_24px_rgba(66,165,245,0.2)]">
        {step.step}
      </span>
      {/* flex-1 — карточки одной высоты, иначе низ ряда рвётся */}
      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
        <h3 className="font-heading text-base font-bold text-white">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}
