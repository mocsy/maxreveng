// scripts/check-no-emojis.ts
import fs from 'node:fs';
import path from 'node:path';

/**
 * Configuration
 */
const TARGET_DIR = process.cwd();
const ALLOWED_EXT = '.ts';

/**
 * Recursively finds all .ts files in a directory
 */
function getFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      // Skip node_modules to avoid checking dependencies
      if (file.name !== 'node_modules') {
        getFiles(res, fileList);
      }
    } else if (file.name.endsWith(ALLOWED_EXT)) {
      fileList.push(res);
    }
  }
  return fileList;
}

function runTest() {
  console.log('Checking for UTF-8 icons/emojis in TypeScript files...');
  
  const allFiles = getFiles(TARGET_DIR);
  let totalErrors = 0;

  // This regex catches Emojis and specific icon symbols
  const emojiRegex = /\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu;

  for (const filePath of allFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (emojiRegex.test(line)) {
        console.error(`[ERROR] ${path.relative(TARGET_DIR, filePath)}:${index + 1}`);
        console.error(`   Line: "${line.trim()}"`);
        totalErrors++;
        // Reset regex lastIndex for the next line check
        emojiRegex.lastIndex = 0;
      }
    });
  }

  if (totalErrors > 0) {
    console.error(`[FAILURE] Found ${totalErrors} instances of icons/emojis in code.`);
    process.exit(1);
  } else {
    console.log('[SUCCESS] No icons/emojis found.');
  }
}

runTest();
