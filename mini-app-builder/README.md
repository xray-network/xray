# XRAY Mini App Builder

Builder connects a user-started development server to the XRAY mini-app SDK. Local development
uses your existing editor, terminal, and deployment tools. In-browser development is a separate,
future feature and is disabled in the interface.

## Local development

1. Start your mini app in its own project, for example with `npm run dev`.
2. Open Builder inside XRAY. Choose **New project**, enter a name and the complete development
   URL, and create the project. Names use only `a-z`, `A-Z`, `0-9`, and `-`, and must be unique
   (ignoring case). A project named `My-app` opens at `/code/My-app/`. HTTP/HTTPS localhost,
   loopback, LAN, and hosted URLs are supported.
3. Open the preview. The right-side panel has **App** and **Event Log** tabs. In **App**, use
   **Edit project** to change the name or URL and **Reload preview** to start a fresh session.
   **Event Log** shows SDK requests, responses, and events. Close the panel with **X** and reopen
   it with the fixed **Controls** button on the right; the preview and relay keep running.
4. Use the route field to navigate inside the mini app. The configured URL remains its entry URL;
   app routes are delivered through the SDK, including query strings and fragments.

The mini app must allow embedding and use the XRAY SDK. **Open externally** helps diagnose the
server independently; that tab does not inherit Builder's nested XRAY relay. Removing a project
only removes Builder's saved record. It does not delete source files or stop the user's server.
Builder does not run local commands or discover a local `package.json` from a development URL.

## Connection status and SDK contract

Builder uses the direct `platformV1`, `cardanoV1`, and Cardano CIP-30 v1 routes without a handshake
or protocol advertisement. The relay validates envelopes, correlates requests, and accepts traffic
only from the expected upstream and preview windows. Known origins are checked as well. Platform
status contains the XRAY identity; account context travels separately. Signing and authorization
remain the responsibility of the real XRAY host.

Preview loading, SDK activity, and the upstream host are displayed separately:

- **Loading preview / Waiting for SDK activity**: a page load has not proved an SDK connection.
- **SDK detected · Waiting for XRAY**: the preview sent a valid request, but a successful status
  round trip has not yet been observed.
- **Connected to XRAY**: the active preview's `platform/v1.getStatus` received a correlated,
  successful response identifying `xray.app`. This is connection evidence, not continuous server
  health or wallet authorization.
- **XRAY connection unavailable**: no confirmation within 10 seconds, a status request failed or
  expired, or a previously observed upstream connection became unavailable. A later successful
  status request can restore connection status.
- **Standalone · XRAY host unavailable**: Builder is open outside a parent host; the app can render,
  but Builder does not fabricate XRAY identity, account context, or wallet access.

Explicit reloads and URL/project changes create a new iframe session. A subsequent iframe document
load clears old pending requests and connection proof; the app may need to request status again.
Pending requests expire after 30 seconds and are limited to 256. Duplicate outstanding IDs are
rejected. Event history is transient, limited to the latest 200 events, and cleared on project or
preview-session changes. Pausing the event log does not pause the relay.

## Browser permissions and embedding

The intended chain is **XRAY host → Builder → local mini app**. Local-network permission delegation
is confined to local preview iframes. The current preview uses `allow="local-network-access"`;
this is not a permission bypass and does not override the enclosing host's policy.

If a preview fails, check that the server is running, the URL is correct, the browser permits the
local connection, and the mini app permits its ancestors through its CSP / frame policy. HTTPS
host pages embedding HTTP development servers may require browser-specific setup. Grant relevant
browser permissions through normal browser controls; do not disable browser security. If the
browser cannot expose the precise cause, Builder offers possible causes and a retry rather than
claiming a specific error. A successful external tab does not prove embedding is allowed.

No cross-origin isolation headers are added for the future browser runtime. Compatibility with the
real deployed HTTPS XRAY host, local-network permission prompts, and HTTP/HTTPS behavior must be
recorded for each supported browser. The automated fixtures below run on separate loopback HTTP
origins and do not establish that production compatibility.

## Saved projects and recovery

Projects stay in browser local storage under `xray-mini-app-builder.projects`. Schema version 3
stores local project metadata, an internal stable UUID, a unique URL name (`slug`), numeric-link
aliases, and an invalid-entry count. Host/account context, SDK messages, modal state, and connection
state are not persisted there. Standalone UI preferences retain their existing separate storage.

New projects use their name directly in the URL. Renaming changes the named URL while preserving
the internal ID, configured server, and current app path/query/fragment. Named links follow the
current name; old name links are not reserved after renaming or removal. Existing UUID links and
numeric aliases still resolve to the same internal project and redirect to its current named URL.
Names that conflict with existing numeric aliases or internal IDs are reserved to avoid ambiguous links.

Migration preserves existing names, URLs, order, duplicates, IDs, and numeric aliases. Existing names
with unsupported characters get a safe URL name; collisions get numeric suffixes, for example
`My-app-2`. The generated URL names are persisted, so deleting another project does not change them.
Old display names remain unchanged and a URL-only edit does not require renaming them. New names and
renames must meet the character and uniqueness rules.

Before replacing older storage, Builder copies the original serialized data to
`xray-mini-app-builder.projects.recovery-v1` or `.recovery-v2`, according to its source version.
The version-1 backup is preserved during a version-2 migration. Invalid version-1 entries remain in
the backup and produce a recovery notice. Failed parsing, backup, or migration writes retain the
original primary value and block editing until recovery.

Existing `/code/0/...` links refer to the project occupying that index when version-1 storage was
migrated. Removing another project never changes this mapping. A removed project's numeric alias
remains missing and is never reused. Links shifted by deletions before migration cannot be reconstructed.

To recover data:

1. In browser developer tools for the **Builder origin**, export the primary project storage value
   and every existing recovery key before changing anything. These are local browser backups.
2. Inspect the exported data. Re-add repaired entries through Builder when valid projects remain;
   use a valid unique name. This preserves the other projects' IDs and links.
3. For unreadable primary JSON, restore a known-good full value and choose **Reload saved projects**.
   Restoring version-1 data generates fresh IDs; restoring version-2 preserves its IDs and assigns
   named routes. Prefer current version-3 data when available. If a recovery key already contains
   a different backup for the version being restored, export both before removing that recovery
   key and retrying; Builder refuses to overwrite it.
4. If storage is full or disabled, restore access/free space and retry. Failed saves retain the
   previous projects. If another tab changed projects, reload saved projects before editing again.

## Repository development and validation

Use the Node version declared in `package.json`. The checked-in lockfile currently links
`@xray-network/xray-js` to `../js/packages/runtime` in this repository; that package's built
runtime and its installed dependencies must be available. Do not replace it with a registry version to make tests
pass. The root manifest retains its existing `latest` declaration, so a plain fresh `npm install`
may attempt the registry: dependency setup must respect the local link in this development checkout.

- `npm run dev` starts Builder on port 7210.
- `npm run format:check` checks source, tests, configuration, and implementation 0017 records without
  modifying files. Immutable historical SPECTRE records are excluded.
- `npm run typecheck` runs route generation and TypeScript.
- `npm run test` runs Vitest migration, route, relay, and connection-state tests.
- `npm run test:browser` runs Playwright in Chromium, with a simulated XRAY parent on port 7211,
  Builder on 7210, and a mini-app fixture on 7212. Install Chromium with `npx playwright install chromium`
  first. If using a custom `PLAYWRIGHT_BROWSERS_PATH`, set it for both installation and test execution.
- `npm run build` builds the SPA. `git diff --check` checks changed whitespace.

The fixture host is test-only and supplies deterministic responses without real wallets or signing.
It is never included in the production app. Browser tests exercise project lifecycle, saved-link
migration, nested relay and navigation, event-log rerenders, timeout/recovery, standalone behavior,
and blocked embedding. Manual acceptance still needs the deployed HTTPS XRAY host and a real
user-started development server, including server stop/restart, permission refusal/recovery, and
browser/OS details. See the 0017 result for what was actually validated.
