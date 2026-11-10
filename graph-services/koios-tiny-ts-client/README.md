# koios-tiny-ts-client

TypeScript client for XRAY/Graph Koios Tiny and the public Koios REST API.

## Installation

```sh
yarn add cardano-koios-client
```

or

```sh
npm i cardano-koios-client
```

## Usage

```ts
import KoiosClient from "cardano-koios-client"

const client = KoiosClient("https://graph.xray.app/output/services/koios/mainnet/api/v1")

const app = async () => {
  const tip = await client.GET("/tip")

  if (tip.data) {
    console.log(tip.data?.[0]?.block_no)
  }

  if (tip.error) {
    console.error(tip.error)
  }
}

app()
```

## Advanced Usage

The client supports custom headers, query parameters, and request cancellation through `AbortSignal`.

## Schema

Regenerate the OpenAPI client schema with:

```sh
yarn schema
```

After regenerating, fix any non-nullable wrappers and `unknown` type errors as needed.

## API URLs

Managed by XRAY/Network:

```text
https://graph.xray.app/output/services/koios/mainnet/api/v1
https://graph.xray.app/output/services/koios/preprod/api/v1
https://graph.xray.app/output/services/koios/preview/api/v1
```

Managed by the Cardano community:

```text
https://api.koios.rest/api/v1
https://preprod.koios.rest/api/v1
https://preview.koios.rest/api/v1
https://guild.koios.rest/api/v1
```
