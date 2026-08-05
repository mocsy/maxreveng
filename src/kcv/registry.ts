import * as fs from 'fs';
import * as path from 'path';
import { BoardSchema } from './types';

export class SchemaRegistry {
  private schemaDir: string;
  private profiles: Map<string, BoardSchema> = new Map();

  constructor(schemaDir: string) {
    this.schemaDir = schemaDir;
  }

  /**
   * Loads all JSON schemas from the registry directory.
   */
  public async loadAll(): Promise<void> {
    const files = fs.readdirSync(this.schemaDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const fullPath = path.join(this.schemaDir, file);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const schema: BoardSchema = JSON.parse(content);
        this.profiles.set(schema.metadata.name, schema);
      }
    }
  }

  /**
   * Gets a profile by name.
   */
  public getProfile(name: string): BoardSchema | undefined {
    return this.profiles.get(name);
  }

  /**
   * Gets all available profile names.
   */
  public getAvailableProfiles(): string[] {
    return Array.from(this.profiles.keys());
  }
}
