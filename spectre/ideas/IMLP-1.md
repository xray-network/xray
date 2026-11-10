# IMLP 1 — Recall project decisions

Status: Deferred idea

## Problem

SPECTRE preserves plans, implementation results, human decisions, and captured provider evidence, but finding the reason behind an older decision can require reading several records.

## Idea

Add a read-only recall operation that answers a question about past work with links to the relevant accepted results, validation, decision proof, and pinned provider evidence. For example, `/spectre recall api authentication` could explain why an API behavior exists and identify the records supporting the answer.

The existing SPECTRE records remain authoritative. Recall creates no new lifecycle state and does not change product source or records. A later extension could generate a browsable topic index from those records, similar to navigation in an Obsidian vault.

## To decide later

- How to find relevant records across active and archived history.
- How to distinguish accepted decisions from planned, rejected, or superseded work.
- Whether recall needs a new command or can be provided through an existing read-only interface.
- Whether a generated topic index is useful after recall works.

This is a proposal for later discussion, not a change to the SPECTRE protocol.
