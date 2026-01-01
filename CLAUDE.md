# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Type checking
npm run check

# Watch mode type checking
npm run check:watch

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture Overview

This is a **SvelteKit + Hono** hybrid application that combines SvelteKit's frontend framework with Hono's lightweight backend API in a monolithic structure.

### Request Routing Pattern

The application uses a custom routing mechanism in `src/hooks.server.ts` that intercepts requests:

- **`/api/*` requests** → Routed to Hono backend (path prefix stripped)
- **All other requests** → Handled by SvelteKit

The `handle` hook in `hooks.server.ts` transforms `/api` requests before forwarding to Hono, stripping the `/api` prefix so Hono routes can be defined without it.

### Backend API Architecture (Hono)

**Location**: `src/lib/api/index.ts`

Hono routes are organized using a **modular router pattern**:
- Individual route groups (e.g., `bookRoute`) are defined as separate Hono instances
- The main `app` exports a composed Hono instance using `.route()`
- Type safety is exported via `ApiRoute` type for client consumption

**Validation**: Uses `@hono/zod-validator` with Zod schemas for request validation

### Frontend-Backend Integration

**Client Setup**: `src/lib/api/client.ts`

Uses Hono's RPC client (`hono/client`) to create a **type-safe API client**:
```typescript
import { hc } from "hono/client";
export const client = hc<ApiRoute>("/api");
```

This enables end-to-end type safety from Hono routes to SvelteKit components.

### SvelteKit Integration Pattern

**Data Loading**: SvelteKit pages use the typed client in `+page.ts` loaders:
```typescript
const res = await client.book.$get({}, { fetch });
```

The `{ fetch }` parameter passes SvelteKit's server-side fetch for SSR compatibility.

**State Management**: Components use Svelte 5's runes syntax (`$state`, `$props`)

## Tech Stack

- **SvelteKit**: Full-stack framework with Vite
- **Hono**: Lightweight web framework for API routes
- **TypeScript**: Strict typing throughout
- **Tailwind CSS v4**: Utility-first styling via Vite plugin
- **Zod**: Runtime schema validation
- **Auth0 + Hono**: Authentication integration (configured but not yet implemented)
- **XState**: State machine library (dependency present)
- **date-fns**: Date manipulation utilities

## Project Structure

```
src/
├── hooks.server.ts          # Request routing: /api → Hono, else → SvelteKit
├── lib/
│   └── api/
│       ├── index.ts         # Hono app and route definitions
│       └── client.ts        # Type-safe Hono RPC client
└── routes/
    ├── +layout.svelte       # Root layout with global styles
    ├── +page.svelte         # Home page (displays API data)
    ├── +page.ts            # Server load function using Hono client
    └── register/
        └── +page.svelte    # Example form with POST to Hono API
```

## Key Patterns

1. **Type-Safe API Communication**: The `ApiRoute` type exported from `src/lib/api/index.ts` flows to the client, enabling full TypeScript inference for API calls
2. **Validation-First API**: Hono routes use Zod validators before handler execution
3. **SSR-Compatible Fetch**: Always pass SvelteKit's `fetch` to the Hono client in loaders
4. **Modular Route Groups**: Each API feature should be its own Hono instance, composed into the main app
