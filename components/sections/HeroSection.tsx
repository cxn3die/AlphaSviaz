import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { AppImage as Image } from "@/components/ui/app-image";
import { heroContent } from "@/lib/data/hero";
import { REQUEST_HREF } from "@/lib/navigation";

export function HeroSection() {
  const { equipment } = heroContent;

  return (
    <section
      id="hero"
      className="container mx-auto px-4 pt-28 sm:px-6 sm:pt-32 md:pt-36 lg:pt-40"
    >
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div className="max-w-3xl">
          <span className="mb-6 block h-[4px] w-[60px] rounded-full bg-[#F25C1F]" />
          <h1 className="font-heading text-[clamp(1.75rem,6.5vw,3.75rem)] font-bold leading-[1.1] text-white md:text-6xl">
            Видеонаблюдение, контроль доступа и пожарная сигнализация для предприятий
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
            Проектируем и внедряем видеонаблюдение, СКУД, пожарную автоматику и
            сетевую инфраструктуру под ключ.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={REQUEST_HREF}
              className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[#1E88E5] px-7 text-[15px] font-semibold text-white transition hover:bg-[#42A5F5] hover:shadow-[0_0_0_4px_rgba(30,136,229,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A2F]"
            >
              Оставить заявку
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-[8px] border border-[#1E88E5] px-7 text-[15px] font-semibold text-white transition hover:bg-[#1E88E5]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A2F]"
            >
              Наши услуги
            </Link>
          </div>

          <div className="mt-12 inline-flex max-w-lg items-start gap-4 rounded-[16px] border border-white/15 bg-white/8 px-5 py-4 backdrop-blur-md sm:px-6 sm:py-5">
            <ShieldCheck
              className="mt-0.5 size-8 shrink-0 text-[#F25C1F] sm:size-9"
              strokeWidth={2.2}
              aria-hidden
            />
            <div>
              <p className="font-heading text-xl font-bold leading-tight text-white sm:text-2xl">
                {heroContent.guarantee.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70 sm:text-base">
                {heroContent.guarantee.description}
              </p>
            </div>
          </div>
        </div>

        {/* Только на компьютере: на телефоне и планшете фото брендов владелец попросил убрать */}
        <aside className="hidden w-full overflow-hidden rounded-[20px] border border-white/15 bg-white/[0.07] backdrop-blur-md lg:mt-6 lg:block">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={equipment.image}
              alt={equipment.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0)_45%,rgba(7,26,47,0.85)_100%)]"
              aria-hidden
            />
            <p className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm">
              {equipment.eyebrow}
            </p>
          </div>

          <div className="p-5">
            <p className="text-[15px] font-semibold leading-snug text-white">
              {equipment.caption}
              {equipment.model && (
                <span className="text-white/60"> · {equipment.model}</span>
              )}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {equipment.brands.map((brand) => (
                <li
                  key={brand}
                  className="rounded-[6px] border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-white/75"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
