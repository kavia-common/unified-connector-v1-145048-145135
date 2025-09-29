This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Unified Connector Frontend

A modular Next.js UI for managing and monitoring the Kavia Unified Connector platform.

## Configuration

Copy `.env.example` to `.env.local` and update variables to point to your backend:

```
cp .env.example .env.local
# edit .env.local as needed
```

Important:
- `NEXT_PUBLIC_BACKEND_URL` must point to the FastAPI backend base URL.
- `NEXT_PUBLIC_WS_URL` is optional if backend provides WebSockets.
- `NEXT_PUBLIC_ENABLE_MOCK_AUTH` enables a temporary in-memory session for local development.

## Getting Started

Run the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

## Structure

- `src/lib/api` — API client and endpoint abstractions
- `src/components` — Reusable UI components
- `src/app` — App Router pages (Dashboard, Services, Logs, Settings)
- `src/lib/auth.ts` — Minimal, swappable auth stub

## Backend Expectations

The UI expects the following endpoints to exist on the backend:
- `GET /health` — returns service health
- `GET /services` — returns list of services
- `POST /services/{id}/start` — starts a service
- `POST /services/{id}/stop` — stops a service
- `GET /metrics?metric=cpu_usage&range=1h` — returns timeseries data
- `GET /logs?limit=50` — returns recent logs

If your backend uses different routes, update `src/lib/api/endpoints.ts` accordingly.

## Deployment

This project is configured with `output: "export"` in `next.config.ts` to support static export when feasible.
When relying on client-side fetching for dynamic data, static export is fine. For SSR needs, adjust config accordingly.
