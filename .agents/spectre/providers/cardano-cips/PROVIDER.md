# Cardano CIPs provider

Provider: cardano-cips

## Purpose and authority

The official CIP repository supplies proposal specifications, status, schemas and vectors for focused Cardano interoperability. Each captured proposal must be interpreted using its own status and authority at the pinned commit.

This unversioned guide explains the provider and update workflow. Each numbered snapshot owns
its frozen specification and evidence; editing this guide never changes an existing snapshot.

## Sources and tracking

| Source | Official repository | Followed ref/policy | License guidance |
| --- | --- | --- | --- |
| Primary | [cardano-foundation/CIPs](https://github.com/cardano-foundation/CIPs) | refs/heads/master | Inspect each selected CIP frontmatter/copyright and repository license; pin any supplemental license text. |

Tracking is live and human-triggered. Resolve full immutable source identities on each requested
capture. No scheduling or GitHub Actions are involved. The snapshot specification records exact
selection, mappings, formats, corpus counts, integrity checks and licensing before publication.
Consult the previous snapshot’s rules as historical context, then independently enumerate the new
selection. Do not inherit old counts or silently broaden coverage when upstream paths change.

## Evidence domains and boundaries

Encoding and key/address formats, asset fingerprints and labels, governance identifiers and derivation, transaction diagnostics, and Plutus blueprints. Selected proposals do not authorize a generic registry, remote schema resolution, device support claims or execution of reference implementations.

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
| Plutus blueprint schemas and local references | `plutus/src/blueprint/index.ts` | `plutus/test/blueprint.test.mjs` |
| Focused encoding, asset and governance standards | `cip/src/` | `cip/test/` |

Use focused package checks and `npm --prefix libs/typescript run check` for consumer changes.

For a future CIP-57 adoption, capture the selected CIP-0057 README and schemas before treating
new upstream behavior as normative. Compare generic, tuple and qualified definition names,
escaped references and non-identity titles against the existing blueprint implementation and
local regression coverage. Map remaining verified gaps to the blueprint owner/tests above.
Preserve local-only resolution and resource bounds; a naming parser or remote schema resolver
is not implied. No implementation plan or future capture ID is reserved by this guidance.
