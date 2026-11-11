# xray-graph-services

This monorepo contains the services and clients that make up XRAY/Graph.

Each service lives in its own folder with its own setup notes and Docker Compose file. Some services depend on others, so bring them up in dependency order when you are starting a fresh stack.

## Repository Layout

- [cardano-node](cardano-node/README.md)
- [cardano-db-sync](cardano-db-sync/README.md)
- [ogmios](ogmios/README.md)
- [postgres](postgres/README.md)
- [koios-tiny](koios-tiny/README.md)
- [kubo](kubo/README.md)
- [traefik](traefik/README.md)
- [koios-tiny-ts-client](koios-tiny-ts-client/README.md)
- `volumes/` for persistent Docker data used by the local service stack

## Environment Convention

- `ID` is used to generate service `container_name` values (for example, `service-${NETWORK}-${ID}`).
- On the shared Docker network, other containers can use that container name as `host:port` when connecting between services.

## Docker Network

- Services use a shared Docker network named `xray-graph-services`.
- This network enables container-to-container communication by service or container name.
- Keep related stacks attached to this network when they need to talk to each other.

## Git Submodules

`koios-tiny/koios/koios-artifacts` is a Git submodule. It is declared in the repository root
`.gitmodules`, so run these commands from the repository root.

After cloning, fetch it at the pinned commit (the `koios-tiny` Docker build needs it):

```sh
git submodule update --init graph-services/koios-tiny/koios/koios-artifacts
```

To move it to the latest upstream commit:

```sh
git submodule update --init --remote graph-services/koios-tiny/koios/koios-artifacts
git submodule status
git add graph-services/koios-tiny/koios/koios-artifacts
git commit -m "graph-services: bump koios-artifacts"
```
