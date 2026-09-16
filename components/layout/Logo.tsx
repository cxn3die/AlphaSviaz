import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
  compactOnMobile?: boolean;
};

export function Logo({
  variant = "light",
  className,
  compactOnMobile = false,
}: LogoProps) {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center",
        compactOnMobile ? "gap-2 md:gap-3" : "gap-3",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
        className
      )}
      aria-label="Альфа-Связь"
    >
      <ShieldCheck
        className={cn(
          "shrink-0",
          compactOnMobile ? "size-8 md:size-9" : "size-9",
          isDark ? "text-cta" : "text-orange-500"
        )}
        strokeWidth={2}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading font-bold",
            compactOnMobile ? "text-lg md:text-xl" : "text-xl",
            isDark ? "text-white" : "text-foreground"
          )}
        >
          Альфа-Связь
        </span>
        <span
          className={cn(
            "mt-1 uppercase tracking-wider opacity-70",
            compactOnMobile ? "text-[10px] md:text-xs" : "text-xs",
            isDark ? "text-white" : "text-foreground"
          )}
        >
          системы безопасности
        </span>
      </span>
    </Link>
  );
}
