# Mini App Builder implementation 0007 instruction

Implementation-Version: v1
Implementation-ID: mini-app-builder/0007
Target-Path: ./mini-app-builder/
Created: 20260811T185345Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Human request on 2026-08-11 | `LOCAL` | Yes | Standardize clipboard behavior and upgrade Ant Design. |
| `mini-app-builder/app/components/common/Copy/index.tsx` | `LOCAL` | Yes | Owns clipboard behavior. |
| `mini-app-builder/app/theme/`, `mini-app-builder/app/root.tsx`, and `package.json` | `LOCAL` | Yes | Own Ant Design integration and dependencies. |

## Provider pins

NONE

## Objective

Adopt native clipboard handling and Ant Design 6.6.0.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace the copy package with XRAY App's Clipboard API/fallback component. | Preserve tooltip and child click behavior. | Common Copy | Verify. |
| C02 | Upgrade Ant Design to 6.6.0 and remove the v5 React patch. | Preserve React 19 and theme composition. | Root/dependencies | Verify. |
| C03 | Retain EscapeAntd because Builder Home still consumes its exported message API. | Keep it mounted under App. | Theme | Verify. |

## Implementation steps

1. Replace Copy and obsolete dependencies.
2. Upgrade Ant Design and remove v5 patch usage.
3. Audit the retained message bridge and validate.

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Static usage audit.

## Compatibility and human review

Review clipboard behavior, messages, and Ant Design v6 styling.

## Completion criteria

All changes validate and implementation 0007 has a result in `REVIEW`.

## Out of scope

Unrelated upgrades and UI redesign.

## Blockers

None.
