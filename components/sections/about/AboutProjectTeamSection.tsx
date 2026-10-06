"use client";

import { motion } from "framer-motion";

import { projectTeamCopy, projectTeamRoles } from "@/lib/data/projectTeam";
import { assetPath } from "@/lib/utils";

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

        {/*
          Роли — простым списком под видео: название и что делает.
          Без плашек, иконок и подписей вроде «на связи» — владелец
          просил без украшений.
        */}
        <ul className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
          {projectTeamRoles.map((role, index) => (
            <motion.li
              key={role.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
              className="border-t border-white/15 py-5 lg:py-6"
            >
              <h3 className="font-heading text-lg font-semibold text-white">{role.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{role.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
