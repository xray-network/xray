# XRAY

Public home of XRAY/Network code. This is one repository of **independent projects**: every folder
below has its own toolchain, lockfile, build, deploy, and release. There is no root build and no
root install.

## Rules

1. **Scope.** Work only in the folders the task names. If the target is unclear, ask. Do not search
   the whole repository; start from the map below.
2. **Project instructions win.** Before editing a project, read its `AGENTS.md` (if present) and
   `README.md`. They override this file.
3. **Run commands from the project folder** (where its `package.json` or build file is). Never run
   `npm install` or builds at the repository root.
4. **Other projects: read interfaces, not internals.** When a task needs another project, read its
   README or docs. Open its source only if the task is in that project.
5. **Cross-project changes** go upstream first (`cardano-lib` → `js` → consumers). One commit may touch
   several projects when the change belongs together; name every touched folder in the message.
6. **Never commit secrets.** `.env*`, `.dev.vars*`, and key files stay local; commit `*.example`
   files instead. Never print secret values.
7. **Generated files** (lockfiles, generated clients, migrations) are produced by the project's
   commands, never edited by hand.
8. **Do not copy files between projects.** Each project owns its `.agents/`, `SPECTRE.md`, and
   configs.
9. **SPECTRE** records live per project (`<project>/SPECTRE.md`). Apply a SPECTRE request to the
   named project's ledger; never create one at the root. If no project is named, ask.

## Map

| Folder | Product | What it is | State |
| --- | --- | --- | --- |
| `cardano-lib/` | XRAY/CARDANO-LIB | Cardano protocol libraries. `libs/typescript/` is maintained; `libs/cpp/` is an unmaintained concept. | Active |
| `js/` | XRAY/JS | JavaScript SDK: runtime, Cardano APIs, Mini App Bridge, docs site (`docs/`). | Active |
| `mini-apps/graph-services/` | XRAY/GRAPH | Docker services behind Graph: cardano-node, db-sync, ogmios, postgres, koios-tiny + TS client, kubo, traefik. | Active |
| `wiki/` | XRAY Wiki | Rspress knowledge base (wiki.xraynetwork.io). | Active |
| `cdn/` | — | Static assets and fonts, Cloudflare. | Active |
| `vault/` | XRAY/VAULT | README only. | Placeholder |
| `homepage/` | — | README only. | Placeholder |
| `foundation/` | — | README only. | Placeholder |
| `mini-apps/builder/` | XRAY/BUILDER | Connects a developer's dev server to the XRAY SDK. | Active |
| `mini-apps/cardano-wallet/` | Mini app | Wallet. | Active |
| `mini-apps/cardano-assets/` | Mini app | Assets. | Active |
| `mini-apps/cardano-transactions/` | Mini app | Transactions; `npm run dev:example` works without a host. | Active |
| `mini-apps/stake/` | Mini app | Early code, uses yarn. | Early |
| `mini-apps/ai/`, `cardano-explorer/`, `governance/`, `launchpad/`, `minterr/`, `swap/` | Mini apps | README only. | Placeholder |

## Dependencies

```
cardano-lib/libs/typescript ──▶ js ──▶ mini-apps/*, wiki
```

- In local development, consumers link the SDK from this repository: lockfiles resolve
  `@xray-network/xray-js` to `../../js/packages/runtime`, and `js` links
  `cardano-lib/libs/typescript/packages/*`. A change in `js` or `cardano-lib` reaches linked consumers
  without publishing.
- Published versions go to npm as `@xray-network/*`, released per project.

## Where to look

- **Mini App Bridge (mini app side):** `js/packages/mini-app-bridge/`: `README-PLATFORM.md`,
  `README-CARDANO.md`, `README-CARDANO-CIP30.md`.
- **Graph infrastructure and start order:** `mini-apps/graph-services/README.md`.
- **New mini app:** start from the standalone template repository
  `xray-network/xray-mini-app-template-react` (not in this repository).

## Search

`.ignore` at the root keeps dependencies, build output, lockfiles, and SPECTRE archives out of
search. Do not bypass it (`--no-ignore`) unless the task is about those files.

## Licensing

- The root `LICENSE` (MIT) covers every project. Each project folder in the map, and each package
  published to npm, holds an exact copy of it as `LICENSE`. Never edit a copy alone; change the root
  and copy it again.
- Packages not published to npm set `"private": true`. Every `package.json` sets
  `"license": "MIT"`.
- Third-party material keeps its owner's license text in the folder it covers, named `LICENSE`
  (`LICENSE-<OWNER>` only when the folder also holds XRAY files), as `LICENSE-THIRD-PARTIES.md`
  states.

## Adding a project

1. Place it by kind: `mini-apps/<name>/` (chain-specific: `<chain>-<name>`), with a mini app's
   service stack beside it as `mini-apps/<name>-services/`, or a top-level folder for SDKs,
   libraries, and sites.
2. Add a row to the map above.
3. Give it a `README.md`, and an `AGENTS.md` if it has agent rules.
4. Copy the root `LICENSE` into it and follow "Licensing" above.
5. Give it a `.gitignore` copied from another project's shared rules, plus its own paths under
   `# Project-specific`.
