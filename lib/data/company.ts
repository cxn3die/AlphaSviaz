import { companyFacts, serviceCoverage } from "@/lib/data/site";

export const companyInfo = {
  brand: "Альфа-Связь",
  tagline: "Системы безопасности",
  groupName: "Поволжье Строй Сервис",
  groupDescription:
    "Группа компаний работает в сфере инженерных систем, теплоэнергоснабжения, газового обслуживания, пожарной безопасности и современных систем безопасности.",
  alphaPositioning:
    "Проектирование и монтаж современных систем безопасности, охранно-пожарной сигнализации и инженерных решений для коммерческих и промышленных объектов.",
  geography: serviceCoverage.withOffice,
};

export type EcosystemNode = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isCore?: boolean;
};

export const aboutPageCopy = {
  hero: {
    eyebrow: "О компании",
    title: "Сами проектируем и сами монтируем",
    description:
      `«Альфа-Связь» с ${companyFacts.foundedYear} года строит системы безопасности на коммерческих и промышленных объектах. Собственный отдел проектирования, склад оборудования, 15 монтажных бригад и автопарк. Субподрядчиков не привлекаем.`,
    hubTitle: "Оборудование",
    hubBadge: "Альфа-Связь",
  },
  /** id: "projects" — значение подставляется живым счётчиком */
  stats: [
    { id: "years", value: String(companyFacts.yearsOnMarket), label: "лет на рынке безопасности" },
    { id: "projects", value: "1 148", label: "проектов реализовано" },
    { id: "crews", value: "15", label: "бригад монтажа и сервиса" },
    { id: "warranty", value: "3 года", label: "гарантия на работы" },
  ],
  ecosystem: {
    title: "Карта экосистемы",
    subtitle:
      "Наведите на узел — увидите, как связаны направления группы и чем занимается «Альфа-Связь» в центре.",
    hint: "Кликните узел для деталей",
  },
  group: {
    title: "Сила группы — опора для сложных объектов",
    subtitle:
      "«Альфа-Связь» опирается на ресурсы и опыт «Поволжье Строй Сервис» — от инженерии до пожарной безопасности.",
  },
  services: {
    title: "Направления работ",
    subtitle:
      "Можно заказать одно направление или несколько сразу на одном объекте.",
  },
  process: {
    title: "Как мы ведём проект",
    subtitle:
      "Заявки приходят с тендеров, по звонку или через наших менеджеров. Дальше все идут одинаково: расчёт, согласование, монтаж, сдача.",
  },
  guarantee: {
    title: "Гарантия до 3 лет",
    description: "На оборудование и выполненные монтажные работы — фиксируем в договоре.",
  },
};

export const ecosystemNodes: EcosystemNode[] = [
  {
    id: "alpha",
    title: "Альфа-Связь",
    subtitle: "Ядро безопасности",
    description:
      "Видеонаблюдение, СКУД, пожарная сигнализация и сети — проектирование, монтаж и сервис под ключ.",
    isCore: true,
  },
  {
    id: "pss",
    title: "Поволжье Строй Сервис",
    subtitle: "Головная группа",
    description:
      "Инженерные системы, теплоэнергоснабжение, газовое обслуживание и комплексная пожарная безопасность.",
  },
  {
    id: "engineering",
    title: "Инженерные системы",
    subtitle: "Инфраструктура объекта",
    description:
      "Слаботочные и инженерные решения, на которых строится стабильная работа безопасности.",
  },
  {
    id: "fire",
    title: "Пожарная безопасность",
    subtitle: "АПС и оповещение",
    description:
      "Охранно-пожарная сигнализация, оповещение и согласование с требованиями надзора.",
  },
  {
    id: "energy",
    title: "Тепло и газ",
    subtitle: "Энергоснабжение",
    description:
      "Сопутствующие направления группы для промышленных и коммерческих площадок.",
  },
  {
    id: "service",
    title: "Сервис 24/7",
    subtitle: "Сопровождение",
    description:
      "Регламентные работы, расширение систем и поддержка после сдачи объекта.",
  },
];

export const aboutPillars = [
  {
    id: "group",
    title: `Входит в «${companyInfo.groupName}»`,
    text: companyInfo.groupDescription,
  },
  {
    id: "focus",
    title: companyInfo.brand,
    text: companyInfo.alphaPositioning,
  },
  {
    id: "geo",
    title: "География",
    text: `${companyInfo.geography} — выезд на объект, монтаж и сопровождение проекта.`,
  },
] as const;
