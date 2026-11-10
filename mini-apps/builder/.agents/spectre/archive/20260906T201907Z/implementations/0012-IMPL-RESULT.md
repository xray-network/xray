# xray-mini-app-builder implementation 0012 result

Result-Version: v1
Implementation-ID: xray-mini-app-builder/0012
Instruction: ./0012-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition | Implementation | Validation |
| --- | --- | --- | --- |
| C01 | `IMPLEMENTED` | Migrated platform client/host calls and transport utilities to bridge-root exports. | Typecheck and production build passed. |
| C02 | `IMPLEMENTED` | Migrated explorer hooks to `cardano.bridge` on `/react`. | Typecheck, build, and import audit passed. |

## Outcome

Builder and its nested iframe relay consume only the compact bridge surfaces with unchanged behavior.

## Inputs consumed

- Local relay and bridge integrations.
- Human-approved compact xray-js API.

## Project changes

- Updated host/client routing, handshake sends, request IDs, host-window access, and explorer hooks.

## Exported change contract

| Change ID | Semantic change | Compatibility | Downstream action |
| --- | --- | --- | --- |
| C01 | Relay operations use root client/host namespaces and root transport utilities. | Relay behavior is unchanged. | None. |
| C02 | Cardano hooks use the React namespace. | Settings behavior is unchanged. | None. |

## Validation

- `npm run typecheck` and `npm run build` under Node 24.18.0 — passed.
- Obsolete-import audit and `git diff --check` — passed.

## Deviations from instruction

None.

## Remaining human review

Review nested mini-app handshake, forwarding, and route synchronization.

## Reproducibility

Run the validation commands and open a project in Builder.
