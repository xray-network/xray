# Mini App Builder implementation 0013 instruction

Implementation-Version: v1
Implementation-ID: mini-app-builder/0013
Target-Path: ./mini-app-builder/
Created: 20260812T120134Z
Evidence-Mode: LOCAL
Depends-On: ../js-mini-app-bridge/0010-IMPL-RESULT.md
Provider-Evidence: NONE

## Inputs and authority

Not recorded in the original instruction.

## Provider pins

NONE

## Objective

Import CIP-30 relay contracts from the unified `/mini-app-bridge/cardano` entry.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Merge CIP-30 schemas and message types into the existing Cardano contract import. | Preserve relay parsing behavior. | xray-js bridge integration | Typecheck, build, and import audit. |

## Implementation steps

Not recorded in the original instruction.

## Validation

- `npm run typecheck`
- `npm run build`
- retired-path audit
- `git diff --check`

## Compatibility and human review

Not recorded in the original instruction.

## Completion criteria

Builder has no nested CIP-30 protocol import and validates.

## Out of scope

Relay behavior or UI changes.

## Blockers

None.
