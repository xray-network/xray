# Mini App Builder implementation 0004 instruction

Implementation-Version: v1
Implementation-ID: mini-app-builder/0004
Target-Path: ./mini-app-builder/
Created: 20260811T082930Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Consume and relay iframe host context. |
| `mini-app-builder/app/integrations/xray-js/` and `mini-app-builder/app/components/pages/Code/` | `LOCAL` | Yes | Builder client integration and nested preview host. |

## Provider pins

NONE

## Objective

Consume and relay host context through the Mini App Builder.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Consume context for effective settings and expose it to callers. | Standalone preferences remain the fallback. | `mini-app-builder/app/integrations/xray-js/useEffectiveSettings.ts` | Typecheck and build. |
| C02 | Validate relayed host context and attach authoritative context to builder-generated host messages. | Upstream messages retain their original context. | Builder bridge and Code preview | Typecheck and build. |

## Implementation steps

Update consumer settings, relay parsing, preview responses, and validate.

## Validation

- `npm run typecheck`
- `npm run build`

## Compatibility and human review

Review standalone preview fallback and upstream context relay.

## Completion criteria

Nested mini apps always receive context from the builder host and validation is recorded.

## Out of scope

Builder project schema changes.

## Blockers

None.
