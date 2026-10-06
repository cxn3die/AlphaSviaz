import Link from "next/link";
import { ArrowUpRight, Phone, ShieldCheck } from "lucide-react";

import { PageCtaSection } from "@/components/sections/PageCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceProjectFlowSection } from "@/components/sections/services/ServiceProjectFlowSection";
import { WorkStepsSection } from "@/components/sections/WorkStepsSection";
import { AppImage as Image } from "@/components/ui/app-image";
import type { ServicePageData } from "@/lib/data/servicePages";
import { siteConfig } from "@/lib/data/site";
import { REQUEST_HREF, services } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type ServiceDetailSectionProps = {
  data: ServicePageData;
};

/**
 * Страница направления. Вместо коробок с галочками и чипов —
 * спокойная вёрстка: вводный абзац с фото, нумерованный состав работ
 * (бренды строкой), полоса «Где применяем» и полоса с гарантией.
 */
export function ServiceDetailSection({ data }: ServiceDetailSectionProps) {
  const otherServices = services.filter((s) => !s.href.endsWith(data.slug));

  return (
    <div className="bg-[#0C2340]">
      <PageHero title={data.title} description={data.subtitle} />

      {/* Вводный абзац и фото */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <p
              className={cn(
                "font-heading text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-snug text-white/90",
                data.image ? "lg:col-span-6" : "lg:col-span-9"
              )}
            >
              {data.intro}
            </p>
            {data.image && (
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[20px] lg:col-span-6">
                <Image
                  src={data.image}
                  alt={data.imageAlt ?? data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition [transition-duration:900ms] group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(12,35,64,0.5)_100%)]"
                  aria-hidden
                />
                <Viewfinder />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Состав работ */}
      <section className="border-t border-white/8 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Состав работ</p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">
                Что входит в работу
              </h2>
            </div>
            <ol className="lg:col-span-8">
              {data.capabilities.map((capability, index) => (
                <li
                  key={capability.title}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-white/10 py-6 first:border-t-0 first:pt-0 md:grid-cols-[4rem_minmax(0,1fr)]"
                >
                  <span className="font-mono text-sm text-[#64B5F6]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-lg font-medium leading-snug text-white">{capability.title}</p>
                    {capability.brands && (
                      <p className="mt-2 text-sm text-white/45">{capability.brands.join(" · ")}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Где применяем */}
      <section className="border-t border-white/8 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Где применяем</p>
          <ul className="mt-6 grid grid-cols-2 border-l border-t border-white/10 lg:grid-cols-4">
            {data.objects.map((object, index) => (
              <li key={object} className="border-b border-r border-white/10 p-5 md:p-6">
                <span className="font-mono text-xs text-white/30">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-6 font-heading text-lg font-semibold text-white md:text-xl">{object}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Гарантия и действие */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#102A4A] p-7 md:p-10">
            <span className="absolute inset-y-0 left-0 w-1 bg-[#F25C1F]" aria-hidden />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 size-7 shrink-0 text-[#F25C1F]" strokeWidth={1.8} aria-hidden />
                <div>
                  <p className="font-heading text-xl font-bold text-white md:text-2xl">
                    Гарантия до 3 лет на оборудование и монтаж
                  </p>
                  <p className="mt-1 text-white/60">Фиксируем в договоре. Расчёт делаем до подписания договора.</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link
                  href={REQUEST_HREF}
                  className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[#1E88E5] px-7 text-[15px] font-semibold text-white transition hover:bg-[#42A5F5]"
                >
                  Заказать расчёт
                </Link>
                <a
                  href={siteConfig.contacts.phoneLink}
                  className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-white/20 px-6 text-[15px] font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone className="size-4" aria-hidden />
                  {siteConfig.contacts.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {data.slug === "video-surveillance" && <ServiceProjectFlowSection />}

      <WorkStepsSection />

      {otherServices.length > 0 && (
        <section className="border-t border-white/8 py-14 md:py-16">
          <div className="container mx-auto px-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Другие направления</p>
            <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {otherServices.map((service) => (
                <li key={service.href} className="bg-[#0C2340]">
                  <Link
                    href={service.href}
                    className="group flex h-full items-center justify-between gap-4 p-5 transition hover:bg-white/[0.04]"
                  >
                    <span>
                      <span className="block font-medium text-white">{service.label}</span>
                      {service.description && (
                        <span className="mt-1 block text-sm text-white/45">{service.description}</span>
                      )}
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F25C1F]"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <PageCtaSection />
    </div>
  );
}

/** Тонкие уголки видоискателя — общий мотив с кейсами */
function Viewfinder() {
  const corner = "absolute size-6 border-white/55 transition-all duration-500 group-hover:size-8 group-hover:border-white/80";
  return (
    <div className="pointer-events-none absolute inset-4" aria-hidden>
      <span className={cn(corner, "left-0 top-0 border-l border-t")} />
      <span className={cn(corner, "right-0 top-0 border-r border-t")} />
      <span className={cn(corner, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(corner, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}
