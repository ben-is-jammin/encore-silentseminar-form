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

If `VITE_N8N_WEBHOOK_URL` is not set, the form runs in demo mode and simulates a successful submission.

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
5. Add environment variable: `VITE_N8N_WEBHOOK_URL` = your n8n webhook URL
6. Deploy — auto-deploys on every push to `main`
