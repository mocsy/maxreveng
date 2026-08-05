# C4 System Design Document: KCV (Klipper Config Validator)

This document follows the C4 model to describe the architecture of the KCV system at four levels of abstraction.

---

## Level 1: System Context Diagram

The System Context diagram shows the KCV system in the context of its users and the external entities it interacts with.

```mermaid
graph TD
    User[Developer / CI/CD Pipeline] -->|Validates configuration| KCV[KCV System]
    KCV -->|Reads| ConfigFiles[Klipper/Kalico .cfg Files]
    KCV -->|Loads profiles from| BoardProfiles[Board Profile JSONs]
    KCV -->|Reports errors to| User
```

**External Actors & Systems:**
*   **Developer / CI/CD Pipeline:** The primary user who triggers the validation process.
*   **Klipper/Kalico .cfg Files:** The input files being validated.
*   **Board Profile JSONs:** The external data source defining the "rules" for specific hardware.

---

## Level 2: Container Diagram

The Container diagram zooms into the KCV system to show its high-level technical building blocks.

```mermaid
graph TB
    subgraph KCV System
        CLI[CLI Interface - Commander.js]
        Parser[Config Parser - TypeScript]
        Validator[Validation Engine - AJV/Schema]
        Registry[Schema Registry - File System]
        Reporter[Reporter - Chalk/Ora]
    end

    User[Developer / CI/CD] -->|Commands| CLI
    CLI -->|Triggers| Parser
    CLI -->|Triggers| Validator
    Parser -->|Produces IR| Validator
    Validator -->|Queries| Registry
    Validator -->|Emits Errors| Reporter
    Reporter -->|Stdout| User

    ConfigFiles[(Config Files)] -.->|Input| Parser
    BoardProfiles[(Board Profiles)] -.->|Input| Registry
```

**Containers:**
*   **CLI Interface:** Handles user input, command-line arguments, and orchestration.
*   **Config Parser:** Performs lexical analysis and handles recursive file inclusion.
*   **Validation Engine:** The core logic that compares the parsed data against schemas.
*   **Schema Registry:** A simple file-system-based registry for loading JSON profiles.
*   **Reporter:** Formats and outputs errors and warnings to the terminal.

---

## 3. Level 3: Component Diagram

The Component diagram zooms into the **Validation Engine** container to show its internal components.

```mermaid
graph TB
    subgraph Validation Engine
        SE[Schema Loader]
        VE[Validation Logic]
        DE[Domain Rule Engine]
    end

    IR[Intermediate Representation] --> VE
    SE -->|Provides Schema| VE
    VE -->|Checks Constraints| DE
    DE -->|Returns Results| VE
    VE -->|Emits Errors| Reporter[Reporter]
```

**Components (within Validation Engine):**
*   **Schema Loader:** Responsible for reading and parsing the JSON Board Profiles.
*   **Validation Logic:** The main orchestrator that iterates through the IR and applies the schema.
*   **Domain Rule Engine:** A specialized component for non-standard rules (e.g., custom Regex for GPIO pins or specific numerical ranges).

---

## 4. Level 4: Code Diagram (Class Structure)

The Code diagram shows the high-level class structure and relationships within the TypeScript implementation.

```mermaid
classDiagram
    class CLI {
        +run()
    }
    class ConfigParser {
        +parse(file: string): ConfigIR
        -resolveIncludes(file: string): ConfigIR
    }
    class ConfigIR {
        +sections: Map<string, Section>
        +errors: Array<ParseError>
    }
    class Section {
        +name: string
        +entries: Map<string, Entry>
    }
    class Entry {
        +key: string
        +value: string
        +line: number
    }
    class ValidationEngine {
        +validate(ir: ConfigIR, schema: BoardSchema): ValidationResult
    }
    class SchemaRegistry {
        +loadProfile(name: string): BoardSchema
    }
    class Reporter {
        +print(results: ValidationResult)
    }

    CLI --> ConfigParser
    CLI --> ValidationEngine
    CLI --> Reporter
    ConfigParser --> ConfigIR
    ConfigIR *-- Section
    Section *-- Entry
    ValidationEngine --> SchemaRegistry
    ValidationEngine --> Reporter
```

**Key Classes:**
*   **`CLI`**: The entry point.
*   **`ConfigParser`**: Handles the transformation of raw text into the `ConfigIR`.
*   **`ConfigIR` (Intermediate Representation)**: A structured object model representing the configuration, including source mapping (line numbers).
*   **`ValidationEngine`**: The core logic that performs the semantic checks.
*   **`SchemaRegistry`**: Manages the loading of different hardware profiles.
*   **`Reporter`**: Handles the final output formatting.
