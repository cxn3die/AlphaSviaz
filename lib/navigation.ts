export type ServiceLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: ServiceLink[];
};

export type FooterLink = {
  label: string;
  href: string;
};

/** Куда ведут все кнопки «Оставить заявку» — форма на странице контактов */
export const REQUEST_HREF = "/contacts/#request";

/**
 * С trailingSlash: true usePathname отдаёт «/projects/», а ссылки в меню
 * записаны как «/projects». Сравнивать пути только через эту функцию.
 */
export function normalizePath(pathname: string | null | undefined) {
  if (!pathname) return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export const services: ServiceLink[] = [
  {
    label: "Видеонаблюдение",
    href: "/services/video-surveillance",
    description: "IP-камеры и видеоаналитика",
  },
  {
    label: "СКУД (контроль доступа)",
    href: "/services/access-control",
    description: "Турникеты, двери, учёт проходов",
  },
  {
    label: "Пожарная и охранная безопасность",
    href: "/services/fire-safety",
    description: "ОПС, АПС, оповещение",
  },
  {
    label: "Сетевые системы (СКС, ВОЛС)",
    href: "/services/networks",
    description: "Кабельная инфраструктура и связь",
  },
  {
    label: "Обслуживание",
    href: "/services/maintenance",
    description: "Сервис и регламентные работы",
  },
];

export const mainNav: NavItem[] = [
  { label: "Услуги", href: "/services", children: services },
  { label: "Проекты", href: "/projects" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export const companyNav: FooterLink[] = [
  { label: "О компании", href: "/about" },
  { label: "Проекты", href: "/projects" },
  { label: "Контакты", href: "/contacts" },
  { label: "Политика конфиденциальности", href: "/privacy" },
];
