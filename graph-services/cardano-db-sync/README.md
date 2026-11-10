# cardano-db-sync

Syncs chain data into PostgreSQL for the services that query Cardano data.

## Setup

1. Start [postgres](../postgres/README.md) and [cardano-node](../cardano-node/README.md) first.
2. Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

3. Set `NETWORK`, `ID`, `CARDANO_NODE_ID`, and the PostgreSQL connection settings in `.env`.
4. If you want to bootstrap from a snapshot, set `RESTORE_SNAPSHOT`.
5. Start the service:

   ```sh
   docker compose up -d
   ```

## Depends

- [postgres](../postgres)
- [cardano-node](../cardano-node)