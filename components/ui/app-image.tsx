import NextImage, { type ImageProps } from "next/image";

import { assetPath } from "@/lib/utils";

/**
 * next/image при `unoptimized: true` отдаёт src как есть и не подставляет
 * basePath. На GitHub Pages сайт лежит в подпапке /<имя-репозитория>/, и
 * такие пути уходят в корень домена — картинки отдают 404.
 *
 * Обёртка приклеивает префикс в одном месте: в компонентах и данных пути
 * остаются обычными, от корня.
 */
export function AppImage({ src, ...props }: ImageProps) {
  return <NextImage src={typeof src === "string" ? assetPath(src) : src} {...props} />;
}
