# Nuxt App (`apps/nuxt`)

Application Nuxt 4 du monorepo `internship-review-vue`.

## Setup

Depuis la racine du projet:

```bash
npm install
```

## API (json-server)

L'app Nuxt lit et ecrit les offres via json-server (`data/db.json`).

Depuis la racine:

```bash
npm run json-server
```

- Base URL par defaut: `http://localhost:3000`
- Configuration Nuxt: `runtimeConfig.public.apiBase`
- Variable env: `NUXT_PUBLIC_API_BASE` (voir `.env.example`)

## Developpement

Depuis `apps/nuxt`:

```bash
npm run dev
```

## Flux import stage.fr (v1)

### Fonctionnement

1. Sur `app/pages/home.vue`, le bouton `Charger des offres` est visible uniquement si `authUser` est present.
2. Le front appelle `POST /api/offers/import`.
3. La route `server/api/offers/import.post.ts`:
   - telecharge `https://www.stage.fr/jobs/?q=stage&job_type[]=STAGE`,
   - parse les titres via le selecteur `.listing-item__title` avec `cheerio`,
   - mappe chaque titre en offre v1,
   - poste chaque offre vers `${runtimeConfig.public.apiBase}/offers`.
4. Le front affiche le bilan `imported/failed/totalFound` ou un message d'erreur.

### Mapping v1 des offres importees

- `title`: texte extrait de `.listing-item__title`
- `company`: `"stage.fr"`
- `location`: `"France"`
- `type`: `"Stage"`
- `description`: `null`
- `salary`: `null`
- `contractType`: `null`
- `startDate`: `null`

### Limites v1 (assumees)

- Pas de deduplication.
- Pas de pagination multi-pages.
- Pas de verification auth serveur stricte sur la route d'import.
- Source unique fixe (`stage.fr`).

## Smoke tests manuels

- [ ] Utilisateur non connecte sur `/home`: bouton d'import absent.
- [ ] Utilisateur connecte sur `/home`: bouton visible.
- [ ] Clic import: bouton desactive pendant l'execution.
- [ ] Import termine: message avec `imported/failed/totalFound`.
- [ ] Si la source ou json-server echoue: message d'erreur visible.
- [ ] Un deuxieme import peut creer des doublons (comportement attendu v1).
- [ ] La page `/results` charge toujours les offres sans regression.

## Tests

```bash
npm run test
npm run test:unit
npm run test:nuxt
```
