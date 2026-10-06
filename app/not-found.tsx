import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { BRAND_NAVY_HERO } from "@/lib/brand-colors";
import { siteConfig } from "@/lib/data/site";
import { mainNav } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Страница не найдена — Альфа-Связь",
  description: "Такой страницы на сайте нет. Перейдите в раздел услуг, проектов или контактов.",
};

/**
 * Своя 404 в стиле сайта. На GitHub Pages её отдаёт 404.html
 * для любого несуществующего адреса внутри проекта.
 */
export default function NotFound() {
  return (
    <div
      className="relative -mt-20 pt-20 flex min-h-screen items-center overflow-hidden text-white"
      style={{ backgroundColor: BRAND_NAVY_HERO }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_15%_0%,rgba(66,165,245,0.3),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-[-6rem] select-none font-heading text-[clamp(12rem,38vw,30rem)] font-extrabold leading-none tracking-[-0.06em] text-white/[0.04]"
        aria-hidden
      >
        404
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#64B5F6]">
            Ошибка 404
          </p>
          <span className="mb-5 mt-4 block h-1 w-16 rounded-full bg-[#F25C1F]" />
          <h1 className="font-heading text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
            Такой страницы нет
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Возможно, ссылка устарела или в адресе опечатка. Начните с главной
            или выберите нужный раздел.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#1E88E5] px-7 text-[15px] font-semibold text-white transition hover:bg-[#42A5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102A4A]"
            >
              На главную
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href={siteConfig.contacts.phoneLink}
              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-white/25 px-7 text-[15px] font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone className="size-4" aria-hidden />
              {siteConfig.contacts.phone}
            </a>
          </div>

          <nav aria-label="Разделы сайта" className="mt-12 border-t border-white/10 pt-8">
            <ul className="flex flex-wrap gap-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/80 transition hover:border-[#42A5F5]/45 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
