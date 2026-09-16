/**
 * GitHub Pages отдаёт проект по адресу /<имя-репозитория>/, если репозиторий
 * не назван <логин>.github.io. Без префикса все ссылки на /images/... ведут
 * в корень домена и отдают 404. Значение подставляет workflow при сборке;
 * локально и на Netlify переменная пустая, префикса нет.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  // about/index.html вместо about.html — GitHub Pages отдаёт такие адреса
  // без сюрпризов
  trailingSlash: true,
};

export default nextConfig;
