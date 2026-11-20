# Mini App Builder implementation 0017 result

Result-Version: v1
Implementation-ID: mini-app-builder/0017
Instruction: ./0017-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition | Implementation | Validation |
| --- | --- | --- | --- |
| C01 | IMPLEMENTED | Stable local UUID records, transactional persistence, version-1 recovery backup, immutable numeric aliases, and hydration/error gates. | Unit migration/storage failure coverage and browser migration, reload, edit, and deletion tests pass. |
| C02 | IMPLEMENTED | Local project creation/editing/removal, validated HTTP(S) URLs, and disabled In-browser choice. | Browser lifecycle, invalid input, URL edits, and stable-link checks pass. |
| C03 | IMPLEMENTED | UUID preview URLs and numeric redirects preserve app path/query/hash; route translation remains inside the selected project. | Unit route tests plus direct, host, app, keyboard, and browser-history navigation tests pass. |
| C04 | IMPLEMENTED | Existing three bridge scopes retain validation and correlation; expected origins/windows, expiry, capacity, and session cleanup are enforced. | Contract tests cover all scopes and rejected traffic; nested browser relay, pending requests during rerenders, reload, and project switching pass. |
| C05 | IMPLEMENTED | Separate load/SDK/host observations, correlated connection proof, timeout/recovery controls, and bounded responsive event diagnostics. | Reducer tests and nested/standalone browser tests cover confirmation, failure, timeout, recovery, session changes, pause/clear, and event limits. |
| C06 | PARTIAL | Local-preview permission attribute and troubleshooting are implemented; separate-origin fixtures cover allowed and blocked embedding. | Automated embedding checks pass. Real deployed HTTPS XRAY/local-server and browser permission acceptance remain unperformed. |
| C07 | IMPLEMENTED | Repository-owned Vitest/Playwright fixtures, non-mutating formatting command, and local-development/recovery documentation. | Formatting, typecheck, 44 unit/contract tests, 11 browser tests, production build, dependency inspection, and whitespace checks pass. |

## Outcome

Local development is implemented and ready for code review. Users register their own server URL,
retain stable project links through edits and deletion of other projects, and use the existing XRAY
SDK relay in a preview with honest connection diagnostics. The user starts and operates their own
editor, terminal, and server. In-browser development remains disabled.

The record enters REVIEW with the instruction's explicitly permitted real-host acceptance gap.
Fixture success does not establish deployed HTTPS host or browser local-network compatibility.
Implementation 0016 remains CANCELLED; this operation does not create or implement 0018.

## Inputs consumed

All declared LOCAL inputs were inspected:

- The human's local-development command, preservation requirement, and separation of future browser work.
- `AGENTS.md` and the existing `README.md` direct v1 SDK contract.
- `mini-app-builder/app/store/projects/index.ts`, `types.ts`, `selectors.ts`; `mini-app-builder/app/types/index.ts`; `mini-app-builder/app/config/index.ts`.
- `mini-app-builder/app/components/modals/CreateProject/index.tsx` and `mini-app-builder/app/components/pages/Home/index.tsx`.
- `mini-app-builder/app/routes.ts`, `mini-app-builder/app/routes/code.tsx`, and the Code page, event types, and EventLog component.
- `mini-app-builder/app/integrations/xray-js/miniAppBridge.ts`, `useEffectiveSettings.ts`,
  `mini-app-builder/app/shared/routing/HostRouteSync.tsx`, `NavigationProgress.tsx`,
  `mini-app-builder/app/store/preferences/index.ts`, and `mini-app-builder/app/root.tsx`.
- `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`,
  `react-router.config.ts`, `wrangler.jsonc`, `.prettierrc`, and `.prettierignore`.

The existing sibling SDK build/declarations were checked to verify the locked dependency and run
validation. Installed SPECTRE runtime modules/templates supplied workflow rules; the Browser
skill supplied environment diagnostics. No provider snapshot, derived implementation result,
template checkout, substitute SDK, or external implementation contract was introduced.

## Project changes

- `mini-app-builder/app/store/projects/{types,index,persistence,routes}.ts`: persisted schema version 2, UUIDs,
  validation, migration/recovery, stale-save protection, stable lookup, and route conversion.
- `mini-app-builder/app/root.tsx` and `mini-app-builder/app/components/common/ProjectStorageNotice/index.tsx`: explicit hydration
  and actionable storage errors/recovery notice.
- CreateProject and Home components: local creation, editing, cards, removal confirmation,
  stable links, and unavailable browser-development choice.
- `mini-app-builder/app/components/pages/Code/{index.tsx,session.ts,types.ts,EventLog/index.tsx}`:
  isolated preview sessions, status/recovery controls, route synchronization after document
  reload, screen-filling preview, keyboard event controls, and bounded transient diagnostics.
- `mini-app-builder/app/integrations/xray-js/miniAppBridge.ts`: expected-origin checks, bounded pending requests,
  timeout/reset cleanup, and correlated status-result notification, preserving existing envelopes.
- `mini-app-builder/tests/unit/{projects,bridge,session}.test.ts`, `mini-app-builder/tests/browser/local.spec.ts`,
  `mini-app-builder/tests/fixtures/{server.mjs,host.html,preview.html}`, `vitest.config.ts`, and
  `playwright.config.ts`: deterministic unit and nested-browser acceptance coverage.
- `package.json`, `package-lock.json`, `.gitignore`, and `README.md`: test tooling/commands,
  ignored generated reports, workflow and recovery documentation.
- This result and the 0017 ledger row in `SPECTRE.md` record implementation and review state.

## Exported change contract

| Change ID | Semantic change | Compatibility | Downstream action |
| --- | --- | --- | --- |
| C01 | Local project identity survives order changes and edits. | Existing valid entries, duplicates, and migration-time numeric links are preserved; backup precedes replacement. | Treat IDs as opaque; do not derive identity from list position. |
| C02 | Name and URL configure a user-operated local project. | Existing hosted URLs remain usable; removal affects only saved metadata. | Future environments must define their own project variant and lifecycle. |
| C03 | Project route and mini-app route are separate. | Deep paths, query strings, fragments, and numeric aliases retain their meaning. | Translate app routes beneath the selected stable project ID. |
| C04 | Relay traffic belongs to a bounded active preview session. | Existing platform, Cardano, and CIP-30 v1 methods and host authorization remain unchanged. | Use valid existing envelopes and unique outstanding request IDs. |
| C05 | Connection means an observed successful status round trip. | Loading, SDK activity, and upstream availability alone do not prove nested connectivity. | Request status through the existing SDK; treat the indicator as evidence, not continuous health. |
| C06 | Local embedding depends on the enclosing host and browser policy. | No global isolation headers or security bypass are introduced. | Complete actual HTTPS host/local-network acceptance before claiming browser support. |
| C07 | Validation is reproducible with owned fixtures and the locked SDK. | The SPA/deployment envelope and runtime dependency declarations are unchanged. | Keep the sibling SDK build available and run the documented checks. |

## Validation

Validated on 2026-09-07, macOS 26.5.2 arm64, Node 24.18.0 / npm 11.16.0,
Playwright 1.63.0 with Chromium 153.0.8010.12 (Playwright build 1243).

| Check | Actual result |
| --- | --- |
| `npm run format:check` | PASS; non-mutating source/config/test/README/0017-record formatting. |
| `npm run typecheck` | PASS; route generation and TypeScript. |
| `npm run test` | PASS; 44 tests across 3 files. |
| `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/xray-playwright-browsers npm run test:browser` | PASS; all 11 tests, final run 36.5 seconds. |
| `npm run build` | PASS; client build and SPA index prerender. |
| `git diff --check` | PASS. |
| Dependency/persistence inspection | Runtime declarations and both XRAY lock records match the baseline. Only test tooling is added; project serialization excludes SDK/account/session state. |
| Mobile visual inspection | Inspected the 390×844 screenshot; corrected preview height and added a greater-than-400px iframe-height assertion. Keyboard route submit, pause, clear, and drawer dismissal pass. |
| SPECTRE affected-record checks | Matching identity/mode/links, one disposition per C01–C07, unique active/archive sequence, and relevant archive hashes checked. |

Browser fixtures use HTTP `127.0.0.1:7211` (simulated parent), `:7210` (Builder), and `:7212`
(mini app). Both relevant fixture iframe boundaries delegate `local-network-access`; the negative
fixture uses CSP `frame-ancestors 'none'`. These are different origins but all loopback HTTP.
Tests use deterministic status/Cardano responses without real signing or wallets.

Earlier browser runs exposed test synchronization issues around iframe history, hidden event
controls, and drawer animation; these were corrected. A transient source-edit error affected an
intermediate run. Final runs pass. Browser assertions also cover iframe self-reload, project/URL
session changes, timeout recovery, malformed storage, and blocked embedding.

An initial sandboxed build failed on temporary loopback binding; the authorized unsandboxed build
passed. Dependency/browser downloads needed network access. The initial registry install could not
resolve the existing unpublished SDK declaration; installation temporarily selected the same local
sibling, after which the root declaration and original SDK lock entries were restored and verified.

## Deviations from instruction

Real deployed-host/manual permission acceptance was unavailable. The Browser runtime reported no
available browser session, so repository Playwright fixtures supplied browser automation. C06 is
marked PARTIAL for this evidence gap, as the instruction allows unavailable real-host scenarios to
remain explicit review work. No production host configuration was changed based on fixture results.

The explicit human preservation requirement takes precedence over the runtime's generic rule
against backward compatibility; version-1 migration and numeric aliases are intentional.

## Remaining human review

Exercise the actual deployed HTTPS XRAY → Builder → user-started local server chain. Record the
browser/version, OS, schemes, enclosing permission policy, and observed local-network prompts.
Verify status and routes, server stop/restart, permission refusal/recovery, reload, URL edit,
Builder reload, and stable links after removing another project. No supported production browser
matrix or real-wallet/signing result is claimed here.

Review migration/recovery on representative saved data and the local-project interface. Browser
runtime, terminal, package-script execution, AI CLIs, and template checkout remain future work.

## Reproducibility

Keep the checked-in SDK link to `../xray-js/packages/runtime` and its built dependencies available.
Install the declared development test tooling while preserving that link. Install Chromium with
`PLAYWRIGHT_BROWSERS_PATH=/private/tmp/xray-playwright-browsers npx playwright install chromium`,
then run the commands above. Ports 7210–7212 must be available; the test configuration can reuse
existing development/fixture servers outside CI. The environment reused the existing Builder dev
server and started/stopped its owned fixture server.

Generated traces/screenshots and build output are ignored. The mobile screenshot is generated at
`mini-app-builder/test-results/local-mobile-preview-suppo-2a241--routing-and-event-controls/mobile-preview.png`.
No deployment, commit, human acceptance, archive operation, or 0018 lifecycle operation was performed.
