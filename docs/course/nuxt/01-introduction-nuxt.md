# Cours Nuxt 1 — Introduction à Nuxt (vs Vue)

## Objectif

Comprendre ce que Nuxt ajoute à Vue, et comment ces conventions structurent une application.

## Vue vs Nuxt : l’idée clé

- **Vue** : vous construisez des composants et l’interface.
- **Nuxt** : vous construisez une application complète *basée sur Vue*, avec une structure et des conventions déjà en place.

Conséquence : dans Nuxt, vous écrivez moins de configuration “de démarrage”, et vous vous appuyez davantage sur la **convention** (des dossiers et des noms).

## Ce que Nuxt apporte dans ce projet

- **Structure standard** : des dossiers reconnus par Nuxt (ex. `pages/`, `components/`, `layouts/`).
- **Routing par fichiers** : une page ajoutée dans `pages/` devient une route.
- **Organisation plus lisible** : on retrouve plus vite “où va quoi” quand on arrive sur un codebase.

## Où coder quoi (repères)

Dans cette formation, on utilisera surtout :

- `pages/` : les pages (routes) de l’application (home, results, …)
- `components/` : les composants UI réutilisables (SearchBar, cartes, header, …)
- `layouts/` : la structure commune (ex. header + contenu + footer)

## Bon réflexe

Quand vous hésitez :

1. Posez-vous la question : “Est-ce une **page** (route) ou un **composant réutilisable** ?”
2. Placez la page dans `pages/` et le composant dans `components/`.
3. Si c’est partagé sur plusieurs pages (header/footer), pensez à `layouts/`.

## Ressources complémentaires

- [Nuxt — Getting Started](https://nuxt.com/docs/getting-started/introduction)
- [Vue — Introduction](https://vuejs.org/guide/introduction.html)
