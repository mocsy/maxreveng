import { Command } from 'commander';
import * as path from 'path';
import * as fs from 'fs';
import { KCVParser } from './parser';
import { SchemaRegistry } from './registry';
import { ValidationEngine } from './validator';
import { Reporter } from './reporter';

export class KCVCLI {
  public async run(args: string[]): Promise<void> {
    const program = new Command();

    program
      .name('kcv')
      .description('Klipper Config Validator')
      .version('0.1.0')
      .option('-p, --profile <name>', 'Board profile name')
      .option('-s, --schema-dir <dir>', 'Directory containing JSON schemas')
      .option('--strict', 'Enable strict mode (not implemented yet)');

    program
      .command('validate <file>')
      .description('Validate a configuration file')
      .action(async (file) => {
        const options = program.opts();
        const absoluteFilePath = path.resolve(file);
        if (!fs.existsSync(absoluteFilePath)) {
          console.error(`Error: File not found: ${absoluteFilePath}`);
          process.exit(1);
        }

        const schemaDir = options.schemaDir ? path.resolve(options.schemaDir) : path.join(process.cwd(), 'schemas');
        
        if (!fs.existsSync(schemaDir)) {
          console.error(`Error: Schema directory not found: ${schemaDir}`);
          process.exit(1);
        }

        const parser = new KCVParser();
        const registry = new SchemaRegistry(schemaDir);
        const validator = new ValidationEngine();
        const reporter = new Reporter();

        try {
          await registry.loadAll();
          
          const ir = parser.parse(absoluteFilePath);
          
          if (options.profile) {
            const profile = registry.getProfile(options.profile);
            if (!profile) {
              console.error(`Error: Profile "${options.profile}" not found in ${schemaDir}`);
              process.exit(1);
            }
            const result = validator.validate(ir, profile);
            reporter.report(result);
          } else {
            if (ir.errors.length > 0) {
              console.error('Parsing errors found:');
              ir.errors.forEach(err => console.error(`  [Line ${err.line}] ${err.message}`));
              process.exit(1);
            }
            console.log('Configuration parsed successfully. No profile specified for validation.');
          }
        } catch (error) {
          console.error('An error occurred during validation:');
          console.error(error instanceof Error ? error.message : error);
          process.exit(1);
        }
      });

    await program.parseAsync(args);
  }
}
