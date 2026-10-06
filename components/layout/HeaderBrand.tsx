import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { cn } from "@/lib/utils";

type HeaderBrandProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function HeaderBrand({ compact = false, inverted = false }: HeaderBrandProps) {
  return (
    <Link
      href="/"
      aria-label="Альфа-Связь — на главную"
      className="inline-flex h-[52px] shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5] focus-visible:ring-offset-2"
    >
      <BrandLogo
        variant={inverted ? "light" : "color"}
        priority
        className={cn(compact ? "h-8" : "h-8 xl:h-9")}
      />
    </Link>
  );
}
