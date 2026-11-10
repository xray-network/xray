# xray-mini-app-builder implementation 0006 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-builder/0006
Created: 20260811T093220Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-builder/0005
Provider-Evidence: NONE

## Objective

Adopt direct platform bridge module namespace imports in the nested host.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace named client/host wrapper imports with namespace imports. | Coordinated pre-release change. | Builder routing and preview host | Typecheck and build. |

## Validation

- `npm run typecheck`
- `npm run build`
