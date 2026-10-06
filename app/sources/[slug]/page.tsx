import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SourceDetail } from "@/components/sections/sources/SourceDetail";
import { getSource, sources } from "@/lib/data/sources";

// Статический экспорт: все страницы известны на этапе сборки
export const dynamicParams = false;

export function generateStaticParams() {
  return sources.map((source) => ({ slug: source.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const source = getSource(params.slug);
  if (!source) return {};
  return {
    title: `${source.title} — Альфа-Связь`,
    description: source.description,
  };
}

export default function SourcePage({ params }: { params: { slug: string } }) {
  const source = getSource(params.slug);
  if (!source) notFound();
  return <SourceDetail source={source} />;
}
