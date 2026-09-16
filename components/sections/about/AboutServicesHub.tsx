"use client";

import { AppImage as Image } from "@/components/ui/app-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { BlueprintPattern } from "@/components/decorative/BlueprintPattern";
import { aboutPageCopy } from "@/lib/data/company";
import { services } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Кадр под каждое направление. Все — с реального оборудования */
const serviceImages: Record<string, { src: string; alt: string }> = {
  "/services/video-surveillance": {
    src: "/images/about/napravlenie-video.webp",
    alt: "Купольная камера видеонаблюдения на потолке",
  },
  "/services/access-control": {
    src: "/images/about/napravlenie-skud.webp",
    alt: "Считыватель с кодонаборной панелью на входе",
  },
  "/services/fire-safety": {
    src: "/images/about/napravlenie-pozhar.webp",
    alt: "Потолочный пожарный извещатель с оповещателем",
  },
  "/services/networks": {
    src: "/images/about/napravlenie-seti.webp",
    alt: "Оптоволоконная кроссовая панель",
  },
  "/services/maintenance": {
    src: "/images/about/napravlenie-service.webp",
    alt: "Специалист проверяет оборудование в шкафу",
  },
};

export function AboutServicesHub() {
  const { services: copy } = aboutPageCopy;

  return (
    <section className="relative overflow-hidden bg-[#0C2340] py-20 md:py-28">
      <BlueprintPattern variant="camera" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#64B5F6]">
              {copy.title}
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">
              {copy.subtitle}
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64B5F6] transition hover:text-white"
          >
            Все услуги
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const image = serviceImages[service.href];

            return (
              <motion.li
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className={cn(index === 0 && "sm:col-span-2 lg:col-span-2")}
              >
                <Link
                  href={service.href}
                  className="group relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 transition duration-500 hover:border-[#42A5F5]/45 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                >
                  {image && (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0.15)_0%,rgba(7,26,47,0.45)_45%,rgba(7,26,47,0.9)_100%)]"
                    aria-hidden
                  />

                  <div className="relative p-6 md:p-7">
                    <h3 className="font-heading text-lg font-bold text-white md:text-xl">
                      {service.label}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-white/80">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#7EC4FA]">
                      Подробнее
                      <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
