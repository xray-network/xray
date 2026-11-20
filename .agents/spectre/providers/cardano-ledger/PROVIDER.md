# Cardano Ledger provider

Provider: cardano-ledger

## Purpose and authority

Official Cardano Ledger supplies era-specific wire grammar and ledger authority. CML is a separate compatibility comparison source. Plutus language and phase-two integration evidence is coordinated through the UPLC provider.

This unversioned guide explains the provider and update workflow. Each numbered snapshot owns
its frozen specification and evidence; editing this guide never changes an existing snapshot.

## Sources and tracking

| Source | Official repository | Followed ref/policy | License guidance |
| --- | --- | --- | --- |
| Primary | [IntersectMBO/cardano-ledger](https://github.com/IntersectMBO/cardano-ledger) | refs/heads/master | Inspect Ledger LICENSE and NOTICE at the resolved commit. |

Tracking is live and human-triggered. Resolve full immutable source identities on each requested
capture. No scheduling or GitHub Actions are involved. The snapshot specification records exact
selection, mappings, formats, corpus counts, integrity checks and licensing before publication.
Consult the previous snapshot’s rules as historical context, then independently enumerate the new
selection. Do not inherit old counts or silently broaden coverage when upstream paths change.

## Evidence domains and boundaries

Byron through Conway CDDL: choices, indexes, tags, bounds, optionality and container encoding. Preserve historical-era and lossless-CBOR behavior. Unresolved grammar mappings block consumer planning. Dijkstra and broader ledger source coverage need explicit scope decisions; CDDL alone is not runtime conformance proof.

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
| Era-specific wire formats and historical compatibility | `chain/src/` | `chain/test/` |

Use focused package checks and `npm --prefix libs/typescript run check` for consumer changes.
