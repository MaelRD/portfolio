// Project screenshots: originals in assets/projects/<project>/<name>.(png|jpg|jpeg|webp),
// served as responsive WebP + AVIF from public/projects/<project>/<name>-<width>.<ext>,
// with their sizes recorded in src/data/project-images.json (srcset and
// width/height come from there, so no layout shift).
//
//   npm run images
//
// Add a screenshot: drop it in its project folder and run the command again.
import { mkdirSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const SRC = "assets/projects";
const OUT = "public/projects";
const MANIFEST = "src/data/project-images.json";
/** Output widths, capped at the original's width. */
const WIDTHS = [480, 960, 1440, 2160];

const manifest = {};
for (const project of readdirSync(SRC).filter((d) => statSync(join(SRC, d)).isDirectory()).sort()) {
  mkdirSync(join(OUT, project), { recursive: true });
  manifest[project] = {};
  const files = readdirSync(join(SRC, project)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  for (const file of files) {
    const { name } = parse(file);
    const img = sharp(join(SRC, project, file));
    const { width, height } = await img.metadata();
    const widths = [...new Set(WIDTHS.filter((w) => w < width).concat(Math.min(width, WIDTHS.at(-1))))];
    for (const w of widths) {
      const base = join(OUT, project, `${name}-${w}`);
      if (!existsSync(`${base}.webp`)) await img.clone().resize({ width: w }).webp({ quality: 78 }).toFile(`${base}.webp`);
      if (!existsSync(`${base}.avif`)) await img.clone().resize({ width: w }).avif({ quality: 52 }).toFile(`${base}.avif`);
    }
    manifest[project][name] = { width, height, widths };
    console.log(`${project}/${name}: ${widths.join(", ")}`);
  }
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`wrote ${MANIFEST}`);
