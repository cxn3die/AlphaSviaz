"use client";

import { AppImage as Image } from "@/components/ui/app-image";
import { motion, useReducedMotion } from "framer-motion";

import { clients, getClientLogoClassName, type ClientLogo } from "@/lib/data/clients";
import { cn } from "@/lib/utils";

const ROW_DURATION = 50;

function FloatingLogo({ id, name, logo, wide }: ClientLogo) {
  return (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center justify-center md:h-16",
        wide ? "w-[160px] px-4 md:w-[200px]" : "w-[120px] px-3 md:w-[140px]"
      )}
    >
      <Image
        src={logo}
        alt={name}
        width={wide ? 200 : 140}
        height={48}
        className={getClientLogoClassName(id, wide)}
      />
    </div>
  );
}

function MarqueeRow({
  reverse = false,
  duration = ROW_DURATION,
}: {
  reverse?: boolean;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const track = [...clients, ...clients];

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 px-4">
        {clients.map((client) => (
          <FloatingLogo key={client.id} {...client} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-10 md:gap-14"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      >
        {track.map((client, index) => (
          <FloatingLogo key={`${client.id}-${index}`} {...client} />
        ))}
      </motion.div>
    </div>
  );
}

export function ClientsMarqueeSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative overflow-hidden border-t border-white/10 pb-20 pt-16 md:pb-28 md:pt-20"
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#42A5F5]">
            Клиенты
          </p>
          <h2
            id="clients-heading"
            className="mt-3 font-heading text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight text-white"
          >
            Нам доверяют лидеры отраслей
          </h2>
          <p className="mt-4 text-base text-white/65 md:text-lg">
            Промышленные и корпоративные заказчики по всей России
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-14 space-y-8 md:mt-16 md:space-y-10">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#061525] to-transparent md:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-[#061525] to-transparent md:w-32" />

        <MarqueeRow duration={ROW_DURATION} />
        {!shouldReduceMotion && (
          <MarqueeRow reverse duration={ROW_DURATION + 10} />
        )}
      </div>
    </section>
  );
}
