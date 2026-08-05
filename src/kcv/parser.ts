import * as fs from 'fs';
import * as path from 'path';
import { ConfigIR, ConfigSection } from './types';

export class KCVParser {
  /**
   * Parses a configuration file and its includes into a ConfigIR.
   * @param filePath The path to the configuration file.
   * @returns The parsed Intermediate Representation (IR).
   */
  public parse(filePath: string): ConfigIR {
    const ir: ConfigIR = {
      sections: new Map(),
      includes: [],
      errors: [],
    };
    const visited = new Set<string>();
    this.parseInternal(path.resolve(filePath), 0, ir, visited, null);
    return ir;
  }

  private parseInternal(
    filePath: string,
    lineOffset: number,
    ir: ConfigIR,
    visited: Set<string>,
    currentSection: ConfigSection | null
  ): void {
    const absolutePath = path.resolve(filePath);

    if (visited.has(absolutePath)) {
      ir.errors.push({
        line: lineOffset + 1,
        column: 1,
        message: `Circular include detected: ${absolutePath}`,
      });
      return;
    }

    visited.add(absolutePath);

    let content: string;
    try {
      content = fs.readFileSync(absolutePath, 'utf-8');
    } catch (error) {
      ir.errors.push({
        line: lineOffset + 1,
        column: 1,
        message: `Could not read file: ${absolutePath}. ${error instanceof Error ? error.message : ''}`,
      });
      visited.delete(absolutePath);
      return;
    }

    const lines = content.split(/\r?\n/);
    let localCurrentSection: ConfigSection | null = currentSection;

    for (let i = 0; i < lines.length; i++) {
      const currentLineNumber = lineOffset + i + 1;
      const rawLine = lines[i];
      const trimmedLine = rawLine.trim();

      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith(';')) {
        continue;
      }

      // 1. Handle 'include' directive
      const includeMatch = trimmedLine.match(/^include\s+(?:["']([^"']+)["']|(\S+))$/i);
      if (includeMatch) {
        const subIncludePath = includeMatch[1] || includeMatch[2];
        const subDir = path.dirname(absolutePath);
        const resolvedIncludePath = path.resolve(subDir, subIncludePath);

        ir.includes.push({
          path: subIncludePath,
          line: currentLineNumber,
        });

        // Recursively parse the included file.
        // The sub-file's section context starts with the currentSectionName of the caller.
        this.parseInternal(resolvedIncludePath, currentLineNumber, ir, new Set(visited), localCurrentSection);
        continue;
      }

      // 2. Handle section headers: [section_name]
      const sectionMatch = trimmedLine.match(/^\[([^\]]+)\]$/);
      if (sectionMatch) {
        const sectionName = sectionMatch[1].trim();
        let section = ir.sections.get(sectionName);
        if (!section) {
          section = {
            name: sectionName,
            line: currentLineNumber,
            entries: [],
          };
          ir.sections.set(sectionName, section);
        }
        localCurrentSection = section;
        continue;
      }

      // 3. Handle key-value pairs: key = value or key : value
      const kvMatch = trimmedLine.match(/^([^=:]+)[=:][\s]*(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        let value = kvMatch[2].trim();

        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }

        if (!localCurrentSection) {
          ir.errors.push({
            line: currentLineNumber,
            column: 1,
            message: `Key "${key}" must be within a section`,
          });
        } else {
          const keyIndex = rawLine.indexOf(key);
          const column = keyIndex !== -1 ? keyIndex + 1 : 1;

          localCurrentSection.entries.push({
            key,
            value,
            line: currentLineNumber,
            column,
          });
        }
        continue;
      }

      // If the line doesn't match any expected format, it's an error
      ir.errors.push({
        line: currentLineNumber,
        column: 1,
        message: `Malformed line: expected section, include, or key-value pair`,
      });
    }

    visited.delete(absolutePath);
  }
}
