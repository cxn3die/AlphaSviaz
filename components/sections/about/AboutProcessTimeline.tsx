"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

import { AppImage as Image } from "@/components/ui/app-image";
import { aboutPageCopy } from "@/lib/data/company";
import { workSteps } from "@/lib/data/workSteps";
import { cn } from "@/lib/utils";

/** Откуда приходят заявки */
const channels = ["Тендерные площадки", "Входящий звонок", "Активные продажи"] as const;

/** Под каждый этап — настоящий кадр из компании */
const stepPhotos: Record<string, { src: string; alt: string; position: string }> = {
  "01": {
    src: "/images/company/menedzher-zayavki.webp",
    alt: "Менеджер принимает заявку по телефону",
    position: "34% 50%",
  },
  "02": {
    src: "/images/company/otdel-proektirovaniya.webp",
    alt: "Инженер разбирает схему объекта у экрана",
    position: "38% 50%",
  },
  "03": {
    src: "/images/company/soveschanie.webp",
    alt: "Совещание по составу работ и срокам",
    position: "40% 50%",
  },
  "04": {
    src: "/images/company/sklad.webp",
    alt: "Склад оборудования",
    position: "50% 50%",
  },
  "05": {
    src: "/images/company/vols-opora.webp",
    alt: "Монтажник подключает линию на опоре",
    position: "32% 50%",
  },
};

/** Шаг по времени между этапами: за это время линия доходит до следующего номера */
const STEP_GAP = 0.38;

/**
 * Посетитель просил «меньше движения». До монтирования — false, как при
 * статической сборке: иначе первый рендер в браузере не совпадёт с HTML.
 */
function useStill() {
  const reduced = useReducedMotion();
  const [still, setStill] = useState(false);
  useEffect(() => setStill(Boolean(reduced)), [reduced]);
  return still;
}

/** С lg этапы стоят в ряд и открываются по очереди, уже — каждый сам, когда доехал до экрана */
function useInRow() {
  const [inRow, setInRow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setInRow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return inRow;
}

/**
 * «Как мы ведём проект»: откуда приходят заявки и пять этапов.
 * Без карточек и подсветки: крупный текст, тонкие линии и настоящие
 * фото компании. Линейка над этапами прорисовывается слева направо,
 * кадры открываются вслед за ней.
 */
export function AboutProcessTimeline() {
  const { process } = aboutPageCopy;
  const still = useStill();
  const inRow = useInRow();

  return (
    <section className="bg-[#0A1F38] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white">
          {process.title}
        </h2>

        <h3 className="mt-10 text-sm font-medium text-white/50 md:mt-12">
          {process.channelsLabel}
        </h3>
        <ul className="mt-4 grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {channels.map((channel, index) => (
            <motion.li
              key={channel}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={still ? { duration: 0 } : { delay: index * 0.18, duration: 0.5 }}
              className="py-5 font-heading text-xl font-semibold text-white md:px-6 md:py-7 md:first:pl-0 lg:px-8 lg:text-2xl"
            >
              {channel}
            </motion.li>
          ))}
        </ul>

        <h3 className="mt-14 text-sm font-medium text-white/50 md:mt-16">{process.stepsLabel}</h3>
        <ol className="mt-6 grid grid-cols-1 gap-y-10 lg:grid-cols-5 lg:gap-x-6">
          {workSteps.map((step, index) => (
            <Step
              key={step.step}
              step={step}
              start={still ? 0 : inRow ? index * STEP_GAP : 0}
              still={still}
              last={index === workSteps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  step,
  start,
  still,
  last,
}: {
  step: (typeof workSteps)[number];
  start: number;
  still: boolean;
  last: boolean;
}) {
  const photo = stepPhotos[step.step];
  const instant = { duration: 0 };

  const line: Variants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: still ? instant : { delay: start, duration: STEP_GAP, ease: "linear" },
    },
  };
  const frame: Variants = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    show: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: still
        ? instant
        : { delay: start + 0.08, duration: 0.9, ease: [0.65, 0, 0.35, 1] },
    },
  };
  const text: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: still ? instant : { delay: start + 0.35, duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.li
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {/* Линейка: номер и отрезок до следующего этапа */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-[#F25C1F]">{step.step}</span>
        <span className={cn("relative h-px flex-1 bg-white/15", !last && "lg:-mr-3")}>
          <motion.span variants={line} className="absolute inset-0 origin-left bg-[#F25C1F]" />
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-x-8 lg:block">
        <motion.div
          variants={frame}
          className="group relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#0F2747]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 220px, 40vw"
            className="object-cover transition-transform [transition-duration:900ms] group-hover:scale-[1.04]"
            style={{ objectPosition: photo.position }}
          />
        </motion.div>
        <motion.div variants={text} className="lg:mt-5">
          <h4 className="font-heading text-lg font-semibold leading-snug text-white">
            {step.title}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
        </motion.div>
      </div>
    </motion.li>
  );
}
