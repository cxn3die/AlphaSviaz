"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState } from "react";

import { projectTeamCopy, projectTeamRoles } from "@/lib/data/projectTeam";
import { assetPath, cn } from "@/lib/utils";

export function AboutProjectTeamSection() {
  const { eyebrow, title, subtitle } = projectTeamCopy;

  return (
    <section className="relative overflow-hidden bg-[#0C2340] py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(66,165,245,0.1),transparent_60%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#64B5F6]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white">
            {title}
          </h2>
          <p className="mt-4 text-base text-white/60 md:text-lg">{subtitle}</p>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mt-12 aspect-[21/9] overflow-hidden rounded-[20px] border border-white/10"
        >
          {/*
            Съёмка планёрки. Замедлена вдвое и склеена «туда-обратно»,
            чтобы петля не дёргалась на стыке. Без звука — иначе
            браузер не даст автозапуск.
          */}
          <video
            src={assetPath("/video/planerka.mp4")}
            poster={assetPath("/images/company/planerka-poster.webp")}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Планёрка по проекту в офисе «Альфа-Связь»"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,35,64,0.15)_0%,rgba(12,35,64,0.35)_60%,rgba(12,35,64,0.85)_100%)]"
            aria-hidden
          />
          <figcaption className="absolute bottom-5 left-5 right-5 text-sm text-white/80 md:bottom-6 md:left-7">
            Планёрка по объекту: менеджер, инженер и производство собираются вместе до выхода
            бригады на площадку
          </figcaption>
        </motion.figure>

        <TeamTree />
      </div>
    </section>
  );
}

/** Ствол, шина и узлы вырастают по очереди, следом проявляются роли */
const treeVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const trunkVariants: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.35, ease: "easeOut" } },
};
const busVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const roleVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/** Сигнал от менеджера: по стволу вниз, по шине вправо, узлы вспыхивают по очереди */
const SIGNAL_START = 0.2;
const SIGNAL_TRUNK = 0.25;
const SIGNAL_BUS = 0.9;

/**
 * Кто ведёт объект. Менеджер на связи с заказчиком, от него ветки
 * к остальным ролям. С lg дерево висит под плашкой менеджера
 * (шина слева направо), на телефоне — ствол слева, роли столбиком.
 * Все линии выровнены по левому краю текста в плашке.
 *
 * Когда дерево появилось, от менеджера к ролям один раз пробегает
 * сигнал. Наведение на плашку менеджера запускает его снова.
 */
function TeamTree() {
  const lead = projectTeamRoles.find((role) => role.id === "manager") ?? projectTeamRoles[0];
  const crew = projectTeamRoles.filter((role) => role.id !== lead.id);
  const still = useReducedMotion() ?? false;
  const [signal, setSignal] = useState(0);
  const firstDelay = signal === 1 ? 1.1 : 0;

  return (
    <motion.div
      className="mt-8 md:mt-10"
      variants={treeVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={() => {
        if (!still) setSignal((count) => (count === 0 ? 1 : count));
      }}
    >
      <motion.article
        variants={roleVariants}
        onPointerEnter={(event) => {
          if (!still && event.pointerType === "mouse") setSignal((count) => count + 1);
        }}
        className="relative overflow-hidden rounded-[20px] border border-[#42A5F5]/25 bg-[linear-gradient(120deg,rgba(30,136,229,0.2),rgba(30,136,229,0.05)_55%,rgba(30,136,229,0.02))] p-6 md:p-8 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-10"
      >
        <div>
          <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-[#64B5F6]">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inset-0 animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-[#64B5F6] opacity-60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-[#64B5F6]" />
            </span>
            На связи с вами
          </p>
          <h3 className="mt-3 font-heading text-2xl font-bold text-white md:text-[28px]">
            {lead.title}
          </h3>
        </div>
        <p className="mt-3 text-base leading-relaxed text-white/70 lg:mt-0 lg:text-lg">
          {lead.description}
        </p>
      </motion.article>

      <div className="relative">
        {/* lg: ствол из плашки менеджера и шина ко всем ролям */}
        <motion.span
          variants={trunkVariants}
          className="absolute left-[37px] top-0 hidden h-7 w-px origin-top bg-white/20 lg:block"
          aria-hidden
        />
        <motion.span
          variants={busVariants}
          className="absolute left-[37px] right-[calc(25%-13px)] top-7 hidden h-px origin-left bg-white/20 lg:block"
          aria-hidden
        />
        {signal > 0 && (
          <>
            <motion.span
              key={`trunk-${signal}`}
              className="absolute left-[37px] top-0 hidden h-7 w-px origin-top bg-[#64B5F6] lg:block"
              initial={{ scaleY: 0, opacity: 1 }}
              animate={{ scaleY: 1, opacity: [1, 1, 0] }}
              transition={{
                scaleY: {
                  duration: SIGNAL_TRUNK,
                  ease: "easeIn",
                  delay: firstDelay + SIGNAL_START,
                },
                opacity: { duration: 1.4, times: [0, 0.75, 1], delay: firstDelay + SIGNAL_START },
              }}
              aria-hidden
            />
            <motion.span
              key={`bus-${signal}`}
              className="absolute left-[37px] right-[calc(25%-13px)] top-7 hidden h-px origin-left bg-gradient-to-r from-[#64B5F6] to-[#1E88E5] shadow-[0_0_8px_rgba(100,181,246,0.8)] lg:block"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: [1, 1, 0] }}
              transition={{
                scaleX: {
                  duration: SIGNAL_BUS,
                  ease: "linear",
                  delay: firstDelay + SIGNAL_START + SIGNAL_TRUNK,
                },
                opacity: {
                  duration: SIGNAL_BUS + 0.8,
                  times: [0, 0.7, 1],
                  delay: firstDelay + SIGNAL_START + SIGNAL_TRUNK,
                },
              }}
              aria-hidden
            />
          </>
        )}

        <ul className="space-y-6 pl-12 pt-7 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-y-0 lg:px-8 lg:pt-14">
          {crew.map((role, index) => (
            <motion.li
              key={role.id}
              variants={roleVariants}
              className={cn(
                "group relative",
                // Телефон: отрезок ствола от предыдущей роли; у последней — только до узла
                "before:absolute before:bottom-0 before:left-[-20px] before:top-[-24px] before:w-px before:bg-white/20",
                "first:before:top-[-28px] last:before:bottom-auto last:before:h-[38px] lg:before:hidden",
              )}
            >
              <span
                className="absolute left-[-24.5px] top-[9px] size-2.5 rounded-full border border-[#64B5F6]/70 bg-[#0C2340] transition duration-300 group-hover:border-[#90CAF9] group-hover:bg-[#64B5F6] group-hover:shadow-[0_0_0_5px_rgba(100,181,246,0.16)] lg:left-0 lg:top-[-33px]"
                aria-hidden
              >
                {signal > 0 && (
                  <motion.span
                    key={signal}
                    className="absolute inset-[-1px] rounded-full bg-[#90CAF9] shadow-[0_0_0_5px_rgba(100,181,246,0.2)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 0.9,
                      times: [0, 0.25, 1],
                      // Узел вспыхивает, когда до него доходит сигнал по шине
                      delay:
                        firstDelay +
                        SIGNAL_START +
                        SIGNAL_TRUNK +
                        (SIGNAL_BUS * index) / Math.max(1, crew.length - 1),
                    }}
                  />
                )}
              </span>
              <h3 className="font-heading text-lg font-semibold text-white">{role.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/75">
                {role.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
