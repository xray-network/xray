# ogmios

Provides the Ogmios API on top of the Cardano node socket.

## Setup

1. Start [cardano-node](../cardano-node/README.md) first so the node socket and config volumes exist.
2. Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

3. Set `NETWORK`, `ID`, `CARDANO_NODE_ID`, and `OGMIOS_PORT` in `.env`.
4. Start the service:

   ```sh
   docker compose up -d
   ```

## Depends

- [cardano-node](../cardano-node)