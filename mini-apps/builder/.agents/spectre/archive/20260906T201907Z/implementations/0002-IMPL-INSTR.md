# xray-mini-app-builder implementation 0002 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-builder/0002
Created: 20260806T132817Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                                  | Kind    | Required | Purpose                                                                                                                   |
| ------------------------------------------------------------------------------------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| Human request to remove Yarn from all JavaScript projects                                              | `LOCAL` | Yes      | Authorizes the package-manager migration to npm.                                                                          |
| `package.json`                                                                                         | `LOCAL` | Yes      | Defines scripts, dependencies, and the application completion commands.                                                   |
| `yarn.lock`                                                                                            | `LOCAL` | Yes      | Defines the dependency set to reconcile into an npm lockfile before removal.                                              |
| Human request to fold template-aligned mini-app structure into this non-terminal implementation        | `LOCAL` | Yes      | Expands the migration to the Builder frontend's shared state and integration boundaries.                                  |
| `../xray-mini-app-template-react/app/{integrations,shared,store,theme,types,utils}` and `app/root.tsx` | `LOCAL` | Yes      | Defines the reference preferences, effective-settings, routing, theme, type, and utility layout.                          |
| Human request to npm-link `@xray-network/xray-js` and replace direct legacy dependencies everywhere    | `LOCAL` | Yes      | Expands this non-terminal implementation to the Builder host bridge, configuration, dependency, and shared type surfaces. |

## Objective

Migrate xray-mini-app-builder from Yarn to npm and align its shared frontend structure with the React mini-app template while preserving Builder-specific project and bridge behavior.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                    | Compatibility                                                                                                                                                                | Local owner                                                               | Validation                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `C01`     | Declare npm as the package manager and convert package scripts from Yarn to npm.                                                                                                                                               | Preserve the behavior and ordering of development, build, deployment, and verification commands.                                                                             | `package.json`                                                            | Inspect scripts and run the repository completion commands through npm.                                                                                        |
| `C02`     | Generate `package-lock.json` and remove `yarn.lock`.                                                                                                                                                                           | Resolve the declared dependency ranges without changing application source.                                                                                                  | Root lockfiles                                                            | Run npm lockfile installation and verify no Yarn lockfile remains.                                                                                             |
| `C03`     | Validate the npm-managed application and final package-manager boundary.                                                                                                                                                       | Do not alter application behavior or introduce another package manager.                                                                                                      | Repository                                                                | Run typecheck/build; run `git diff --check`.                                                                                                                   |
| `C04`     | Align standalone preferences, effective bridge settings, routing, theme state, app types, and utility ownership with the template structure and local `xray-js` runtime exports.                                               | Preserve the existing persistence key, event-log preference, project store, and nested mini-app bridge behavior; connected host values must not overwrite local preferences. | Manifest/lockfile and `app/{integrations,shared,store,theme,types,utils}` | Typecheck/build and legacy app-store/theme-sync scan.                                                                                                          |
| `C05`     | Resolve `@xray-network/xray-js` from the sibling runtime as the sole public bridge/Cardano facade, remove the direct mini-app SDK dependency, and expose Cardano types/configuration without legacy duplication or CW3 naming. | Preserve Builder and its nested preview-host bridge behavior; the runtime dependency must remain portable as a sibling `file:` declaration.                                  | Manifest, lockfile, integrations, config, shared types                    | Inspect npm resolution/symlink, compile public bridge/Cardano subpaths, typecheck/build, and scan active files for direct legacy dependencies and terminology. |

## Implementation steps

1. Update the package-manager declaration and script invocations.
2. Reconcile dependencies into a root npm lockfile and remove the Yarn lockfile.
3. Run the npm-native completion commands and scan for stale Yarn references.
4. Record actual outcomes and move this implementation to `REVIEW`.
5. Replace the mixed app/theme store and synchronization component with template-aligned preferences and effective SDK settings while retaining feature stores and bridge modules.
6. Link the sibling XRAY JavaScript runtime, rename the Cardano type namespace, refresh npm metadata, and repeat validation.

## Validation

- `npm install --package-lock-only --ignore-scripts`
- `npm run typecheck`
- `npm run build`
- Confirm `package-lock.json` exists and `yarn.lock` does not.
- Confirm active repository-owned files contain no Yarn commands or package-manager guidance.
- `git diff --check`
- Confirm `store/app` and `shared/theme/ThemePreferenceSync` no longer own shared theme state.
- Confirm the exact sibling link and public bridge/Cardano exports resolve and active files contain no direct mini-app SDK, legacy package/provider, duplicate Cardano constants, or CW3 terminology.

## Compatibility and human review

The application remains a single React Router project with the same dependency ranges and runtime
behavior. Review the npm lockfile resolution and the intentional removal of Yarn support.

## Completion criteria

- npm is declared and all package scripts use npm.
- A root npm lockfile exists and no Yarn lockfile or active Yarn instruction remains.
- Required npm validation is recorded honestly.
- Builder-specific project and bridge behavior remains while shared frontend boundaries match the template.
- Cardano types resolve from the sibling XRAY runtime without legacy terminology.

## Out of scope

Dependency upgrades beyond lockfile resolution, page redesign, deployment, changes to the nested
mini-app bridge protocol, and support for pnpm or Yarn.

## Blockers

None.
