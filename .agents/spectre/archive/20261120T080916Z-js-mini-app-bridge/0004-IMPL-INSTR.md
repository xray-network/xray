# JS Mini App Bridge implementation 0004 instruction

Implementation-Version: v1
Implementation-ID: js-mini-app-bridge/0004
Target-Path: ./js/packages/mini-app-bridge/
Created: 20260811T093220Z
Evidence-Mode: LOCAL
Depends-On: ./0003-IMPL-RESULT.md
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Remove redundant flat bridge entrypoint shims and make README bridge guidance blockchain-neutral. |
| Bridge/runtime package exports and active consumers | `LOCAL` | Yes | Preserve public subpaths while exposing their modules directly. |

## Provider pins

NONE

## Objective

Make each bridge subpath the module namespace itself and keep chain-neutral documentation at the top level.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Point client/host/Cardano/CIP-30/React/testing exports directly at their nested implementations and remove flat shims. | Consumers switch from named wrapper imports to module namespace imports. | Bridge package and runtime facade | Full check. |
| C02 | Rewrite README bridge guidance around neutral platform/transport concepts, with Cardano shown only as one adapter example. | No compatibility layer. | README | Review and format check. |
| C03 | Migrate all active mini-app consumers. | Coordinated pre-release break. | Active consumers | Typecheck and build. |

## Implementation steps

Not recorded in the original instruction.

## Validation

- `npm run check`
- Active consumer typechecks/builds

## Compatibility and human review

Not recorded in the original instruction.

## Completion criteria

No redundant flat bridge source shims remain, public subpaths resolve, documentation is blockchain-neutral, and active consumers validate.

## Out of scope

Changing protocol behavior or adding another blockchain adapter.

## Blockers

None.
