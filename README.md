# internship-review-vue

Monorepo « recherche de stages » : Vue 3 (Vite) + Nuxt 4. Même API partagée (json-server).

## Structure

```
internship-review-vue/
├── apps/
│   ├── vue/          # Application Vue 3 + Vite
│   └── nuxt/         # Application Nuxt 4
├── data/             # API mock partagée (db.json)
├── docs/             # Cours, branches, contexte projet
└── package.json      # Workspaces + scripts racine
```

## Installation

```sh
npm install
```

Si l'installation échoue (erreurs partielles, « prefix can't find module », etc.) → voir [Dépannage de l'installation](docs/troubleshooting-installation.md). En dernier recours : `npm run clean-install`.

## Commandes depuis la racine

| Commande | Description |
|----------|-------------|
| `npm run dev:vue` | Lancer l’app Vue en dev (Vite) |
| `npm run dev:nuxt` | Lancer l’app Nuxt en dev |
| `npm run build:vue` | Build production de l’app Vue |
| `npm run build:nuxt` | Build production de l’app Nuxt |
| `npm run test:vue` | Tests unitaires de l’app Vue |
| `npm run json-server` | Démarrer l’API mock sur le port 3000 |

Les deux apps pointent vers `http://localhost:3000` pour l’API. Démarrer `json-server` avant ou en parallèle de `dev:vue` ou `dev:nuxt` pour les offres / auth.

### Configuration Nuxt (`apps/nuxt`)

- Copier `apps/nuxt/.env.example` en `apps/nuxt/.env` si vous devez changer l’URL de l’API.
- Variable : `NUXT_PUBLIC_API_BASE` (par défaut `http://localhost:3000`).

## IDE et navigateur

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (désactiver Vetur).
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) (Chrome/Edge) ou [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/).
