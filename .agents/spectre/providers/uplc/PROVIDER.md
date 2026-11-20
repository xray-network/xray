# Official Plutus UPLC provider

Provider: uplc

## Purpose and authority

Official Plutus defines UPLC language, Flat encoding, CEK evaluation, builtins and costs. Official Cardano Ledger independently defines transaction script discovery, contexts and execution-unit estimation. Other implementations are comparison material only.

This unversioned guide explains the provider and update workflow. Each numbered snapshot owns
its frozen specification and evidence; editing this guide never changes an existing snapshot.

## Sources and tracking

| Source | Official repository | Followed ref/policy | License guidance |
| --- | --- | --- | --- |
| Primary | [IntersectMBO/plutus](https://github.com/IntersectMBO/plutus) | Highest stable release tag matching four numeric components, ordered numerically | Inspect Plutus license notices at the resolved release. |
| Ledger integration | [IntersectMBO/cardano-ledger](https://github.com/IntersectMBO/cardano-ledger) | refs/heads/master, resolved independently | Inspect Ledger LICENSE and NOTICE at its own resolved commit. |

Tracking is live and human-triggered. Resolve full immutable source identities on each requested
capture. No scheduling or GitHub Actions are involved. The snapshot specification records exact
selection, mappings, formats, corpus counts, integrity checks and licensing before publication.
Consult the previous snapshot’s rules as historical context, then independently enumerate the new
selection. Do not inherit old counts or silently broaden coverage when upstream paths change.

## Evidence domains and boundaries

Language/runtime sources, cost models, protocol availability, the complete selected conformance corpus, and Alonzo/Babbage/Conway integration. Maintained support is UPLC 1.0/1.1 and protocols 5–11; V4, protocol 12 and Dijkstra require separate scope decisions. Capture evidence for unsupported cases without treating it as authorization to implement new semantics.

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
| UPLC codecs, evaluation and costs | `plutus/src/uplc/` | `plutus/test/conformance.test.mjs` |
| Script discovery and transaction contexts | `plutus/src/ledger/` | `plutus/test/ledger.test.mjs` |

Use focused package checks and `npm --prefix libs/typescript run check` for consumer changes.

Use the [0002 findings](0002/CAPTURE.md) for release and Ledger comparison, keeping the original
corpus coverage. In conformance.test.mjs, pin the exact corpus and account for each text/Flat case
as executed or outside supported availability with an exact captured rule and reason. Do not infer
exclusions from failures, loosen counts, or conflate parser and evaluator failures. Report old/new
results separately; no release-compatibility claim follows from capture alone.

Map demonstrated codec/evaluator/cost differences to the existing flat.ts, text.ts, machine.ts,
cost-model.ts and cost-model-data.ts owners. Establish expected behavior and classify unexpected
conformance failures during planning, then create bounded instructions for verified differences.
Plutus V4, protocol 12, Dijkstra and future-gated MultiIndexArray/Policies/AssetCount remain outside
the maintained scope. Source presence does not establish protocol availability.

For phase-two comparison, evaluate.ts owns script discovery/resolution and protocol-aware decoding;
context.ts owns datum lookup, V1/V2 arguments, V3 ScriptInfo and redeemer-purpose/context construction.
Use ledger.test.mjs and api.test.mjs. Cover Alonzo 5–6, Babbage 7–8 and Conway 9–11; witness/reference
scripts; missing, inline and hashed datums; spending/non-spending purposes; redeemer ordering;
missing active-language costs; independent maximum budgets; and CPU/memory versus ledger ExUnits
order. Preserve hashing of original transaction bytes and nominal chain ownership. Distinguish
Haskell refactors/future-era extensions from observable maintained behavior. Each proposed change
needs an exact captured rule, owner, expected output/error, compatibility decision and focused test;
if no observable difference remains, recommend no implementation change.
