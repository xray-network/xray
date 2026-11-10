# cardano-node

Runs a Cardano node and exposes the socket and data volumes used by the rest of the stack.

## Setup

1. Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

2. Set `NETWORK`, `ID`, and `CARDANO_NODE_PORT` in `.env`.
3. Make sure the matching volume directory under `volumes/` exists or let Compose create it when the stack starts.
4. Start the service:

   ```sh
   docker compose up -d
   ```

## Depends

- None