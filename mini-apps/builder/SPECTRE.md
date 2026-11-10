# SPECTRE implementations

Protocol-Version: 1.0.0
Protocol: [.agents/spectre/SPECTRE-PROTOCOL.md](.agents/spectre/SPECTRE-PROTOCOL.md)
Status-Schema-Version: v1
Storage-Mode: flat

This is the sole active lifecycle ledger. Archived decision rows and record paths are preserved
under `.agents/spectre/archive/` once an archive exists.

## xray-mini-app-builder implementation status

Target: xray-mini-app-builder

### Implementation ledger

| ID | Title | Instruction | State | Result | Evidence mode | Decision proof |
| --- | --- | --- | --- | --- | --- | --- |
| `0016` | Build client-owned browser workspace | [Instruction](.agents/spectre/implementations/0016-IMPL-INSTR.md) | `CANCELLED` | — | `LOCAL` | superseded by separate local and in-browser implementations |
| `0017` | Support local development projects | [Instruction](.agents/spectre/implementations/0017-IMPL-INSTR.md) | `REVIEW` | [Result](.agents/spectre/implementations/0017-IMPL-RESULT.md) | `LOCAL` | Local workflow implemented and automated checks passed; deployed HTTPS host and browser permission acceptance remain explicit review work. |
