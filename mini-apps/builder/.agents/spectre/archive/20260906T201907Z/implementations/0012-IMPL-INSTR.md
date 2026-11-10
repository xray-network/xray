# xray-mini-app-builder implementation 0012 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-builder/0012
Created: 20260812T110024Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Local bridge relay/imports and the human-approved compact xray-js API | `LOCAL` | Yes | Migrate builder and relay consumption without behavior changes. |

## Objective

Adopt compact Mini App Bridge client, host, transport, and React namespaces in Builder.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Migrate platform client/host and transport utilities to bridge-root exports. | Preserve iframe relay, handshake, and route synchronization. | frontend | Typecheck and build. |
| C02 | Migrate Cardano hooks to `react.cardano.bridge`. | Preserve explorer and effective-setting behavior. | frontend | Typecheck, build, and import audit. |

## Implementation steps

1. Update bridge relay and UI imports/references.
2. Run validation and diff checks.

## Validation

- `npm run typecheck`
- `npm run build`
- obsolete-import audit
- `git diff --check`

## Compatibility and human review

Review unchanged nested iframe relay and route behavior.

## Completion criteria

Builder uses only compact bridge namespaces and validates.

## Out of scope

Relay semantics, feature, or UI changes.

## Blockers

None.
