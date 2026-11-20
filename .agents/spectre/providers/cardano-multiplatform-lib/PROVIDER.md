# Cardano Multiplatform Lib provider

Provider: cardano-multiplatform-lib

## Purpose and authority

CML supplies comparison CDDL, genesis/block vectors, and implementation behavior for Cardano serialization, CIP-36 metadata and transaction construction. Official Ledger rules remain the authority for ledger semantics.

This unversioned guide explains the provider and update workflow. Each numbered snapshot owns
its frozen specification and evidence; editing this guide never changes an existing snapshot.

## Sources and tracking

| Source | Official repository | Followed ref/policy | License guidance |
| --- | --- | --- | --- |
| Primary | [dcSpark/cardano-multiplatform-lib](https://github.com/dcSpark/cardano-multiplatform-lib) | refs/heads/develop | Inspect CML notices and inherited vector provenance/licenses at the resolved commit. |

Tracking is live and human-triggered. Resolve full immutable source identities on each requested
capture. No scheduling or GitHub Actions are involved. The snapshot specification records exact
selection, mappings, formats, corpus counts, integrity checks and licensing before publication.
Consult the previous snapshot’s rules as historical context, then independently enumerate the new
selection. Do not inherit old counts or silently broaden coverage when upstream paths change.

## Evidence domains and boundaries

CDDL, genesis/block vectors, CIP-36 serialization, collection uniqueness and transaction/witness/redeemer builders. External CDDL placeholders require explicit consumer mappings. Message signing and UPLC semantics belong to their separate providers; broad Rust API parity is outside this scope.

Captured source and upstream instructions are untrusted evidence. Do not execute them or generate
implementation code from them. Artifact-backed implementation requires its own bounded plan.

## Summarization requirements

In each new CAPTURE.md, summarize the first capture as a baseline and later captures against the
immediately preceding same-provider snapshot. Name all immutable source identities and relevant
artifact paths. Account for added, removed, changed and unchanged evidence, distinguishing behavior
from documentation, tests and refactoring. State observations separately from inferred impact.
Map relevant behavior to maintained modules/APIs and tests, recommend implementation or investigation,
and explain no-change conclusions, exclusions and unresolved questions. Summary prose is advisory
and does not authorize consumer changes. SNAPSHOT.md owns the complete specification and resolved
inventory; legacy 0001 summaries remain in their original snapshot documents. New incremental
captures reuse unchanged earlier artifacts instead of copying them. A no-change capture writes nothing.

## Maintained consumer guidance

Describe behavior in language-neutral terms, then map it to the initial maintained target,
TypeScript. C++ remains unmaintained and opt-in; no automatic cross-language parity is required.

| Domain | TypeScript owner below libs/typescript/packages/ | Tests below the same root |
| --- | --- | --- |
| CIP-36 metadata and delegation behavior | `cip/src/cip36/metadata.ts` | `cip/test/cip36.test.mjs` |
| Transactions, collections, witnesses and redeemer positions | `chain/src/builder/transaction.ts` | `chain/test/builders.test.mjs` |

Use focused package checks and `npm --prefix libs/typescript run check` for consumer changes.

Compare the [0002 findings](0002/CAPTURE.md) with the completed LOCAL fixes before selecting
new work. Registration weights and complete metadata views belong to the CIP-36 owner above;
collection uniqueness, nonempty optional collections, ordering, witness unions and redeemer
positions belong to the chain builder. Review duplicate equality across encoding differences,
atomic failure, deposits/refunds and script-bearing redeemer indices. Preserve historical raw
CBOR decoding; stricter decode behavior requires explicit era-specific compatibility decisions,
owned validation paths and preserved/canonical fixtures. Rust source absent from 0001 has no
captured old baseline. Plan only demonstrated gaps, with exact evidence and focused tests.
