# EMURGO Message Signing capture 0001 summary

Provider-Capture-Version: v1
Provider: message-signing
Capture: 0001
Snapshot: SNAPSHOT.md
Previous-Capture: NONE

## Summary

Baseline capture of EMURGO Message Signing 1.1.0: eleven byte-exact upstream files (README, Rust
manifest, eight selected Rust source and example files, MIT license) and `artifacts/SHA256SUMS`.
The evidence covers COSE Sign and Sign1 models, headers, protected-header bytes, signature
structures, public COSE keys, detached payloads, external AAD, Blake2b-224 payload hashing and
`cms_` encoding.

This summary was added on 2026-11-11 during the migration to SPECTRE 1.0.0. It restates
[SNAPSHOT.md](SNAPSHOT.md) and adds no new upstream observation. It is advisory, not a specification.

## Relevant changes

| Finding | Previous/current numbered artifact references | Observation and significance |
| --- | --- | --- |
| Baseline | [0001 artifact inventory](SNAPSHOT.md#verified-artifact-inventory) | Initial same-provider capture; no predecessor exists. |

## Consumer impact and recommended work

| Finding | Maintained target and modules/APIs | Tests and validation | Recommendation and evidence |
| --- | --- | --- | --- |
| CIP-8 signing and COSE serialization | `cardano-lib-typescript`: `cardano-lib/libs/typescript/packages/cip/src/cip8/` | `cardano-lib/libs/typescript/packages/cip/test/cip8.test.mjs` | no-change: compare a separately captured update before planning behavior changes |

Behavioral evidence is language-neutral. Consumers the guide does not list as maintained remain opt-in.

## Exclusions and unresolved questions

Encryption, recipients, private COSE key serialization, submodules, generated bindings, WASM,
ASM.js, native code, build and release tooling, and upstream runtime dependencies are excluded. See [SNAPSHOT.md](SNAPSHOT.md#unresolved-questions) for the questions recorded at
capture time; no fresh upstream completeness or delta audit was performed for this summary.
