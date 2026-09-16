import { notFound } from "next/navigation";

import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { getServicePage } from "@/lib/data/servicePages";

export const metadata = {
  title: "Пожарная безопасность — Альфа-Связь",
  description: "Пожарная сигнализация, оповещение и сопутствующие системы по всей России.",
};

export default function FireSafetyPage() {
  const data = getServicePage("fire-safety");
  if (!data) notFound();
  return <ServiceDetailSection data={data} />;
}
