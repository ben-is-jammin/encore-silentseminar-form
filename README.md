# Encore Silent Seminar Order Form

Encore-branded Silent Seminar order form built with Vite + React.
Powered by ShowGear Productions.

## Local development

```bash
npm install
cp .env.example .env.local   # add your n8n webhook URL
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `VITE_N8N_WEBHOOK_URL` | Your n8n webhook endpoint for order submission |
| `VITE_N8N_WEBHOOK_USERNAME` | Basic auth username for the n8n webhook |
| `VITE_N8N_WEBHOOK_PASSWORD` | Basic auth password for the n8n webhook |
| `VITE_SHIPPING_WEBHOOK_URL` | n8n webhook for the "ESS FedEx Shipping Rates" workflow (shipping estimates) |
| `VITE_ENABLE_SHIPPING_CALCULATOR` | Set to `true` to show the shipping calculator (hidden by default pending team decision on shipping) |

If `VITE_N8N_WEBHOOK_URL` is not set, the form runs in demo mode and simulates a successful submission. If `VITE_SHIPPING_WEBHOOK_URL` is not set, the shipping calculator returns a simulated demo estimate.

## Shipping estimates (currently disabled)

The shipping calculator is fully built but hidden behind
`VITE_ENABLE_SHIPPING_CALCULATOR` until the team settles how shipping is
actually handled (the current n8n workflow rates via FedEx, which may change).
With the flag off, the form behaves as before: shipping shows as "Quoted
separately" and submission is not gated.

When enabled, the order form requires a shipping estimate before submission. The user enters a
shipping ZIP code, clicks **Calculate estimated shipping**, and the form POSTs
`{ destination_zip, equipment[], quote_signature }` to the shipping webhook. The
n8n workflow packs headsets into cases, calls the FedEx Rate API, doubles the rate
for the round trip, and responds with
`{ status, drop_ship, service, estimated_shipping, quote_signature }`. Orders over
250 headsets skip FedEx and return a drop-ship notice instead. The Submit button
stays disabled until an estimate matching the current ZIP + equipment selection
exists; changing quantities or the ZIP invalidates the estimate and requires
recalculation.

If `VITE_N8N_WEBHOOK_URL` is set, `VITE_N8N_WEBHOOK_USERNAME` and `VITE_N8N_WEBHOOK_PASSWORD` must also be set so the form can send the request with HTTP basic auth.

## Build

```bash
npm run build   # outputs to /dist
```

## Production start

```bash
npm start
```

This serves the built `dist` output with a static file server. It does not run `vite preview` in production.

## Deploy to Digital Ocean App Platform

1. Push this repo to GitHub
2. In Digital Ocean App Platform, prefer a new **Static Site**
3. Connect your GitHub repo
4. Set:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
5. Add environment variables:
   - `VITE_N8N_WEBHOOK_URL` = your n8n webhook URL
   - `VITE_N8N_WEBHOOK_USERNAME` = your n8n basic auth username
   - `VITE_N8N_WEBHOOK_PASSWORD` = your n8n basic auth password
6. Deploy — auto-deploys on every push to `main`

If you keep this app as a **Web Service** instead of a Static Site, set the run command to `npm start`. That will serve `dist` with `serve` and avoids Vite host validation errors.
