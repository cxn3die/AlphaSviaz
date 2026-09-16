import { notFound } from "next/navigation";

import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { getServicePage } from "@/lib/data/servicePages";

export const metadata = {
  title: "Обслуживание — Альфа-Связь",
  description: "Техническое обслуживание систем безопасности по всей России.",
};

export default function MaintenancePage() {
  const data = getServicePage("maintenance");
  if (!data) notFound();
  return <ServiceDetailSection data={data} />;
}
