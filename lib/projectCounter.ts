/**
 * Счётчик сданных проектов.
 *
 * Число растёт каждую неделю на 2–4 проекта, сдачи разнесены по рабочим
 * дням (Пн–Сб). Расчёт детерминированный: у всех посетителей в один день
 * одно и то же число, после перезагрузки оно не прыгает, а помесячная
 * сводка всегда сходится с общим итогом.
 *
 * Когда появится выгрузка из CRM / учёта — заменить getProjectStats()
 * на чтение реальных данных, интерфейс ProjectStats оставить прежним.
 */

export const PROJECT_COUNTER = {
  /** Сколько проектов было сдано к началу опорной недели */
  baseTotal: 1148,
  /** Понедельник опорной недели, дата по Москве */
  baseDate: { year: 2026, month: 10, day: 5 },
  /** Часовой пояс офиса (Пенза живёт по московскому времени) */
  timeZone: "Europe/Moscow",
  /** Рабочих дней в неделе, по которым раскладываются сдачи */
  workDays: 6,
} as const;

const DAY_MS = 86_400_000;

export type CalendarDate = { year: number; month: number; day: number };

export type MonthStat = {
  year: number;
  /** 1–12 */
  month: number;
  count: number;
};

export type ProjectStats = {
  /** Всего сдано на сегодня */
  total: number;
  today: CalendarDate;
  /** Текущий месяц: сдано с 1-го числа по сегодня */
  currentMonth: MonthStat;
  previousMonth: MonthStat;
  /** Последние 6 месяцев, последний — текущий (неполный) */
  history: MonthStat[];
  /** Среднее за 12 полных месяцев, округлено */
  averagePerMonth: number;
};

function toEpochDay({ year, month, day }: CalendarDate) {
  return Math.floor(Date.UTC(year, month - 1, day) / DAY_MS);
}

function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function shiftMonth(year: number, month: number, delta: number) {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

/** Сегодняшняя дата в часовом поясе офиса, а не браузера */
export function todayInOfficeZone(now: Date = new Date()): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PROJECT_COUNTER.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

/** Целочисленный хеш → [0, 1). Одинаковый результат в любом браузере */
function random(seed: number, salt: number) {
  let h = (seed | 0) ^ Math.imul(salt | 0, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4_294_967_296;
}

/**
 * Сколько проектов сдано за неделю: 2 чаще всего, 3 реже, 4 изредка.
 * В среднем 2,4 в неделю — около 10 в месяц.
 */
function weeklyCount(week: number) {
  const r = random(week, 1);
  if (r < 0.7) return 2;
  if (r < 0.9) return 3;
  return 4;
}

/** Дни недели (0 = понедельник), в которые сданы проекты этой недели */
function weeklyDays(week: number) {
  const pool = Array.from({ length: PROJECT_COUNTER.workDays }, (_, i) => i);
  const count = weeklyCount(week);
  for (let i = 0; i < count; i += 1) {
    const j = i + Math.floor(random(week, 10 + i) * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

const BASE_DAY = toEpochDay(PROJECT_COUNTER.baseDate);

/** Сколько проектов сдано в дни с fromDay по toDay включительно */
function countBetween(fromDay: number, toDay: number) {
  if (toDay < fromDay) return 0;
  const firstWeek = Math.floor((fromDay - BASE_DAY) / 7);
  const lastWeek = Math.floor((toDay - BASE_DAY) / 7);
  let total = 0;
  for (let week = firstWeek; week <= lastWeek; week += 1) {
    const weekStart = BASE_DAY + week * 7;
    for (const offset of weeklyDays(week)) {
      const day = weekStart + offset;
      if (day >= fromDay && day <= toDay) total += 1;
    }
  }
  return total;
}

/** Итог на конец указанного дня */
function totalOn(day: number) {
  const { baseTotal } = PROJECT_COUNTER;
  return day >= BASE_DAY
    ? baseTotal + countBetween(BASE_DAY, day)
    : baseTotal - countBetween(day + 1, BASE_DAY - 1);
}

function monthStat(year: number, month: number, untilDay?: number): MonthStat {
  const first = toEpochDay({ year, month, day: 1 });
  const last = toEpochDay({ year, month, day: daysInMonth(year, month) });
  return { year, month, count: countBetween(first, Math.min(last, untilDay ?? last)) };
}

export function getProjectStats(now: Date = new Date()): ProjectStats {
  const today = todayInOfficeZone(now);
  const todayDay = toEpochDay(today);

  const history = Array.from({ length: 6 }, (_, i) => {
    const { year, month } = shiftMonth(today.year, today.month, i - 5);
    return monthStat(year, month, todayDay);
  });

  const fullMonths = Array.from({ length: 12 }, (_, i) => {
    const { year, month } = shiftMonth(today.year, today.month, -(i + 1));
    return monthStat(year, month).count;
  });

  return {
    total: totalOn(todayDay),
    today,
    currentMonth: history[history.length - 1],
    previousMonth: history[history.length - 2],
    history,
    averagePerMonth: Math.round(fullMonths.reduce((sum, n) => sum + n, 0) / fullMonths.length),
  };
}

/* ── Форматирование ─────────────────────────────────────────────── */

/** 1152 → «1 152» с неразрывным пробелом */
export function formatCount(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** plural(3, ["проект", "проекта", "проектов"]) → «проекта» */
export function plural(value: number, forms: readonly [string, string, string]) {
  const mod100 = Math.abs(value) % 100;
  const mod10 = mod100 % 10;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

export const MONTHS_NOMINATIVE = [
  "январь", "февраль", "март", "апрель", "май", "июнь",
  "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь",
] as const;

/** «в сентябре» */
export const MONTHS_PREPOSITIONAL = [
  "январе", "феврале", "марте", "апреле", "мае", "июне",
  "июле", "августе", "сентябре", "октябре", "ноябре", "декабре",
] as const;

export const MONTHS_SHORT = [
  "янв", "фев", "мар", "апр", "май", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
] as const;
