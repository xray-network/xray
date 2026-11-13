# Cardano Ledger capture 0001 summary

Provider-Capture-Version: v1
Provider: cardano-ledger
Capture: 0001
Snapshot: SNAPSHOT.md
Previous-Capture: NONE

## Summary

Baseline capture of the byte-exact Byron, Shelley, Allegra, Mary, Alonzo, Babbage and Conway
CDDL plus the upstream Apache-2.0 license and notice, nine files from commit
`a624de4c8db7286a6c065da149679ea55f7d5629`.

This summary was added on 2026-11-11 during the migration to SPECTRE 1.0.0. It restates
[SNAPSHOT.md](SNAPSHOT.md) and adds no new upstream observation. It is advisory, not a specification.

## Relevant changes

| Finding | Previous/current numbered artifact references | Observation and significance |
| --- | --- | --- |
| Baseline | [0001 artifact inventory](SNAPSHOT.md#verified-artifact-inventory) | Initial same-provider capture; no predecessor exists. |

## Consumer impact and recommended work

| Finding | Maintained target and modules/APIs | Tests and validation | Recommendation and evidence |
| --- | --- | --- | --- |
| Era-specific wire formats and historical compatibility | `cardano-lib-typescript`: `cardano-lib/libs/typescript/packages/chain/src/` | `cardano-lib/libs/typescript/packages/chain/test/` | no-change: compare a separately captured update before planning behavior changes |

Behavioral evidence is language-neutral. Consumers the guide does not list as maintained remain opt-in.

## Exclusions and unresolved questions

Dijkstra, general Cardano Ledger source, generated Haskell, upstream tests, build configuration,
Git metadata, message signing, and UPLC language and evaluator behavior are excluded. See [SNAPSHOT.md](SNAPSHOT.md#unresolved-questions) for the questions recorded at
capture time; no fresh upstream completeness or delta audit was performed for this summary.
