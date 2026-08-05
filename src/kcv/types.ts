export interface ConfigEntry {
  key: string;
  value: string;
  line: number;
  column: number;
}

export interface ConfigSection {
  name: string;
  line: number;
  entries: ConfigEntry[];
}

export interface ConfigError {
  line: number;
  column: number;
  message: string;
}

export interface ConfigIR {
  sections: Map<string, ConfigSection>;
  includes: Array<{
    path: string;
    line: number;
  }>;
  errors: ConfigError[];
}

// --- New Types for Validation ---

export type DataType = 'string' | 'number' | 'boolean' | 'integer';

export interface SchemaKeyConstraint {
  type?: DataType;
  enum?: string[];
  pattern?: string;
  required?: boolean;
}

export interface SchemaSectionConstraint {
  required?: boolean;
  keys: Record<string, SchemaKeyConstraint>;
}

export interface BoardSchema {
  metadata: {
    name: string;
    version: string;
    author: string;
  };
  constraints: {
    allowed_mcu_types?: string[];
    pin_pattern?: string;
  };
  sections: Record<string, SchemaSectionConstraint>;
}

export interface ValidationResult {
  errors: ConfigError[];
  warnings: ConfigError[];
}
