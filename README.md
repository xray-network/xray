# XRAY/Network

Source code for XRAY/Network products. Each folder is an independent project with its own README,
build, and release.

## Products

| Product | What it is | Folder |
| --- | --- | --- |
| XRAY/JS | JavaScript SDK: runtime, Cardano APIs, and the Mini App Bridge | [`js/`](js/) |
| XRAY/CARDANO-LIB | Cardano protocol and application libraries | [`cardano-lib/`](cardano-lib/) |
| XRAY/GRAPH | Blockchain data services: Cardano node, db-sync, Ogmios, Koios, IPFS | [`mini-apps/graph-services/`](mini-apps/graph-services/) |
| XRAY Wiki | XRAY/Network knowledge base | [`wiki/`](wiki/) |
| XRAY CDN | Static assets, fonts, and data files | [`cdn/`](cdn/) |
| XRAY/VAULT | Vault | [`vault/`](vault/) |
| XRAY/Network homepage | Homepage | [`homepage/`](homepage/) |
| XRAY/Foundation | Foundation | [`foundation/`](foundation/) |

## Mini apps

Mini apps run inside XRAY hosts through the Mini App Bridge in XRAY/JS.

| Mini app | What it is | Folder |
| --- | --- | --- |
| XRAY/BUILDER | Connects a developer's local dev server to the XRAY SDK | [`mini-apps/builder/`](mini-apps/builder/) |
| Cardano Wallet | Cardano wallet | [`mini-apps/cardano-wallet/`](mini-apps/cardano-wallet/) |
| Cardano Assets | Assets of the connected Cardano account | [`mini-apps/cardano-assets/`](mini-apps/cardano-assets/) |
| Cardano Transactions | Transactions of the connected Cardano account | [`mini-apps/cardano-transactions/`](mini-apps/cardano-transactions/) |
| Cardano Explorer | Cardano explorer | [`mini-apps/cardano-explorer/`](mini-apps/cardano-explorer/) |
| Stake | Staking | [`mini-apps/stake/`](mini-apps/stake/) |
| AI | AI | [`mini-apps/ai/`](mini-apps/ai/) |
| Governance | Governance | [`mini-apps/governance/`](mini-apps/governance/) |
| Launchpad | Launchpad | [`mini-apps/launchpad/`](mini-apps/launchpad/) |
| Minterr | Minterr | [`mini-apps/minterr/`](mini-apps/minterr/) |
| Swap | Swap | [`mini-apps/swap/`](mini-apps/swap/) |

## Development

To work on a project, open its folder and follow its README. There is no root install or build.

After cloning, fetch the Graph submodule with `git submodule update --init`. Projects that link the
SDK locally (mini apps, `wiki`) need it built first: build `cardano-lib/libs/typescript`, then `js`.

Contributors and coding agents: see [`AGENTS.md`](AGENTS.md).

## License

[MIT](LICENSE), except third-party material, which keeps its own license; see
[`LICENSE-THIRD-PARTIES.md`](LICENSE-THIRD-PARTIES.md).
