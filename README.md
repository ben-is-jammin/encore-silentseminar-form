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
| `VITE_N8N_WEBHOOK_URL` | Your n8n webhook endpoint |
| `VITE_N8N_WEBHOOK_USERNAME` | Basic auth username for the n8n webhook |
| `VITE_N8N_WEBHOOK_PASSWORD` | Basic auth password for the n8n webhook |

If `VITE_N8N_WEBHOOK_URL` is not set, the form runs in demo mode and simulates a successful submission.

If `VITE_N8N_WEBHOOK_URL` is set, `VITE_N8N_WEBHOOK_USERNAME` and `VITE_N8N_WEBHOOK_PASSWORD` must also be set so the form can send the request with HTTP basic auth.

## Build

```bash
npm run build   # outputs to /dist
```

## Deploy to Digital Ocean App Platform

1. Push this repo to GitHub
2. In Digital Ocean App Platform, create a new Static Site
3. Connect your GitHub repo
4. Set:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
5. Add environment variables:
   - `VITE_N8N_WEBHOOK_URL` = your n8n webhook URL
   - `VITE_N8N_WEBHOOK_USERNAME` = your n8n basic auth username
   - `VITE_N8N_WEBHOOK_PASSWORD` = your n8n basic auth password
6. Deploy — auto-deploys on every push to `main`
