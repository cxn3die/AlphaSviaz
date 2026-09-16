import { PageHero } from "@/components/sections/PageHero";
import { PrivacyContentSection } from "@/components/sections/PrivacyContentSection";

export const metadata = {
  title: "Политика конфиденциальности — Альфа-Связь",
  description: "Политика обработки персональных данных на сайте «Альфа-Связь».",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#0C2340]">
      <PageHero
        title="Политика конфиденциальности"
        description="Порядок обработки персональных данных пользователей сайта."
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Политика конфиденциальности" },
        ]}
      />
      <PrivacyContentSection />
    </main>
  );
}
