"use client";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type BrandDiagonalWatermarkProps = {
  className?: string;
};

export function BrandDiagonalWatermark({ className }: BrandDiagonalWatermarkProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        aria-hidden
      >
        <p className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] whitespace-nowrap font-heading text-[clamp(4rem,18vw,16rem)] font-bold tracking-[-0.05em] text-white/[0.05]">
          АЛЬФА-СВЯЗЬ
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_35%,rgba(12,35,64,0.85)_100%)]" />

      <div className="brand-diagonal-rail brand-diagonal-rail--primary">
        <span className="brand-diagonal-phrase brand-diagonal-phrase--light">АЛЬФА</span>
        <span className="brand-diagonal-phrase brand-diagonal-phrase--light" aria-hidden>
          АЛЬФА
        </span>
        <span className="brand-diagonal-phrase brand-diagonal-phrase--light" aria-hidden>
          АЛЬФА
        </span>
      </div>

      <div className="brand-diagonal-rail brand-diagonal-rail--secondary">
        <span className="brand-diagonal-phrase brand-diagonal-phrase--blue">СВЯЗЬ</span>
        <span className="brand-diagonal-phrase brand-diagonal-phrase--blue" aria-hidden>
          СВЯЗЬ
        </span>
        <span className="brand-diagonal-phrase brand-diagonal-phrase--blue" aria-hidden>
          СВЯЗЬ
        </span>
      </div>

      <div className="brand-diagonal-rail brand-diagonal-rail--accent">
        <span className="brand-diagonal-phrase brand-diagonal-phrase--ghost">АЛЬФА-СВЯЗЬ</span>
      </div>
    </div>
  );
}
