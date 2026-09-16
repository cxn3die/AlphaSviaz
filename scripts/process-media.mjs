/**
 * Обработка исходных фото для сайта.
 *
 *   node scripts/process-media.mjs <папка-источник> <папка-назначения> [ширина]
 *
 * Пример:
 *   node scripts/process-media.mjs "../ИСХОДНИКИ/02-компания" public/images/company
 *
 * Что делает: разворачивает по EXIF, ужимает до нужной ширины,
 * сохраняет в WebP (85%) и печатает отчёт со сжатием.
 */

import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff"]);
const DEFAULT_WIDTH = 1600;

function slugify(name) {
  const map = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
    с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };

  return name
    .toLowerCase()
    .replace(/[а-яё]/g, (ch) => map[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const [, , sourceArg, targetArg, widthArg] = process.argv;

if (!sourceArg || !targetArg) {
  console.error(
    "Использование: node scripts/process-media.mjs <источник> <назначение> [ширина]"
  );
  process.exit(1);
}

const width = Number(widthArg) || DEFAULT_WIDTH;
const source = path.resolve(sourceArg);
const target = path.resolve(targetArg);

await mkdir(target, { recursive: true });

const entries = await readdir(source, { withFileTypes: true });
const files = entries
  .filter((e) => e.isFile() && SUPPORTED.has(path.extname(e.name).toLowerCase()))
  .map((e) => e.name)
  .sort();

if (files.length === 0) {
  console.log(`В папке ${source} нет подходящих изображений.`);
  process.exit(0);
}

console.log(`Обрабатываю ${files.length} файл(ов) → ${target} (ширина ${width}px)\n`);

let totalBefore = 0;
let totalAfter = 0;
const results = [];

for (const file of files) {
  const inputPath = path.join(source, file);
  const base = slugify(path.basename(file, path.extname(file))) || "image";
  const outputPath = path.join(target, `${base}.webp`);

  try {
    const before = (await stat(inputPath)).size;

    const info = await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);

    totalBefore += before;
    totalAfter += info.size;

    results.push({
      Файл: path.basename(outputPath),
      Размер: `${info.width}×${info.height}`,
      Было: `${(before / 1024 / 1024).toFixed(2)} МБ`,
      Стало: `${(info.size / 1024).toFixed(0)} КБ`,
    });
  } catch (error) {
    console.error(`  ✗ ${file}: ${error.message}`);
  }
}

console.table(results);
console.log(
  `Итого: ${(totalBefore / 1024 / 1024).toFixed(1)} МБ → ` +
    `${(totalAfter / 1024 / 1024).toFixed(1)} МБ ` +
    `(${Math.round((1 - totalAfter / totalBefore) * 100)}% экономии)`
);
