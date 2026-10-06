export const serviceCoverage = {
  /** Для заголовков и CTA */
  region: "по всей России",
  /** Короткая метка в статистике */
  regionShort: "РФ",
  /** Полная формулировка */
  full: "Работаем на объектах по всей России",
  /** С указанием головного офиса */
  withOffice: "По всей России. Головной офис — Пенза",
} as const;

/**
 * Срок работы на рынке. Указан владельцем: 9 лет.
 * Год начала выводится из него, чтобы «N лет» и «с ... года» не расходились.
 * На старом сайте acctv.ru было «12 лет, с 2014 года» — владелец решил иначе.
 */
const YEARS_ON_MARKET = 9;
export const companyFacts = {
  yearsOnMarket: YEARS_ON_MARKET,
  foundedYear: 2026 - YEARS_ON_MARKET,
} as const;

export const siteConfig = {
  name: "Альфа-Связь",
  tagline: "Системы безопасности",
  description:
    "Проектирование и монтаж видеонаблюдения, СКУД, охранно-пожарной сигнализации, ВОЛС и СКС под ключ по всей России",
  coverage: serviceCoverage,

  contacts: {
    phone: "8 (8412) 39-06-66",
    phoneLink: "tel:+78412390666",
    phoneSecondary: "8 (800) 250-66-58",
    phoneSecondaryLink: "tel:+78002506658",
    email: "info@termoset-pro.ru",
    emailLink: "mailto:info@termoset-pro.ru",
    emailSecondary: "info@gkpss.ru",
    emailSecondaryLink: "mailto:info@gkpss.ru",
    address: "440000, г. Пенза, ул. Кирова, 63А, офис 205",
    workingHours: "Пн–Сб: 9:00–18:00",
    workingHoursWeekend: "",
    mapLon: 45.020095,
    mapLat: 53.193904,
    mapZoom: 17,
    mapEmbedUrl:
      "https://yandex.ru/map-widget/v1/?ll=45.020095%2C53.193904&z=17&l=map&pt=45.020095%2C53.193904%2Cpm2rdm",
    mapLink: "https://yandex.ru/maps/49/penza/house/ulitsa_kirova_63a/",
  },

  social: {
    telegram: "https://t.me/alfasvyaz",
    whatsapp: "https://wa.me/78412390666",
    vk: "https://vk.com/alfasvyaz",
  },

  /** Карточки в справочниках — отзывы и локальный поиск */
  directories: [
    {
      id: "yandex",
      label: "Яндекс.Профиль",
      href: "https://yandex.ru/profile/197688174088/",
    },
    {
      id: "2gis",
      label: "2ГИС",
      href: "https://2gis.ru/penza/firm/70000001066779372",
    },
  ],

  legal: {
    companyName: 'ООО "Альфа-Связь"',
    inn: "5836XXXXXX",
    ogrn: "1145836XXXXXX",
    legalAddress: "440000, г. Пенза, ул. Кирова, 63А, офис 205",
  },
};
