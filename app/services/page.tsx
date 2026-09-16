import { PageCtaSection } from "@/components/sections/PageCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesOverviewSection } from "@/components/sections/ServicesOverviewSection";
import { WorkStepsSection } from "@/components/sections/WorkStepsSection";
import { siteConfig } from "@/lib/data/site";

export const metadata = {
  title: "Услуги — Альфа-Связь",
  description:
    "Профессиональная установка систем безопасности по всей России: видеонаблюдение, СКУД, пожарная сигнализация, сети.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#0C2340]">
      <PageHero
        title="Услуги"
        description={siteConfig.description}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Услуги" },
        ]}
      />
      <ServicesOverviewSection />
      <WorkStepsSection />
      <PageCtaSection />
    </main>
  );
}
