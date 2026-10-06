export type ProjectTeamRole = {
  id: string;
  title: string;
  description: string;
};

export const projectTeamCopy = {
  eyebrow: "Команда на проекте",
  title: "Кто ведёт ваш объект",
  subtitle:
    "У каждого объекта своя команда. Вот кто за что отвечает.",
};

export const projectTeamRoles: ProjectTeamRole[] = [
  {
    id: "manager",
    title: "Менеджер проекта",
    description:
      "Принимает заявку, согласует смету и сроки, ведёт сделку и отвечает вам по всем вопросам объекта.",
  },
  {
    id: "engineer",
    title: "Инженер",
    description:
      "Делает технический расчёт, подбирает оборудование и выезжает на объект при необходимости.",
  },
  {
    id: "production",
    title: "Руководитель производства",
    description:
      "Организует закупку, комплектацию и контроль монтажных работ на площадке.",
  },
  {
    id: "crew",
    title: "Монтажная бригада",
    description:
      "Выполняет монтаж, прокладку, настройку и сдачу системы на объекте.",
  },
  {
    id: "finance",
    title: "Бухгалтерия",
    description:
      "Готовит закрывающие документы и сопровождает финансовое оформление сделки.",
  },
];
