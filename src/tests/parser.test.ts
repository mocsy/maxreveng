import * as fs from 'fs';
import assert from 'node:assert';
import * as path from 'path';
import { KCVParser } from '../kcv/parser';

async function runTests() {
  const parser = new KCVParser();
  // Use process.cwd() to avoid __dirname issues in ESM
  const fixtureDir = path.join(process.cwd(), 'src', 'tests', 'fixtures');

  console.log('[START] KCV Parser Tests...\n');

  // --- Test 1: Simple Config ---
  console.log('Test 1: Simple Config...');
  const simpleCfg = `
[printer]
kinematics: cartesian
max_velocity = 300

[stepper_x]
step_pin: PA0
dir_pin: PA1
microsteps: 16
`;
  const simplePath = path.join(fixtureDir, 'simple.cfg');
  fs.writeFileSync(simplePath, simpleCfg);
  const irSimple = parser.parse(simplePath);
  assert.strictEqual(irSimple.errors.length, 0, 'Should have no errors');
  assert.strictEqual(irSimple.sections.get('printer')?.entries.length, 2);
  assert.strictEqual(irSimple.sections.get('printer')?.entries.find(e => e.key === 'kinematics')?.value, 'cartesian');
  console.log('[OK] Simple Config Passed');

  // --- Test 2: Includes ---
  console.log('\nTest 2: Includes...');
  const mainCfg = `
[printer]
kinematics: cartesian
include "sub.cfg"

[stepper_x]
step_pin: PA0
`;
  const subCfg = `
[extruder]
step_pin: PB0
retraction_distance: 5.0
`;
  const mainPath = path.join(fixtureDir, 'main.cfg');
  const subPath = path.join(fixtureDir, 'sub.cfg');
  fs.writeFileSync(mainPath, mainCfg);
  fs.writeFileSync(subPath, subCfg);

  const irInclude = parser.parse(mainPath);
  assert.strictEqual(irInclude.errors.length, 0, 'Should have no errors');
  assert.ok(irInclude.sections.has('printer'), 'Should have printer section');
  assert.ok(irInclude.sections.has('extruder'), 'Should have extruder section from include');
  const extruder = irInclude.sections.get('extruder');
  
  assert.strictEqual(extruder?.entries.find(e => e.key === 'step_pin')?.line, 4, 'Should have correct line number for included file');
  console.log('[OK] Includes Passed');

  // --- Test 3: Circular Includes ---
  console.log('\nTest 3: Circular Includes...');
  const circA = `[section]\ninclude "circ_b.cfg"`;
  const circB = `[section]\ninclude "circ_a.cfg"`;
  const circAPath = path.join(fixtureDir, 'circ_a.cfg');
  const circBPath = path.join(fixtureDir, 'circ_b.cfg');
  fs.writeFileSync(circAPath, circA);
  fs.writeFileSync(circBPath, circB);

  const irCirc = parser.parse(circAPath);
  assert.ok(irCirc.errors.some(e => e.message.includes('Circular include')), 'Should detect circular include');
  console.log('[OK] Circular Detection Passed');

  // --- Test 4: Syntax Errors ---
  console.log('\nTest 4: Syntax Errors...');
  const errorCfg = `
[printer]
invalid_line_without_value
include
[stepper_x]
step_pin: PA0
`;
  const errorPath = path.join(fixtureDir, 'errors.cfg');
  fs.writeFileSync(errorPath, errorCfg);
  const irError = parser.parse(errorPath);
  assert.ok(irError.errors.length >= 2, 'Should have at least 2 errors');
  console.log('[OK] Syntax Errors Passed');

  console.log('\nALL TESTS PASSED!\n');
}

runTests().catch(err => {
  console.error('\nTest Suite Failed!');
  console.error(err);
  process.exit(1);
});
