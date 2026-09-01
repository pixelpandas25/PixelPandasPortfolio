const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'src', 'assets', 'images');
const MAX_DIM = 1600; // no source image needs to be wider/taller than this for a web layout

async function run() {
  const files = fs.readdirSync(imagesDir).filter((f) => f.toLowerCase().endsWith('.png'));
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inPath = path.join(imagesDir, file);
    const before = fs.statSync(inPath).size;
    totalBefore += before;

    const outName = file.replace(/\.png$/i, '.webp');
    const outPath = path.join(imagesDir, outName);

    const img = sharp(inPath);
    const meta = await img.metadata();
    const needsResize = (meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM;

    let pipeline = img;
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true });
    }

    await pipeline.webp({ quality: 82 }).toFile(outPath);

    const after = fs.statSync(outPath).size;
    totalAfter += after;
    try {
      fs.unlinkSync(inPath);
    } catch (err) {
      console.warn(`  (could not delete original ${file}: ${err.code})`);
    }

    console.log(
      `${file} -> ${outName}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB` +
        (needsResize ? ` (resized from ${meta.width}x${meta.height})` : ''),
    );
  }

  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`,
  );
}

run();
