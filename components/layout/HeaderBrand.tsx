import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

type HeaderBrandProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function HeaderBrand({ compact = false, inverted = false }: HeaderBrandProps) {
  return (
    <Link
      href="/"
      aria-label="Альфа-Связь"
      className={cn(
        "inline-flex h-[52px] items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2",
        compact ? "gap-2" : "gap-3"
      )}
    >
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-[8px]",
          inverted
            ? "border border-white/25 bg-white/10"
            : "bg-[#1E88E5]"
        )}
      >
        <ShieldCheck
          className={cn("size-6", inverted ? "text-white" : "text-white")}
          strokeWidth={2.2}
        />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block whitespace-nowrap text-[20px] font-bold",
            inverted ? "text-white" : "text-[#101828]"
          )}
        >
          Альфа-Связь
        </span>
        <span
          className={cn(
            "mt-1 block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.1em]",
            inverted ? "text-white/60" : "text-[#475467]"
          )}
        >
          Системы безопасности
        </span>
      </span>
    </Link>
  );
}
