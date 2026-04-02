# Cours Nuxt 5 — Recherche et URL (query, navigation, réactivité)

## Objectif

Mettre en place une **recherche fonctionnelle** dans Nuxt en s’appuyant sur :

- l’**URL** comme référence pour le critère de recherche (ex. `?q=...`)
- la **navigation** pour mettre à jour cette URL
- la **réactivité** pour recharger les résultats quand l’URL change

Ce cours complète les notions Vue [Query Parameters](../08-query-parameters.md) et [Watchers](../07-watchers.md) dans le contexte Nuxt.

## Pourquoi passer par l’URL ?

- Partager un lien qui ouvre directement une recherche
- Utiliser le bouton retour du navigateur de façon cohérente
- Rafraîchir la page sans perdre le contexte de recherche

## Lire le critère dans l’URL (Nuxt)

Dans une page Nuxt, la route courante expose les **query parameters** (la partie après `?` dans l’adresse).

Bon réflexe :

- La page « résultats » lit le critère depuis l’URL
- Elle déclenche le chargement des offres en fonction de ce critère (s’il est présent ou non)

## Naviguer avec un critère (Nuxt)

Pour envoyer l’utilisateur vers les résultats **avec** un critère dans l’URL :

- depuis la **home** : au moment où l’utilisateur valide la recherche, la navigation doit inclure le critère dans l’adresse
- depuis la **page résultats** : une nouvelle recherche doit mettre à jour l’URL (même page, nouveaux paramètres)

## Réagir quand l’URL change

Si l’utilisateur modifie l’URL, revient en arrière, ou que la barre de recherche met à jour les paramètres, la liste affichée doit se mettre à jour.

Bon réflexe :

- observer le critère issu de l’URL
- relancer le chargement des offres quand ce critère change

## Cas particuliers à prévoir

- Critère **vide** ou absent : afficher **toutes** les offres (comportement par défaut)
- **Aucun résultat** pour un critère donné : message clair + lien ou action pour revenir à « toutes les offres »
- **Erreur réseau ou API** : message + possibilité de réessayer (comme pour le chargement simple)

## Lien avec le composable d’offres

Sur le plan architecture :

- une fonction « toutes les offres »
- une fonction « offres filtrées selon un critère » (selon ce que permet json-server ou un filtrage côté client)

La page résultats choisit laquelle appeler en fonction de la présence du critère dans l’URL.

## Ressources complémentaires

- [Nuxt — Routing](https://nuxt.com/docs/getting-started/routing)
- [Nuxt — useRoute](https://nuxt.com/docs/api/composables/use-route)
- [Nuxt — useRouter](https://nuxt.com/docs/api/composables/use-router)
