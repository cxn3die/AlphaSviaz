import { assetPath, cn } from "@/lib/utils";

/**
 * Фон из фирменного логотипа на всю страницу: диагональные ленты
 * медленно плывут, как надписи «АЛЬФА / СВЯЗЬ» на странице контактов.
 * Логотип одноцветный белый, видимость 6–9 % — заметен, но в глаза
 * не бросается. Лент столько, чтобы хватило на длинную страницу.
 *
 * Движение — классы .logo-rail-a / .logo-rail-b в globals.css
 * (там же отключение при prefers-reduced-motion).
 */
const LOGO = "/images/brand/logo-mono.svg";

type RailSpec = {
  top: string;
  left: string;
  count: number;
  size: string;
  opacity: number;
  drift: "a" | "b";
  duration: number;
  reverse?: boolean;
};

const RAILS: RailSpec[] = [
  { top: "2%", left: "-20%", count: 5, size: "h-[clamp(44px,7vw,96px)]", opacity: 0.075, drift: "a", duration: 38 },
  { top: "17%", left: "-35%", count: 7, size: "h-[clamp(28px,4vw,56px)]", opacity: 0.085, drift: "b", duration: 30, reverse: true },
  { top: "32%", left: "-15%", count: 5, size: "h-[clamp(56px,9vw,120px)]", opacity: 0.06, drift: "a", duration: 44, reverse: true },
  { top: "50%", left: "-30%", count: 6, size: "h-[clamp(32px,5vw,64px)]", opacity: 0.08, drift: "b", duration: 34 },
  { top: "66%", left: "-22%", count: 5, size: "h-[clamp(44px,7vw,96px)]", opacity: 0.065, drift: "a", duration: 40 },
  { top: "82%", left: "-35%", count: 7, size: "h-[clamp(28px,4vw,56px)]", opacity: 0.085, drift: "b", duration: 32, reverse: true },
];

export function LogoDriftBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {RAILS.map((rail, index) => (
        <div
          key={index}
          className={cn("brand-diagonal-rail items-center", rail.drift === "a" ? "logo-rail-a" : "logo-rail-b")}
          style={{
            top: rail.top,
            left: rail.left,
            opacity: rail.opacity,
            animationDuration: `${rail.duration}s`,
            animationDirection: rail.reverse ? "alternate-reverse" : "alternate",
          }}
        >
          {Array.from({ length: rail.count }, (_, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- чистая декорация: next/image тут ничего не даёт
            <img
              key={i}
              src={assetPath(LOGO)}
              alt=""
              className={cn("w-auto max-w-none select-none", rail.size)}
              draggable={false}
            />
          ))}
        </div>
      ))}
      {/* Затемнение к краям — ленты растворяются, а не обрываются */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_45%,transparent_35%,rgba(12,35,64,0.85)_100%)]" />
    </div>
  );
}
