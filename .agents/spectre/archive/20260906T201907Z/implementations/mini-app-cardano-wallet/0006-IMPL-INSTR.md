# Mini App Cardano Wallet implementation 0006 instruction

Implementation-Version: v1
Implementation-ID: mini-app-cardano-wallet/0006
Target-Path: ./mini-app-cardano-wallet/
Created: 20260811T093220Z
Evidence-Mode: LOCAL
Depends-On: ./0005-IMPL-RESULT.md
Provider-Evidence: NONE

## Inputs and authority

Not recorded in the original instruction.

## Provider pins

NONE

## Objective

Adopt direct platform and Cardano bridge module namespace imports.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace named bridge client wrapper imports with namespace imports. | Coordinated pre-release change. | Wallet bridge consumers | Typecheck and build. |

## Implementation steps

Not recorded in the original instruction.

## Validation

- `npm run typecheck`
- `npm run build`

## Compatibility and human review

Not recorded in the original instruction.

## Completion criteria

Not recorded in the original instruction.

## Out of scope

Not recorded in the original instruction.

## Blockers

Not recorded in the original instruction.
