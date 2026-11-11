# XRAY Wiki documentation

Public URL: https://wiki.xraynetwork.io/

This independent Rspress app uses the SPECTRE docs structure, theme, and animated hero.
The root page is the directory for every project wiki. The Mini Apps overview is a hero-only placeholder at `/mini-apps/`.

Run commands from this directory, independently of the product workspace:

```sh
npm install --workspaces=false
npm run dev --workspaces=false
npm run typecheck --workspaces=false
npm run build --workspaces=false
npm run deploy --workspaces=false
```

Development and preview use port 10005. The `wiki-xray-network-docs` Worker serves `build`
through the fallback `wiki.xraynetwork.io/*` route. Rspress builds with base `/`; Wrangler uploads
`build/` so requests keep that prefix. The build does not deploy.

## Wiki directory

Every project wiki has its own Rspress build, lockfile, and Wrangler Worker. The directory
links use full URLs so navigation loads each destination app with its own router.

| Project | Path |
| --- | --- |
| XRAY JS | `/js/` |
| XRAY Cardano Lib | `/cardano-lib/` |
| XRAY App | `/app/` |
| XRAY Design | `/design/` |
| SPECTRE | `/spectre/` |
| Mini Apps overview | `/mini-apps/` |
| Graph | `/mini-apps/graph/` |
| Builder | `/mini-apps/builder/` |
| Cardano Wallet | `/mini-apps/cardano-wallet/` |
| Cardano Assets | `/mini-apps/cardano-assets/` |
| Cardano Transactions | `/mini-apps/cardano-transactions/` |
| Stake | `/mini-apps/stake/` |
| AI | `/mini-apps/ai/` |
| Cardano Explorer | `/mini-apps/cardano-explorer/` |
| Governance | `/mini-apps/governance/` |
| Launchpad | `/mini-apps/launchpad/` |
| Minterr | `/mini-apps/minterr/` |
| Swap | `/mini-apps/swap/` |

Only SPECTRE publishes full documentation. All other project pages are hero placeholders.
Older root wiki pages remain in source but are excluded from the directory build.
Cloudflare routes each project prefix to its own Worker; the root Worker owns `/` and
the `/mini-apps/` overview. Deploy each project Worker for its cards to resolve in production.
