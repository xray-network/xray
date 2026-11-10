# koios-tiny

Runs the Koios Tiny API, the bundled RapiDoc UI, and the Ogmios proxy used by the service stack.

## Setup

1. Start [postgres](../postgres/README.md), [cardano-node](../cardano-node/README.md), [cardano-db-sync](../cardano-db-sync/README.md), and [ogmios](../ogmios/README.md) first.
2. Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

3. Set the database connection values, `NETWORK`, `ID`, `CARDANO_NODE_ID`, `KOIOS_TINY_PORT`, `KOIOS_TINY_RAPIDOC_PORT`, `KOIOS_TINY_OGMIOS_PROXY_PORT`, `OGMIOS_HOST`, and `OGMIOS_PORT`.
4. Start the service stack:

   ```sh
   docker compose up -d
   ```

## Depends

- [postgres](../postgres)
- [cardano-node](../cardano-node)
- [cardano-db-sync](../cardano-db-sync)
- [ogmios](../ogmios)

## Included Services

- `koios-tiny` for the API
- `koios-tiny-rapidoc` for the OpenAPI UI
- `koios-tiny-ogmios-proxy` for Ogmios and submission routing