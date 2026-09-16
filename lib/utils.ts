import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Префикс базового пути для файлов из /public, которые попадают в разметку
 * напрямую — <video>, <source>, poster. next/image и next/link подставляют
 * basePath сами, сырой src — нет, и на GitHub Pages такой путь отдаёт 404.
 */
export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}
