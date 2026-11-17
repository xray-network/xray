# cardano-multiplatform-lib capture 0001 summary

Provider: cardano-multiplatform-lib
Capture: 0001
Snapshot: SNAPSHOT.md
Previous-Capture: NONE

## Summary

Baseline capture; no previous capture exists. This summary was extracted on 2026-11-17 from the
advisory sections of [SNAPSHOT.md](SNAPSHOT.md), which predates separate capture summaries; it adds
no new findings. SNAPSHOT.md remains the sole authority for specification, inventories and counts.

- 38 selected CDDL files below `artifacts/specs/`.
- Three CML license files below `artifacts/legal/`.
- Six genesis JSON vectors and 86 historical block vectors below
  `artifacts/test-vectors/`.
- Byte-exact upstream provenance plus deterministic manifest, provenance, license, README, and
  Git-attributes control files.

The 92 vectors retain their original bytes and expected outcomes. The manifest records source
paths, repository paths, sizes, SHA-256 values, storage forms, era metadata, and expected results.
Dolos is pinned to `ea7960a1c2e56c523fec7c4bab75f390ee443514`; Pallas is pinned to
`a7b5a86e3922ea46723e7959118293232db7bf3a`.

The captured CDDL is a frozen comparison source. The vectors provide historical byte-preservation
and decoding evidence. They are not generated source and do not prescribe a library's public API
or language representation.

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
| CIP-36 metadata and delegation behavior; [semantic evidence](SNAPSHOT.md#semantic-evidence) | TypeScript: `libs/typescript/packages/cip/src/cip36/metadata.ts` | `libs/typescript/packages/cip/test/cip36.test.mjs` | No implementation change from this migration. Compare a separately captured update before planning behavior changes. |
| Transactions, collections, witnesses and redeemer positions; [semantic evidence](SNAPSHOT.md#semantic-evidence) | TypeScript: `libs/typescript/packages/chain/src/builder/transaction.ts` | `libs/typescript/packages/chain/test/builders.test.mjs` | No implementation change from this migration. Compare a separately captured update before planning behavior changes. |

Behavioral evidence is language-neutral. C++ is an unmaintained, opt-in consumer.

## Exclusions and unresolved questions

Reference-only CDDL outside the selected baseline, Rust source, Rust tests, unrelated test data,
build configuration, Git metadata, Pallas `u5c*` vectors, message signing, and UPLC evaluation are
excluded.

No fresh upstream completeness or delta audit was performed for this metadata migration.
The inventory verifies stored bytes; original capture claims are retained as historical claims.
Any future update must independently enumerate its pinned sources and resolve semantic mappings.
