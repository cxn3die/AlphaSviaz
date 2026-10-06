import { BrandDiagonalWatermark } from "@/components/decorative/BrandDiagonalWatermark";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { PageHero } from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/data/site";

export const metadata = {
  title: "Контакты — Альфа-Связь",
  description:
    "Адрес, телефон и форма заявки «Альфа-Связь» — системы безопасности по всей России.",
};

export default function ContactsPage() {
  return (
    <div className="relative -mt-20 pt-20 overflow-hidden bg-[#0C2340]">
      <BrandDiagonalWatermark />
      <div className="relative z-10">
        <PageHero
          underHeader={false}
          title="Контакты"
          description={`Свяжитесь с ${siteConfig.name} — ответим на вопросы и рассчитаем проект.`}
        />
        <ContactsSection />
      </div>
    </div>
  );
}
