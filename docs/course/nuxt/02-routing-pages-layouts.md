# Cours Nuxt 2 — Routing, pages et layouts

## Objectif

Savoir créer des pages (routes) avec Nuxt, structurer une application avec des layouts, et naviguer entre pages.

## Routing par fichiers (file-based routing)

Dans Nuxt, vous n’écrivez pas une “liste de routes” au départ : les routes sont générées à partir du dossier `pages/`.

Exemples :

- Une page “results” dans `pages/` correspond à une URL `/results`
- Une page “home” (selon la convention du projet) correspond à l’URL d’accueil

L’objectif pédagogique : **vous apprendre à raisonner “pages = routes”**.

## Pages vs composants

- **Page** : un écran complet de l’application (souvent une route).
- **Composant** : un morceau d’UI réutilisable (barre de recherche, carte d’offre, header, …).

Bon réflexe :

- Si l’élément représente un écran complet → `pages/`
- Si l’élément est réutilisé / réutilisable → `components/`

## Layouts : structure commune

Un layout sert à partager une structure visuelle entre plusieurs pages :

- header
- footer
- zone centrale où la page s’affiche

