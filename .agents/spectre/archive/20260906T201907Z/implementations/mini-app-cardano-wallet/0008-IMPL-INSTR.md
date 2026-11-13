# Mini App Cardano Wallet implementation 0008 instruction

Implementation-Version: v1
Implementation-ID: mini-app-cardano-wallet/0008
Target-Path: ./mini-app-cardano-wallet/
Created: 20260811T200807Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

Not recorded in the original instruction.

## Provider pins

NONE

## Objective

Remove rem transformation and convert active Wallet styling to explicit pixels.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Remove the StyleProvider and px-to-rem transformer. | Preserve the Ant Design provider stack. | Theme | Verify. |
| C02 | Remove the direct css-in-js dependency and root lock declaration. | Keep transitive packages intact. | Dependencies | Verify. |
| C03 | Convert every active rem dimension at the configured 14px root. | Preserve rendered dimensions. | Styles/layouts | Static audit. |
| C04 | Set Tailwind's spacing base to `3.5px`. | Preserve the former 14px-root scale. | Tailwind theme | Verify. |
| C05 | Canonicalize pixel utilities and postfix important modifiers. | Round direct values to the nearest Tailwind token and preserve v4 semantics. | App styles | Static audit. |

## Implementation steps

Not recorded in the original instruction.

## Validation

- `npm run typecheck`
- `npm run build`
- Pixel/rem source audit
- `git diff --check`

## Compatibility and human review

Not recorded in the original instruction.

## Completion criteria

Not recorded in the original instruction.

## Out of scope

Not recorded in the original instruction.

## Blockers

None.
