# JS Mini App Bridge implementation 0005 result

Result-Version: v1
Implementation-ID: js-mini-app-bridge/0005
Instruction: ./0005-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition | Implementation | Validation |
| --- | --- | --- | --- |
| C01 | `IMPLEMENTED` | The default injected connector key is now `xrayBridge`; tests and README reference `window.cardano.xrayBridge`. | Bridge typecheck, build, tests, and runtime build passed. |

## Outcome

Calling `installConnector()` exposes only the default `window.cardano.xrayBridge` connector.

## Inputs consumed

Not recorded in the original result.

## Project changes

Not recorded in the original result.

## Exported change contract

Not recorded in the original result.

## Validation

- Bridge typecheck/build/tests: PASS.
- Runtime build: PASS.
- `git diff --check`: PASS.

## Deviations from instruction

None.

## Remaining human review

Not recorded in the original result.

## Reproducibility

Not recorded in the original result.
