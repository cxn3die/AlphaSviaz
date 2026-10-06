import { assetPath, cn } from "@/lib/utils";

/**
 * Фон из фирменного логотипа: три диагональные ленты медленно плывут,
 * как надписи «АЛЬФА / СВЯЗЬ» на странице контактов. Логотип одноцветный
 * белый, видимость 4–7 % — заметен, но в глаза не бросается.
 */
const LOGO = "/images/brand/logo-mono.svg";

function Rail({ variant, count, size }: { variant: string; count: number; size: string }) {
  return (
    <div className={cn("brand-diagonal-rail items-center", variant)}>
      {Array.from({ length: count }, (_, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- чистая декорация: next/image тут ничего не даёт
        <img
          key={i}
          src={assetPath(LOGO)}
          alt=""
          className={cn("w-auto max-w-none select-none", size)}
          draggable={false}
        />
      ))}
    </div>
  );
}

export function LogoDriftBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0">
        <div className="opacity-[0.075]">
          <Rail variant="brand-diagonal-rail--primary" count={4} size="h-[clamp(56px,9vw,120px)]" />
        </div>
        <div className="opacity-[0.055]">
          <Rail variant="brand-diagonal-rail--secondary" count={4} size="h-[clamp(40px,6vw,84px)]" />
        </div>
        <div className="opacity-[0.085]">
          <Rail variant="brand-diagonal-rail--accent" count={5} size="h-[clamp(28px,4vw,56px)]" />
        </div>
      </div>
      {/* Затемнение к краям — ленты растворяются, а не обрываются */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_30%,rgba(12,35,64,0.9)_100%)]" />
    </div>
  );
}
