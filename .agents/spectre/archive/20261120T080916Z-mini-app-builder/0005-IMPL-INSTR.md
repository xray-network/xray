# Mini App Builder implementation 0005 instruction

Implementation-Version: v1
Implementation-ID: mini-app-builder/0005
Target-Path: ./mini-app-builder/
Created: 20260811T085802Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Relay separated platform and Cardano bridge protocols. |
| Builder bridge integrations and Code preview | `LOCAL` | Yes | Nested host parsing, forwarding, handshake, settings, and event log. |

## Provider pins

NONE

## Objective

Relay the multiblockchain bridge architecture through the Mini App Builder.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Parse/forward platform, Cardano-native, and Cardano CIP-30 schema maps with their new namespaces. | Old ambiguous messages are removed. | Builder bridge integration | Typecheck and build. |
| C02 | Emit structured handshake protocol advertisement and contextual platform route messages from the nested host. | Standalone mode advertises only implemented Cardano native support. | Code preview host | Typecheck and build. |
| C03 | Update Cardano settings and event classification imports/namespaces. | Platform behavior remains shared. | Builder UI/integrations | Typecheck and build. |

## Implementation steps

Migrate relay parsing, preview hosting, settings, event UI, and validate.

## Validation

- `npm run typecheck`
- `npm run build`

## Compatibility and human review

Review protocol forwarding and standalone advertisements.

## Completion criteria

Builder relays all implemented namespaces and validates.

## Out of scope

Executing CIP-30 locally in Builder.

## Blockers

None.
