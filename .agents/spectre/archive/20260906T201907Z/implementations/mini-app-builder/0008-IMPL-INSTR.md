# xray-mini-app-builder implementation 0008 instruction

Implementation-Version: v1
Implementation-ID: mini-app-builder/0008
Created: 20260811T200807Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Objective

Remove rem transformation and convert active Builder styling to explicit pixels.

## Changes to implement

| Change ID | Requirement                                                     | Compatibility                                                                    | Local owner    | Validation    |
| --------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------- | ------------- |
| C01       | Remove the StyleProvider and px-to-rem transformer.             | Preserve the Ant Design provider stack.                                          | Theme          | Verify.       |
| C02       | Convert every active rem dimension at the configured 14px root. | Preserve rendered dimensions.                                                    | Styles/layouts | Static audit. |
| C03       | Set Tailwind's spacing base to `3.5px`.                         | Preserve the former 14px-root scale.                                             | Tailwind theme | Verify.       |
| C04       | Use Tailwind v4 canonical numeric and postfix-important syntax. | Round direct values to the nearest Tailwind token; retain composite expressions. | App styles     | Static audit. |

## Validation

- `npm run typecheck`
- `npm run build`
- Pixel/rem source audit
- `git diff --check`

## Blockers

None.
