# Cardano Wallet documentation

Public URL: https://wiki.xraynetwork.io/mini-apps/cardano-wallet/

This independent Rspress app uses the SPECTRE docs structure, theme, and animated hero.
Only the hero placeholder is published. Existing reference source, where present, is retained outside the published routes.

Run commands from this directory, independently of the product workspace:

```sh
npm install --workspaces=false
npm run dev --workspaces=false
npm run typecheck --workspaces=false
npm run build --workspaces=false
npm run deploy --workspaces=false
```

Development and preview use port 10013. The `wiki-mini-apps-cardano-wallet-docs` Worker serves `build/mini-apps/cardano-wallet`
through its exact path and wildcard route. Rspress builds with base `/mini-apps/cardano-wallet/`; Wrangler uploads
`build/` so requests keep that prefix. The build does not deploy.
