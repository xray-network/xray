# SPECTRE implementations

Protocol-Version: 1.0.0
Protocol: [.agents/spectre/SPECTRE-PROTOCOL.md](.agents/spectre/SPECTRE-PROTOCOL.md)
Status-Schema-Version: v1
Storage-Mode: nested

This is the sole active lifecycle ledger. Archived decision rows and record paths are preserved
under `.agents/spectre/archive/` once an archive exists.

## C++ implementation status

Target: cpp

### Implementation ledger

| ID | Title | Instruction | State | Result | Evidence mode | Decision proof |
| --- | --- | --- | --- | --- | --- | --- |

No implementation records.

## Repository implementation status

Target: repository

### Implementation ledger

| ID | Title | Instruction | State | Result | Evidence mode | Decision proof |
| --- | --- | --- | --- | --- | --- | --- |
| `0002` | Update CML provider artifact selection | [Instruction](.agents/spectre/implementations/repository/0002-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/repository/0002-IMPL-RESULT.md) | `LOCAL` | reviewed and approved by xray-robot on 2026-11-10 |
| `0003` | Update UPLC provider corpus selection | [Instruction](.agents/spectre/implementations/repository/0003-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/repository/0003-IMPL-RESULT.md) | `LOCAL` | reviewed and approved by xray-robot on 2026-11-10 |

## TypeScript implementation status

Target: typescript

### Implementation ledger

| ID | Title | Instruction | State | Result | Evidence mode | Decision proof |
| --- | --- | --- | --- | --- | --- | --- |
| `0025` | Fix CIP36 delegation weight validation | [Instruction](.agents/spectre/implementations/typescript/0025-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/typescript/0025-IMPL-RESULT.md) | `LOCAL` | reviewed and approved by xray-robot on 2026-11-10 |
| `0026` | Preserve complete CIP36 metadata views | [Instruction](.agents/spectre/implementations/typescript/0026-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/typescript/0026-IMPL-RESULT.md) | `LOCAL` | reviewed and approved by xray-robot on 2026-11-10 |
| `0027` | Reject duplicate builder certificates and proposals | [Instruction](.agents/spectre/implementations/typescript/0027-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/typescript/0027-IMPL-RESULT.md) | `LOCAL` | reviewed and approved by xray-robot on 2026-11-10 |
| `0028` | Cover generic blueprint definition references | [Instruction](.agents/spectre/implementations/typescript/0028-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/typescript/0028-IMPL-RESULT.md) | `LOCAL` | reviewed and approved by xray-robot on 2026-11-10 |
| `0029` | Support versioned UPLC conformance layouts | [Instruction](.agents/spectre/implementations/typescript/0029-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/typescript/0029-IMPL-RESULT.md) | `LOCAL` | reviewed and approved by xray-robot on 2026-11-10 |
