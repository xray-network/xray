# SPECTRE implementations

Protocol-Version: 1.0.0
Protocol-SHA256: 5a90409736ecc8357b3a4e93530fffd94c8c008bcc3ed48a16351b450eb046a7
Protocol: [.agents/spectre/runtime/SPECTRE-PROTOCOL.md](.agents/spectre/runtime/SPECTRE-PROTOCOL.md)

This is the live ledger: targets, providers and implementations. Archived rows live in the __archive folders' ARCHIVE.md files.

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

## Providers

### `cardano-cips`

[Provider guide](.agents/spectre/providers/cardano-cips/PROVIDER.md)

| Capture | Captured | Upstream | Snapshot | Summary | Pinned by |
| --- | --- | --- | --- | --- | --- |
| `cardano-cips/0001` | 2026-07-31 | `b491a839708eb0296597008e7b6b093eda5e3363` | [Snapshot](.agents/spectre/providers/cardano-cips/0001/SNAPSHOT.md) | [Summary](.agents/spectre/providers/cardano-cips/0001/CAPTURE.md) | — |

### `cardano-ledger`

[Provider guide](.agents/spectre/providers/cardano-ledger/PROVIDER.md)

| Capture | Captured | Upstream | Snapshot | Summary | Pinned by |
| --- | --- | --- | --- | --- | --- |
| `cardano-ledger/0001` | 2026-07-23 | `a624de4c8db7286a6c065da149679ea55f7d5629` | [Snapshot](.agents/spectre/providers/cardano-ledger/0001/SNAPSHOT.md) | [Summary](.agents/spectre/providers/cardano-ledger/0001/CAPTURE.md) | — |

### `cardano-multiplatform-lib`

[Provider guide](.agents/spectre/providers/cardano-multiplatform-lib/PROVIDER.md)

| Capture | Captured | Upstream | Snapshot | Summary | Pinned by |
| --- | --- | --- | --- | --- | --- |
| `cardano-multiplatform-lib/0001` | 2026-07-23 | `39681e0d435a71f7c47a2601507ab16e691abb9e` | [Snapshot](.agents/spectre/providers/cardano-multiplatform-lib/0001/SNAPSHOT.md) | [Summary](.agents/spectre/providers/cardano-multiplatform-lib/0001/CAPTURE.md) | — |
| `cardano-multiplatform-lib/0002` | 2026-09-09 | `69b8664c84931cd6632e0d951c2795019597527f` | [Snapshot](.agents/spectre/providers/cardano-multiplatform-lib/0002/SNAPSHOT.md) | [Summary](.agents/spectre/providers/cardano-multiplatform-lib/0002/CAPTURE.md) | — |

### `message-signing`

[Provider guide](.agents/spectre/providers/message-signing/PROVIDER.md)

| Capture | Captured | Upstream | Snapshot | Summary | Pinned by |
| --- | --- | --- | --- | --- | --- |
| `message-signing/0001` | 2026-07-27 | `1.1.0` | [Snapshot](.agents/spectre/providers/message-signing/0001/SNAPSHOT.md) | [Summary](.agents/spectre/providers/message-signing/0001/CAPTURE.md) | — |

### `uplc`

[Provider guide](.agents/spectre/providers/uplc/PROVIDER.md)

| Capture | Captured | Upstream | Snapshot | Summary | Pinned by |
| --- | --- | --- | --- | --- | --- |
| `uplc/0001` | 2026-07-27 | `1.66.0.0` | [Snapshot](.agents/spectre/providers/uplc/0001/SNAPSHOT.md) | [Summary](.agents/spectre/providers/uplc/0001/CAPTURE.md) | — |
| `uplc/0002` | 2026-09-09 | `1.68.0.0` | [Snapshot](.agents/spectre/providers/uplc/0002/SNAPSHOT.md) | [Summary](.agents/spectre/providers/uplc/0002/CAPTURE.md) | — |

## Implementations

### `repository`

| ID | Title | Instruction | State | Result | Evidence mode | Decision or status |
| --- | --- | --- | --- | --- | --- | --- |
| `repository/0001` | Install SPECTRE | [Instruction](.agents/spectre/implementations/repository/0001-IMPL-INSTR.md) | `ACCEPTED` | [Result](.agents/spectre/implementations/repository/0001-IMPL-RESULT.md) | `LOCAL` | Human requested installation of SPECTRE. |
