# xray-mini-app-builder implementation 0016 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-builder/0016
Created: 20260831T184653Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                                                  | Kind    | Required | Purpose                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Human-approved client-owned browser-builder architecture dated 2026-08-31                                              | `LOCAL` | Yes      | Require source, execution, Cloudflare authorization, and deployments to remain client-owned while XRAY supplies the browser editor and AI endpoint.                   |
| Human-approved AI workspace behavior dated 2026-08-31                                                                  | `LOCAL` | Yes      | Require AI tools to edit the same browser workspace as the editor, expose progress through chat/xterm, and avoid depending on embedded Codex or Claude Code binaries. |
| `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `react-router.config.ts`, and `wrangler.jsonc` | `LOCAL` | Yes      | Own dependencies, browser bundling, typechecking, tests, and the Builder deployment envelope.                                                                         |
| `app/routes.ts`, `app/routes/code.tsx`, `app/components/pages/Code/`, and `app/components/pages/Home/`                 | `LOCAL` | Yes      | Replace external-URL previewing with the browser workspace, editor, agent, task-console, and preview experience.                                                      |
| `app/store/projects/`, `app/components/modals/CreateProject/`, and `app/types/`                                        | `LOCAL` | Yes      | Replace URL-only projects with locally persisted client-owned workspace metadata.                                                                                     |
| `app/integrations/xray-js/miniAppBridge.ts` and `app/integrations/xray-js/useEffectiveSettings.ts`                     | `LOCAL` | Yes      | Preserve the existing XRAY host context and strict expected-window relay for generated previews.                                                                      |

## Objective

Build a client-owned browser workspace that can author, preview, AI-edit, validate, and deploy a
bounded Cloudflare mini-app monorepo without WebContainers, a server-side project filesystem, or
embedded Codex/Claude Code CLI processes.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Compatibility                                                                                                                                                                                                                                                                                                                             | Local owner                                                                                 | Validation                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C01       | Replace URL-only project records with stable project IDs, an XRAY mini-app manifest, and an OPFS-backed workspace containing `apps/web`, `apps/worker`, and `packages/shared`. Provide atomic reads/writes, revision hashes, checkpoints, change notifications, import/export, and explicit project deletion.                                                                                                                                                                                                                                                                                                | Remove the old `{ name, url }` project format without a compatibility store or migration. Require a secure browser context and report unsupported OPFS clearly rather than falling back to server storage.                                                                                                                                | Project domain, workspace worker/service, project store, create/delete UI.                  | Unit tests cover path normalization, traversal rejection, atomic patching, conflicts, checkpoints, persistence, export, and deletion; browser coverage proves reload persistence.                                                                                                                                                                                                                                           |
| C02       | Replace the current Code page with a VS Code-style client UI using Monaco-based services: project explorer, tabs, dirty state, diagnostics, search, diff review, preview, AI chat, and an xterm.js task console. Monaco, xterm, the runtime, and the agent must observe one workspace change stream so edits made by any surface appear in every other surface without reload.                                                                                                                                                                                                                               | Preserve XRAY theme and host routing integration. Use only browser-capable editor extensions; do not use Microsoft branding or the Microsoft Marketplace.                                                                                                                                                                                 | Code page shell, editor/workbench components, workspace models, task console.               | Component and browser tests cover open/edit/save, concurrent revision rejection, AI-originated changes, undo, terminal resize/input, keyboard navigation, and state restoration.                                                                                                                                                                                                                                            |
| C03       | Implement a browser workspace runtime with a narrow task interface for `install`, `dev`, `build`, `test`, and `deploy:prepare`. Use `esbuild-wasm` for TypeScript/JSX and bundles, support only pure JavaScript/TypeScript dependencies compatible with browser and Cloudflare Workers targets, and maintain a deterministic client-owned lock/cache. Run the frontend in a sandboxed opaque-origin iframe and the Worker-style backend in a dedicated Web Worker with a request/response bridge for `/api/*`.                                                                                               | Do not claim arbitrary Node.js, native addons, lifecycle binaries, `child_process`, raw sockets, or a general shell. Do not include WebContainers, Nodebox, NanoVM, or another non-permissive/experimental runtime in the default implementation. Remove `allow="local-network-access"`; preserve the strict expected-window XRAY bridge. | Runtime, package resolver/cache, build graph, preview host, frontend/backend bridges.       | Deterministic runtime tests cover dependency resolution, shared-package rebuilds, frontend assets, Worker `fetch` responses/errors, preview isolation, stale-build cancellation, and unsupported-package diagnostics. Browser tests confirm the preview cannot access the parent, workspace, AI credentials, or Cloudflare authorization.                                                                                   |
| C04       | Add a browser-side AI agent host connected to a configurable same-origin XRAY AI endpoint using an authenticated streaming protocol. Expose bounded tools for listing, reading, searching, creating, patching, and deleting workspace files plus running curated tasks and reading diagnostics. Apply tool edits atomically against base revisions, show diffs, checkpoint before mutation, stream task activity to chat and xterm, cap repair loops, and require approval for deletion, dependency changes, and other configured sensitive operations.                                                      | The endpoint owns model credentials but not persistent project state. Send only requested project content and tool results. Do not expose Cloudflare authorization or execute free-form shell text. Do not install or redistribute the Codex or Claude Code CLI; reproduce their reviewable file-edit workflow through structured tools.  | AI transport, conversation state, tool executor, approval/diff UI, task-event renderer.     | Contract tests cover streaming/resume, tool validation, malformed events, cancellation, reconnect, stale revisions, rollback, repair-loop limits, and secret redaction. Browser coverage proves an AI patch changes the same Monaco/OPFS workspace, rebuilds preview, appears in xterm activity, and can be undone.                                                                                                         |
| C05       | Add client-owned Cloudflare connection and deployment using a public OAuth 2.0 Authorization Code client with PKCE. Keep access/refresh credentials out of OPFS, application state serialization, preview workers/iframes, AI requests, logs, and task environments. Build locally, show the artifact manifest and diff, require an explicit human deploy action, and upload to the selected client account through the regular Workers script/static-assets APIs; support Pages Direct Upload only for explicitly static projects. Persist only non-secret account/project/deployment identifiers and URLs. | Do not use Global API Keys, Workers for Platforms, XRAY-owned customer deployments, or an XRAY credential relay. Request only the enabled project's least-privilege scopes. Deployment is never an AI tool and cannot run from generated code.                                                                                            | Cloudflare OAuth client, deployment adapter, project deployment metadata, deploy/revoke UI. | Mock API tests cover PKCE/state verification, scope selection, token expiry/revocation, asset hashing/session upload, Worker multipart metadata, Pages selection, failed/partial deploys, and retry idempotency. Manual review with a disposable client-owned Cloudflare account verifies consent, preview deployment, production deployment, revocation, and that no token reaches storage, logs, AI, or preview contexts. |
| C06       | Add repository-owned automated validation and documentation for the complete vertical slice. Include dependency-license auditing for Builder runtime packages, reject runtime dependencies outside an approved permissive-license policy unless separately human-approved, document supported runtime/package constraints, AI data flow, Cloudflare ownership, threat boundaries, and recovery/export behavior, and replace obsolete URL-preview documentation and deploy scripts.                                                                                                                           | Keep the Builder MIT-licensed and do not imply that client-generated app dependencies inherit the Builder license. Existing XRAY bridge behavior remains documented and validated.                                                                                                                                                        | Package scripts, tests, documentation, security/runtime policy.                             | `npm run format -- --check` or an equivalent non-mutating format check, `npm run typecheck`, unit/contract tests, browser tests, `npm run build`, license audit, stale URL-preview scan, and `git diff --check` pass.                                                                                                                                                                                                       |

## Implementation steps

1. Introduce the typed project manifest, OPFS workspace service, in-memory test backend, revision
   protocol, and project lifecycle before changing the primary UI.
2. Build the editor shell against that workspace and prove manual edits persist and publish a
   single change stream to Monaco, xterm activity, and other consumers.
3. Add the constrained build/runtime pipeline and deliver one end-to-end template whose web,
   Worker, and shared packages rebuild and preview entirely in the browser.
4. Replace external URL previewing with the isolated local preview while preserving the strict
   XRAY host/mini-app bridge and routing behavior.
5. Implement the AI streaming contract and browser tool loop, then prove an approved structured
   patch updates the workspace, diagnostics, build, preview, diff, checkpoint, and undo history.
6. Implement Cloudflare public OAuth with PKCE and direct client-account deployment, keeping its
   credential capability separate from every workspace, runtime, preview, terminal, and AI API.
7. Add automated browser/security/license coverage, remove retired project/preview paths, and
   document the supported product boundary and manual Cloudflare acceptance flow.

## Validation

- Run the repository's non-mutating formatting check for all changed source and tracked metadata.
- Run `npm run typecheck`.
- Run the new unit and contract test command covering workspace, runtime, agent, and deployment
  modules.
- Run the new browser test command covering persistence, editor/agent synchronization, local
  preview, isolation, approval/undo, and mocked Cloudflare deployment.
- Run `npm run build`.
- Run the new dependency-license audit and confirm the shipped browser/runtime dependency set is
  limited to the documented approved licenses.
- Scan for the retired `{ name, url }` project contract, external project iframe source,
  `allow="local-network-access"`, WebContainers, Nodebox, embedded `codex`/`claude` executables,
  Global API Keys, serialized Cloudflare credentials, and AI-accessible deploy operations.
- Run `git diff --check`.
- Complete manual browser review with a disposable Cloudflare account: create/import/export and
  reload a project; edit from Monaco and AI; inspect/undo patches; run tasks; exercise web/Worker
  preview and XRAY relay; authorize with PKCE; deploy preview and production artifacts; revoke the
  authorization; confirm credentials never appear in storage, logs, preview, workspace, xterm, or
  AI traffic.

## Compatibility and human review

This is an intentional replacement of the base URL-preview product model. Human review must focus
on the client-ownership boundary, OPFS recovery/export, the explicitly constrained Node-compatible
runtime, AI disclosure and approvals, generated-code isolation, exact XRAY relay behavior, OAuth
scope/credential handling, deployment ownership, and whether the initial supported package set is
sufficient for real XRAY mini apps.

The xterm surface is a task console over the curated browser runtime, not a promise of POSIX shell
compatibility. Codex- or Claude-like editing is delivered by the structured browser agent host
operating on the same revisioned workspace as Monaco. Any later true Node/Linux runtime or vendor
CLI integration requires a separate XRAY plan and license/security review.

## Completion criteria

- A user can create or import the prescribed mini-app monorepo, edit it, reload it, export it, and
  delete it while all project bytes remain in the browser workspace.
- Manual, AI, and runtime file changes share one revision protocol, are visible without reload,
  produce reviewable diffs/checkpoints, and support safe undo.
- The supported web, Worker, and shared-package template installs, builds, tests, and previews in
  browser workers without WebContainers or a remote project filesystem.
- Preview code is isolated from the parent UI, workspace internals, AI authentication, and
  Cloudflare authorization while the existing XRAY relay remains source-bound and functional.
- The AI endpoint can drive bounded file/task tools with streaming feedback, approvals, conflict
  handling, repair limits, and no deploy capability.
- A client authorizes Cloudflare through OAuth PKCE and explicitly deploys locally built artifacts
  to their own account; credentials are neither persisted with the project nor disclosed to any
  untrusted surface.
- Automated formatting, typecheck, tests, build, license, security/stale-path, and diff checks pass,
  and the manual disposable-account review is recorded honestly in the implementation result.

## Out of scope

- A general-purpose Node.js/Linux environment, arbitrary shell commands, native addons, arbitrary
  npm lifecycle binaries, or full npm ecosystem compatibility.
- Running, bundling, redistributing, or authenticating the official Codex CLI or Claude Code CLI in
  the browser.
- WebContainers, Nodebox, NanoVM, remote development containers, or a server-side customer
  workspace/build service.
- Implementing or operating the XRAY AI model endpoint, model billing, or provider credential
  storage; this change owns only its browser contract and client.
- GitHub/GitLab synchronization, collaborative editing, hosted project backups, or server-side
  project search/indexing.
- Automatic deployments, AI-triggered deployments, XRAY-owned customer Workers, Workers for
  Platforms, custom-domain/DNS management, or provisioning D1, KV, R2, Queues, Durable Objects, and
  other paid bindings.
- Backward compatibility or migration for URL-only project records.

## Blockers

None.
