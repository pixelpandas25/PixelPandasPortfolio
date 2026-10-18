
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Configuration
const INPUT_DIR = path.resolve("src/assets/images");
const OUTPUT_DIR = path.resolve("public/avif-images");

// Skip this folder and everything inside it
const EXCLUDED_DIRS = [
  path.resolve("src/assets/images/scapia"),
];

const TARGET_SIZE_BYTES = 2_000_000; // Strict 2 MB limit
const START_QUALITY = 90;
const MIN_QUALITY = 50;
const QUALITY_STEP = 5;
const EFFORT = 6;

// Check whether a path is inside an excluded directory
function isExcluded(fullPath) {
  const resolvedPath = path.resolve(fullPath);

  return EXCLUDED_DIRS.some((excludedDir) => {
    const relative = path.relative(excludedDir, resolvedPath);

    return (
      relative === "" ||
      (!relative.startsWith(".." + path.sep) &&
        relative !== ".." &&
        !path.isAbsolute(relative))
    );
  });
}

// Recursively find PNG files, skipping excluded folders
function findPngFiles(directory) {
  const results = [];

  if (!fs.existsSync(directory)) {
    throw new Error(`Input directory does not exist: ${directory}`);
  }

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.resolve(directory, entry.name);

    if (entry.isDirectory()) {
      if (isExcluded(fullPath)) {
        console.log(`Skipping excluded folder: ${fullPath}`);
        continue;
      }

      results.push(...findPngFiles(fullPath));
    } else if (
      entry.isFile() &&
      /\.png$/i.test(entry.name) &&
      !isExcluded(fullPath)
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

function formatMB(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

async function convertImage(inputPath) {
  const relativePath = path.relative(INPUT_DIR, inputPath);
  const outputRelativePath = relativePath.replace(/\.png$/i, ".avif");
  const outputPath = path.join(OUTPUT_DIR, outputRelativePath);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const originalSize = fs.statSync(inputPath).size;

  console.log(`\nProcessing: ${relativePath}`);
  console.log(`Original size: ${formatMB(originalSize)}`);

  let selectedQuality = null;
  let lastSuccessfulQuality = null;
  let lastSuccessfulSize = null;

  // Retry with progressively lower quality
  for (
    let quality = START_QUALITY;
    quality >= MIN_QUALITY;
    quality -= QUALITY_STEP
  ) {
    const tempPath = path.join(
      path.dirname(outputPath),
      `${path.basename(outputPath, ".avif")}.attempt-${quality}.tmp.avif`
    );

    try {
      const result = await sharp(inputPath)
        .avif({
          quality,
          effort: EFFORT,
          chromaSubsampling: "4:4:4",
        })
        .toFile(tempPath);

      lastSuccessfulQuality = quality;
      lastSuccessfulSize = result.size;

      console.log(
        `  Quality ${quality}: ${formatMB(result.size)}`
      );

      if (result.size <= TARGET_SIZE_BYTES) {
        selectedQuality = quality;
        break;
      }
    } catch (error) {
      console.error(
        `  Failed at quality ${quality}: ${error.message}`
      );
    } finally {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }

  // Use the best tested quality that meets the limit.
  // If none meets the limit, use the lowest quality that converted.
  selectedQuality ??= lastSuccessfulQuality;

  if (selectedQuality === null) {
    console.error(`FAILED: ${relativePath}`);

    return {
      status: "FAILED",
      relativePath,
    };
  }

  // Write the final image
  const finalResult = await sharp(inputPath)
    .avif({
      quality: selectedQuality,
      effort: EFFORT,
      chromaSubsampling: "4:4:4",
    })
    .toFile(outputPath);

  const reduction =
    ((originalSize - finalResult.size) / originalSize) * 100;

  const meetsTarget = finalResult.size <= TARGET_SIZE_BYTES;

  console.log(`  Final quality: ${selectedQuality}`);
  console.log(`  Final size: ${formatMB(finalResult.size)}`);
  console.log(
    `  Dimensions: ${finalResult.width} x ${finalResult.height}`
  );
  console.log(`  Reduction: ${reduction.toFixed(2)}%`);
  console.log(
    `  Status: ${meetsTarget ? "SUCCESS" : "TARGET NOT MET"}`
  );

  if (!meetsTarget) {
    console.log(
      "  Try a lower quality threshold or resize the image if acceptable."
    );
  }

  return {
    status: meetsTarget ? "SUCCESS" : "TARGET NOT MET",
    relativePath,
    originalSize,
    outputSize: finalResult.size,
    quality: selectedQuality,
    reduction,
  };
}

async function main() {
  if (!fs.existsSync(INPUT_DIR)) {
    throw new Error(`Input directory does not exist: ${INPUT_DIR}`);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = findPngFiles(INPUT_DIR);

  console.log(`\nFound ${files.length} PNG image(s).`);
  console.log(`Input: ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Target: ${formatMB(TARGET_SIZE_BYTES)}`);

  const results = [];

  for (const file of files) {
    try {
      results.push(await convertImage(file));
    } catch (error) {
      console.error(`Unexpected error for ${file}:`, error.message);

      results.push({
        status: "FAILED",
        relativePath: path.relative(INPUT_DIR, file),
      });
    }
  }

  const successful = results.filter(
    (result) => result.status === "SUCCESS"
  );
  const notMet = results.filter(
    (result) => result.status === "TARGET NOT MET"
  );
  const failed = results.filter(
    (result) => result.status === "FAILED"
  );

  console.log("\n========== SUMMARY ==========");
  console.log(`Total images: ${results.length}`);
  console.log(`Below 2 MB: ${successful.length}`);
  console.log(`Target not met: ${notMet.length}`);
  console.log(`Failed: ${failed.length}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error("Conversion failed:", error);
  process.exitCode = 1;
});
