import { AboutProjectTeamSection } from "@/components/sections/about/AboutProjectTeamSection";
import { AboutGuaranteeBanner } from "@/components/sections/about/AboutGuaranteeBanner";
import { AboutPageHero } from "@/components/sections/about/AboutPageHero";
import { AboutProcessTimeline } from "@/components/sections/about/AboutProcessTimeline";
import { AboutServicesHub } from "@/components/sections/about/AboutServicesHub";
import { PageCtaSection } from "@/components/sections/PageCtaSection";
import { companyInfo } from "@/lib/data/company";

export const metadata = {
  title: "О компании — Альфа-Связь",
  description: `${companyInfo.brand} — ${companyInfo.alphaPositioning}`,
};

/**
 * Порядок блоков отвечает на вопросы клиента в том порядке,
 * в котором он их задаёт: кто вы → что умеете → кто поведёт
 * мой объект → как это будет → чем отвечаете.
 *
 * Фон чередуется тёмный / светлый, иначе секции сливаются
 * в одно полотно.
 */
export default function AboutPage() {
  return (
    <div className="bg-[#0C2340]">
      <AboutPageHero />
      <AboutServicesHub />
      <AboutProjectTeamSection />
      <AboutProcessTimeline />
      <AboutGuaranteeBanner />
      <PageCtaSection />
    </div>
  );
}
