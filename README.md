# XRAY/Network

Source code for XRAY/Network products. Each folder is an independent project with its own README,
build, and release.

| Product | Folder |
| --- | --- |
| XRAY/JS: JavaScript SDK and Mini App Bridge | [`js/`](js/) |
| XRAY/CARDANO-LIB: Cardano protocol libraries | [`cardano-lib/`](cardano-lib/) |
| XRAY/DESIGN: interface protocol and design tokens | [`design/`](design/) |
| XRAY/SPECTRE: evidence-backed implementation protocol | [`spectre/`](spectre/) |
| XRAY/GRAPH: blockchain data services | [`graph-services/`](graph-services/) |
| XRAY/BUILDER and mini apps | [`mini-apps/`](mini-apps/) |
| XRAY Wiki | [`wiki/`](wiki/) |

To work on a project, open its folder and follow its README. There is no root install or build.

After cloning, fetch the Graph submodule with `git submodule update --init`. Projects that link the
SDK locally (mini apps, `wiki`) need it built first: build `cardano-lib/libs/typescript`, then `js`.

Contributors and coding agents: see [`AGENTS.md`](AGENTS.md).

## License

[MIT](LICENSE), except third-party material, which keeps its own license; see
[`LICENSE-THIRD-PARTIES.md`](LICENSE-THIRD-PARTIES.md).
