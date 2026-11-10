# traefik

Provides the reverse proxy and routing layer for services that attach to the shared Docker network.

## Setup

1. Make sure the services you want to expose are already attached to the `xray-graph-services` network.
2. Start Traefik:

   ```sh
   docker compose up -d
   ```

## Depends

- None