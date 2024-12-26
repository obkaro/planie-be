# Planie Backend

Backend service for Planie - an intelligent travel planning assistant.

## Tech Stack

- Bun, Hono & Node.js
- TypeScript
- Cloudflare Workers
- OpenAI Integration

## Development

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
Copy `.env.example` to `.env` and fill in the required values.

3. Run development server:
```bash
bun run dev
```

## Testing

```bash
bun test
```

## Deployment

The service is deployed on Cloudflare Workers. Use Wrangler for deployment:

```bash
bun run deploy
```
