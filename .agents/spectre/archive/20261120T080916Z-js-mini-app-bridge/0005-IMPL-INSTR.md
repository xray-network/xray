# JS Mini App Bridge implementation 0005 instruction

Implementation-Version: v1
Implementation-ID: js-mini-app-bridge/0005
Target-Path: ./js/packages/mini-app-bridge/
Created: 20260811T093635Z
Evidence-Mode: LOCAL
Depends-On: ./0004-IMPL-RESULT.md
Provider-Evidence: NONE

## Inputs and authority

Not recorded in the original instruction.

## Provider pins

NONE

## Objective

Expose the default Cardano compatibility connector as `window.cardano.xrayBridge`.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Rename the default connector key from `xray` to `xrayBridge` and update tests/docs. | Pre-release breaking rename. | Cardano CIP-30 client | Bridge tests and build. |

## Implementation steps

Not recorded in the original instruction.

## Validation

- Bridge build, typecheck, and tests

## Compatibility and human review

Not recorded in the original instruction.

## Completion criteria

Not recorded in the original instruction.

## Out of scope

Protocol or connector API changes.

## Blockers

None.
