import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** light — для светлого фона, dark — для тёмного */
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "light", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center rounded-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
        className
      )}
      aria-label="Альфа-Связь — на главную"
    >
      <BrandLogo variant={variant === "dark" ? "light" : "color"} className="h-9" />
    </Link>
  );
}
