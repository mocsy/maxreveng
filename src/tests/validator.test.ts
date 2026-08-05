import assert from 'node:assert';
import { BoardSchema, ConfigIR } from '../kcv/types';
import { ValidationEngine } from '../kcv/validator';

async function runTests() {
  const validator = new ValidationEngine();
  
  console.log('[START] KCV Validator Tests...\n');

  // --- Test 1: Valid Config ---
  console.log('Test 1: Valid Config...');
  const validSchema: BoardSchema = {
    metadata: { name: 'Test Board', version: '1.0.0', author: 'Test' },
    constraints: { pin_pattern: '^[A-Z][0-9]$' },
    sections: {
      printer: {
        required: true,
        keys: {
          kinematics: { type: 'string', enum: ['cartesian', 'corexy'] }
        }
      }
    }
  };

  const validIR: ConfigIR = {
    sections: new Map([
      ['printer', {
        name: 'printer',
        line: 1,
        entries: [{ key: 'kinematics', value: 'cartesian', line: 2, column: 1 }]
      }]
    ]),
    includes: [],
    errors: []
  };

  const resultValid = validator.validate(validIR, validSchema);
  assert.strictEqual(resultValid.errors.length, 0, 'Should have no errors');
  console.log('[OK] Valid Config Passed');

  // --- Test 2: Missing Required Section ---
  console.log('\nTest 2: Missing Required Section...');
  const missingSectionIR: ConfigIR = {
    sections: new Map(),
    includes: [],
    errors: []
  };
  const resultMissing = validator.validate(missingSectionIR, validSchema);
  assert.ok(resultMissing.errors.some(e => e.message.includes('Missing required section')), 'Should detect missing section');
  console.log('[OK] Missing Section Detection Passed');

  // --- Test 3: Invalid Type ---
  console.log('\nTest 3: Invalid Type...');
  const invalidTypeIR: ConfigIR = {
    sections: new Map([
      ['printer', {
        name: 'printer',
        line: 1,
        entries: [{ key: 'kinematics', value: 'invalid_type', line: 2, column: 1 }]
      }]
    ]),
    includes: [],
    errors: []
  };
  const resultType = validator.validate(invalidTypeIR, validSchema);
  assert.ok(resultType.errors.some(e => e.message.includes('Invalid type')), 'Should detect invalid type');
  console.log('[OK] Invalid Type Detection Passed');

  // --- Test 4: Invalid Enum ---
  console.log('\nTest 4: Invalid Enum...');
  const invalidEnumIR: ConfigIR = {
    sections: new Map([
      ['printer', {
        name: 'printer',
        line: 1,
        entries: [{ key: 'kinematics', value: 'delta', line: 2, column: 1 }]
      }]
    ]),
    includes: [],
    errors: []
  };
  const resultEnum = validator.validate(invalidEnumIR, validSchema);
  assert.ok(resultEnum.errors.some(e => e.message.includes('Allowed values')), 'Should detect invalid enum');
  console.log('[OK] Invalid Enum Detection Passed');

  // --- Test 5: Regex Pattern Mismatch ---
  console.log('\nTest 5: Regex Pattern Mismatch...');
  const invalidPinSchema: BoardSchema = {
    metadata: { name: 'Pin Board', version: '1.0.0', author: 'Test' },
    constraints: { pin_pattern: '^[A-Z][0-9]$' },
    sections: {
      stepper_x: {
        required: false,
        keys: {
          step_pin: { type: 'string', pattern: '^[A-Z][0-9]$' }
        }
      }
    }
  };
  const invalidPinIR: ConfigIR = {
    sections: new Map([
      ['stepper_x', {
        name: 'stepper_x',
        line: 1,
        entries: [{ key: 'step_pin', value: 'PA0', line: 2, column: 1 }] // PA0 is 3 chars, pattern expects 2
      }]
    ]),
    includes: [],
    errors: []
  };
  const resultPin = validator.validate(invalidPinIR, invalidPinSchema);
  assert.ok(resultPin.errors.some(e => e.message.includes('does not match pattern')), 'Should detect pattern mismatch');
  console.log('[OK] Regex Pattern Mismatch Passed');

  console.log('\nALL VALIDATION TESTS PASSED!\n');
}

runTests().catch(err => {
  console.error('\nTest Suite Failed!');
  console.error(err);
  process.exit(1);
});
