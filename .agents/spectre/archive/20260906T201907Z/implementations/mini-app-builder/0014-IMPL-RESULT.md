# Mini App Builder implementation 0014 result

Result-Version: v1
Implementation-ID: mini-app-builder/0014
Instruction: ./0014-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition | Implementation | Validation |
| --- | --- | --- | --- |
| C01 | `IMPLEMENTED` | Replaced legacy/grouped bridge imports and raw protocol maps with direct platform/Cardano v1 namespaces and generic public bridge error typing. | Typecheck and retired-import scan passed. |
| C02 | `IMPLEMENTED` | Outer host behavior uses lazy platform status, preserving selected, responding-accountless, unavailable embedded, and standalone fallback semantics without treating the host marker as trust. | Status-flow audit and build passed. |
| C03 | `IMPLEMENTED` | Rebuilt the nested relay around strict generic v1 envelopes, exact preview/upstream source windows, scope/method/event allowlists, payload/context validation, pending-request correlation, and listener cleanup. | Deterministic bidirectional relay/security audit and typecheck passed. |
| C04 | `IMPLEMENTED` | Platform settings/routes and all platform, Cardano, and CIP-30 relay routes use exact v1 scope/version markers; preview route prefixes remain isolated. | Route/operation inventory and production build passed. |
| C05 | `IMPLEMENTED` | Removed handshake, protocol advertisement, Provider, legacy wire-family, and Cardano protocol-subpath code and documented the new relay. | Stale scan and diff check passed. |

## Outcome

Builder and its nested preview now relay independently versioned bridge requests with no handshake
or iframe-wide version lock while retaining source isolation and response correlation.

## Inputs consumed

Not recorded in the original result.

## Project changes

Not recorded in the original result.

## Exported change contract

Not recorded in the original result.

## Validation

- `npm run typecheck` — passed.
- `npm run build` — passed.
- Deterministic relay audit confirmed unexpected sources and invalid routes are rejected, responses require matching request IDs/scope/version, and cleanup removes the listener.
- Stale-contract scan and `git diff --check` — passed.

## Deviations from instruction

The SDK does not publicly export its raw transport schemas, so Builder owns a minimal strict generic
envelope validator while using the SDK's public route/error types and exact v1 inventory. No legacy
schema maps or protocol negotiation were retained.

## Remaining human review

Embed Builder in XRAY App, load a preview, exercise bidirectional routes and platform preferences,
then sample native Cardano/CIP-30 success, error, accountless, unavailable, and standalone flows.

## Reproducibility

Not recorded in the original result.
