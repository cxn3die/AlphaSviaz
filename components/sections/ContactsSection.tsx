import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { ContactFormMock } from "@/components/forms/ContactFormMock";
import { ContactMap } from "@/components/sections/ContactMap";
import { siteConfig } from "@/lib/data/site";

export function ContactsSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/*
          grid-cols-1 = minmax(0, 1fr). Без него колонка не сжимается уже
          386px: карта с aspect-ratio и min-height задаёт минимальную ширину,
          и на телефонах адрес, карта и форма уезжали за край экрана.
        */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h2 className="font-heading text-xl font-bold text-white">
              Связаться с нами
            </h2>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-[#64B5F6]" />
                <div>
                  <p className="text-sm font-medium text-white">Адрес</p>
                  <p className="mt-1 text-white/65">{siteConfig.contacts.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-[#64B5F6]" />
                <div>
                  <p className="text-sm font-medium text-white">Телефон</p>
                  <a
                    href={siteConfig.contacts.phoneLink}
                    className="mt-1 block text-[#64B5F6] hover:underline"
                  >
                    {siteConfig.contacts.phone}
                  </a>
                  <a
                    href={siteConfig.contacts.phoneSecondaryLink}
                    className="mt-1 block text-white/55 hover:text-[#64B5F6]"
                  >
                    {siteConfig.contacts.phoneSecondary}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-[#64B5F6]" />
                <div>
                  <p className="text-sm font-medium text-white">E-mail</p>
                  <a
                    href={siteConfig.contacts.emailLink}
                    className="mt-1 block text-[#64B5F6] hover:underline"
                  >
                    {siteConfig.contacts.email}
                  </a>
                  {siteConfig.contacts.emailSecondary && (
                    <a
                      href={siteConfig.contacts.emailSecondaryLink}
                      className="mt-1 block text-white/55 hover:text-[#64B5F6] hover:underline"
                    >
                      {siteConfig.contacts.emailSecondary}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-[#64B5F6]" />
                <div>
                  <p className="text-sm font-medium text-white">Режим работы</p>
                  <p className="mt-1 text-white/65">
                    {siteConfig.contacts.workingHours}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <p className="text-sm font-medium text-white">Мы в справочниках</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {siteConfig.directories.map((directory) => (
                  <li key={directory.id}>
                    <a
                      href={directory.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/75 transition hover:border-[#42A5F5]/45 hover:text-[#64B5F6]"
                    >
                      {directory.label}
                      <ExternalLink className="size-3.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ContactMap />
          </div>

          <div
            id="request"
            className="min-w-0 scroll-mt-28 rounded-[20px] bg-white/[0.04] p-6 backdrop-blur-sm md:p-8"
          >
            <h2 className="font-heading text-xl font-bold text-white">
              Оставить заявку
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Форма в макете — отправка будет подключена позже.
            </p>

            <ContactFormMock variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
