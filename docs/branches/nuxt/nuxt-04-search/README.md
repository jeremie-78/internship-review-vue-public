# Branche nuxt-04-search : recherche fonctionnelle

## 🎯 Objectifs d'apprentissage

À la fin de la branche **nuxt-04-search**, vous serez capable de :

- ✅ Brancher une **recherche fonctionnelle** dans l’app Nuxt (`apps/nuxt/`) en conservant l’UX de référence Vue
- ✅ Utiliser les **query parameters** avec Nuxt (`useRoute` / `useRouter`) et réagir aux changements (`watch`)
- ✅ Partager la logique d’API dans un **composable** (`useOffers` avec `searchOffers`)
- ✅ Gérer les états **chargement / erreur / vide** sur la page résultats
- ✅ Mettre à jour ou ajouter des **tests** Nuxt (Vitest, `mountSuspended`) si le cours le prévoit

Pour la suite (**nuxt-05-authentication**), vous saurez en plus ce qu’il reste à implémenter côté Nuxt (service auth, pages login/register, header, etc.) — voir les étapes plus bas.

## 📚 Concepts théoriques nécessaires

Avant de commencer, assurez-vous d'avoir lu et compris :

1. [Query parameters](../../../course/08-query-parameters.md) - Recherche avec `?q=...`
2. [Watchers](../../../course/07-watchers.md) - Réagir aux changements de l’URL
3. [Routing, pages et layouts](../../../course/nuxt/02-routing-pages-layouts.md) - Navigation et organisation Nuxt
4. [Composables Nuxt](../../../course/nuxt/03-composables-nuxt.md) - Logique partagée (`useOffers`)
5. [Data fetching avec `$fetch`](../../../course/nuxt/04-fetch-nuxt.md) - Appels API et erreurs

Pour l’authentification (branche suivante) : [Fetch API et async/await](../../../course/06-fetch-api.md), [localStorage](../../../course/09-localStorage.md), [v-model](../../../course/04-v-model.md).

## 📋 Vue d'ensemble de la branche

Sur **nuxt-04-search**, l’app Nuxt permet :

- Une **SearchBar** qui, depuis la home, envoie vers `/results?q=…`
- Une page **`/results`** qui lit `route.query.q`, appelle `searchOffers` ou `getOffers`, reste **réactive** quand `q` change, avec badge « Recherche active » et reset
- Une API **json-server** (`GET /offers?q=…`) — pas de filtrage uniquement côté client pour la recherche

L’API reste **json-server** (`npm run json-server`). Les offres sont dans `data/db.json`.

## 🔐 Vers la branche `nuxt-05-authentication`

Une fois la recherche validée sur **nuxt-04-search**, le travail restant dans `apps/nuxt/` pour atteindre **nuxt-05-authentication** est le suivant. Les consignes détaillées « Vue » dans [README branche 04-recherche](../../04-recherche/README.md) restent valables sur le fond ; en Nuxt on transpose les chemins et on utilise le **file-based routing** (pas de `router` manuel).

### Étape 4 : Service d’authentification

**Objectif** : Centraliser login, inscription et stockage local.

1. Créer `apps/nuxt/app/services/authService.ts` (ou `.js`).
2. **Login** : `GET /users?email=…` (json-server), vérification du mot de passe côté client ; si OK : token + utilisateur (sans mot de passe) en `localStorage` ; erreurs explicites si échec.
3. **Register** : vérifier l’unicité de l’email, puis `POST /users` ; puis stockage comme pour le login.
4. **logout**, **getStoredUser**, **isAuthenticated**, etc.

**Point de contrôle** : Connexion, inscription et déconnexion fonctionnent contre `data/db.json` (`users`).

---

### Étape 5 : Composable `useAuth`

**Objectif** : État auth partagé dans toute l’app Nuxt.

1. Créer `apps/nuxt/app/composables/useAuth.ts` avec `useState` (ou équivalent) pour l’utilisateur courant.
2. Exposer `login`, `register`, `logout`.
3. Réhydrater depuis `localStorage` au chargement (souvent `onMounted` pour limiter les écarts SSR/hydratation).

**Point de contrôle** : Le header et les pages peuvent lire et mettre à jour l’utilisateur connecté de façon cohérente.

---

### Étape 6 : Pages `login` et `register`

**Objectif** : Formulaires et redirection après succès.

1. Ajouter `apps/nuxt/app/pages/login.vue` et `apps/nuxt/app/pages/register.vue`.
2. Appeler `useAuth`, afficher les erreurs, liens entre les deux pages.
3. Après succès, rediriger vers l’accueil (ou une route `redirect` si vous protégez des routes).

**Point de contrôle** : `/login` et `/register` sont accessibles et fonctionnels.

---

### Étape 7 : Header et layout

**Objectif** : UI connecté / déconnecté alignée sur la référence Vue.

1. Adapter `apps/nuxt/app/components/AppHeader.vue` : email + déconnexion si connecté ; sinon liens vers `/login` et `/register`.
2. Vérifier que le layout par défaut inclut le header sur toutes les pages concernées.

**Point de contrôle** : La déconnexion met à jour l’affichage sans rechargement manuel inutile ; la session se restaure après un reload.

---

## ✅ Checklist — passage à nuxt-05-authentication

- [ ] `authService` : login, register, logout, `localStorage`, erreurs claires
- [ ] `useAuth` : état partagé + réhydratation
- [ ] Pages `login` / `register` et header connecté / déconnecté
- [ ] (Optionnel) Middleware de routes protégées

## 🧪 Tests à effectuer

**Recherche**

1. Home → soumettre une requête → URL `/results?q=…` et liste cohérente.
2. Sur `/results`, changer `q` ou utiliser reset → liste et UI à jour.
3. Cas vide / erreur API (json-server arrêté) selon ce que le cours exige.

**Authentification (après implémentation)**

1. Inscription puis affichage dans le header ; déconnexion.
2. Connexion avec un utilisateur de `db.json` ; persistance après rechargement.

## 📝 Notes importantes

- Recherche : **filtrage côté API** (json-server), pas seulement en mémoire dans le navigateur.
- Auth pédagogique : mot de passe vérifié côté client ; en production, auth réelle et tokens sécurisés.

## 🚀 Prochaine étape

Une fois la recherche validée sur **nuxt-04-search**, implémentez les étapes « Vers nuxt-05-authentication » ci-dessus, puis passez à la branche **nuxt-05-authentication**.
