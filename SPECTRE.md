# SPECTRE implementations

Protocol-Version: 1.0.0
Protocol: [.agents/spectre/runtime/SPECTRE-PROTOCOL.md](.agents/spectre/runtime/SPECTRE-PROTOCOL.md)
Status-Schema-Version: v1
Storage-Mode: nested

This is the sole live lifecycle ledger and target registry. Archived rows live in .agents/spectre/archive/ manifests.

## Targets

| Target | Label | Path | Status | Reason |
| --- | --- | --- | --- | --- |
| `cardano-lib-cpp` | Cardano Lib C++ | `./cardano-lib/libs/cpp/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `cardano-lib-repository` | Cardano Lib repository | `./cardano-lib/` | `RETIRED` | Governance target of the former cardano-lib installation, merged into this one |
| `cardano-lib-typescript` | Cardano Lib TypeScript | `./cardano-lib/libs/typescript/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `js-cardano` | JS Cardano | `./js/packages/cardano/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `js-mini-app-bridge` | JS Mini App Bridge | `./js/packages/mini-app-bridge/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `js-repository` | JS repository | `./js/` | `RETIRED` | Governance target of the former js installation, merged into this one |
| `js-runtime` | JS runtime | `./js/packages/runtime/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `mini-app-builder` | Mini App Builder | `./mini-app-builder/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `mini-app-cardano-assets` | Mini App Cardano Assets | `./mini-app-cardano-assets/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `mini-app-cardano-transactions` | Mini App Cardano Transactions | `./mini-app-cardano-transactions/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `mini-app-cardano-wallet` | Mini App Cardano Wallet | `./mini-app-cardano-wallet/` | `ACTIVE` | Used by archived records; path inferred from their source references during the 1.0.0 migration |
| `repository` | Repository | `./` | `ACTIVE` | Repository governance bootstrap |

## Implementations

### `repository`

| ID | Title | Instruction | State | Result | Evidence mode | Decision or status |
| --- | --- | --- | --- | --- | --- | --- |
| `repository/0001` | Install SPECTRE | [Instruction](.agents/spectre/implementations/repository/0001-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/repository/0001-IMPL-RESULT.md) | `LOCAL` | Human requested installation of SPECTRE. |
