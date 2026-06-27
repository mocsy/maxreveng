import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { extname, resolve, basename } from 'node:path';
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
  ALLOWED_EXTENSIONS: /\.(png|jpg|jpeg|webp)$/i,
  DOC_EXTENSIONS: /\.(md|mdx|html|jsx|tsx)$/i,
} as const;

/**
 * Colors for terminal output
 */
const COLORS = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
} as const;

/**
 * Helper to attempt unlinking a file with retries (to handle Windows EBUSY errors)
 */
async function safeUnlink(filePath: string, retries = 3, delayMs = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      await unlink(filePath);
      return;
    } catch (error: any) {
      if (i === retries - 1) throw error;
      if (error.code === 'EBUSY') {
        await new Promise((res) => setTimeout(res, delayMs));
        continue;
      }
      throw error;
    }
  }
}

/**
 * Updates file references in documentation files to point to the new .avif versions
 */
async function updateReferences(oldFileName: string, newFileName: string): Promise<void> {
  // Get all files from git
  const { stdout } = await execa('git', ['ls-files']);
  const allFiles = stdout.split('\n').filter((f) => f.length > 0 && CONFIG.DOC_EXTENSIONS.test(f));

  for (const docFile of allFiles) {
    const filePath = resolve(docFile);
    if (!existsSync(filePath)) continue;

    const content = await import('node:fs').then((fs) => fs.readFileSync(filePath, 'utf-8'));
    
    // Regex: Matches the filename as a whole word/path component (prevents partial matches)
    const escapedOldName = oldFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<=^|[^\\w])` + escapedOldName + `(?=[\\s\"'()<>\]]|$)`, 'g');

    if (regex.test(content)) {
      const newContent = content.replace(regex, newFileName);
      if (newContent !== content) {
        // Note: Using sync for simplicity in this loop, but could be async
        import('node:fs').then((fs) => fs.writeFileSync(filePath, newContent, 'utf-8'));
        console.log(`  ${COLORS.yellow}[REFS] Updated link in: ${docFile}${COLORS.reset}`);
        await execa('git', ['add', docFile]);
      }
    }
  }
}

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
      const baseName = basename(filePath);
      const outputFileName = baseName.replace(new RegExp(`${ext}$`), '.avif');
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

      // 1. Update document references before deleting original
      await updateReferences(baseName, outputFileName);

      // 2. Delete the original legacy file from disk
      try {
        await safeUnlink(filePath);
      } catch (err) {
        console.warn(`${COLORS.red}[WARN] Could not delete original file: ${file}${COLORS.reset}`);
      }

      // 3. Update the Git index
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
