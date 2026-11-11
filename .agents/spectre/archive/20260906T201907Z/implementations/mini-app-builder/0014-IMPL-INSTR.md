# xray-mini-app-builder implementation 0014 instruction

Implementation-Version: v1
Implementation-ID: mini-app-builder/0014
Created: 20260819T091039Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                                                                 | Kind    | Required | Purpose                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------- |
| Human-approved scope-versioned bridge contract dated 2026-08-19                                                                       | `LOCAL` | Yes      | Define handshake-free messages, direct adapter versions, and `xray.app` platform status. |
| `package.json`, `package-lock.json`, and `README.md`                                                                                  | `LOCAL` | Yes      | Preserve linked SDK resolution and repository validation.                                |
| `mini-app-builder/app/integrations/xray-js/miniAppBridge.ts`                                                                                           | `LOCAL` | Yes      | Own the nested preview relay and its source/context validation.                          |
| `mini-app-builder/app/integrations/xray-js/useEffectiveSettings.ts`, `mini-app-builder/app/shared/routing/HostRouteSync.tsx`, and `mini-app-builder/app/components/pages/Code/index.tsx` | `LOCAL` | Yes      | Own Builder's host settings, routing, and preview integration.                           |

## Objective

Adopt the scope-versioned bridge client and relay in Builder without handshake negotiation while preserving secure nested-preview routing.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                                                                           | Compatibility                                                                              | Local owner                                                 | Validation                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| C01       | Replace grouped/legacy bridge imports and raw protocol maps with direct platform/Cardano/CIP-30 v1 client, host, React, and public transport types required by Builder.                                                                                                               | Remove retired APIs and `/cardano` imports without shims.                                  | Manifest, lockfile, integration imports.                    | Typecheck and import scan pass.                                                               |
| C02       | Replace Builder's Provider/handshake state with platform `getStatus`/`useStatus`, preserving separate responding-accountless, unavailable, and standalone states.                                                                                                                     | The `xray.app` marker is not treated as a security credential.                             | Builder host-facing UI and effective settings.              | State behavior is deterministic and build passes.                                             |
| C03       | Rebuild the nested preview relay around generic request/response/event envelopes carrying exact scope/version and correlation IDs. Relay only validated messages between the expected host/preview windows, preserve context validation, and do not advertise or negotiate protocols. | Remove the legacy handshake relay; retain window/source isolation and fail-closed parsing. | `miniAppBridge.ts` and Code preview integration.            | Focused relay coverage or deterministic audit validates both directions, errors, and cleanup. |
| C04       | Migrate platform preferences and route synchronization plus every relayed Cardano/CIP-30 operation/event to exact v1 adapter routes.                                                                                                                                                  | Preserve preview functionality and local settings fallback.                                | Effective settings, route sync, relay adapter registration. | Typecheck/build and operation inventory pass.                                                 |
| C05       | Remove obsolete handshake, capability, Provider, grouped-role, and raw legacy schema code; update documentation if bridge behavior is described.                                                                                                                                      | No fallback protocol.                                                                      | App source and README.                                      | Stale-contract scan, formatting, typecheck, and build pass.                                   |

## Implementation steps

1. Align imports and public types with the linked scope-versioned SDK.
2. Replace outer-host connection state with platform status.
3. Implement the minimal generic nested relay with exact window, route, and payload validation.
4. Migrate settings, route sync, Cardano, and CIP-30 paths and remove retired code.
5. Validate the embedded Builder and nested preview flows.

## Validation

- Run `npm run typecheck`.
- Run `npm run build`.
- Run `git diff --check`.
- Scan source for legacy handshake/capability constants, old `xray.client.*`/`xray.host.*` families, Provider APIs, grouped roles, and `/mini-app-bridge/cardano` imports.
- Verify relay listeners reject unexpected source windows and clean up on unmount.

## Compatibility and human review

Implement after XRAY App supports the new host protocol. Human review must cover Builder embedded in XRAY App, a preview embedded in Builder, accountless/unavailable states, bidirectional routes, platform preferences, and representative Cardano/CIP-30 relay calls.

## Completion criteria

- Builder and its preview relay use only exact scope-version v1 messages and direct SDK namespaces.
- No handshake, protocol advertisement, or iframe-wide version lock remains.
- Nested relay source/context security is preserved.
- Typecheck, build, and stale-contract audits pass.

## Out of scope

- XRAY App host, xray-js SDK, generated project code, or new adapters.
- Redesigning Builder's editor or preview UI.
- Legacy bridge fallback.

## Blockers

None.
