import { cn } from "@/lib/utils";

/**
 * Фоновая монтажная схема — то, что компания рисует каждый день.
 * Даёт секциям разную фактуру, не трогая яркость фона: разводить
 * блоки светлотой на тёмном сайте оказалось слишком грубо.
 *
 * Мотив у каждой секции свой, поэтому id паттерна завязан на variant —
 * один вариант на страницу, иначе градиенты склеятся.
 */
export type BlueprintVariant = "camera" | "network" | "plan";

type BlueprintPatternProps = {
  variant: BlueprintVariant;
  className?: string;
};

export function BlueprintPattern({ variant, className }: BlueprintPatternProps) {
  const gridId = `bp-grid-${variant}`;
  const fadeId = `bp-fade-${variant}`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <svg
        className="size-full text-[#64B5F6]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern
            id={gridId}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0H0v48"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.05"
            />
          </pattern>

          {/* Схема гаснет к краям, чтобы не спорила с текстом */}
          <radialGradient id={fadeId} cx="50%" cy="45%" r="72%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="65%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id={`${fadeId}-mask`}>
            <rect width="1440" height="900" fill={`url(#${fadeId})`} />
          </mask>
        </defs>

        <rect width="1440" height="900" fill={`url(#${gridId})`} />

        <g
          mask={`url(#${fadeId}-mask)`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {variant === "camera" && <CameraMotif />}
          {variant === "network" && <NetworkMotif />}
          {variant === "plan" && <PlanMotif />}
        </g>
      </svg>
    </div>
  );
}

/** Камера с сектором обзора — как на плане расстановки */
function Camera({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path
        d="M32 0 311 -138a340 340 0 0 1 0 276Z"
        fill="currentColor"
        opacity="0.05"
        stroke="none"
      />
      <path d="M32 0 311 -138" opacity="0.16" />
      <path d="M32 0 311 138" opacity="0.16" />
      <path d="M311 -138a340 340 0 0 1 0 276" opacity="0.12" />

      <rect x="-30" y="-11" width="46" height="22" rx="4" opacity="0.3" />
      <path d="M16 -7 32 -13v26l-16-6Z" opacity="0.3" />
      <path d="M-24 11v13m-10 0h20" opacity="0.24" />
    </g>
  );
}

function CameraMotif() {
  return (
    <>
      <Camera x={110} y={130} rotate={20} />
      <Camera x={1230} y={610} rotate={165} />
      <Camera x={700} y={830} rotate={-98} />
    </>
  );
}

/** Узлы и кабельные трассы — структурная схема сети */
function NetworkMotif() {
  const nodes: Array<[number, number]> = [
    [300, 180],
    [300, 470],
    [720, 470],
    [720, 200],
    [1080, 200],
    [1080, 650],
    [540, 650],
  ];

  return (
    <>
      <g opacity="0.2">
        <path d="M80 180h220M300 180v290M300 470h420M720 470V200M720 200h360M1080 200v450M1080 650H540M540 650v130" />
        <path d="M300 470H120M720 470h180M1080 400h220" strokeDasharray="6 8" />
      </g>

      {/* Шкаф с оборудованием */}
      <g opacity="0.26" transform="translate(1180 300)">
        <rect x="0" y="0" width="130" height="170" rx="6" />
        <path d="M12 32h106M12 66h106M12 100h106M12 134h106" opacity="0.7" />
      </g>

      <g opacity="0.28" transform="translate(150 620)">
        <rect x="0" y="0" width="150" height="90" rx="6" />
        <path d="M14 26h60M14 46h96M14 66h40" opacity="0.7" />
      </g>

      <g fill="currentColor" stroke="none" opacity="0.3">
        {nodes.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
        ))}
      </g>
      <g opacity="0.22">
        {nodes.map(([cx, cy]) => (
          <circle key={`r-${cx}-${cy}`} cx={cx} cy={cy} r="12" />
        ))}
      </g>
    </>
  );
}

/** Контуры помещений с размерными линиями — фрагмент плана */
function PlanMotif() {
  return (
    <>
      <g opacity="0.24">
        <rect x="120" y="150" width="430" height="300" rx="2" />
        <rect x="134" y="164" width="402" height="272" rx="2" opacity="0.5" />
        {/* дверной проём с распахом */}
        <path d="M330 450h84" stroke="#0C2340" strokeWidth="6" />
        <path d="M330 450a84 84 0 0 1 84-84" opacity="0.6" />
      </g>

      <g opacity="0.24">
        <rect x="620" y="330" width="330" height="380" rx="2" />
        <rect x="634" y="344" width="302" height="352" rx="2" opacity="0.5" />
        <path d="M620 500v76" stroke="#0C2340" strokeWidth="6" />
      </g>

      <g opacity="0.2">
        <rect x="1020" y="150" width="300" height="220" rx="2" />
        <rect x="1034" y="164" width="272" height="192" rx="2" opacity="0.5" />
      </g>

      {/* Размерная линия */}
      <g opacity="0.22">
        <path d="M120 510h430" />
        <path d="M120 500v20M550 500v20" />
        <path d="M620 760h330" />
        <path d="M620 750v20M950 750v20" />
      </g>
    </>
  );
}
