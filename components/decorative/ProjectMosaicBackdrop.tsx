import { cn } from "@/lib/utils";

/**
 * Фон «доска объектов»: сетка мелких квадратов, как план или табло.
 * Большинство почти невидимы, часть чуть светлее, единицы — тёплые
 * и медленно «дышат». Рисунок фиксированный (без Math.random),
 * чтобы сервер и браузер выдавали одинаковую разметку.
 */
const COLS = 64;
const ROWS = 36;

function cellTone(index: number) {
  // Простой целочисленный хеш → 0..999
  let h = Math.imul(index ^ 0x5bd1e995, 0x2c1b3c6d);
  h ^= h >>> 15;
  const r = (h >>> 0) % 1000;
  if (r < 18) return "warm";
  if (r < 140) return "lit";
  return "dim";
}

const tones: Record<string, string> = {
  dim: "bg-white/[0.035]",
  lit: "bg-[#64B5F6]/[0.14]",
  warm: "bg-[#F25C1F]/45 animate-[mosaic-breathe_6s_ease-in-out_infinite]",
};

export function ProjectMosaicBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 gap-[10px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, 14px)` }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const tone = cellTone(i);
          return (
            <span
              key={i}
              className={cn("block size-[14px] rounded-[3px]", tones[tone])}
              style={tone === "warm" ? { animationDelay: `${(i % 7) * 0.8}s` } : undefined}
            />
          );
        })}
      </div>
      {/* Мозаика гаснет к краям и под текстом не мешает */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_50%_50%,rgba(12,35,64,0.15)_0%,rgba(12,35,64,0.75)_60%,#0C2340_100%)]" />
    </div>
  );
}
