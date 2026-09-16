import type { ReactNode } from "react";

import { BRAND_NAVY } from "@/lib/brand-colors";

type HomeLowerFloorProps = {
  children: ReactNode;
};

export function HomeLowerFloor({ children }: HomeLowerFloorProps) {
  return (
    <div className="relative -mt-6 overflow-hidden bg-[#071A2F] md:-mt-10">
      {/* Декор только ниже заголовка «Услуги», верх — ровный BRAND_NAVY */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[min(420px,42vh)] bottom-0 z-0"
        style={{
          background: `linear-gradient(
            180deg,
            ${BRAND_NAVY} 0%,
            #0a2138 22%,
            #0d2a45 48%,
            ${BRAND_NAVY} 78%,
            #061525 100%
          )`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[min(380px,38vh)] z-0 h-[min(50vh,480px)] bg-[radial-gradient(ellipse_80%_65%_at_50%_0%,rgba(30,136,229,0.18),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-[55%] z-0 size-[28rem] rounded-full bg-[#F25C1F]/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-[65%] z-0 size-[28rem] rounded-full bg-[#1E88E5]/12 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[min(360px,36vh)] bottom-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
