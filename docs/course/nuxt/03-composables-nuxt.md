# Cours Nuxt 3 — Composables Nuxt

## Objectif

Savoir utiliser les *composables* dans Nuxt pour extraire la logique réutilisable (ex. accès API) hors des pages.

## C’est quoi un composable dans ce projet ?

- Un composable est une fonction “helper” qui encapsule une logique réutilisable.
- Dans Nuxt, le dossier `app/composables/` est l’endroit prévu pour ce type de logique.
- Le composable peut exposer :
  - des fonctions (ex. “récupérer les offres”)
  - des types/contrats (ex. une forme de donnée attendue)

Dans ce projet, le composable `useOffers` illustre le cas le plus important pour la suite : isoler l’appel API et la gestion d’erreur.

## Composables vs services (repère)

- En Vue/Vite “classique”, on met souvent la logique réseau dans `src/services/`.
- Dans Nuxt, on garde la même idée (isoler la logique), mais on la place souvent dans `app/composables/` pour profiter de l’organisation Nuxt.

## Pattern recommandé (ce que vous devez savoir faire)

1. Mettre la logique “métier / accès aux données” dans un composable.
2. Faire en sorte que le composable :
   - retourne des données prêtes à afficher
   - gère les erreurs d’une manière cohérente (et les remonte à la page)
3. Appeler le composable depuis une page :
   - la page gère l’état d’interface (loading / erreur / vide)
   - l’UI reste stable, seuls les résultats changent

## Bon réflexe de nommage

- Utilisez un nom qui commence par `use` (ex. `useOffers`).
- Exportez des fonctions clairement nommées (ex. `getOffers`).

## Bonnes pratiques observées dans l’app Nuxt

- La page n’appelle pas directement “l’API” : elle appelle le composable.
- Le composable encapsule la construction de l’URL et la logique de requête.
- La page garde la responsabilité de l’affichage (spinner, message d’erreur, grille de cartes).

## Ressources complémentaires

- [Nuxt — Composables](https://nuxt.com/docs/guide/directory-structure/app/composables)
