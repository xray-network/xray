# uplc capture 0001 summary

Provider: uplc
Capture: 0001
Snapshot: SNAPSHOT.md
Previous-Capture: NONE

## Summary

Baseline capture; no previous capture exists. This summary was extracted on 2026-11-17 from the
advisory sections of [SNAPSHOT.md](SNAPSHOT.md), which predates separate capture summaries; it adds
no new findings. SNAPSHOT.md remains the sole authority for specification, inventories and counts.

- 113 byte-exact Plutus metadata, conformance, Plutus Core, and Plutus Ledger API files below
  `artifacts/plutus/`.
- 24 byte-exact Cardano Ledger phase-two and context files below
  `artifacts/cardano-ledger/`.
- A deterministic 3,013-entry conformance corpus in `artifacts/conformance/corpus.json`.
- Snapshot-local corpus documentation and `artifacts/SHA256SUMS`.

The final inventory is 140 regular files. The checksum inventory covers every artifact other than
itself.

The evidence covers UPLC 1.0.0 and 1.1.0, Flat encoding, CEK evaluation, builtin tags 0 through
100, cost models, protocol/language availability, Plutus V1/V2/V3 contexts, and raw transaction
valuation. It is evidence rather than runtime code.

## Relevant changes

| Change | Evidence | Observed significance |
| --- | --- | --- |
| Baseline | [Captured scope](SNAPSHOT.md#captured-scope) and [artifact inventory](SNAPSHOT.md#verified-artifact-inventory) | Initial same-provider snapshot; no previous snapshot exists. Original comparison-source observations remain above. |
| Metadata conversion | [Migration provenance](SNAPSHOT.md#migration-provenance) | Capture rules are now self-contained; artifact bytes and source identities did not change. No new upstream comparison was performed. |

## Consumer impact and recommended work

Migration-time guidance, not a newly performed upstream audit. Existing captured semantics and
consumer boundaries remain authoritative; this metadata conversion requires no runtime change.

| Evidence | Maintained target and owners | Validation | Recommendation |
| --- | --- | --- | --- |
| UPLC codecs, evaluation and costs; [semantic evidence](SNAPSHOT.md#semantic-evidence) | TypeScript: `libs/typescript/packages/plutus/src/uplc/` | `libs/typescript/packages/plutus/test/conformance.test.mjs` | No implementation change from this migration. Compare a separately captured update before planning behavior changes. |
| Script discovery and transaction contexts; [semantic evidence](SNAPSHOT.md#semantic-evidence) | TypeScript: `libs/typescript/packages/plutus/src/ledger/` | `libs/typescript/packages/plutus/test/ledger.test.mjs` | No implementation change from this migration. Compare a separately captured update before planning behavior changes. |

Behavioral evidence is language-neutral. C++ is an unmaintained, opt-in consumer.

## Exclusions and unresolved questions

PlutusV4, protocol 12, Dijkstra, compiler and optimizer functionality, full phase-one validation,
third-party normative sources, generated bindings, native code, WASM, and upstream execution are
excluded.

No fresh upstream completeness or delta audit was performed for this metadata migration.
The inventory verifies stored bytes; original capture claims are retained as historical claims.
Any future update must independently enumerate its pinned sources and resolve semantic mappings.
