# Mini App Cardano Transactions implementation 0014 instruction

Implementation-Version: v1
Implementation-ID: mini-app-cardano-transactions/0014
Target-Path: ./mini-app-cardano-transactions/
Created: 20260812T114643Z
Evidence-Mode: LOCAL
Depends-On: ../js-cardano/0008-IMPL-RESULT.md
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Grouped Cardano utility API | `LOCAL` | Yes | Migrate application helpers to the new public namespace. |

## Provider pins

NONE

## Objective

Consume Cardano helpers through `utilities` from `@xray-network/xray-js/cardano`.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace root `assets`, `encoding`, and `slots` imports with their `utilities` members. | Preserve transaction presentation and slot conversion. | Transaction utilities | Typecheck, build, and import audit. |

## Implementation steps

1. Update the utility import and references.
2. Run application validation and diff checks.

## Validation

- `npm run typecheck`
- `npm run build`
- retired-import audit
- `git diff --check`

## Compatibility and human review

Review the grouped namespace migration.

## Completion criteria

The application uses only the grouped Cardano utility API and validates.

## Out of scope

Transaction behavior or UI changes.

## Blockers

None.
