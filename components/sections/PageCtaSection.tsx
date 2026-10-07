import Link from "next/link";
import { ArrowRight, Building2, Phone, ShieldCheck } from "lucide-react";

import { BRAND_NAVY_LIFTED } from "@/lib/brand-colors";
import { aboutPageCopy, companyInfo } from "@/lib/data/company";
import { siteConfig } from "@/lib/data/site";
import { REQUEST_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type PageCtaSectionProps = {
  variant?: "default" | "light";
  /** Без своего фона — когда под страницей лежит декоративный фон */
  transparent?: boolean;
  /**
   * Справа в плашке — гарантия до 3 лет, под плашкой — строка о группе
   * компаний. Так на «О компании»: раньше гарантия была отдельной
   * плашкой прямо над этой и повторяла её.
   */
  withGuarantee?: boolean;
};

export function PageCtaSection({
  variant = "default",
  transparent = false,
  withGuarantee = false,
}: PageCtaSectionProps) {
  const isLight = variant === "light";

  const actions = (
    // shrink-0 + nowrap: иначе на средней ширине телефон рвётся пополам
    <div
      className={cn(
        "flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center",
        withGuarantee ? "mt-8 sm:flex-wrap" : "shrink-0",
      )}
    >
      <Link
        href={REQUEST_HREF}
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] bg-[#1E88E5] px-7 text-[15px] font-semibold text-white transition hover:bg-[#42A5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2"
      >
        Оставить заявку
        <ArrowRight className="size-4" />
      </Link>
      <a
        href={siteConfig.contacts.phoneLink}
        className={cn(
          "inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border px-7 text-[15px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2",
          isLight
            ? "border-[#DDE8F4] bg-white text-[#071A2F] hover:border-[#1E88E5]/40 hover:text-[#1E88E5]"
            : "border-white/30 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-primary",
        )}
      >
        <Phone className="size-4" />
        {siteConfig.contacts.phone}
      </a>
      <Link
        href="/contacts"
        className={cn(
          "inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] px-4 text-[15px] font-medium underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5]",
          isLight
            ? "text-[#5A6B7D] hover:text-[#1E88E5]"
            : "text-white/80 hover:text-white focus-visible:ring-white",
        )}
      >
        Все контакты
      </Link>
    </div>
  );

  return (
    <section
      className={cn("py-16 md:py-20", isLight ? "bg-white" : "")}
      style={isLight || transparent ? undefined : { backgroundColor: BRAND_NAVY_LIFTED }}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "rounded-[24px] p-8 md:p-12",
            withGuarantee
              ? "grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-0"
              : "flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between",
            isLight
              ? "border border-[#DDE8F4] bg-[#F5F8FC] shadow-[0_8px_32px_rgba(7,26,47,0.06)]"
              : "border border-white/10 bg-white/5 backdrop-blur-sm",
          )}
        >
          <div className={withGuarantee ? "lg:pr-12" : "max-w-xl"}>
            <h2
              className={cn(
                "font-heading text-2xl font-bold md:text-3xl",
                isLight ? "text-[#071A2F]" : "text-white",
              )}
            >
              Есть объект?
            </h2>
            <p
              className={cn(
                "mt-3 text-base md:text-lg",
                isLight ? "text-[#4A5C6E]" : "text-white/75",
              )}
            >
              Оставьте заявку. Менеджер перезвонит, инженер посчитает стоимость.
            </p>
            {withGuarantee && actions}
          </div>

          {!withGuarantee && actions}

          {withGuarantee && (
            <div className="flex flex-col justify-center border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <div className="flex items-start gap-4">
                <ShieldCheck
                  className="mt-0.5 size-9 shrink-0 text-[#F25C1F]"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <div>
                  <p className="font-heading text-2xl font-bold text-white md:text-[28px]">
                    {aboutPageCopy.guarantee.title}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-white/65 [text-wrap:pretty]">
                    {aboutPageCopy.guarantee.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {withGuarantee && (
          <p className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-white/45">
            <Building2 className="mt-0.5 size-4 shrink-0 text-white/35" aria-hidden />
            <span>
              «{companyInfo.brand}» входит в группу компаний «{companyInfo.groupName}».
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
