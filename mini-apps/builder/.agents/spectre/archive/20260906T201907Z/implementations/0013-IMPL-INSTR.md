# xray-mini-app-builder implementation 0013 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-builder/0013
Created: 20260812T120134Z
Evidence-Mode: LOCAL
Depends-On: xray-js/mini-app-bridge/0010
Provider-Evidence: NONE

## Objective

Import CIP-30 relay contracts from the unified `/mini-app-bridge/cardano` entry.

## Changes to implement

| Change ID | Requirement                                                                       | Compatibility                    | Local owner                | Validation                          |
| --------- | --------------------------------------------------------------------------------- | -------------------------------- | -------------------------- | ----------------------------------- |
| C01       | Merge CIP-30 schemas and message types into the existing Cardano contract import. | Preserve relay parsing behavior. | xray-js bridge integration | Typecheck, build, and import audit. |

## Validation

- `npm run typecheck`
- `npm run build`
- retired-path audit
- `git diff --check`

## Completion criteria

Builder has no nested CIP-30 protocol import and validates.

## Out of scope

Relay behavior or UI changes.

## Blockers

None.
