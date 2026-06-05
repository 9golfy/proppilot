# PropPilot AI

PropPilot AI is a full Next.js + React + TypeScript + Tailwind CSS application. The project is organized as a modular, maintainable codebase prepared for AI provider integrations, server-side services, and future feature modules.

## Run Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

```bash
npm run dev      # Start Next dev server on port 3000
npm run build    # Create a production Next build
npm run start    # Start the production Next server
npm run lint     # Run TypeScript type-checking
npm run clean    # Remove .next and legacy dist output
```

## Project Structure

```txt
src/
  app/
    layout.tsx               # Next root layout and global CSS import
    page.tsx                 # Home page route: /
    App.tsx                  # Client home page shell
    ai/video/page.tsx        # AI video page route: /ai/video
    api/
      ai/route.ts            # Thin API route entry point
      providers/route.ts     # Provider listing route entry point

  components/
    ui/                      # Small reusable primitives
    common/                  # Cross-feature shared components
    layout/                  # Navbar, Footer, layout-level UI
    forms/                   # Form controls and composed form UI
    sections/                # Landing-page and marketing sections

  features/
    ai-chat/                 # AI chat feature module
      components/
      hooks/
      services/
      types.ts
    ai-image/                # AI image feature module
      components/
      hooks/
      services/
      types.ts
    ai-video/                # AI video/avatar feature module
      components/
      hooks/
      services/
    auth/                    # Auth feature module
      components/
      services/
      types.ts

  lib/
    ai/
      providers/             # Provider adapters: OpenAI, Gemini, Claude
      ai-client.ts           # Provider resolver/switching
      ai.types.ts            # Shared AI provider contracts
      index.ts
    api/                     # Frontend/server API helpers
    utils/                   # Shared utility functions

  server/
    services/                # Backend business logic
    repositories/            # Database/data access contracts
    validators/              # Server-side validation

  hooks/                     # Shared hooks
  types/                     # Shared TypeScript interfaces
  constants/                 # Static copy/content/constants
  config/                    # Environment/provider config
```

## Folder Responsibilities

- `components`: UI-only components. Keep business logic out of these files.
- `features`: Business feature modules. Each feature owns its hooks, services, components, and types.
- `lib/ai`: AI provider abstraction and adapter implementations.
- `app/api`: Thin Next route entry points only. Routes call server services, not external SDKs directly.
- `server/services`: Backend business logic and orchestration.
- `server/repositories`: Database or persistence access layer.
- `types`: Shared interfaces used across the app.
- `config`: Environment and provider configuration.

## AI Provider Adapter Pattern

All providers implement the same interface:

```ts
interface AIProvider {
  name: 'openai' | 'gemini' | 'claude';
  generateText(prompt: string): Promise<string>;
  generateImage?(prompt: string): Promise<string>;
}
```

Request flow:

```txt
UI component
  -> feature hook/service
  -> app/api route
  -> server service
  -> lib/ai provider adapter
  -> external AI provider API
```

## Add a New AI Provider

1. Create `src/lib/ai/providers/new-provider.provider.ts`.
2. Implement `AIProvider` from `src/lib/ai/ai.types.ts`.
3. Export it from `src/lib/ai/providers/index.ts`.
4. Register it in `src/lib/ai/ai-client.ts`.
5. Add its environment variables to `.env.example` and `src/config/env.ts`.

## Add a New Feature Module

1. Create `src/features/my-feature/`.
2. Add `components/`, `hooks/`, `services/`, and `types.ts` as needed.
3. Keep UI in `components`, API calls in `services`, and React state orchestration in `hooks`.
4. Reuse shared UI from `src/components` and shared logic from `src/lib`.

## Environment Variables

Create a local `.env` or `.env.local` based on `.env.example`:

```bash
OPENAI_API_KEY=
GEMINI_API_KEY=
CLAUDE_API_KEY=
DEFAULT_AI_PROVIDER=openai
APP_URL=http://localhost:3000
```

Do not commit real API keys.

## Validation

```bash
npm run lint
npm run build
```