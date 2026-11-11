# xray-mini-app-builder implementation 0015 instruction

Implementation-Version: v1
Implementation-ID: mini-app-builder/0015
Created: 20260819T131657Z
Evidence-Mode: LOCAL
Depends-On: mini-app-bridge/0014
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Normalized SDK status contract and Builder outer-client/nested-relay integration | `LOCAL` | Yes | Preserve React status and generic relay behavior. |

## Objective

Adopt normalized status envelopes in Builder and relay them unchanged through nested previews.

## Changes to implement

| Change ID | Requirement | Compatibility | Validation |
| --- | --- | --- | --- |
| C01 | Keep React status `{ host, account }`; ensure the strict relay accepts/forwards `{ result: { host }, context }`, correlates request IDs, and rejects duplicated/invalid shapes where validated. | Preserve source isolation and all preview routes. | Relay audit, typecheck, build, scan, and diff check pass. |

## Implementation steps

1. Align outer status and relay validation/types.
2. Validate embedded and standalone paths.

## Validation

- `npm run typecheck`, `npm run build`, relay source/correlation audit, and `git diff --check`.

## Compatibility and human review

Review Builder embedded/accountless/unavailable/standalone plus nested preview status responses/events.

## Completion criteria

Builder forwards normalized status without duplicating account or weakening relay validation.

## Out of scope

Preview UI redesign, other adapters, or permission changes.

## Blockers

Implement after SDK plan `mini-app-bridge/0014`.
