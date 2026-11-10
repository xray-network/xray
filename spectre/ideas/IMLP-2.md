# IMLP 2 — Capture other projects as providers

Status: Proposed

## Problem

SPECTRE records can link to files outside their own installation. Before the XRAY monorepo merge, the `js` record `cardano/0001` linked to `../xray-cardano-lib/.xray/updates/...`: a sibling checkout that existed only on the machine where the record was written. Links like this break when a project is renamed, merged, or removed, and they make one project's records depend on another project's internal history.

## Idea

A record may reference only files inside its own installation (the folder that holds `.agents/spectre/`). Validation already rejects paths that escape it; the standard should say so explicitly and drop the provider-pin option for evidence owned by another repository, so every pin is `SELF`.

Anything a project uses from another project, including a sibling in the same monorepo, is captured as a provider: a numbered, hash-pinned snapshot in the using project's `providers/`, exactly like an upstream source such as `cardano-ledger` or `plutus`.

The capture holds the other project's published interface (README, exported types, package version or commit), not its SPECTRE records. A plan that relies on another project names the provider capture it uses, instead of requiring another project's result to be `ACCEPTED`. Each project still reviews its own work.

## To decide later

- How historical records with cross-project links are treated, such as `js` `cardano/0001`: a stated exception for legacy references in archived records, or leaving those records unarchived.
- Whether a provider may name a sibling path in the same Git repository as its source (with a pinned commit), or must use a published package or tag.
- Whether the documentation checker should reject cross-installation links in the published protocol examples.

This is a proposal for later discussion, not a change to the SPECTRE protocol.
