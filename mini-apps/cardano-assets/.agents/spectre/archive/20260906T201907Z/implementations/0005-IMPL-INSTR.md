# xray-mini-app-assets implementation 0005 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-assets/0005
Created: 20260811T085802Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Adopt separated platform and Cardano bridge APIs. |
| `app/` bridge consumers | `LOCAL` | Yes | Assets settings, routing, and Cardano account hooks. |

## Objective

Adopt the explicit Cardano bridge adapter in Assets.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Move Cardano hook/settings imports to Cardano bridge paths while retaining platform APIs for shared behavior. | Old mixed imports are removed. | Assets application | Typecheck and build. |

## Implementation steps

Migrate imports and validate.

## Validation

- `npm run typecheck`
- `npm run build`

## Compatibility and human review

Review Cardano/platform import ownership.

## Completion criteria

Assets validates against the new architecture.

## Out of scope

Feature changes.

## Blockers

None.
