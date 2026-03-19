# Branche 04-recherche : Recherche fonctionnelle + authentification simple

## 🎯 Objectifs d'apprentissage

À la fin de cette branche, vous serez capable de :

- ✅ Créer des formulaires de connexion et d'inscription
- ✅ Gérer l'authentification via l'API (json-server : GET/POST `/users`)
- ✅ Stocker le token et l'utilisateur dans le navigateur (localStorage)
- ✅ Afficher l'état connecté / déconnecté dans le header (avec déconnexion)
- ✅ Partager l'état d'authentification entre layout et composants (provide/inject)

## 📚 Concepts théoriques nécessaires

1. [Fetch API et async/await](../../course/06-fetch-api.md) - Requêtes HTTP (GET, POST)
2. [localStorage](../../course/09-localStorage.md) - Stocker token et utilisateur dans le navigateur
3. [v-model](../../course/04-v-model.md) - Liaison bidirectionnelle pour les formulaires
4. [Query parameters](../../course/08-query-parameters.md) - Recherche avec `?q=...`
5. [Watchers](../../course/07-watchers.md) - Réagir aux changements de l'URL
6. [Introduction à Vue.js](../../course/01-introduction.md) - Réactivité, affichage conditionnel

Optionnel (version allégée) : [Composables](../../course/10-composables.md), [Navigation Guards](../../course/11-navigation-guards.md).

## 📋 Vue d'ensemble

Cette branche couvre :

- **Recherche** : barre de recherche, paramètre `q` dans l'URL, page résultats qui réagit aux changements.
- **Auth simple** : service auth (login via GET `/users?email=...`, register via POST `/users`), token + user en localStorage, pages Login/Register, header connecté/déconnecté, état dans le layout (provide) pour mettre à jour l’affichage sans rechargement.

L’API reste **json-server** (`npm run json-server`). Les utilisateurs sont dans `data/db.json` sous la clé `users`.

## 🛠️ Consignes étape par étape

### Partie 1 : Recherche fonctionnelle

- Page d’accueil avec SearchBar : soumission envoie vers `/results?q=...`.
- Page Results : lit `route.query.q`, appelle le service de recherche (ou getOffers si pas de query), affiche les offres avec états chargement/erreur.
- Service : `searchOffers(query)` (ou réutilisation de l’API avec query params).

### Partie 2 : Authentification simple (~1 h)

#### Étape 1 : Service d'authentification

1. Créez `src/services/authService.js`.
2. **Login** : `GET /users?email=...` (json-server), vérification du mot de passe côté client. Si OK : générer un token (`token-${user.id}`), stocker token + utilisateur (sans mot de passe) en localStorage, retourner `{ token, user }`. Gérer l’erreur (email/mot de passe incorrect).
3. **Register** : vérifier si l’email existe (`GET /users?email=...`). Si non : `POST /users` avec `{ email, password, name, createdAt }`. Stocker token + user en localStorage, retourner `{ token, user }`. Gérer l’erreur (email déjà utilisé).
4. **logout()** : supprimer token et utilisateur du localStorage.
5. **getToken()**, **getStoredUser()**, **setToken()**, **setUser()**, **isAuthenticated()** pour lire/écrire le stockage.

**Point de contrôle** : Le service permet de se connecter, s’inscrire et se déconnecter en s’appuyant sur json-server.

#### Étape 2 : Service utilisateur

1. Créez `src/services/userService.js`.
2. **getCurrentUser()** : retourner l’utilisateur stocké (ex. `getStoredUser()` depuis authService).

**Point de contrôle** : Un autre composant peut récupérer l’utilisateur courant sans toucher à authService.

#### Étape 3 : Pages Login et Register

1. **LoginPage.vue** : formulaire (email, mot de passe), soumission → `authService.login()`, en cas de succès mettre à jour l’état auth (via inject `setAuthUser`) et `router.push('/')`. Afficher un message d’erreur en cas d’échec. Lien vers Register.
2. **RegisterPage.vue** : formulaire (email, mot de passe, nom optionnel), validation minimale (longueur mot de passe), soumission → `authService.register()`, puis même logique que Login. Lien vers Login.

**Point de contrôle** : Connexion et inscription fonctionnent et redirigent vers l’accueil.

#### Étape 4 : Routes et layout

1. Dans le router : ajouter les routes `/login` et `/register` (même layout que les autres pages).
2. Dans **AppLayout.vue** : état auth (ex. `ref` initialisé avec `getStoredUser()`), `provide('setAuthUser', setAuthUser)` et `provide('authUser', authUser)`. Passer `user` et `onLogout` au header (pour mettre à jour l’affichage et gérer la déconnexion).

**Point de contrôle** : Les pages Login/Register sont accessibles et le layout a accès à l’état auth.

#### Étape 5 : Header

1. Dans **AppHeader.vue** : recevoir les props `user` et `onLogout`.
2. Si `user` est défini : afficher l’email (ou « Mon compte ») et un bouton **Déconnexion** qui appelle `logout()` puis `onLogout()`.
3. Sinon : afficher les liens **Connexion** et **Inscription** vers `/login` et `/register`.

**Point de contrôle** : Le header affiche l’état connecté/déconnecté et la déconnexion met à jour l’affichage sans rechargement.

#### Étape 6 : Initialisation au chargement

Dans AppLayout, au montage (`onMounted`), initialiser l’état auth avec `getStoredUser()` pour restaurer la session après rechargement.

**Point de contrôle** : L’utilisateur reste connecté après un rechargement de page.

---

## ✅ Checklist de validation

- [ ] Le service `authService.js` gère login (GET users + vérif mot de passe), register (POST users), logout, token et user en localStorage.
- [ ] Le service `userService.js` expose getCurrentUser (lecture du stockage).
- [ ] Les pages `LoginPage.vue` et `RegisterPage.vue` ont des formulaires, appellent l’API et mettent à jour l’état auth (inject).
- [ ] Les routes `/login` et `/register` sont configurées.
- [ ] Le layout (AppLayout) gère l’état auth et fournit `setAuthUser` / `authUser` aux enfants.
- [ ] Le header affiche l’état connecté (email + déconnexion) ou non connecté (liens Connexion / Inscription).
- [ ] La déconnexion supprime le token et met à jour l’affichage sans rechargement.
- [ ] La session est restaurée au rechargement (getStoredUser au montage du layout).
- [ ] L’API utilisée est json-server (`npm run json-server`), avec `users` dans `data/db.json`.

## 🧪 Tests à effectuer

1. **Inscription** : créer un compte, vérifier la redirection et l’affichage dans le header.
2. **Connexion** : se connecter avec un utilisateur de `db.json` (ex. `test@example.com` / `password123`), vérifier le header et la déconnexion.
3. **Déconnexion** : cliquer sur Déconnexion, vérifier que le header affiche Connexion/Inscription.
4. **Persistance** : se connecter, recharger la page, vérifier que l’utilisateur reste connecté.

## 📝 Notes importantes

- **API** : json-server expose GET/POST `/users`. Login = GET + vérif mot de passe côté client ; Register = POST. Pas de serveur d’auth dédié.
- **Stockage** : token et utilisateur (sans mot de passe) en localStorage.
- **État auth** : ref dans le layout + provide, pour que le header et les pages (Login/Register) puissent lire et mettre à jour l’état sans rechargement.
- **Sécurité** : Pour ce projet pédagogique, le token est simple. En production, utiliser des tokens sécurisés (ex. JWT) et ne jamais vérifier le mot de passe côté client.

## 🔗 Ressources

- [Planning 21h Vue/Nuxt](../../PLANNING_21H_VUE_NUXT.md) - Vue 4, auth simple + évaluation
- [Vue Router](https://router.vuejs.org/)
- [MDN - localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)

---

**Bon courage ! 💪**
