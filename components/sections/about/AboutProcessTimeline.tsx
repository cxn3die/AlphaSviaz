"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { FileSearch, PhoneCall, UserRoundSearch } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { aboutPageCopy } from "@/lib/data/company";
import { workSteps } from "@/lib/data/workSteps";
import { cn } from "@/lib/utils";

/** Три канала, с которых приходит заявка. Дальше маршрут общий */
const channels = [
  { id: "tender", label: "Тендерные площадки", icon: FileSearch },
  { id: "inbound", label: "Входящий звонок", icon: PhoneCall },
  { id: "sales", label: "Активные продажи", icon: UserRoundSearch },
] as const;

/**
 * Свет на линиях идёт за прокруткой. Всё, что выше отметки 62 % высоты
 * экрана, уже «пройдено». Отметка общая для слияния каналов и для
 * этапов, поэтому поток переходит из одного в другое без рывка.
 */
const FLOW_OFFSET: UseScrollOptions["offset"] = ["start 0.62", "end 0.62"];

const SPRING = { stiffness: 170, damping: 30, mass: 0.4 };

/**
 * Посетитель просил «меньше движения». До монтирования — false, как при
 * статической сборке: иначе первый рендер в браузере не совпадёт с HTML,
 * React оставит серверные классы, и этапы так и не загорятся.
 */
function useStill() {
  const reduced = useReducedMotion();
  const [still, setStill] = useState(false);
  useEffect(() => setStill(Boolean(reduced)), [reduced]);
  return still;
}

/** Прогресс прокрутки по элементу 0…1, сглаженный. Без анимаций — сразу 1 */
function useFlow(
  target: RefObject<HTMLElement | null>,
  offset: UseScrollOptions["offset"],
  still: boolean,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset });
  const smooth = useSpring(scrollYProgress, SPRING);
  const full = useMotionValue(1);
  return still ? full : smooth;
}

export function AboutProcessTimeline() {
  const { process } = aboutPageCopy;
  const still = useStill();

  return (
    <section className="bg-[#0A1F38] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-white">
            {process.title}
          </h2>
          <p className="mt-4 text-base text-white/60 md:text-lg">{process.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 max-w-[1040px] md:mt-16">
          <ChannelsUnfold still={still}>
            <ChannelsMerge still={still} />
          </ChannelsUnfold>
          <StepsFlow still={still} />
        </div>
      </div>
    </section>
  );
}

/**
 * Один блок на три канала. Сначала в нём только «Тендерные площадки».
 * При прокрутке рамка раскрывается, первый канал уезжает к краю,
 * второй и третий выходят из-под него. Геометрию задаёт CSS
 * (.channels-unfold в globals.css) по переменным --p, --o2, --o3.
 */
function ChannelsUnfold({ still, children }: { still: boolean; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useFlow(ref, ["start 0.92", "start 0.5"], still);
  const second = useTransform(progress, [0.42, 0.9], [0, 1]);
  const third = useTransform(progress, [0.5, 0.97], [0, 1]);

  // Когда блок раскрылся, по рамке один раз проходит блик
  const [open, setOpen] = useState(false);
  useMotionValueEvent(progress, "change", (value) => {
    if (value > 0.985) setOpen(true);
    else if (value < 0.6) setOpen(false);
  });

  return (
    <motion.div
      ref={ref}
      data-open={open || still}
      className="channels-unfold relative"
      style={{ "--p": progress, "--o2": second, "--o3": third } as unknown as MotionStyle}
    >
      <div className="relative">
        <div
          className="channels-unfold__frame overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04]"
          aria-hidden
        >
          {/* Телефон: каналы нанизаны на одну линию, она уходит вниз к этапам */}
          <span className="absolute bottom-0 left-[23px] top-7 w-0.5 bg-white/10 md:hidden" />
        </div>

        <ul className="relative grid grid-cols-1 md:grid-cols-3">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <li
                key={channel.id}
                className={cn(
                  "channels-unfold__item flex items-center gap-3 px-3 py-3.5 md:justify-center md:px-5 md:py-5",
                  index > 0 && "border-t border-white/[0.08] md:border-l md:border-t-0",
                )}
              >
                <span className="relative flex size-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#142840] text-[#64B5F6] md:size-9 md:rounded-[10px]">
                  <Icon className="size-3.5 md:size-[18px]" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="whitespace-nowrap text-[15px] font-medium text-white/90">
                  {channel.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {children}
    </motion.div>
  );
}

/** Высота полосы слияния и радиус поворотов «кабеля» */
const MERGE_H = 96;
const MERGE_R = 16;
const MERGE_TURN = 18;
const MERGE_JOIN = MERGE_TURN + 2 * MERGE_R;

/**
 * Три линии от каналов сходятся в одну и уходят вниз, к этапам.
 * Только с md: на телефоне каналы стоят столбиком на одной линии.
 */
function ChannelsMerge({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const leftRef = useRef<SVGPathElement>(null);
  const rightRef = useRef<SVGPathElement>(null);
  const leftHead = useRef<SVGCircleElement>(null);
  const rightHead = useRef<SVGCircleElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const progress = useFlow(ref, FLOW_OFFSET, still);
  // Боковые линии доходят до слияния ровно тогда, когда туда приходит средняя
  const joinAt = MERGE_JOIN / MERGE_H;
  const sides = useTransform(progress, [0, joinAt], [0, 1]);
  const midY = useTransform(progress, (value) => value * MERGE_H);
  const midOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  const [joined, setJoined] = useState(false);
  useMotionValueEvent(sides, "change", (value) => {
    setJoined(value >= 0.999);
    const pairs = [
      [leftRef.current, leftHead.current],
      [rightRef.current, rightHead.current],
    ] as const;
    for (const [path, head] of pairs) {
      if (!path || !head) continue;
      const point = path.getPointAtLength(path.getTotalLength() * value);
      head.setAttribute("cx", point.x.toFixed(1));
      head.setAttribute("cy", point.y.toFixed(1));
      head.style.opacity = value > 0.02 && value < 0.99 ? "1" : "0";
    }
  });

  const x1 = width / 6;
  const c = width / 2;
  const x3 = (width * 5) / 6;
  const r = MERGE_R;
  const t = MERGE_TURN;
  const left = `M${x1} 0V${t}Q${x1} ${t + r} ${x1 + r} ${t + r}H${c - r}Q${c} ${t + r} ${c} ${MERGE_JOIN}`;
  const right = `M${x3} 0V${t}Q${x3} ${t + r} ${x3 - r} ${t + r}H${c + r}Q${c} ${t + r} ${c} ${MERGE_JOIN}`;
  const middle = `M${c} 0V${MERGE_H}`;

  return (
    <div ref={ref} className="relative hidden md:block" style={{ height: MERGE_H }} aria-hidden>
      {width > 0 && (
        <svg
          className="absolute inset-0 size-full overflow-visible"
          viewBox={`0 0 ${width} ${MERGE_H}`}
          fill="none"
        >
          <g stroke="rgba(255,255,255,0.1)" strokeWidth="2">
            {/* Боковые ветки видны, только когда раскрылись их каналы */}
            <g style={{ opacity: "var(--o3)" }}>
              <path d={left} />
              <path d={right} />
            </g>
            <path d={middle} />
          </g>
          <g
            stroke="#42A5F5"
            strokeWidth="2"
            className="[filter:drop-shadow(0_0_6px_rgba(66,165,245,0.55))]"
          >
            <motion.path ref={leftRef} d={left} style={{ pathLength: sides }} />
            <motion.path ref={rightRef} d={right} style={{ pathLength: sides }} />
            <motion.path d={middle} style={{ pathLength: progress }} />
          </g>
          <g fill="#E3F2FD" className="[filter:drop-shadow(0_0_6px_rgba(100,181,246,0.9))]">
            <circle ref={leftHead} r="3.5" opacity="0" />
            <circle ref={rightHead} r="3.5" opacity="0" />
            <motion.circle cx={c} cy={midY} r="4" style={{ opacity: midOpacity }} />
          </g>
          {/* Точка слияния: вспышка, когда три линии встретились */}
          <circle cx={c} cy={MERGE_JOIN} r="4" fill={joined || still ? "#64B5F6" : "#1B3555"} />
          {joined && !still && (
            <circle
              cx={c}
              cy={MERGE_JOIN}
              r="4"
              fill="none"
              stroke="#64B5F6"
              strokeWidth="1.5"
              className="flow-node-ripple"
            />
          )}
        </svg>
      )}
    </div>
  );
}

/** Классы для шахматки с md: шаг занимает две строки сетки, соседние заходят друг на друга */
const ROW_START = [
  "md:row-start-1",
  "md:row-start-2",
  "md:row-start-3",
  "md:row-start-4",
  "md:row-start-5",
] as const;

/**
 * Этапы 01–05. Одна линия проходит через все узлы: с md по центру,
 * этапы шахматкой слева и справа; на телефоне линия слева.
 * Когда свет доходит до узла, этап загорается.
 */
function StepsFlow({ still }: { still: boolean }) {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const lineHeight = useMotionValue(0);
  const [stops, setStops] = useState<number[]>([]);
  const [reached, setReached] = useState(0);

  const progress = useFlow(lineRef, FLOW_OFFSET, still);
  const headY = useTransform(
    [progress, lineHeight],
    ([value, height]) => (value as number) * (height as number),
  );
  const headOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;
    const measure = () => {
      const top = line.getBoundingClientRect().top;
      const centers = nodeRefs.current.map((node) => {
        if (!node) return 0;
        const rect = node.getBoundingClientRect();
        return rect.top + rect.height / 2 - top;
      });
      const height = Math.max(1, ...centers);
      line.style.height = `${height}px`;
      lineHeight.set(height);
      setStops(centers.map((center) => center / height));
      // useScroll перемеряет цель на прокрутке — подтолкнуть сразу
      window.dispatchEvent(new Event("scroll"));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [lineHeight]);

  useEffect(() => {
    const count = (value: number) => stops.filter((stop) => value >= stop - 0.004).length;
    setReached(count(progress.get()));
    return progress.on("change", (value) => setReached(count(value)));
  }, [progress, stops]);

  return (
    <div className="relative mt-10 md:mt-0">
      <div
        ref={lineRef}
        className="pointer-events-none absolute left-[23px] top-[-40px] w-0.5 md:left-1/2 md:top-0 md:-ml-px"
        aria-hidden
      >
        <div className="absolute inset-0 rounded-full bg-white/10" />
        <motion.div
          className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#1E88E5] to-[#64B5F6] [filter:drop-shadow(0_0_6px_rgba(66,165,245,0.5))]"
          style={{ scaleY: progress }}
        />
        <motion.span
          className="absolute left-1/2 top-0 -ml-[5px] -mt-[5px] size-2.5 rounded-full bg-[#E3F2FD] shadow-[0_0_0_4px_rgba(66,165,245,0.22),0_0_18px_4px_rgba(66,165,245,0.55)]"
          style={{ y: headY, opacity: headOpacity }}
        />
      </div>

      <ol
        ref={listRef}
        className="grid grid-cols-1 gap-y-4 pl-14 md:auto-rows-fr md:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] md:gap-y-5 md:pl-0"
      >
        {workSteps.map((step, index) => {
          const lit = still || index < reached;
          const onLeft = index % 2 === 0;
          return (
            <li
              key={step.step}
              className={cn(
                "relative md:row-span-2",
                onLeft ? "md:col-start-1" : "md:col-start-3",
                ROW_START[index],
              )}
            >
              {/* Узел на линии и отвод к карточке */}
              <span
                ref={(node) => {
                  nodeRefs.current[index] = node;
                }}
                className={cn(
                  "absolute left-[-39px] top-[26px] z-10 size-3.5 rounded-full border-2 transition-colors duration-500",
                  onLeft ? "md:left-auto md:right-[-47px]" : "md:left-[-47px]",
                  lit ? "border-[#90CAF9] bg-[#1E88E5]" : "border-white/25 bg-[#0A1F38]",
                )}
                aria-hidden
              >
                {lit && !still && (
                  <span className="flow-node-ripple absolute inset-[-2px] rounded-full border border-[#64B5F6]" />
                )}
              </span>
              <span
                className={cn(
                  "absolute left-[-25px] top-[32px] h-0.5 w-[25px] origin-left transition-[transform,background-color] duration-500",
                  onLeft
                    ? "md:left-auto md:right-[-33px] md:w-[33px] md:origin-right"
                    : "md:left-[-33px] md:w-[33px]",
                  lit ? "scale-x-100 bg-[#42A5F5]" : "scale-x-0 bg-white/10",
                )}
                aria-hidden
              />

              <article
                className={cn(
                  "relative h-full overflow-hidden rounded-[18px] border p-5 transition-[border-color,background-color,box-shadow] duration-700 md:p-6",
                  onLeft && "md:text-right",
                  lit
                    ? "border-[#42A5F5]/30 bg-[#0F2747] shadow-[0_24px_60px_-30px_rgba(30,136,229,0.6)]"
                    : "border-white/[0.08] bg-white/[0.02]",
                )}
              >
                {/* Свет заходит в карточку со стороны линии */}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-opacity duration-700",
                    "bg-[radial-gradient(90%_70%_at_0%_0%,rgba(30,136,229,0.18),transparent_65%)]",
                    onLeft &&
                      "md:bg-[radial-gradient(90%_70%_at_100%_0%,rgba(30,136,229,0.18),transparent_65%)]",
                    lit ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden
                />
                <div
                  className={cn(
                    "relative flex items-baseline gap-3",
                    onLeft && "md:flex-row-reverse",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-sm font-medium tracking-[0.08em] transition-colors duration-500",
                      lit ? "text-[#64B5F6]" : "text-white/30",
                    )}
                  >
                    {step.step}
                  </span>
                  <h3
                    className={cn(
                      "font-heading text-lg font-bold transition-colors duration-500 md:text-xl",
                      lit ? "text-white" : "text-white/70",
                    )}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  className={cn(
                    "relative mt-2 text-sm leading-relaxed transition-colors duration-500 md:text-[15px]",
                    lit ? "text-white/70" : "text-white/45",
                  )}
                >
                  {step.description}
                </p>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
