import { AppImage as Image } from "@/components/ui/app-image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import type { ServicePageData } from "@/lib/data/servicePages";
import { REQUEST_HREF, services } from "@/lib/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { PageCtaSection } from "@/components/sections/PageCtaSection";
import { ServiceProjectFlowSection } from "@/components/sections/services/ServiceProjectFlowSection";
import { WorkStepsSection } from "@/components/sections/WorkStepsSection";

type ServiceDetailSectionProps = {
  data: ServicePageData;
};

export function ServiceDetailSection({ data }: ServiceDetailSectionProps) {
  const otherServices = services.filter(
    (s) => !s.href.endsWith(data.slug)
  );

  return (
    <div className="bg-[#0C2340]">
      <PageHero
        title={data.title}
        description={data.subtitle}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Услуги", href: "/services" },
          { label: data.title },
        ]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div>
              {data.image && (
                <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[20px] border border-white/10">
                  <Image
                    src={data.image}
                    alt={data.imageAlt ?? data.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,35,64,0)_55%,rgba(12,35,64,0.55)_100%)]"
                    aria-hidden
                  />
                </div>
              )}

              <p className="text-lg leading-relaxed text-white/65 md:text-xl">
                {data.intro}
              </p>

              <h2 className="mt-10 font-heading text-xl font-bold text-white md:text-2xl">
                Что входит в работу
              </h2>
              <ul className="mt-6 space-y-5">
                {data.capabilities.map((capability) => (
                  <li
                    key={capability.title}
                    className="flex items-start gap-3 text-white"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#42A5F5]/15 text-[#64B5F6]">
                      <Check className="size-4" strokeWidth={2.5} />
                    </span>
                    <div>
                      <span className="text-base leading-relaxed text-white/85">
                        {capability.title}
                      </span>
                      {capability.brands && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {capability.brands.map((brand) => (
                            <span
                              key={brand}
                              className="rounded-[6px] border border-[#42A5F5]/25 bg-[#42A5F5]/10 px-2.5 py-1 text-[13px] font-medium text-[#90CAF9]"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-heading text-xl font-bold text-white md:text-2xl">
                Типовые объекты
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.objects.map((object) => (
                  <span
                    key={object}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/65"
                  >
                    {object}
                  </span>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-[20px] border border-white/10 bg-white/[0.05] p-6 lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#64B5F6]">
                Гарантия
              </p>
              <p className="mt-2 font-heading text-lg font-bold text-white">
                До 3 лет на оборудование и монтаж
              </p>
              <Link
                href={REQUEST_HREF}
                className="mt-6 block w-full rounded-[8px] bg-[#1E88E5] px-6 py-3.5 text-center text-[15px] font-semibold text-white transition hover:bg-[#42A5F5]"
              >
                Заказать расчёт
              </Link>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/55 transition hover:text-[#64B5F6]"
              >
                <ArrowLeft className="size-4" />
                Все услуги
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {data.slug === "video-surveillance" && <ServiceProjectFlowSection />}

      <WorkStepsSection />

      {otherServices.length > 0 && (
        <section className="border-t border-white/8 bg-[#0E2542] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-xl font-bold text-white">
              Другие направления
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {otherServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition hover:border-[#42A5F5]/40 hover:text-[#64B5F6]"
                  >
                    {service.label}
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
