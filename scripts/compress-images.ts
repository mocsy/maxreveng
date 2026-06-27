import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import sharp from 'sharp';
import { execa } from 'execa';

/**
 * Configuration Constants
 */
const CONFIG = {
  MAX_WIDTH: 3840,
  MAX_HEIGHT: 2160,
  AVIF_QUALITY: 65,
  AVIF_EFFORT: 4,
  ALLOWED_EXTENSIONS: /\.(png|jpg|jpeg)$/i,
} as const;

/**
 * Colors for terminal output
 */
const COLORS = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
} as const;

async function runImageOptimization(): Promise<void> {
  try {
    // Get all staged files that are Added (A) or Modified (M)
    const { stdout } = await execa('git', ['diff', '--cached', '--name-only', '--diff-filter=AM']);
    
    if (!stdout) {
      return;
    }

    // Split and filter valid image extensions
    const files = stdout
      .split('\n')
      .map((f) => f.trim())
      .filter((file) => file.length > 0 && CONFIG.ALLOWED_EXTENSIONS.test(file));

    if (files.length === 0) {
      return;
    }

    console.log(`${COLORS.cyan}[INFO] Processing ${files.length} image(s) for 4K AVIF conversion...${COLORS.reset}`);

    for (const file of files) {
      const filePath = resolve(file);

      if (!existsSync(filePath)) {
        continue;
      }

      const ext = extname(filePath);
      const outputFilePath = filePath.replace(new RegExp(`${ext}$`), '.avif');

      console.log(`[INFO] Processing: ${file}`);

      const image = sharp(filePath);
      const metadata = await image.metadata();

      let pipeline = sharp(filePath);

      // Downscale only if the image exceeds 4K dimensions
      if ((metadata.width ?? 0) > CONFIG.MAX_WIDTH || (metadata.height ?? 0) > CONFIG.MAX_HEIGHT) {
        pipeline = pipeline.resize({
          width: CONFIG.MAX_WIDTH,
          height: CONFIG.MAX_HEIGHT,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // Convert to AVIF
      await pipeline
        .avif({ quality: CONFIG.AVIF_QUALITY, effort: CONFIG.AVIF_EFFORT })
        .toFile(outputFilePath);

      // Delete the original legacy file from disk asynchronously
      await unlink(filePath);

      // Update the Git index
      await execa('git', ['rm', '--cached', file]);
      await execa('git', ['add', outputFilePath]);
    }

    console.log(`${COLORS.green}[SUCCESS] Image optimization complete. Committing changes.${COLORS.reset}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`${COLORS.red}[ERROR] Error running image compression hook:${COLORS.reset}`, errorMessage);
    process.exit(1);
  }
}

// Entry point
runImageOptimization();
