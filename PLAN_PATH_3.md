# Technical Design Document: Klipper Config Validator (KCV)

## 1. Overview
**KCV (Klipper Config Validator)** is a high-performance, schema-driven CLI tool designed to validate Klipper and Kalico configuration files (`.cfg`). Unlike standard INI parsers, KCV provides semantic validation against specific hardware profiles (e.g., BTT M8P Manta V2), ensuring that pins, modules, and parameters are valid for the selected hardware.

### 1.1 Goals
- **Accuracy:** Validate both syntax (is the file a valid INI?) and semantics (is this pin valid for this board?).
- **Scalability:** Allow users to add new board profiles via simple JSON files without recompiling the tool.
- **Developer Experience:** Provide clear, colorized error messages with line numbers and actionable suggestions.
- **CI/CD Ready:** Designed to run in headless environments (GitHub Actions, local pre-commit hooks).

---

## 2. Architecture
KCV follows a modular, layered architecture to separate the concerns of parsing, validation, and reporting.

### 2.1 Component Diagram
`[User Input (.cfg)]` $\rightarrow$ `[Parser]` $\rightarrow$ `[Intermediate Representation (IR)]` $\rightarrow$ `[Validator]` $\leftarrow$ `[Schema Registry]` $\rightarrow$ `[Reporter]` $\rightarrow$ `[User Output]`

### 2.2 Component Descriptions

#### **A. The Parser (Lexical Analysis)**
*   **Responsibility:** Converts raw `.cfg` text into an **Intermediate Representation (IR)**.
*   **Key Feature: Source Mapping.** Unlike standard JSON parsers, the KCV Parser must track **line numbers** and **column positions** for every key and value to enable precise error reporting.
*   **Logic:** Handles `[sections]`, `key: value` pairs, `#` or `;` comments, and the `[include ...]` directive (recursive resolution).

#### **B. The Schema Registry (Data Layer)**
*   **Responsibility:** Manages a collection of **Board Profiles**.
*   **Format:** JSON Schema (standardized).
*   **Storage:** A directory of `.json` files (e.g., `profiles/btt_m8p_manta_v2.json`).

#### **C. The Validator (Semantic Engine)**
*   **Responsibility:** Compares the IR against the active Board Profile.
*   **Logic:**
    1.  **Structural Validation:** Does the config contain all required sections?
    2.  **Constraint Validation:** Do the values match the allowed types (int, float, string, bool)?
    3.  **Domain Validation:** Do the values match specific regex patterns (e.g., GPIO pin naming conventions)?
    4.  **Range Validation:** Are numerical values within safe bounds (e.g., `max_temp` > 0)?

#### **D. The Reporter (UI Layer)**
*   **Responsibility:** Translates internal error objects into human-readable terminal output.
*   **Features:** Colorized output (Red for errors, Yellow for warnings), line number highlighting, and "Did you mean?" suggestions for typos.

---

## 3. Data Model (Schema Design)

The core of KCV is the **Board Profile**. We will use a structured JSON format that defines the "Rules of the Board."

### 3.1 Example Schema: `btt_m8p_manta_v2.json`
```json
{
  "metadata": {
    "name": "BTT M8P Manta V2",
    "version": "1.0.0",
    "author": "KCV Community"
  },
  "constraints": {
    "allowed_mcu_types": ["stm32", "atmel"],
    "pin_pattern": "^[A-Z][0-9][A-Z]_[0-9]$"
  },
  "sections": {
    "printer": {
      "required": true,
      "keys": {
        "kinematics": { "type": "string", "enum": ["cartesian", "corexy", "delta"] },
        "max_velocity": { "type": "float", "min": 0 }
      }
    },
    "stepper_x": {
      "required": false,
      "keys": {
        "step_pin": { "type": "string", "pattern": "^[A-Z0-9_]+$" },
        "dir_pin": { "type": "string", "pattern": "^[A-Z0-9_]+$" },
        "microsteps": { "type": "integer", "enum": [4, 8, 16, 32, 64, 128, 256] }
      }
    }
  }
}
```

---

## 4. Implementation Roadmap

### **Phase 1: Core Engine (The "Parser")**
*   [ ] Implement `ConfigParser` class in TypeScript.
*   [ ] Implement recursive `[include]` resolution.
*   [ ] Implement **Source Mapping** (tracking line numbers).
*   [ ] **Milestone:** Successfully parse a complex `.cfg` with includes into a JSON IR.

### **Phase 2: Validation Engine (The "Brain")**
*   [ ] Implement `SchemaLoader` to fetch JSON profiles.
*   [ ] Integrate `AJV` (or similar) for high-speed JSON Schema validation.
*   [ ] Implement custom "Domain Validators" (Regex for pins, range checks for temps).
*   [ ] **Milestone:** Validate a config against a hardcoded schema and return error objects.

### **Phase 3: CLI & UX (The "Interface")**
*   [ ] Implement `Commander.js` for CLI argument parsing (`--profile`, `--file`, `--watch`).
*   [ ] Implement `Chalk` for colorized terminal output.
*   [ ] Implement the `Reporter` to map error objects to line numbers.
*   [ ] **Milestone:** A working CLI: `kcv validate printer.cfg --profile btt_m8p`.

### **Phase 4: Ecosystem (The "Scale")**
*   [ ] Create a `kcv-profile-generator` utility to help users create new boards.
*   [ ] Implement a "Watch Mode" for real-time linting during development.
*   [ ] **Milestone:** Release v1.0.0 with 5 community-contributed board profiles.

---

## 5. Technical Stack
*   **Language:** TypeScript (for type safety and ecosystem).
*   **Runtime:** Node.js.
*   **CLI Framework:** `commander`.
*   **Schema Validation:** `ajv` (fastest JSON Schema validator).
*   **Terminal Styling:** `chalk` & `ora` (for spinners).
*   **Testing:** `Vitest` or `Jest`.

## 6. Success Criteria (Definition of Done)
1.  **Zero False Positives:** The linter must never flag a valid Klipper config as invalid.
2.  **Zero False Negatives:** The linter must catch all errors defined in the selected Board Profile.
3.  **Performance:** Validation of a 500-line config file must take `< 200ms`.
4.  **Extensibility:** A new board profile can be added by creating a single JSON file.
