# xray-mini-app-assets implementation 0016 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-assets/0016
Created: 20260819T091039Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                         | Kind    | Required | Purpose                                                                                   |
| --------------------------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------- |
| Human-approved scope-versioned bridge contract dated 2026-08-19                               | `LOCAL` | Yes      | Define the handshake-free platform/Cardano client API and exact `xray.app` status marker. |
| `package.json`, `package-lock.json`, and `README.md`                                          | `LOCAL` | Yes      | Preserve the linked xray-js dependency, repository commands, and user documentation.      |
| `app/integrations/xray-js/useEffectiveSettings.ts` and `app/shared/routing/HostRouteSync.tsx` | `LOCAL` | Yes      | Own platform preferences and bidirectional host route integration.                        |
| `app/components/pages/Home/index.tsx` and `app/types/index.ts`                                | `LOCAL` | Yes      | Own Cardano bridge consumption and exported application bridge types.                     |

## Objective

Adopt the scope-versioned bridge client in Assets without a Provider or handshake while preserving standalone behavior and Cardano functionality.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                                                                | Compatibility                                                         | Local owner                                             | Validation                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| C01       | Align the linked SDK dependency and replace grouped, legacy, and `/cardano` bridge imports/types with direct `clientPlatformV1`, `clientCardanoV1`, `clientCardanoCip30V1`, and direct React adapter namespaces as actually needed.                                        | Remove retired imports without aliases or shims.                      | Manifest, lockfile, integration modules, and app types. | Typecheck and import audit pass.                                                            |
| C02       | Replace Provider/handshake connection state with lazy `platformV1.useStatus()`. Treat `{ host: "xray.app", account: null }` as a responding XRAY host without an account, and a missing/error response as unavailable; use `status.account` to select Cardano UI behavior. | Status is identification/routing data, not permission or trust proof. | Root/home integration and status-dependent rendering.   | Selected-account, accountless, unavailable, and standalone behavior remain distinguishable. |
| C03       | Migrate theme, currency, hide-balances, and route synchronization to direct platform/v1 hooks, requests, and `routeChanged` events without checking a handshake-connected flag.                                                                                            | Keep local preference fallbacks when host data is unavailable.        | Effective settings and route synchronization.           | Typecheck/build and source audit pass.                                                      |
| C04       | Migrate every Assets Cardano request/hook to direct Cardano v1 or Cardano CIP-30 v1 APIs and preserve current loading, null-result, error, and display behavior.                                                                                                           | No speculative adapters or capability discovery.                      | Home Cardano integration.                               | Production build exercises all referenced exports.                                          |
| C05       | Remove obsolete Provider, generic host-message, handshake, capability, and protocol-subpath code/types; update documentation where the bridge is described.                                                                                                                | No legacy compatibility layer.                                        | App source, types, and README.                          | Stale-contract scan, formatting, typecheck, and build pass.                                 |

## Implementation steps

1. Update the linked dependency surface and imports.
2. Introduce status-driven host/account rendering and remove Provider/connection gates.
3. Convert preferences and route synchronization to platform/v1.
4. Convert Cardano calls/hooks, remove retired types, and update documentation.
5. Run validation and inspect the production build for standalone and embedded behavior.

## Validation

- Run `npm run typecheck`.
- Run `npm run build`.
- Run `git diff --check`.
- Scan application source for `MiniAppProvider`, `useMiniApp`, `useHostMessage`, handshake/capability APIs, grouped `client`, and `/mini-app-bridge/cardano` imports.

## Compatibility and human review

Implement after the XRAY App host supports the new protocol. Human review must cover embedded XRAY status with and without an account, standalone fallback, host preference updates, route synchronization, and Assets Cardano behavior.

## Completion criteria

- Assets uses only direct platform/Cardano adapter-version APIs.
- No handshake or Provider is required before a call or hook.
- `status.account` controls Cardano selection and preserves an explicit accountless state.
- Typecheck, build, and stale-contract audits pass.

## Out of scope

- XRAY App host or xray-js SDK implementation.
- New blockchain adapters or Assets product features.
- Legacy protocol fallback.

## Blockers

None.
