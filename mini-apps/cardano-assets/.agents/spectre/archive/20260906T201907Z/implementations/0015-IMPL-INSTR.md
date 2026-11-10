# xray-mini-app-assets implementation 0015 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-assets/0015
Created: 20260812T114643Z
Evidence-Mode: LOCAL
Depends-On: xray-js/cardano/0008
Provider-Evidence: NONE

## Inputs and authority

| Input                       | Kind    | Required | Purpose                                                  |
| --------------------------- | ------- | -------- | -------------------------------------------------------- |
| Grouped Cardano utility API | `LOCAL` | Yes      | Migrate application helpers to the new public namespace. |

## Objective

Consume Cardano helpers through `utilities` from `@xray-network/xray-js/cardano`.

## Changes to implement

| Change ID | Requirement                                                                                    | Compatibility                           | Local owner      | Validation                          |
| --------- | ---------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------- | ----------------------------------- |
| C01       | Replace root `assets` and `encoding` imports with `utilities.assets` and `utilities.encoding`. | Preserve asset formatting and decoding. | Assets utilities | Typecheck, build, and import audit. |

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

Asset behavior or UI changes.

## Blockers

None.
