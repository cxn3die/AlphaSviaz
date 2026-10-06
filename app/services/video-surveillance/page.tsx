import { notFound } from "next/navigation";

import { ServiceDetailSection } from "@/components/sections/ServiceDetailSection";
import { getServicePage } from "@/lib/data/servicePages";

export const metadata = {
  title: "Видеонаблюдение — Альфа-Связь",
  description: "Подбираем камеры, монтируем и настраиваем видеонаблюдение по всей России.",
};

export default function VideoSurveillancePage() {
  const data = getServicePage("video-surveillance");
  if (!data) notFound();
  return <ServiceDetailSection data={data} />;
}
