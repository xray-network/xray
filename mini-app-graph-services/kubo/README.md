# kubo

Runs an IPFS Kubo node for shared content storage and gateway access.

## Setup

1. Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

2. Set `ID` and, if needed, the custom port variables in `.env`.
3. Start the service:

   ```sh
   docker compose up -d
   ```

## Depends

- None