import { AppImage as Image } from "@/components/ui/app-image";
import { cn } from "@/lib/utils";

/**
 * Фирменный логотип «альфасвязь — системы безопасности».
 * Исходник — векторный логотип со старого сайта заказчика acctv.ru.
 *
 * color — для светлого фона (синий + оранжевый, как в оригинале);
 * light — для тёмного фона: синий заменён белым, оранжевый сохранён.
 */
const LOGO_SRC = {
  color: "/images/brand/logo.svg",
  light: "/images/brand/logo-light.svg",
} as const;

type BrandLogoProps = {
  variant?: keyof typeof LOGO_SRC;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ variant = "color", className, priority }: BrandLogoProps) {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt="Альфа-Связь — системы безопасности"
      width={231}
      height={35}
      priority={priority}
      className={cn("h-9 w-auto select-none", className)}
    />
  );
}
