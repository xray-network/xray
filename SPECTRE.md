# SPECTRE implementations

Protocol-Version: 2.3.0
Protocol: [.agents/spectre/runtime/SPECTRE-PROTOCOL.md](.agents/spectre/runtime/SPECTRE-PROTOCOL.md)
Status-Schema-Version: v2
Storage-Mode: nested

This is the sole active lifecycle ledger. Archived decision rows and record paths are preserved
under `.agents/spectre/archive/` once an archive exists.

## Repository implementation status

Target: repository

### Implementation ledger

| ID | Title | Instruction | State | Result | Evidence mode | Decision proof |
| --- | --- | --- | --- | --- | --- | --- |
| `repository/0001` | Install SPECTRE | [Instruction](.agents/spectre/implementations/repository/0001-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/repository/0001-IMPL-RESULT.md) | `LOCAL` | Human requested installation of SPECTRE. |
