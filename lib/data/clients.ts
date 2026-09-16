import { cn } from "@/lib/utils";

/** true — фирменные цвета; false — белые силуэты (как было) */
export const CLIENT_LOGOS_COLOR_MODE = true;

type LogoFix = "blend" | "multiply";

export type ClientLogo = {
  id: string;
  name: string;
  logo: string;
  wide?: boolean;
};

/** В цветном режиме всё равно белым (плохо читается на тёмном фоне) */
const logoWhite = new Set(["syrovarnya"]);

/** Чуть крупнее остальных */
const logoLarger = new Set(["cherkizovo"]);

/** Только для файлов с чёрным/белым фоном — в цветном режиме */
const logoFix: Partial<Record<string, LogoFix>> = {
  s7: "blend",
  russneft: "blend",
  benza: "multiply",
};

export const clients: ClientLogo[] = [
  { id: "cherkizovo", name: "Группа «Черкизово»", logo: "/images/company-logos/cherkizovo.png" },
  { id: "magnit", name: "Магнит", logo: "/images/company-logos/magnit.png", wide: true },
  { id: "tatneft", name: "Татнефть", logo: "/images/company-logos/tatneft-color.svg", wide: true },
  { id: "sberbank", name: "Сбербанк", logo: "/images/company-logos/sberbank.png", wide: true },
  { id: "wildberries", name: "Wildberries", logo: "/images/company-logos/wildberries.png", wide: true },
  { id: "zenit", name: "Банк Зенит", logo: "/images/company-logos/zenit.png" },
  { id: "s7", name: "S7 Airlines", logo: "/images/company-logos/s7.png", wide: true },
  { id: "ageevsky", name: "Агеевский", logo: "/images/company-logos/ageevsky.png" },
  { id: "russneft", name: "РуссНефть", logo: "/images/company-logos/russneft.png", wide: true },
  { id: "syrovarnya", name: "Сыроварня", logo: "/images/company-logos/syrovarnya.svg" },
  { id: "dairy-logic", name: "Логика молока", logo: "/images/company-logos/dairy-logic.svg" },
  { id: "benza", name: "Benza", logo: "/images/company-logos/benza.svg" },
  { id: "kerama-marazzi", name: "Kerama Marazzi", logo: "/images/company-logos/kerama-marazzi.png", wide: true },
  { id: "logo-main", name: "Партнёр", logo: "/images/company-logos/logo-main.svg" },
];

function logoSizeClass(id: string, wide?: boolean) {
  if (wide) return "max-h-8 md:max-h-10";
  if (logoLarger.has(id)) return "max-h-12 md:max-h-14";
  return "max-h-9 md:max-h-11";
}

export function getClientLogoClassName(id: string, wide?: boolean) {
  const fix = logoFix[id];
  const forceWhite = logoWhite.has(id);
  const size = logoSizeClass(id, wide);

  if (CLIENT_LOGOS_COLOR_MODE) {
    return cn(
      "h-auto w-auto max-w-full object-contain",
      size,
      forceWhite ? "opacity-55 brightness-0 invert" : "opacity-85",
      !forceWhite && fix === "blend" && "mix-blend-screen",
      !forceWhite && fix === "multiply" && "mix-blend-multiply"
    );
  }

  return cn(
    "h-auto w-auto max-w-full object-contain opacity-55",
    size,
    fix === "blend" && "mix-blend-screen",
    fix === "multiply" && "mix-blend-multiply",
    !fix && "brightness-0 invert"
  );
}
