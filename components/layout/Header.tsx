"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { HeaderBrand } from "@/components/layout/HeaderBrand";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { siteConfig } from "@/lib/data/site";
import { REQUEST_HREF, mainNav, normalizePath, services } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = normalizePath(usePathname());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // Внутренние страницы тоже начинаются с тёмного первого экрана, поэтому
  // шапка везде прозрачная наверху и тёмное стекло при прокрутке — как на главной
  const [headerTheme, setHeaderTheme] = useState<"hero" | "dark" | "default">(
    "hero"
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      if (pathname !== "/") {
        setHeaderTheme(window.scrollY > 50 ? "dark" : "hero");
        return;
      }

      const numbersEl = document.getElementById("numbers");
      const servicesEl = document.getElementById("services");
      const triggerY = window.scrollY + 100;

      if (!numbersEl || !servicesEl) {
        setHeaderTheme("hero");
        return;
      }

      if (triggerY < numbersEl.offsetTop - 80) {
        setHeaderTheme("hero");
      } else {
        setHeaderTheme("dark");
      }
    };

    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);

    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, [pathname]);

  const headerHeight = isScrolled ? (isHovered ? 76 : 64) : 80;
  const isHeroTheme = headerTheme === "hero";
  const isDarkTheme = headerTheme === "dark";
  const isInverted = isHeroTheme || isDarkTheme;

  return (
    <motion.header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        height: headerHeight,
        boxShadow:
          isDarkTheme || isScrolled
            ? "0 4px 20px rgba(0,0,0,0.15)"
            : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isDarkTheme
          ? "border-b border-transparent bg-[rgba(7,26,47,0.92)] backdrop-blur-[12px]"
          : headerTheme === "default"
          ? "border-b border-[#E5E9F0] bg-[rgba(255,255,255,0.95)] backdrop-blur-[12px]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/*
        Ширины подобраны под реальные размеры: до 1024px — бургер-меню,
        1024–1279 — телефон иконкой, с 1280 — номер и часы работы.
        Раньше на 768–1279 номер и кнопка заявки уезжали за край экрана.
      */}
      <div className="container mx-auto flex h-full items-center justify-between gap-4 lg:px-8 xl:px-10">
        <HeaderBrand inverted={isInverted} />

        <nav className="hidden flex-1 justify-center px-2 lg:flex xl:px-4" aria-label="Главное меню">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              if (item.label !== "Услуги") {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-[8px] px-3.5 text-[16px] xl:px-4 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2",
                        isActive
                          ? "bg-[#1E88E5] text-white"
                          : isDarkTheme
                            ? "text-white hover:bg-white/10 hover:text-[#F25C1F]"
                            : isHeroTheme
                            ? "text-white hover:bg-[#1E88E5] hover:text-white"
                            : "text-[#101828] hover:bg-[#1E88E5] hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const servicesActive = pathname.startsWith("/services");
              return (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex h-[52px] items-center justify-center gap-1 whitespace-nowrap rounded-[8px] px-3.5 text-[16px] xl:px-4 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2",
                      servicesActive
                        ? "bg-[#1E88E5] text-white"
                        : isDarkTheme
                          ? "text-white hover:bg-white/10 hover:text-[#F25C1F]"
                          : isHeroTheme
                          ? "text-white hover:bg-[#1E88E5] hover:text-white"
                          : "text-[#101828] hover:bg-[#1E88E5] hover:text-white"
                    )}
                  >
                    Услуги
                    <ChevronDown className="size-4" />
                  </Link>

                  <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {/* Тёмное стекло, как сама шапка — белая плашка выбивалась из стиля */}
                    <div className="relative w-[340px] rounded-[16px] border border-white/10 bg-[#0B1E35]/95 p-2 shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']">
                      {services.map((service) => {
                        const isCurrent = pathname === service.href;
                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={cn(
                              "group/item flex items-start gap-3 rounded-[10px] px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42A5F5]",
                              isCurrent ? "bg-white/[0.07]" : "hover:bg-white/[0.06]"
                            )}
                          >
                            <span
                              className={cn(
                                "mt-2 size-1.5 shrink-0 rounded-full transition",
                                isCurrent ? "bg-[#F25C1F]" : "bg-white/25 group-hover/item:bg-[#F25C1F]"
                              )}
                              aria-hidden
                            />
                            <span>
                              <span className="block whitespace-nowrap text-[15px] font-medium text-white">
                                {service.label}
                              </span>
                              {service.description && (
                                <span className="mt-0.5 block text-[13px] text-white/45">{service.description}</span>
                              )}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
          <a
            href={siteConfig.contacts.phoneLink}
            className={cn(
              "flex h-[52px] items-center gap-3 whitespace-nowrap rounded-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2",
              isInverted ? "text-white hover:text-white/90" : "hover:text-[#1E88E5]"
            )}
            aria-label={`Позвонить ${siteConfig.contacts.phone}`}
          >
            <span
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full",
                isInverted ? "border border-white/25" : "border border-[#E5E9F0]"
              )}
            >
              <Phone className={cn("size-5", isInverted ? "text-white" : "text-[#1E88E5]")} />
            </span>
            <span className="hidden leading-tight xl:block">
              <span
                className={cn(
                  "block whitespace-nowrap text-[12px]",
                  isInverted ? "text-white/70" : "text-[#475467]"
                )}
              >
                {siteConfig.contacts.workingHours}
              </span>
              <span
                className={cn(
                  "block whitespace-nowrap text-[17px] font-bold",
                  isInverted ? "text-white" : "text-[#101828]"
                )}
              >
                {siteConfig.contacts.phone}
              </span>
            </span>
          </a>

          <Link
            href={REQUEST_HREF}
            className="inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-[8px] bg-[#1E88E5] px-5 text-[15px] xl:px-6 font-semibold text-white transition hover:bg-[#42A5F5] hover:shadow-[0_0_0_4px_rgba(30,136,229,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2"
          >
            Оставить заявку
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <MobileMenu inverted={isInverted} />
      </div>
    </motion.header>
  );
}
