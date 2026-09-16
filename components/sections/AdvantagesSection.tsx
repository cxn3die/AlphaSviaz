"use client";

import { AppImage as Image } from "@/components/ui/app-image";
import { motion, type Variants } from "framer-motion";
import {
  DraftingCompass,
  RefreshCw,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

import {
  advantages,
  advantagesCopy,
  type AdvantageIcon,
  type AdvantageItem,
} from "@/lib/data/advantages";
import { cn } from "@/lib/utils";

const icons: Record<AdvantageIcon, typeof Warehouse> = {
  warehouse: Warehouse,
  swap: RefreshCw,
  crews: Users,
  design: DraftingCompass,
  fleet: Truck,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function AdvantageCard({ item }: { item: AdvantageItem }) {
  const Icon = icons[item.icon];
  const hasImage = Boolean(item.image);

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[20px] border",
        "transition-colors duration-300",
        hasImage
          ? "border-white/20 hover:border-[#42A5F5]/60"
          : "border-white/15 bg-[#12334F] hover:border-[#42A5F5]/50 hover:bg-[#163D5E]",
        item.wide && "md:col-span-2"
      )}
    >
      {hasImage && (
        <>
          <Image
            src={item.image!}
            alt={item.imageAlt ?? item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
            className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
          />
          {/* Прозрачно сверху — фото видно; плотно снизу — текст читается */}
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,47,0.15)_0%,rgba(7,26,47,0.35)_38%,rgba(7,26,47,0.82)_72%,rgba(7,26,47,0.96)_100%)]"
            aria-hidden
          />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-8">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-[14px] backdrop-blur-sm transition-colors",
            hasImage
              ? "border border-white/25 bg-black/35 text-white group-hover:bg-[#1E88E5]/70"
              : "bg-[#42A5F5]/18 text-[#7EC4FA] group-hover:bg-[#42A5F5]/30"
          )}
        >
          <Icon className="size-6" strokeWidth={1.8} />
        </span>

        <div className="mt-10">
          {item.value ? (
            <p className="font-heading text-[60px] font-bold leading-none tracking-[-0.03em] text-[#FF7A3D] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:text-[68px]">
              {item.value}
            </p>
          ) : null}
          <h3
            className={cn(
              "font-heading font-bold text-white",
              item.value ? "mt-2 text-lg md:text-xl" : "text-xl md:text-2xl"
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "mt-3 text-[15px] leading-relaxed md:text-base",
              hasImage ? "text-white/80" : "text-white/70"
            )}
          >
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function AdvantagesSection() {
  return (
    <section
      id="advantages"
      aria-labelledby="advantages-heading"
      className="relative py-20 md:py-24 lg:py-28"
    >
      {/* Мягкая подсветка, чтобы секция не проваливалась в темноту */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(30,136,229,0.16),transparent_70%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#64B5F6]">
            {advantagesCopy.eyebrow}
          </p>
          <h2
            id="advantages-heading"
            className="mt-3 font-heading text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight text-white"
          >
            {advantagesCopy.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
            {advantagesCopy.subtitle}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {advantages.map((item) => (
            <AdvantageCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
