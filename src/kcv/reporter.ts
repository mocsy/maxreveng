import chalk from 'chalk';
import { ValidationResult } from './types';

export class Reporter {
  /**
   * Reports the validation results to the console.
   * @param result The validation result containing errors and warnings.
   */
  public report(result: ValidationResult): void {
    const { errors, warnings } = result;

    if (errors.length === 0 && warnings.length === 0) {
      console.log(chalk.green('[OK] Validation successful! No errors or warnings found.'));
      return;
    }

    if (errors.length > 0) {
      console.log(chalk.red.bold('\n[ERROR] Validation Errors:'));
      for (const error of errors) {
        console.log(`  ${chalk.red('[ERROR]')} [line ${error.line}:${error.column}] ${error.message}`);
      }
    }

    if (warnings.length > 0) {
      console.log(chalk.yellow.bold('\n[WARNING] Warnings:'));
      for (const warning of warnings) {
        console.log(`  ${chalk.yellow('[WARNING]')} [line ${warning.line}:${warning.column}] ${warning.message}`);
      }
    }

    console.log(''); // New line
  }
}
