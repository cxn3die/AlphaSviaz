export type ServiceCapability = {
  title: string;
  brands?: string[];
};

export type ServicePageData = {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  capabilities: ServiceCapability[];
  objects: string[];
  gradient: string;
  /** Фото с объекта. Нет фото — блок не выводится */
  image?: string;
  imageAlt?: string;
};

export const servicePages: Record<string, ServicePageData> = {
  "video-surveillance": {
    slug: "video-surveillance",
    title: "Видеонаблюдение",
    subtitle: "Профессиональный монтаж «под ключ»",
    intro:
      "Проектируем и монтируем системы видеонаблюдения для коммерческих, промышленных и корпоративных объектов по всей России.",
    capabilities: [
      {
        title: "Установка и монтаж систем видеонаблюдения",
        brands: ["Интеллект", "Trassir", "Hikvision", "Dahua", "Axis"],
      },
      {
        title:
          "Нейроаналитика: распознавание номеров и лиц, контроль выкладки товара",
        brands: ["Hikvision", "Dahua", "ZKTeco"],
      },
      { title: "Удалённый просмотр и архив записей" },
      { title: "Интеграция с СКУД и охранной сигнализацией" },
      { title: "Проектирование и пусконаладка" },
    ],
    objects: ["Офисы", "Склады", "Производство", "Торговые объекты"],
    gradient: "linear-gradient(135deg, #0E2848 0%, #1E88E5 50%, #1565C0 100%)",
    image: "/images/equipment/kamera-hikvision.webp",
    imageAlt: "Монтаж уличной IP-камеры Hikvision на опоре",
  },
  "access-control": {
    slug: "access-control",
    title: "СКУД",
    subtitle: "Системы контроля и управления доступом",
    intro:
      "Системы контроля доступа: турникеты, шлагбаумы, домофония, учёт проходов и интеграция с видеонаблюдением.",
    capabilities: [
      {
        title: "Турникеты и триподы",
        brands: ["ZKTeco", "Perco", "Smarte"],
      },
      {
        title: "Шлагбаумы и въездные группы",
        brands: ["Doorhan"],
      },
      {
        title: "Контроллеры доступа и учёт рабочего времени",
        brands: ["SIGUR", "Hikvision", "Perco", "Trassir"],
      },
      {
        title: "IP-домофоны",
        brands: ["Hikvision", "HiWatch", "Dahua"],
      },
      { title: "Планки антипаника и быстросъёмные ограждения" },
    ],
    objects: ["Бизнес-центры", "Склады", "Парковки", "Промышленные объекты"],
    gradient: "linear-gradient(135deg, #0E2542 0%, #1E88E5 60%, #133456 100%)",
    image: "/images/services/card-skud.webp",
    imageAlt: "Турникеты и считыватель системы контроля доступа на проходной",
  },
  "fire-safety": {
    slug: "fire-safety",
    title: "Пожарная и охранная безопасность",
    subtitle: "АПС, СОУЭ, пожаротушение и дымоудаление",
    intro:
      "Современные системы охранно-пожарной сигнализации, пожарной автоматики и оповещения для объектов любой сложности.",
    capabilities: [
      {
        title: "Автоматическая пожарная сигнализация (АПС)",
        brands: ["Bolid"],
      },
      { title: "Система оповещения и управления эвакуацией (СОУЭ)" },
      { title: "Системы пожаротушения" },
      { title: "Системы дымоудаления и подпора воздуха" },
      { title: "Охранная сигнализация" },
    ],
    objects: ["Торговые центры", "Склады", "Офисы", "Производство"],
    gradient: "linear-gradient(135deg, #0E2542 0%, #E65100 50%, #1565C0 100%)",
    image: "/images/services/card-fire.webp",
    imageAlt: "Оборудование пожарной сигнализации на объекте",
  },
  networks: {
    slug: "networks",
    title: "СКС и ВОЛС",
    subtitle: "Структурные сети и оптоволокно",
    intro:
      "Прокладка структурированных кабельных систем (СКС) и волоконно-оптических линий (ВОЛС), настройка сетевого оборудования.",
    capabilities: [
      {
        title:
          "Волоконно-оптические линии связи (ВОЛС): проектирование и прокладка",
      },
      {
        title:
          "Структурированные кабельные системы (СКС), серверные и коммутационные шкафы",
      },
      {
        title: "Подключение и настройка маршрутизаторов",
        brands: ["Cisco", "Huawei", "Mikrotik"],
      },
      {
        title: "Усиление интернета и беспроводные сети",
        brands: ["Ubiquiti UniFi", "Mikrotik"],
      },
    ],
    objects: ["Офисы", "Склады", "Промышленные объекты", "Бизнес-центры"],
    gradient: "linear-gradient(135deg, #1E88E5 0%, #0E2848 60%, #133456 100%)",
    image: "/images/company/vols-opora.webp",
    imageAlt: "Монтажник «Альфа-Связь» прокладывает кабельную линию на опоре",
  },
  maintenance: {
    slug: "maintenance",
    title: "Обслуживание",
    subtitle: "Сервис и регламентные работы",
    intro:
      "Техническое обслуживание систем безопасности и инженерной инфраструктуры: диагностика, ремонт, настройка оборудования.",
    capabilities: [
      { title: "Плановые осмотры и техническое обслуживание" },
      {
        title:
          "Замена вышедшего из строя оборудования из складского резерва — без ожидания поставки",
      },
      { title: "Устранение неисправностей выездными бригадами" },
      { title: "Настройка и модернизация действующих систем" },
      { title: "Регламентное сопровождение по договору" },
    ],
    objects: [
      "Видеонаблюдение",
      "СКУД",
      "Охранно-пожарная сигнализация",
      "СКС и ВОЛС",
    ],
    gradient: "linear-gradient(135deg, #0E2848 0%, #1E88E5 40%, #64B5F6 100%)",
    image: "/images/equipment/shkaf-montazh.webp",
    imageAlt: "Специалист обслуживает уличный шкаф с оборудованием",
  },
};

export function getServicePage(slug: string): ServicePageData | undefined {
  return servicePages[slug];
}
