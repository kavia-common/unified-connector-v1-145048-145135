# Unified Connector Frontend

Next.js app that provides management and monitoring UI for the Unified Connector platform.

## Configuration

Copy `.env.example` to `.env.local` and set:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

The app reads the backend base URL from `NEXT_PUBLIC_API_BASE_URL`.

## Development

Install dependencies and run dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features

- Dashboard with system health and connectors overview
- Connectors page with trigger sync action
- Monitoring page with health and placeholders for charts
- Basic auth scaffolding (username/password -> stores bearer token in localStorage)

## Notes

- Tokens are stored in `localStorage` as a simple scaffold. Replace with your preferred auth/session approach as needed.
- API endpoints used (expected on backend):
  - `GET /health`
  - `GET /connectors`
  - `POST /connectors/{id}/sync`
  - `POST /auth/login` (optional, if backend supports auth)
