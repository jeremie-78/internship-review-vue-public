# Cours Nuxt 4 — Data fetching avec `$fetch` et config d’exécution

## Objectif

Comprendre comment Nuxt fait le *data fetching* (chargement des données) à travers :

- `$fetch` (dans Nuxt)
- `useRuntimeConfig()` (pour configurer la base API)

et comment gérer proprement les états de l’UI (loading / erreur / vide).

## `$fetch` : à quoi ça correspond ?

Dans Nuxt, `$fetch` sert à faire des requêtes HTTP de manière simple.

Repère pédagogique :

- Une *fonction d’accès aux données* (souvent dans un composable) appelle `$fetch`.
- Une *page* consomme cette fonction et gère l’UI (spinner, message d’erreur, etc.).

## Pourquoi `useRuntimeConfig()` ?

Nuxt permet de configurer l’application (par environnement) via `runtimeConfig`.

Dans ce projet, l’idée est :

- construire l’URL de l’API à partir d’une base (ex. `apiBase`)
- éviter de “hardcoder” l’adresse de l’API dans chaque fichier

## Pattern “page = UI, composable = données”

Ce que vous devez savoir faire (pattern général) :

1. Le composable fournit une fonction du type :
   - “récupérer les offres”
2. Cette fonction :
   - construit l’URL
   - appelle `$fetch`
   - en cas d’échec, remonte une erreur (pour être capturée plus haut)
3. La page :
   - déclenche le chargement
   - affiche un état “chargement” tant que ça n’a pas répondu
   - affiche un message d’erreur si ça échoue
   - affiche un message “aucun résultat” si la liste est vide

## Ressources complémentaires

- [Nuxt — `$fetch`](https://nuxt.com/docs/api/utils/fetch)
- [Nuxt — runtime config](https://nuxt.com/docs/api/advanced/runtime-config)

