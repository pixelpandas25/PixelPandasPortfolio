/**
 * Image compression script for project detail assets.
 *
 * SVGs  → JPEG via macOS `sips` (handles embedded-base64 raster SVGs that
 *          librsvg/sharp cannot parse).
 * PNGs  → WebP via sharp.
 *
 * Run once before committing images:
 *   node scripts/optimize-images.cjs
 *
 * The import.meta.glob in projectDetails.ts strips extensions, so swapping
 * .svg/.png for .jpg/.webp requires no code changes.
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const IMAGES_DIR  = path.join(__dirname, '..', 'src', 'assets', 'images');
// Carousel cards display at 648px — 2× = 1296. Full-width images display at
// 1440px — 2× = 2880. We use a single pass at 2880 so every image looks sharp
// at retina on any viewport; the extra pixels cost only ~20-30 KB in JPEG/WebP.
const MAX_DIM     = 2880;
const JPEG_Q      = 85;  // for SVG → JPEG
const WEBP_Q      = 82;  // for PNG → WebP
const SIZE_THRESH = 200 * 1024; // skip files already under 200 KB

// ── helpers ────────────────────────────────────────────────────────────────

function fmtKB(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${(bytes / 1024).toFixed(0)} KB`;
}

function allImageFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...allImageFiles(full));
    } else if (/\.(svg|png)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

// ── SVG → JPEG via sips (macOS) ────────────────────────────────────────────

async function compressSvg(filePath) {
  const outPath = filePath.replace(/\.svg$/i, '.jpg');
  execSync(
    `sips -Z ${MAX_DIM} --setProperty format jpeg --setProperty formatOptions ${JPEG_Q}` +
    ` "${filePath}" --out "${outPath}" 2>/dev/null`,
    { stdio: 'pipe' }
  );
  return outPath;
}

// ── PNG → WebP via sharp ────────────────────────────────────────────────────

async function compressPng(filePath) {
  const outPath = filePath.replace(/\.png$/i, '.webp');
  const meta = await sharp(filePath).metadata();
  const needsResize = (meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM;

  let pipeline = sharp(filePath);
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true });
  }
  await pipeline.webp({ quality: WEBP_Q }).toFile(outPath);
  return outPath;
}

// ── main ───────────────────────────────────────────────────────────────────

async function run() {
  const files = allImageFiles(IMAGES_DIR);
  let totalBefore = 0, totalAfter = 0, skipped = 0, failed = 0;

  for (const filePath of files) {
    const before = fs.statSync(filePath).size;

    if (before < SIZE_THRESH) {
      skipped++;
      continue;
    }

    const rel = path.relative(IMAGES_DIR, filePath);
    const ext = path.extname(filePath).toLowerCase();

    try {
      const outPath = ext === '.svg'
        ? await compressSvg(filePath)
        : await compressPng(filePath);

      const after = fs.statSync(outPath).size;
      totalBefore += before;
      totalAfter  += after;
      fs.unlinkSync(filePath);

      const saving = (((before - after) / before) * 100).toFixed(0);
      console.log(`✓  ${rel}  →  .${path.extname(outPath).slice(1)}  ${fmtKB(before)} → ${fmtKB(after)}  (−${saving}%)`);
    } catch (err) {
      failed++;
      console.error(`✗  ${rel}  ${err.message}`);
    }
  }

  console.log(`\n── Summary ──────────────────────────────────────`);
  console.log(`   Skipped (already ≤200 KB): ${skipped}`);
  console.log(`   Failed:                    ${failed}`);
  console.log(`   Total saved:               ${fmtKB(totalBefore)} → ${fmtKB(totalAfter)}`);
  if (totalBefore > 0) {
    console.log(`   Reduction:                 ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);
  }
}

run().catch(err => { console.error(err); process.exit(1); });
