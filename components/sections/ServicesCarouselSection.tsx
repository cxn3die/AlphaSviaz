"use client";

import { AppImage as Image } from "@/components/ui/app-image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { REQUEST_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type ServiceSlide = {
  slug: string;
  title: string;
  subtitle: string;
  gradient: string;
  image: string;
  imageAlt: string;
  href: string;
};

const services: ServiceSlide[] = [
  {
    slug: "video-surveillance",
    title: "ВИДЕОНАБЛЮДЕНИЕ",
    subtitle: "Профессиональный монтаж «под ключ»",
    gradient: "linear-gradient(135deg, #071A2F 0%, #1E88E5 50%, #F25C1F 100%)",
    image: "/images/services/videonablyudenie.webp",
    imageAlt: "Уличные IP-камеры видеонаблюдения на опоре",
    href: "/services/video-surveillance",
  },
  {
    slug: "networks",
    title: "СТРУКТУРНЫЕ СЕТИ (СКС)",
    subtitle: "Прокладка сетей, ВОЛС, настройка оборудования",
    gradient: "linear-gradient(135deg, #1E88E5 0%, #071A2F 60%, #F25C1F 100%)",
    image: "/images/services/seti-vols.webp",
    imageAlt: "Оптоволоконная кроссовая панель в серверной",
    href: "/services/networks",
  },
  {
    slug: "access-control",
    title: "СИСТЕМЫ КОНТРОЛЯ ДОСТУПА (СКУД)",
    subtitle: "Турникеты, шлагбаумы, домофония",
    gradient: "linear-gradient(135deg, #F25C1F 0%, #1E88E5 60%, #071A2F 100%)",
    image: "/images/services/skud.webp",
    imageAlt: "Линия турникетов с считывателями на входной группе",
    href: "/services/access-control",
  },
  {
    slug: "fire-safety",
    title: "ПОЖАРНАЯ СИГНАЛИЗАЦИЯ",
    subtitle: "АПС, оповещение, пожаротушение",
    gradient: "linear-gradient(135deg, #071A2F 0%, #F25C1F 50%, #1E88E5 100%)",
    image: "/images/services/pozharnaya.webp",
    imageAlt: "Спринклерные стояки системы пожаротушения по зонам",
    href: "/services/fire-safety",
  },
];

export function ServicesCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = useMemo(() => services[currentSlide], [currentSlide]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % services.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(nextSlide, 7000);
    return () => clearTimeout(timer);
  }, [currentSlide, isPaused]);

  const handleGoToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-[#071A2F] pb-16 pt-14 md:pb-20 md:pt-16"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <span className="select-none whitespace-nowrap font-heading text-[clamp(180px,22vw,380px)] font-bold tracking-[-0.05em] text-white/[0.04]">
          АЛЬФА
        </span>
      </div>

      <div className="container relative z-10 mx-auto mb-10 px-4 text-center md:mb-14">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#42A5F5]">
          Услуги
        </p>
        <h2
          id="services-heading"
          className="mt-3 font-heading text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight text-white"
        >
          Комплексные решения под ключ
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/65 md:text-lg">
          Видеонаблюдение, СКС, СКУД и пожарная безопасность для бизнеса
        </p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-16">
        <div
          className="relative h-[72vh] max-h-[640px] min-h-[420px] overflow-hidden rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10 sm:min-h-[480px] sm:rounded-[24px] md:h-[80vh] md:min-h-[640px] md:max-h-[820px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Градиент — подложка на время загрузки фото */}
          <div
            className="absolute inset-0 z-0"
            style={{ background: activeSlide.gradient }}
          />

          {/*
            Все кадры смонтированы сразу и переключаются прозрачностью:
            переход идёт без подгрузки, а next/image остаётся вне
            AnimatePresence — внутри неё он падает при размонтировании.
          */}
          {services.map((service, index) => (
            <div
              key={service.slug}
              aria-hidden={index !== currentSlide}
              className={cn(
                "absolute inset-0 z-0 transition-opacity duration-700 ease-out",
                index === currentSlide ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority={index === 0}
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover"
              />
            </div>
          ))}

          {/* Затемнение слева — под текст; справа фото остаётся открытым */}
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(7,26,47,0.92)_0%,rgba(7,26,47,0.72)_45%,rgba(7,26,47,0.38)_100%)]" />
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(7,26,47,0.35)_0%,transparent_35%,rgba(7,26,47,0.55)_100%)]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.slug}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 z-[2]"
            >
              {/*
                Размер заголовка подобран так, чтобы самое длинное слово
                («ВИДЕОНАБЛЮДЕНИЕ») целиком влезало в блок на любой ширине:
                раньше с 1280px оно рвалось на «ВИДЕОНАБЛЮДЕ / НИЕ».
              */}
              <div className="absolute bottom-[88px] left-4 right-4 z-[3] max-w-[720px] sm:bottom-[100px] sm:left-6 sm:right-6 md:bottom-20 md:left-[60px] md:right-auto">
                <h2 className="font-heading text-[clamp(1.375rem,6.2vw,2.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[clamp(1.75rem,4.5vw,3rem)] md:text-[clamp(2.25rem,4.2vw,3.75rem)]">
                  {activeSlide.title}
                </h2>
                <p className="mt-3 max-w-[480px] text-base leading-relaxed text-white/85 sm:mt-4 sm:text-lg md:text-[20px]">
                  {activeSlide.subtitle}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                  <Link
                    href={activeSlide.href}
                    className="group inline-flex w-full items-center justify-center rounded-[12px] bg-[#1E88E5] px-6 py-3.5 text-[15px] font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-[#1565C0] sm:w-auto sm:px-8 sm:py-4 sm:text-[16px]"
                  >
                    Подробнее
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <Link
                    href={REQUEST_HREF}
                    className="inline-flex w-full items-center justify-center rounded-[12px] border border-white/30 bg-white/12 px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur-[10px] transition duration-300 hover:border-white/50 hover:bg-white/22 sm:w-auto sm:px-8 sm:py-4 sm:text-[16px]"
                  >
                    Заказать
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute right-[60px] top-1/2 z-[3] hidden -translate-y-1/2 flex-col gap-3 md:flex">
            {services.map((service, index) => (
              <button
                key={service.slug}
                type="button"
                aria-label={`Слайд ${index + 1}`}
                onClick={() => handleGoToSlide(index)}
                className={cn(
                  "cursor-pointer rounded-[2px] bg-white/25 transition-all duration-400",
                  index === currentSlide
                    ? "h-16 w-[3px] bg-[#F25C1F]"
                    : "h-8 w-[2px] hover:scale-y-110 hover:bg-white/50"
                )}
              />
            ))}
          </div>

          <div className="absolute bottom-[60px] right-[60px] z-[3] hidden gap-3 md:flex">
            <button
              type="button"
              aria-label="Предыдущий слайд"
              onClick={prevSlide}
              className="flex size-14 items-center justify-center rounded-full border-[1.5px] border-white/30 bg-white/10 text-white backdrop-blur-[10px] transition duration-300 hover:scale-105 hover:border-[#1E88E5] hover:bg-[#1E88E5]"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Следующий слайд"
              onClick={nextSlide}
              className="flex size-14 items-center justify-center rounded-full border-[1.5px] border-white/30 bg-white/10 text-white backdrop-blur-[10px] transition duration-300 hover:scale-105 hover:border-[#1E88E5] hover:bg-[#1E88E5]"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-row gap-3 md:hidden">
            {services.map((service, index) => (
              <button
                key={service.slug}
                type="button"
                aria-label={`Слайд ${index + 1}`}
                onClick={() => handleGoToSlide(index)}
                className={cn(
                  "rounded-[2px] bg-white/30 transition-all duration-300",
                  index === currentSlide
                    ? "h-[3px] w-16 bg-[#F25C1F]"
                    : "h-[2px] w-8"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
