# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## API (json-server)

L’app Nuxt consomme l’API des offres via **json-server**. Depuis la **racine du monorepo** :

```bash
npm run json-server
```

Cela lance json-server sur `http://localhost:3000` avec `data/db.json` (endpoint `GET /offers`). L’URL de l’API est configurable via `NUXT_PUBLIC_API_BASE` (voir `nuxt.config.ts` → `runtimeConfig.public.apiBase`).

## Development Server

Start the development server (port par défaut Nuxt, ex. 3001 si json-server utilise 3000) :

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Testing

Tests use [Vitest](https://vitest.dev/) and [@nuxt/test-utils](https://nuxt.com/docs/getting-started/testing) (Nuxt 4 recommended setup).

- **Unit tests** (`test/unit/`): run in Node, no Nuxt runtime (fast).
- **Nuxt tests** (`test/nuxt/`): run in Nuxt runtime (happy-dom), use `mountSuspended` for components.

```bash
npm run test          # run all projects (unit + nuxt)
npm run test:unit     # unit only
npm run test:nuxt     # nuxt runtime only
npm run test:watch    # watch mode
```

In this monorepo, `NODE_PATH=./node_modules` is set so the correct `vue` package is resolved when running Nuxt tests.
