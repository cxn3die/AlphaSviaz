import { notFound } from "next/navigation";

import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { getServicePage } from "@/lib/data/servicePages";

export const metadata = {
  title: "СКУД — Альфа-Связь",
  description: "Системы контроля доступа: турникеты, шлагбаумы, домофония по всей России.",
};

export default function AccessControlPage() {
  const data = getServicePage("access-control");
  if (!data) notFound();
  return <ServiceDetailSection data={data} />;
}
