import { companyFacts } from "@/lib/data/site";
import { normalizePath } from "@/lib/navigation";

/**
 * «Хлебные крошки» по реальному пути посетителя.
 *
 * Путь хранится в sessionStorage (живёт, пока открыта вкладка):
 *  - переход на новую страницу — она добавляется в конец;
 *  - переход на страницу, которая уже есть в пути (кнопка «Назад»,
 *    клик по крошке) — всё после неё отрезается;
 *  - главная сбрасывает путь;
 *  - зашли сразу на внутреннюю страницу (из поиска, по ссылке) —
 *    путь строится по структуре сайта: Главная › Услуги › СКУД.
 * Неизвестные адреса (404) в путь не попадают.
 */

export const PAGE_TITLES: Record<string, string> = {
  "/": "Главная",
  "/services": "Услуги",
  "/services/video-surveillance": "Видеонаблюдение",
  "/services/access-control": "СКУД",
  "/services/fire-safety": "Пожарная безопасность",
  "/services/networks": "Сети",
  "/services/maintenance": "Обслуживание",
  "/projects": "Проекты",
  "/about": "О компании",
  "/contacts": "Контакты",
  "/privacy": "Политика конфиденциальности",
  "/sources": "Цифры и факты",
  "/sources/years": `${companyFacts.yearsOnMarket} лет на рынке`,
  "/sources/projects": "Реализованные проекты",
  "/sources/on-time": "Сдача в срок",
  "/sources/clients": "Клиенты",
};

const STORAGE_KEY = "alfa-nav-trail";

export function isKnownPage(path: string) {
  return path in PAGE_TITLES;
}

/** Путь по структуре сайта — когда истории нет */
export function structuralTrail(path: string): string[] {
  if (path === "/") return ["/"];
  const parts = path.split("/").filter(Boolean);
  const trail = ["/"];
  for (let i = 1; i <= parts.length; i += 1) {
    const prefix = `/${parts.slice(0, i).join("/")}`;
    if (isKnownPage(prefix)) trail.push(prefix);
  }
  return trail;
}

/** Следующее состояние пути после захода на страницу path */
export function nextTrail(previous: string[], path: string): string[] {
  if (path === "/") return ["/"];
  if (!isKnownPage(path)) return previous;
  const existing = previous.indexOf(path);
  if (existing >= 0) return previous.slice(0, existing + 1);
  if (previous.length === 0) return structuralTrail(path);
  return [...previous, path];
}

export function readTrail(): string[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((p): p is string => typeof p === "string" && isKnownPage(p)) : [];
  } catch {
    return [];
  }
}

export function writeTrail(trail: string[]) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trail.slice(-12)));
  } catch {
    // приватный режим / запрет хранилища — крошки просто будут структурными
  }
}

/**
 * Применить заход на страницу и сохранить путь. Повторный вызов для той же
 * страницы ничего не меняет, поэтому его безопасно делать и из трекера
 * в layout, и из самих крошек.
 */
export function visit(pathname: string) {
  const path = normalizePath(pathname);
  const trail = nextTrail(readTrail(), path);
  writeTrail(trail);
  return trail;
}
