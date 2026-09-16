export type AdvantageIcon =
  | "warehouse"
  | "swap"
  | "crews"
  | "design"
  | "fleet";

export type AdvantageItem = {
  id: string;
  /** Крупная цифра, если у преимущества она есть */
  value?: string;
  title: string;
  description: string;
  icon: AdvantageIcon;
  /** Путь к фото из /public/images/company. Пока не задан — рисуется иконка */
  image?: string;
  imageAlt?: string;
  /**
   * Точка фокуса кадра для узкой карточки — CSS object-position.
   * Не задана — центр.
   */
  imagePosition?: string;
  /** Растянуть карточку на две колонки */
  wide?: boolean;
};

export const advantagesCopy = {
  eyebrow: "Почему мы",
  title: "Собственные ресурсы — а не подряд на стороне",
  subtitle:
    "Склад, проектировщики, монтажные бригады и техника — всё внутри компании. Поэтому сроки не зависят от поставщиков и субподрядчиков.",
};

export const advantages: AdvantageItem[] = [
  {
    id: "crews",
    value: "15",
    title: "бригад монтажа и обслуживания",
    description:
      "Собственные бригады выезжают на объекты по всей России — параллельно ведём несколько площадок.",
    icon: "crews",
    image: "/images/company/montazh-opora.webp",
    imageAlt: "Монтажник «Альфа-Связь» ведёт кабельные работы на опоре",
    wide: true,
  },
  {
    id: "fleet",
    value: "17",
    title: "автомобилей в автопарке",
    description:
      "От легковых до грузовых — полностью укомплектованы инструментом и оборудованием для работ на объекте.",
    icon: "fleet",
    image: "/images/company/avtopark.webp",
    imageAlt:
      "Служебный автомобиль «Альфа-Связь» с лестницей на крыше у производственного корпуса",
  },
  {
    id: "design",
    title: "Собственный отдел проектирования",
    description:
      "Проект, расчёт и смету готовят наши инженеры — без посредников и переделок на этапе монтажа.",
    icon: "design",
    image: "/images/company/otdel-proektirovaniya.webp",
    imageAlt: "Инженер разбирает схему объекта на большом экране",
  },
  {
    id: "warehouse",
    title: "Оборудование в наличии на своём складе",
    description:
      "Не ждём поставок под каждый заказ — ходовые позиции всегда на складе, монтаж начинается сразу после согласования.",
    icon: "warehouse",
    image: "/images/company/sklad.webp",
    imageAlt: "Складские стеллажи с оборудованием и материалами",
  },
  {
    id: "swap",
    title: "Меняем вышедшее из строя на новое",
    description:
      "Складской резерв позволяет заменить отказавшее оборудование сразу, не останавливая работу объекта на время ремонта.",
    icon: "swap",
    image: "/images/company/vyezd-brigady.webp",
    imageAlt: "Специалист выгружает инструмент из служебного автомобиля",
    // Карточка узкая: без сдвига влево в кадр попадает здание, а не машина
    imagePosition: "30% center",
  },
];
