"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { BRAND_NAVY_LIFTED } from "@/lib/brand-colors";
import { siteConfig } from "@/lib/data/site";
import { companyNav, normalizePath, services } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: siteConfig.social.telegram, label: "Telegram", icon: TelegramIcon },
  { href: siteConfig.social.whatsapp, label: "WhatsApp", icon: WhatsAppIcon },
  { href: siteConfig.social.vk, label: "VK", icon: VkIcon },
];

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M21.94 4.64a1 1 0 0 0-1.06-.13L2.95 12.4a1 1 0 0 0 .1 1.88l4.47 1.5 1.72 5.1a1 1 0 0 0 1.78.22l2.58-3.37 4.44 3.25a1 1 0 0 0 1.56-.62l2.25-14.65a1 1 0 0 0-.35-1.07ZM9.26 15.2l-.95 2.81-.89-2.63 8.88-6.62-7.04 6.44Zm8.89 3.2-3.77-2.76a1 1 0 0 0-1.38.19l-.9 1.18.88-2.62 6.3-5.75-1.13 9.76Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M20.52 3.49A11.9 11.9 0 0 0 12.03 0C5.5 0 .19 5.3.19 11.84c0 2.08.54 4.1 1.57 5.89L0 24l6.46-1.7a11.8 11.8 0 0 0 5.56 1.42h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.16-1.23-6.12-3.35-8.39Zm-8.5 18.22h-.01a9.83 9.83 0 0 1-5-1.36l-.36-.22-3.83 1 1.02-3.73-.24-.38a9.8 9.8 0 0 1-1.5-5.19c0-5.42 4.4-9.84 9.84-9.84 2.63 0 5.1 1.02 6.96 2.88a9.78 9.78 0 0 1 2.88 6.96c0 5.43-4.42 9.84-9.86 9.84Zm5.39-7.36c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.16.19-.33.22-.62.07-.29-.15-1.2-.44-2.29-1.4-.85-.75-1.42-1.67-1.59-1.96-.16-.29-.02-.45.13-.6.14-.13.29-.33.43-.5.15-.17.19-.29.29-.48.1-.2.05-.36-.02-.51-.08-.15-.65-1.56-.89-2.14-.24-.57-.48-.49-.65-.49l-.56-.01c-.19 0-.51.07-.77.36-.26.29-1 1-.1 2.45.89 1.45 2.63 3.65 6.34 5.12.88.38 1.56.6 2.09.77.88.28 1.69.24 2.32.15.71-.1 1.7-.69 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M3.74 7.29C3.87 13.05 6.8 16.51 11.9 16.51h.29v-3.3c1.86.18 3.27 1.55 3.84 3.3h2.63c-.73-2.64-2.64-4.1-3.83-4.66 1.19-.69 2.86-2.37 3.26-4.56H15.7c-.52 1.78-2.06 3.46-3.51 3.61V7.29H9.8v6.33c-1.47-.37-3.32-2.18-3.4-6.33H3.74Z" />
    </svg>
  );
}

/**
 * Реквизиты выводим только настоящие. Пока в site.ts стоят заглушки
 * с «X», строка в подвале скрыта — иначе посетитель видит «5836XXXXXX».
 */
const hasLegalIds = [siteConfig.legal.inn, siteConfig.legal.ogrn].every(
  (value) => /^\d+$/.test(value)
);

export function Footer() {
  const pathname = normalizePath(usePathname());
  const currentYear = new Date().getFullYear();
  const isHome = pathname === "/";

  return (
    <footer
      className={cn("py-12 text-white md:py-16", isHome && "bg-primary")}
      style={isHome ? undefined : { backgroundColor: BRAND_NAVY_LIFTED }}
    >
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="dark" />
            <p className="mt-5 text-sm leading-relaxed text-white/80 [overflow-wrap:anywhere] hyphens-auto">
              {siteConfig.description}. Входит в группу компаний «Поволжье Строй
              Сервис».
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-white/70 transition hover:text-[#F25C1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25C1F] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-lg font-bold">Услуги</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-lg font-bold">Компания</h3>
            <ul className="space-y-2">
              {companyNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-lg font-bold">Контакты</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{siteConfig.contacts.address}</span>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.phoneLink}
                  className="flex items-center gap-2 transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  <Phone className="size-4 shrink-0" />
                  <span>{siteConfig.contacts.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.emailLink}
                  className="flex items-center gap-2 transition-colors hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  <Mail className="size-4 shrink-0" />
                  <span>{siteConfig.contacts.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0" />
                <span>{siteConfig.contacts.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[rgba(242,92,31,0.3)] pt-8 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} ООО «Альфа-Связь». Все права защищены.</p>
          {hasLegalIds && (
            <p>
              ИНН: {siteConfig.legal.inn} • ОГРН: {siteConfig.legal.ogrn}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
