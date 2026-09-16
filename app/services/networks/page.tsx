import { notFound } from "next/navigation";

import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { getServicePage } from "@/lib/data/servicePages";

export const metadata = {
  title: "Структурные сети — Альфа-Связь",
  description: "СКС, ВОЛС и настройка сетевого оборудования по всей России.",
};

export default function NetworksPage() {
  const data = getServicePage("networks");
  if (!data) notFound();
  return <ServiceDetailSection data={data} />;
}
