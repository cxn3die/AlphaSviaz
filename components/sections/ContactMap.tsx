import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { siteConfig } from "@/lib/data/site";

export function ContactMap() {
  return (
    <div className="mt-8 overflow-hidden rounded-[16px] border border-[#E5E9F0] bg-[#F5F7FA]">
      <div className="relative aspect-[16/10] w-full min-h-[240px] md:min-h-[280px]">
        <iframe
          title={`Карта — ${siteConfig.contacts.address}`}
          src={siteConfig.contacts.mapEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-col gap-2 border-t border-[#E5E9F0] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#475467]">{siteConfig.contacts.address}</p>
        <Link
          href={siteConfig.contacts.mapLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E88E5] transition hover:text-[#1565C0]"
        >
          Открыть в Яндекс.Картах
          <ExternalLink className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
