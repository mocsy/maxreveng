# Project Discovery Document: KCV (Klipper Config Validator)

## 1. Executive Summary
**KCV (Klipper Config Validator)** is a specialized development tool designed to solve the "configuration drift" problem in 3D printing. As Klipper and Kalico configurations grow in complexity, manual verification of pinouts and module parameters becomes error-prone. KCV provides a lightweight, schema-driven validation layer that allows developers to ensure their `.cfg` files are hardware-compliant before they ever reach a printer.

### 1.1 Core Value Proposition
*   **Hardware Safety:** Prevents "fire-starting" mistakes by validating pin assignments and electrical parameters against known board profiles.
*   **Workflow Efficiency:** Integrates into the developer's existing CI/CD and pre-commit workflows.
*   **Scalable Governance:** Allows hardware manufacturers to distribute "Official Validation Schemas" for their boards.

---

## 2. Project Scope

### 2.1 In-Scope
*   **Syntax Validation:** Ensuring the file follows the Klipper/Kalico INI-like structure.
*   **Semantic Validation:** Checking values against hardware-specific constraints (e.g., "Is this pin valid for the BTT M8P?").
*   **Recursive Inclusion:** Resolving and validating `[include]` directives.
*   **Multi-Profile Support:** Switching validation rules based on the target motherboard.

### 2.2 Out-of-Scope (Phase 1+)
*   **Automatic Config Generation:** (This is a separate tool concept).
*   **Real-time Firmware Emulation:** (This is a "White Box" approach we have explicitly rejected for this path).
*   **GUI/Desktop Application:** The initial release is strictly CLI-based.

---

## 3. Execution Strategy: The Tranche Model

The project will be executed in three distinct tranches. Each tranche represents a measurable stage of maturity and a releaseable version of the tool.

### **Tranche 1: The "Core Engine" (MVP)**
*   **Focus:** Establishing the technical feasibility of the Parser and the Validator.
*   **Key Deliverable:** A functional CLI that can validate a single `.cfg` file against a single, hardcoded JSON schema.
*   **Success Metric:** 100% accuracy in detecting syntax errors and basic type mismatches.
*   **Target User:** Individual developers testing their own configs.

### **Tranche 2: The "Hardware Ecosystem" (Feature Complete)**
*   **Focus:** Moving from "hardcoded rules" to "modular profiles."
*   **Key Deliverable:** A CLI that supports the `--profile` flag, allowing users to switch between different motherboard schemas (e.g., M8P, SKR, Octopus).
*   **Key Feature Implementation:** Recursive `[include]` resolution and advanced regex validation for GPIO pins.
*   **Success Metric:** Ability to validate a complex, multi-file configuration using a community-provided board profile.
*   **Target User:** Power users and "Power-User" community members.

### **Tranche 3: The "Professional Tooling" (Maturity & Scale)**
*   **Focus:** User Experience, Automation, and Community Contribution.
*   **Key Deliverable:** A polished, production-ready tool with "Watch Mode," CI/CD integration, and a profile generation utility.
*   **Key Feature Implementation:** Colorized, actionable error reporting and a standardized way for manufacturers to distribute schemas.
*   **Success Metric:** Adoption in popular Klipper/Kalico GitHub repositories via GitHub Actions.
*   **Target User:** Hardware manufacturers, large-scale printer builders, and professional DevOps engineers.

---

## 4. Risk Assessment & Mitigation

| Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Schema Drift** | High | Klipper/Kalico updates may change valid parameters. We will focus on a "Schema-First" approach so users can update profiles without needing a new version of the tool. |
| **Parser Complexity** | Medium | Klipper's `[include]` logic can be tricky. We will implement a robust, tested recursive parser in Phase 1. |
| **Regex Fragility** | Medium | Pin naming conventions can vary. We will use modular regex patterns within the JSON schemas to allow for easy updates. |

---

## 5. Resource Requirements
*   **Primary Stack:** TypeScript, Node.js.
*   **Expertise Needed:** 
    *   Parser Development (Lexical Analysis).
    *   JSON Schema Expert.
    *   Klipper/Kalico Configuration Domain Knowledge.
