"use client";

import { AppImage as Image } from "@/components/ui/app-image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { BRAND_NAVY } from "@/lib/brand-colors";

const BLUR_DATA_URL =
  "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IDQAAACQAgCdASoQAAkAAUAmJaACdLoB+AADsAD+8ut//NgVzXPv9//S4P0uD9Lg/QA=";

export function HeroStatsStack() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={sectionRef} className="relative -mt-20 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src={useFallback ? "/images/bg-hero.jpg" : "/images/bg-hero.webp"}
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          onError={() => setUseFallback(true)}
          className="object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(180deg,
            rgba(7,26,47,0.85) 0%,
            rgba(7,26,47,0.75) 40%,
            rgba(7,26,47,0.92) 72%,
            rgba(7,26,47,1) 80%,
            ${BRAND_NAVY} 86%,
            ${BRAND_NAVY} 100%)`,
        }}
      />

      {/* Плотная полоса внизу — тот же цвет, что и блок услуг */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-28 md:h-36"
        style={{ background: BRAND_NAVY }}
        aria-hidden
      />

      <div className="relative z-20">
        <HeroSection />
        <AchievementsSection />
      </div>
    </section>
  );
}
