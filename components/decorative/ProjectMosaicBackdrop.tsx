import { cn } from "@/lib/utils";

/**
 * Фон «доска объектов» на всю страницу: сетка мелких квадратов, как план
 * или табло. Сетка — повторяющийся SVG-узор (лёгкий для браузера на любой
 * высоте), поверх него несколько тёплых клеток медленно «дышат».
 * Рисунок фиксированный (без Math.random), сервер и браузер совпадают.
 */
const PITCH = 24; // шаг сетки, px
const CELL = 14; // сторона квадрата, px
const TILE_COLS = 24;
const TILE_ROWS = 16;

function hash(n: number, salt = 0) {
  let h = Math.imul((n ^ 0x5bd1e995) + salt, 0x2c1b3c6d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x297a2d39);
  h ^= h >>> 13;
  return (h >>> 0) % 1000;
}

const tileCells = Array.from({ length: TILE_COLS * TILE_ROWS }, (_, i) => {
  const r = hash(i);
  return {
    x: (i % TILE_COLS) * PITCH,
    y: Math.floor(i / TILE_COLS) * PITCH,
    fill: r < 120 ? "rgba(100,181,246,0.13)" : "rgba(255,255,255,0.035)",
  };
});

// Тёплые клетки: позиции кратны шагу сетки, поэтому ложатся ровно в узор
const warmCells = Array.from({ length: 34 }, (_, i) => ({
  col: hash(i, 7) % 64,
  row: hash(i, 13) % 110,
  delay: (i % 9) * 0.7,
}));

export function ProjectMosaicBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id="project-mosaic"
            width={TILE_COLS * PITCH}
            height={TILE_ROWS * PITCH}
            patternUnits="userSpaceOnUse"
          >
            {tileCells.map((cell) => (
              <rect key={`${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width={CELL} height={CELL} rx={3} fill={cell.fill} />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#project-mosaic)" />
      </svg>

      {warmCells.map((cell, i) => (
        <span
          key={i}
          className="absolute block rounded-[3px] bg-[#F25C1F]/50 animate-[mosaic-breathe_6s_ease-in-out_infinite]"
          style={{
            left: cell.col * PITCH,
            top: cell.row * PITCH,
            width: CELL,
            height: CELL,
            animationDelay: `${cell.delay}s`,
          }}
        />
      ))}

      {/* Мозаика гаснет к центру и краям — текст читается, края не обрываются */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,rgba(12,35,64,0.55)_0%,rgba(12,35,64,0.35)_55%,rgba(12,35,64,0.9)_100%)]" />
    </div>
  );
}
