# postgres

Provides the PostgreSQL instance used by the graph services.

## Setup

1. Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

2. Set `POSTGRES_USER`, `POSTGRES_PASSWORD`, and optionally `POSTGRES_PORT`.
3. Start the database:

   ```sh
   docker compose up -d
   ```

## Depends

- None