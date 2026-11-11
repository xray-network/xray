# xray-mini-app-builder implementation 0017 instruction

Implementation-Version: v1
Implementation-ID: mini-app-builder/0017
Created: 20260907T081600Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                                                                                                                                                                  | Kind    | Required | Purpose                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| Current human instruction: "local development with project name and URL, stable project IDs, XRAY SDK relay, preview, routing, and connection status; preserve existing local projects."                                               | `LOCAL` | Yes      | Define the complete local development objective and preservation requirement.                                           |
| Human clarification in this conversation: local users create a project record and set a local URL; Builder supplies the XRAY SDK integration; in-browser development is a separate future implementation.                              | `LOCAL` | Yes      | Keep local source editing, command execution, and deployment on the user's existing tools.                              |
| `AGENTS.md`, `README.md`                                                                                                                                                                                                               | `LOCAL` | Yes      | Follow repository governance and the documented direct v1 bridge without a handshake or protocol advertisement.         |
| `mini-app-builder/app/store/projects/index.ts`, `mini-app-builder/app/store/projects/types.ts`, `mini-app-builder/app/store/projects/selectors.ts`, `mini-app-builder/app/types/index.ts`, `mini-app-builder/app/config/index.ts`                                                                                           | `LOCAL` | Yes      | Replace positional project identity and migrate the existing persisted project array under its current storage key.     |
| `mini-app-builder/app/components/modals/CreateProject/index.tsx`, `mini-app-builder/app/components/pages/Home/index.tsx`                                                                                                                                                 | `LOCAL` | Yes      | Own project creation, presentation, configuration editing, and removal.                                                 |
| `mini-app-builder/app/routes.ts`, `mini-app-builder/app/routes/code.tsx`, `mini-app-builder/app/components/pages/Code/index.tsx`, `mini-app-builder/app/components/pages/Code/types.ts`, `mini-app-builder/app/components/pages/Code/EventLog/index.tsx`                                                                    | `LOCAL` | Yes      | Own preview lifecycle, connection indicators, route controls, and session event diagnostics.                            |
| `mini-app-builder/app/integrations/xray-js/miniAppBridge.ts`, `mini-app-builder/app/integrations/xray-js/useEffectiveSettings.ts`, `mini-app-builder/app/shared/routing/HostRouteSync.tsx`, `mini-app-builder/app/shared/routing/NavigationProgress.tsx`, `mini-app-builder/app/store/preferences/index.ts`, `mini-app-builder/app/root.tsx` | `LOCAL` | Yes      | Preserve message validation, expected-window boundaries, host context, standalone preferences, and navigation behavior. |
| `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `react-router.config.ts`, `wrangler.jsonc`, `.prettierrc`, `.prettierignore`                                                                                   | `LOCAL` | Yes      | Own the SPA build, dependency resolution, formatting, and new automated test commands.                                  |

## Objective

Make local development an explicit, reliable Builder workflow: a user saves a project name and
development URL, runs the mini app using their existing local tools, and opens it inside Builder
to exercise the XRAY SDK relay, preview routes, and connection diagnostics. Preserve existing
saved projects and replace array-position identity with stable project IDs.

This plan covers the local portion of the human's replacement for cancelled implementation
`mini-app-builder/0016`. That cancelled instruction is historical context, not a dependency
or an implementation contract. Browser development will be planned separately.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Compatibility                                                                                                                                                                                                                                                                                                                                                                                                                                    | Local owner                                                                                                            | Validation                                                                                                                                                                                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C01       | Introduce persisted local projects with stable UUID `id`, trimmed `name`, `mode: "local"`, and `url`. Select, update, and remove projects by ID. Migrate the existing version-1 `{ name, url }[]` storage in place, preserving order and duplicate entries, assigning IDs once, and persisting a legacy index-to-ID alias map. Wait for hydration before resolving project routes.                                                                                                                                                            | Preserve the storage key and every valid existing project. Preserve original storage in a recovery backup before migration; if parsing or persistence fails, retain the original data and display a recoverable error instead of silently resetting it. Retain invalid entries in recovery data and explain how to repair them. Never regenerate already persisted IDs on reload. Do not persist host context or bridge/session state.           | Project types, store, selectors, persistence migration.                                                                | Unit tests cover empty/current/legacy storage, repeated hydration, duplicates, malformed entries, storage failure, and deletion stability. Browser tests prove migration and reload persistence.                                                                         |
| C02       | Make Local development explicit in project creation and project cards. Collect name and development URL, allow editing both without changing identity, and retain remove confirmation. Show In-browser development as disabled with a brief coming-later label. Explain that users start their own development server.                                                                                                                                                                                                                        | Accept HTTP and HTTPS, including localhost, loopback, LAN addresses, and existing hosted preview URLs. Reject other schemes and embedded URL credentials for new/edited records. Preserve path/query/hash components. Removing a record removes only Builder metadata and does not delete files or stop a server. Do not instantiate a browser workspace or runtime.                                                                             | CreateProject modal, Home page, local project configuration UI.                                                        | Component/browser tests cover valid and invalid input, stable IDs during edits, preserved hosted URLs, removal, keyboard use, and the unavailable browser option.                                                                                                        |
| C03       | Keep `/code/:id/*` as the project route, resolve UUIDs directly, and replace legacy numeric URLs with their migration-time UUID destination while retaining the mini-app route, query, and fragment. Preserve host and mini-app navigation in both directions without loops or doubled project prefixes. Keep the configured development URL as the iframe entry URL; SDK route events carry the app route.                                                                                                                                   | Numeric aliases are immutable migration mappings, never indexes into the current array. Missing/deleted aliases or UUIDs display Project not found; new projects never reuse numeric aliases. Historical links already shifted by deletions before migration cannot be reconstructed. Preserve SPA routing, direct deep links, browser back/forward, and the configured entry path.                                                              | Router, Code page, project lookup helpers, HostRouteSync.                                                              | Unit/browser tests cover deletion of an earlier project, removed targets, persisted aliases, base-path URLs, query/hash encoding, direct deep links, and host/preview/browser navigation without feedback loops.                                                         |
| C04       | Preserve the direct platform, Cardano, and CIP-30 v1 relay through a reusable preview boundary. Accept validated client messages only from the active preview window and host messages only from the expected parent. Preserve request correlation and context validation. Clear pending requests when a preview session ends; bound pending-request lifetime and count. Keep event subscriptions stable across ordinary UI rerenders.                                                                                                        | Do not add SDK handshakes, advertisements, new envelope fields, or broaden supported methods. Do not treat arbitrary postMessage traffic or a successful iframe load as an XRAY connection. Preserve signing/authorization behavior in the real host. Use exact target origins where reliably known; retain necessary opaque-origin behavior only with expected-window and envelope validation.                                                  | miniAppBridge, preview lifecycle/session integration, effective settings.                                              | Contract tests cover every existing scope, malformed envelopes, wrong windows, unexpected response IDs/scopes/versions, invalid platform identity, bounded pending requests, rerenders, and late responses after reload or project switch.                               |
| C05       | Model preview loading, observed SDK activity, and upstream XRAY availability separately. Show Connected only after a successful correlated platform `getStatus` response with the expected host identity for the current preview session. Show waiting, timeout/unavailable, or standalone status truthfully. Add Reload/retry, edit-URL recovery, and opening the URL externally for diagnosis. Keep event log pause, clear, payload inspection, and responsive presentation; bound retained events and reset them when the project changes. | Use existing SDK requests/events only. A parent connection alone does not prove the nested app is connected; an SDK request alone does not prove a round trip succeeded. Reset connection proof on URL change, iframe reload, project switch, or observed host disconnection. Use a documented finite wait timeout; do not claim continuous server health from silence. Never fabricate XRAY identity or wallet connectivity in standalone mode. | Code page, session/status model, EventLog, preview controls.                                                           | Fake-timer and browser tests cover load without SDK, SDK without host, confirmed round trip, error responses, standalone use, timeout then successful retry, iframe reload, project switch, and event limits.                                                            |
| C06       | Support local URL embedding within the actual XRAY-parent/Builder/mini-app arrangement. Keep any browser-required local-network permission delegation confined to the local preview path and document the tested host policy. Provide actionable troubleshooting for server startup, embedding restrictions, browser permission denial, and HTTP/HTTPS issues.                                                                                                                                                                                | Do not copy 0016's blanket removal of local-network access or add browser-runtime cross-origin isolation globally. Browser policy cannot be bypassed by a Builder attribute. Do not recommend disabling browser security. Where browser APIs cannot distinguish failure causes, report a timeout with possible causes rather than a false diagnosis. External opening is a diagnostic action and does not promise the nested XRAY relay.         | Local preview attributes and controls, README, test fixtures; hosting config only if required for this local workflow. | Automated tests use separate host and preview origins, including negative embedding cases. Manual acceptance records supported browser/version and verifies the deployed HTTPS host chain against a user-started local server, including permission denial and recovery. |
| C07       | Add repository-owned unit/contract and browser validation plus concise local-development documentation. Document creation, migration/recovery, route compatibility, connection meanings, supported URL setup, standalone limits, and deletion semantics.                                                                                                                                                                                                                                                                                      | Keep the existing SPA, theme, SDK protocol, and deployment envelope. Test dependencies may be added as dev dependencies; do not add a runtime, remote execution service, or local companion. Preserve the existing locked SDK resolution; do not silently upgrade or replace it.                                                                                                                                                                 | Package scripts/lockfile, test configuration and fixtures, README.                                                     | Non-mutating formatting, typecheck, unit/contract tests, browser tests, production build, and diff checks pass; manual host/local-server acceptance is reported honestly.                                                                                                |

## Implementation steps

1. Add the stable local project model and isolated migration/lookup helpers. Test migration and
   legacy routing before changing the primary UI. Use the current storage key
   `xray-mini-app-builder.projects`, increment the persisted schema version, and keep a pre-migration
   recovery copy under a documented separate key before writing the new representation.
2. Update project creation, cards, editing, removal, and route resolution. Display the two
   development choices, with Local enabled and In-browser unavailable. Hydration and storage
   errors must not appear as a missing project or an empty successful migration.
3. Extract the existing preview/relay boundary only as needed for session cleanup and testability.
   Preserve protocol validation and direct SDK semantics while removing positional route logic.
4. Add connection state and recovery controls; distinguish observed SDK activity from a confirmed
   nested round trip. Ensure event-log toggles and other UI updates do not drop pending requests.
5. Add a deterministic simulated XRAY parent and SDK-speaking mini-app fixture on different
   origins for browser tests. Exercise the real relay code through the nested iframe chain.
   Fixtures must not need a real wallet, signing, Cloudflare credentials, or a third-party service.
6. Add focused Vitest unit/contract tests and Playwright browser tests, with commands `npm run test`
   and `npm run test:browser`. Use a dedicated test configuration where needed to avoid loading
   application-only Vite plugins into unit tests. Add a non-mutating `format:check` command for
   owned source/config/test files; do not reformat immutable historical SPECTRE records.
7. Update README, run required checks, and manually exercise the real HTTPS XRAY host with a local
   development server. Record unavailable environments and failed checks explicitly in the result.

## Validation

- `npm run format:check` must use Prettier check mode and include changed source/configuration,
  test files, README, and this non-terminal implementation record. Do not use the current
  `npm run format -- --check`, because `format` already includes `--write`.
- `npm run typecheck`.
- `npm run test` for migration, route mapping, bridge validation/correlation, and connection timers.
- `npm run test:browser` for project lifecycle and the nested host/Builder/preview fixtures.
- `npm run build`.
- `git diff --check`.
- Inspect dependency changes: additions are justified test tooling, locked SDK resolution remains
  unchanged, and no browser runtime, CLI agent, or execution-service dependency is introduced.
- Inspect persistence: host account/network context, bridge responses, and connection/event state
  are not written into project metadata. Existing standalone preference behavior remains intact.
- Manual acceptance: create a localhost project; start its server outside Builder; load it through
  the deployed XRAY host; observe a confirmed SDK response and route changes; exercise reload,
  server stop/restart, and browser permission refusal/recovery; edit the URL; reload Builder;
  remove a different project and verify the original URL still opens the intended project.
- Record browser/OS, HTTP/HTTPS and iframe configuration, and actual results. Tests using a mock
  parent do not establish compatibility with the deployed XRAY host. If that host or browser
  permission scenario is unavailable, list the remaining acceptance work explicitly.

The existing lockfile links `@xray-network/xray-js` to `../xray-js/packages/runtime`. Report this
environment dependency when reproducing checks; do not resolve a missing sibling by changing SDK
versions or fetching an undeclared substitute. A missing dependency during implementation is a
validation blocker, not proof that the local workflow passes.

## Compatibility and human review

Review preservation of names, URLs, project ordering, duplicate records, stable IDs, and old numeric
links. A fresh project creates only a Builder record; the local development server remains under
the user's control. Existing hosted URLs remain valid even though the mode is named Local.

Review the actual nested relay, platform identity, host context, route translation, and standalone
behavior. The user-facing term XRAY connection describes existing SDK requests/responses and
events, not a new handshake. Permission and embedding restrictions vary by browser and host policy;
review the recorded real-host acceptance rather than assuming fixture results cover those cases.

The later in-browser plan can reuse stable project identity and the preview boundary. It must own
its additional project variant, filesystem, terminal, scripts, AI tools, runtime and deployment
decisions. This plan does not depend on completion of that future work.

## Completion criteria

- New local projects can be created, edited, reopened, and removed using stable IDs.
- Existing valid projects survive migration and reload, including duplicates and hosted URLs;
  failed migration retains recoverable original data.
- Numeric aliases resolve to the migration-time project or show a missing-project state after
  deletion; deletion never retargets a surviving UUID link or legacy alias to another project.
- Preview routes, query strings, and fragments work with direct navigation, browser history,
  and the existing host/mini-app route events.
- Only validated messages from the expected windows traverse the relay; request correlation and
  host context remain correct through normal UI updates and preview session resets.
- Connection indicators distinguish loading, SDK activity, confirmed connection, timeout, and
  standalone/unavailable host behavior, with useful retry and diagnosis controls.
- Local development works without a Builder editor, terminal, runtime, filesystem service, or
  companion. In-browser development is clearly unavailable in this implementation.
- Required automated checks pass and real-host/local-server acceptance is recorded honestly,
  including any remaining browser-specific limitations for human review.

## Out of scope

- Creating, modifying, or implementing a separate in-browser SPECTRE record in this operation.
- Checking out the React template, local scaffolding, file editing, package installation, or
  starting/stopping the user's server from Builder.
- Monaco, OPFS project workspaces, WebContainers, BrowserPod, Linux emulation, embedded terminals,
  package-script buttons, and Codex/Claude integrations.
- A local companion, remote development container, hosted customer filesystem, or command service.
- Cloudflare account authorization, customer deployment controls, and provisioning infrastructure.
- SDK protocol redesign, new handshake messages, new bridge methods, and changes to SDK packages.
- Automatic conversion or file synchronization between local and future browser projects.
- Unrelated visual-builder features or application-wide redesign.

## Blockers

None at planning time. Browser policy and real-host acceptance are explicitly bounded validation
work, and the existing linked SDK dependency must be available when implementation checks run.
