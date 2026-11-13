# Cardano CIPs capture 0001 summary

Provider-Capture-Version: v1
Provider: cardano-cips
Capture: 0001
Snapshot: SNAPSHOT.md
Previous-Capture: NONE

## Summary

Baseline capture of 27 byte-exact files from the official Cardano CIPs repository at commit
`b491a839708eb0296597008e7b6b093eda5e3363`: the CIP-0005, 0014, 0016, 0019, 0021, 0057, 0067, 0068,
0105, 0129 and 1852 specifications with their selected grammars, schemas, registries and vectors, the
CC-BY-4.0 license text, one supplementary Apache-2.0 license text and `artifacts/SHA256SUMS`.

This summary was added on 2026-11-11 during the migration to SPECTRE 1.0.0. It restates
[SNAPSHOT.md](SNAPSHOT.md) and adds no new upstream observation. It is advisory, not a specification.

## Relevant changes

| Finding | Previous/current numbered artifact references | Observation and significance |
| --- | --- | --- |
| Baseline | [0001 artifact inventory](SNAPSHOT.md#verified-artifact-inventory) | Initial same-provider capture; no predecessor exists. |

## Consumer impact and recommended work

| Finding | Maintained target and modules/APIs | Tests and validation | Recommendation and evidence |
| --- | --- | --- | --- |
| Plutus blueprint schemas and local references | `cardano-lib-typescript`: `cardano-lib/libs/typescript/packages/plutus/src/blueprint/index.ts` | `cardano-lib/libs/typescript/packages/plutus/test/blueprint.test.mjs` | no-change: compare a separately captured update before planning behavior changes |
| Focused encoding, asset and governance standards | `cardano-lib-typescript`: `cardano-lib/libs/typescript/packages/cip/src/` | `cardano-lib/libs/typescript/packages/cip/test/` | no-change: compare a separately captured update before planning behavior changes |

Behavioral evidence is language-neutral. Consumers the guide does not list as maintained remain opt-in.

## Exclusions and unresolved questions

Unselected CIPs and CPSs, redirect stubs, CIP-0068 extension and reference implementations, JSON
Schema engines, remote schema resolution, device transports and firmware profiles, wallet
injection, mnemonic dictionaries, repository validators, build automation and linked external
source are excluded. See [SNAPSHOT.md](SNAPSHOT.md#unresolved-questions) for the questions recorded at
capture time; no fresh upstream completeness or delta audit was performed for this summary.
