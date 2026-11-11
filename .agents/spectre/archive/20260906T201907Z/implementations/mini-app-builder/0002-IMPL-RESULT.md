# xray-mini-app-builder implementation 0002 result

Result-Version: v1
Implementation-ID: mini-app-builder/0002
Instruction: ./0002-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition   | Implementation                                                                                                                                                                                                                                                                | Validation                                                                                 |
| --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `C01`     | `IMPLEMENTED` | Declared `npm@10.8.2`, converted scripts to npm, and pinned the existing React Router family to one compatible version.                                                                                                                                                       | Package scripts inspected; typecheck and build passed.                                     |
| `C02`     | `IMPLEMENTED` | Generated `package-lock.json` and removed `yarn.lock`.                                                                                                                                                                                                                        | npm lockfile installation passed; lockfile boundary scan passed.                           |
| `C03`     | `IMPLEMENTED` | Validated the npm-managed project and scanned repository-owned files.                                                                                                                                                                                                         | `npm run typecheck`, `npm run build`, and `git diff --check` passed.                       |
| `C04`     | `IMPLEMENTED` | Replaced the mixed app/theme store and theme-sync component with template-aligned standalone preferences and effective settings, linked the local `xray-js` runtime exports, moved app types to `types/app`, and retained the feature-owned projects store and nested bridge. | Typecheck, production build, and legacy app-store/theme-sync scan passed.                  |
| `C05`     | `IMPLEMENTED` | npm-linked the sibling `@xray-network/xray-js@4.0.0` runtime, routed external host bridge hooks/types and Cardano types/configuration through its public subpaths, consolidated app-local adapters and the Builder-owned preview bridge under `mini-app-builder/app/integrations/xray-js`, and removed the direct mini-app SDK dependency. | Exact symlink inspection, integration-tree/dependency/source scans, typecheck, and production build passed. |

## Outcome

xray-mini-app-builder now uses npm exclusively, follows the React template's shared frontend boundaries, and resolves external host communication plus Cardano types/configuration through the locally linked XRAY JavaScript runtime.

## Inputs consumed

The human package-manager request, `package.json`, and the prior `yarn.lock` resolution.

## Project changes

Updated `package.json`, added `package-lock.json`, removed `yarn.lock`, and aligned shared frontend modules while retaining Builder-specific stores and bridge code.

## Exported change contract

| Change ID | Semantic change                                                                                                                 | Compatibility                                                                                                         | Downstream action                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `C01`     | npm 10 is the declared package manager and scripts no longer invoke Yarn.                                                       | Existing script intent is preserved.                                                                                  | Use npm commands in automation and local development.                           |
| `C02`     | `package-lock.json` is the sole dependency lockfile.                                                                            | React Router packages are pinned consistently at 7.8.2 and react-copy-to-clipboard uses its compatible patch release. | Use `npm install` or `npm ci`.                                                  |
| `C03`     | npm-native typecheck and production build complete successfully.                                                                | Product behavior is unchanged.                                                                                        | Review the lockfile and package declaration.                                    |
| `C04`     | `store/preferences` owns standalone values and event-log preference while xray-js bridge hooks resolve connected host settings. | The storage key, projects store, and nested mini-app bridge remain compatible.                                        | Keep feature stores separate and add new host-owned state through bridge hooks. |
| `C05`     | xray-js public subpaths own external host communication and shared Cardano types/configuration.                                 | Builder functionality, nested preview-host behavior, and sibling-source development remain unchanged.                 | Build/link the sibling runtime and retain the portable `file:` manifest path.   |

## Validation

- `npm install --package-lock-only --ignore-scripts` — passed.
- `npm run typecheck` — passed.
- `npm run build` — passed.
- Lockfile and active Yarn-reference scans — passed.
- `git diff --check` — passed.
- Legacy `store/app` and theme-sync scans — passed.
- Sibling npm-link inspection plus public bridge/Cardano dependency/source scans — passed.

## Deviations from instruction

The React Router package family was pinned to 7.8.2 and react-copy-to-clipboard moved from 5.1.0 to
5.1.1 to make npm peer and package resolution deterministic. The human later expanded this same
non-terminal implementation to align the Builder's shared frontend structure with the React template;
feature-owned project and bridge modules were intentionally retained.
The system-owned global npm prefix rejected direct linking, so the package was registered and linked through a temporary writable npm prefix while the manifest kept its portable sibling `file:` path. An interrupted npm reify also required a normal install to restore `jsesc`; final typecheck and build pass.

## Remaining human review

Review the npm lockfile resolution, local runtime link, compatibility pins, standalone/host theme behavior, and nested bridge flow before acceptance.

## Reproducibility

Build and npm-link `../xray-js/packages/runtime`, install with npm, run `npm run typecheck && npm run build`, then scan `mini-app-builder/app/` for legacy stores, theme synchronization, package/provider names, and CW3 terminology.
