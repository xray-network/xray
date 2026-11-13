# cdn

Static assets served at https://cdn.xraynetwork.io: fonts, logos, images, pool metadata, and data
files. Everything under `public/` is published as is.

Deployed as a Cloudflare Worker with static assets (`wrangler.jsonc`), on the route
`cdn.xraynetwork.io/*` in the `xraynetwork.io` zone. `public/_headers` sends
`Access-Control-Allow-Origin: *` so other sites can load the fonts and data.

```sh
yarn install
yarn dev      # serve public/ locally
yarn deploy   # publish to cdn.xraynetwork.io
```
