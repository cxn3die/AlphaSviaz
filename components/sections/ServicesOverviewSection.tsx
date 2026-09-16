import { AppImage as Image } from "@/components/ui/app-image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/lib/navigation";
import { siteConfig } from "@/lib/data/site";

/** Кадр на карточку — свой у каждого направления, не повторяет /about */
const cardImages: Record<string, { src: string; alt: string }> = {
  "/services/video-surveillance": {
    src: "/images/services/card-video.webp",
    alt: "Корпусная камера видеонаблюдения под потолком",
  },
  "/services/access-control": {
    src: "/images/services/card-skud.webp",
    alt: "Считыватель системы контроля доступа на стене",
  },
  "/services/fire-safety": {
    src: "/images/services/card-fire.webp",
    alt: "Трубопровод системы пожаротушения под потолком",
  },
  "/services/networks": {
    src: "/images/services/card-networks.webp",
    alt: "Оптические патч-корды в коммутаторе",
  },
  "/services/maintenance": {
    src: "/images/services/card-service.webp",
    alt: "Специалист на стремянке обслуживает оборудование",
  },
};

export function ServicesOverviewSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <p className="max-w-2xl text-lg text-white/65">
          {siteConfig.description}. Выберите направление — на странице{" "}
          <a
            href="#services-list"
            className="font-semibold text-[#64B5F6] underline decoration-[#42A5F5]/40 decoration-2 underline-offset-4 transition hover:text-white hover:decoration-white/60"
          >
            услуги
          </a>{" "}
          описаны задачи, состав работ и типовые объекты.
        </p>

        <ul
          id="services-list"
          className="mt-12 grid scroll-mt-28 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const image = cardImages[service.href];

            return (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] transition hover:border-[#42A5F5]/35 hover:bg-white/[0.07] hover:shadow-[0_12px_32px_rgba(30,136,229,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42A5F5]"
                >
                  {image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,35,64,0.1)_0%,rgba(12,35,64,0.35)_70%,rgba(12,35,64,0.8)_100%)]"
                        aria-hidden
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-heading text-xl font-bold text-white group-hover:text-[#64B5F6]">
                      {service.label}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                      {service.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#64B5F6]">
                      Подробнее
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
