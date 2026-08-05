import { 
  ConfigIR, 
  ConfigSection, 
  ConfigEntry, 
  ConfigError, 
  ValidationResult, 
  BoardSchema, 
  DataType 
} from './types';

export class ValidationEngine {
  /**
   * Validates a parsed configuration against a board schema.
   */
  public validate(ir: ConfigIR, schema: BoardSchema): ValidationResult {
    const errors: ConfigError[] = [...ir.errors];
    const warnings: ConfigError[] = [];

    // 1. Check for required sections
    for (const [sectionName, sectionConstraint] of Object.entries(schema.sections)) {
      if (sectionConstraint.required && !ir.sections.has(sectionName)) {
        errors.push({
          line: 1,
          column: 1,
          message: `Missing required section: [${sectionName}]`,
        });
      }
    }

    // 2. Validate existing sections
    for (const [sectionName, section] of ir.sections.entries()) {
      const constraint = schema.sections[sectionName];

      if (!constraint) {
        // If the section is not in the schema, we treat it as a warning (unknown section)
        // unless we want to be strict. For now, let's just ignore unknown sections.
        continue;
      }

      // Validate entries in the section
      for (const entry of section.entries) {
        const keyConstraint = constraint.keys[entry.key];

        if (!keyConstraint) {
          // Unknown key in a known section
          errors.push({
            line: entry.line,
            column: entry.column,
            message: `Unknown key "${entry.key}" in section [${sectionName}]`,
          });
          continue;
        }

        // Validate type and constraints
        this.validateEntry(entry, keyConstraint, sectionName, errors, warnings);
      }
    }

    return { errors, warnings };
  }

  private validateEntry(
    entry: ConfigEntry,
    constraint: any,
    sectionName: string,
    errors: ConfigError[],
    warnings: ConfigError[]
  ): void {
    const { key, value, line, column } = entry;

    // 1. Type Validation
    if (constraint.type) {
      const parsedValue = this.parseValue(value, constraint.type);
      if (parsedValue === undefined) {
        errors.push({
          line,
          column,
          message: `Invalid type for "${key}" in [${sectionName}]. Expected ${constraint.type}.`,
        });
        return;
      }
    }

    // 2. Enum Validation
    if (constraint.enum && !constraint.enum.includes(value)) {
      errors.push({
        line,
        column,
        message: `Invalid value for "${key}" in [${sectionName}]. Allowed values: ${constraint.enum.join(', ')}`,
      });
    }

    // 3. Pattern Validation (Regex)
    if (constraint.pattern) {
      const regex = new RegExp(constraint.pattern);
      if (!regex.test(value)) {
        errors.push({
          line,
          column,
          message: `Value "${value}" for "${key}" in [${sectionName}] does not match pattern: ${constraint.pattern}`,
        });
      }
    }

    // 4. Range Validation (for numbers)
    if (constraint.type === 'number' || constraint.type === 'integer') {
      const numValue = parseFloat(value);
      if (constraint.min !== undefined && numValue < constraint.min) {
        errors.push({
          line,
          column,
          message: `Value "${value}" for "${key}" in [${sectionName}] is below minimum ${constraint.min}`,
        });
      }
      if (constraint.max !== undefined && numValue > constraint.max) {
        errors.push({
          line,
          column,
          message: `Value "${value}" for "${key}" in [${sectionName}] is above maximum ${constraint.max}`,
        });
      }
    }
  }

  private parseValue(value: string, type: DataType): any {
    if (type === 'number') {
      const n = parseFloat(value);
      return isNaN(n) ? undefined : n;
    }
    if (type === 'integer') {
      const n = parseInt(value, 10);
      return isNaN(n) ? undefined : n;
    }
    if (type === 'boolean') {
      const lower = value.toLowerCase();
      if (lower === 'true' || lower === 'yes' || lower === 'on') return true;
      if (lower === 'false' || lower === 'no' || lower === 'off') return false;
      return undefined;
    }
    return value; // string
  }
}
