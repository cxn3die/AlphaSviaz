import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { BRAND_NAVY_HERO, BRAND_BLUE } from "@/lib/brand-colors";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  variant?: "light" | "brand";
  className?: string;
  /**
   * Фон заходит под прозрачную шапку (-mt-20 pt-20). false — если это
   * уже сделала обёртка страницы (контакты).
   */
  underHeader?: boolean;
};

export function PageHero({
  title,
  description,
  breadcrumbs,
  variant = "brand",
  className,
  underHeader = true,
}: PageHeroProps) {
  const isBrand = variant === "brand";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        underHeader && "-mt-20 pt-20",
        isBrand ? "text-white" : "border-b border-[#E5E9F0] bg-[#F5F7FA]",
        className
      )}
      style={isBrand ? { backgroundColor: BRAND_NAVY_HERO } : undefined}
    >
      {isBrand && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_20%_-30%,rgba(66,165,245,0.32),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_80%,rgba(30,136,229,0.16),transparent_50%)]"
            aria-hidden
          />
        </>
      )}

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Хлебные крошки"
            className="mb-6 flex flex-wrap items-center gap-1 text-sm"
          >
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight
                    className={cn("size-4 shrink-0", isBrand ? "text-white/30" : "text-[#475467]")}
                    aria-hidden
                  />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "transition hover:text-[#64B5F6]",
                      isBrand ? "text-white/60" : "text-[#475467] hover:text-[#1E88E5]"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isBrand ? "text-white/90" : "text-[#101828]"}>
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        <span
          className="mb-4 block h-[4px] w-[60px] rounded-full"
          style={{ backgroundColor: isBrand ? BRAND_BLUE : "#1E88E5" }}
        />

        <h1
          className={cn(
            "max-w-3xl font-heading text-[clamp(1.75rem,7vw,3rem)] font-bold leading-tight",
            isBrand ? "text-white" : "text-[#101828]"
          )}
        >
          {title}
        </h1>

        {description && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-lg leading-relaxed md:text-xl",
              isBrand ? "text-white/72" : "text-[#475467]"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
